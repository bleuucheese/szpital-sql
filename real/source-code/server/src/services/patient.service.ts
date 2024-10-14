import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreatePatientDto } from 'src/dtos/patient/create-patient.dto';
import { UpdatePatientDto } from 'src/dtos/patient/update-patient.dto';
import { Billing } from 'src/entities/billing.entity';
import { Medicine } from 'src/entities/medicine.entity';
import { Procedure } from 'src/entities/procedure.entity';
import { Staff } from 'src/entities/staff.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    const { first_name, last_name, dob, gender, blood_type, cid } =
      createPatientDto;
    const query = `
      INSERT INTO patient (first_name, last_name, dob, gender, blood_type, cid)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const formattedDob = new Date(dob).toISOString().split('T')[0];
    await this.entityManager.query(query, [
      first_name,
      last_name,
      formattedDob,
      gender,
      blood_type,
      cid,
    ]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll(page: number, count: number, searchQuery: string) {
    const offset = (page - 1) * count;

    // Base query to count total patients, add WHERE clause if search query is provided
    let totalQuery = `SELECT COUNT(*) as total FROM patient`;
    let patientQuery = `SELECT * FROM patient`;
    const params: any[] = [];

    if (searchQuery) {
      totalQuery += ` WHERE first_name LIKE ? OR last_name LIKE ?`;
      patientQuery += ` WHERE (first_name LIKE ? OR last_name LIKE ? OR CONCAT(first_name, ' ', last_name) LIKE ?)`;
      const searchPattern = `%${searchQuery}%`;
      params.push(searchPattern, searchPattern, searchPattern); // Add the search query twice for first and last name
    }

    // Add LIMIT and OFFSET for pagination
    patientQuery += ` LIMIT ? OFFSET ?`;
    params.push(count, offset);

    // Query to get the total count of patients
    const totalResult = await this.entityManager.query(totalQuery, [searchQuery ? `%${searchQuery}%` : null, `%${searchQuery}%`, `%${searchQuery}%`]);
    const totalPatients = totalResult[0].total;

    // Query to get the paginated list of patients
    const patients = await this.entityManager.query(patientQuery, params);

    // Calculate total pages
    const totalPages = Math.ceil(totalPatients / count);

    // Return result with patients, total pages, and current page
    return {
      patients,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const patientQuery = `SELECT * FROM patient WHERE id = ?;`;
    const addressQuery = `SELECT * FROM address WHERE patient_id = ?;`;
    const allergyQuery = `
      SELECT a.*, pa.severity
      FROM patient_allergy pa
      INNER JOIN allergy a ON pa.allergy_id = a.id
      WHERE pa.patient_id = ?;
    `;
    const treatmentHistoryQuery = `
      SELECT * FROM treatment_history WHERE patient_id = ?;
    `;
    const procedureQuery = `
      SELECT * FROM \`procedure\` 
      WHERE treatment_history_id IN (?);
    `;
    const medicineQuery = `
      SELECT * FROM medicine
      WHERE id IN (SELECT DISTINCT medicine_id FROM \`procedure\` WHERE medicine_id IS NOT NULL);
    `;
    const staffQuery = `
      SELECT * FROM staff
      WHERE id IN (SELECT DISTINCT staff_id FROM \`procedure\` WHERE staff_id IS NOT NULL);
    `;
    const billingQuery = `
    SELECT * FROM billing
    WHERE treatment_history_id IN (?);
  `;

    const [patients, addresses, allergies, treatmentHistories] =
      await Promise.all([
        this.entityManager.query(patientQuery, [id]),
        this.entityManager.query(addressQuery, [id]),
        this.entityManager.query(allergyQuery, [id]),
        this.entityManager.query(treatmentHistoryQuery, [id]),
      ]);

    // Check if the array is empty (no patient found)
    if (patients.length === 0) {
      throw new NotFoundException('Patient not found');
    }

    // Get all treatment_history_ids
    const treatmentHistoryIds = treatmentHistories.map((history) => history.id);

    // Fetch all procedures for the treatment histories
    let procedures = [];
    if (treatmentHistoryIds.length > 0) {
      procedures = await this.entityManager.query(procedureQuery, [
        treatmentHistoryIds,
      ]);
    }

    // Fetch all medicines referenced by procedures
    const medicineIds = [
      ...new Set(procedures.map((proc) => proc.medicine_id).filter((id) => id)),
    ];
    let medicines = [];
    if (medicineIds.length > 0) {
      medicines = await this.entityManager.query(medicineQuery, [medicineIds]);
    }

    // Fetch all staff referenced by procedures
    const staffIds = [...new Set(procedures.map((proc) => proc.staff_id))];
    let staff = [];
    if (staffIds.length > 0) {
      staff = await this.entityManager.query(staffQuery, [staffIds]);
    }
    // Fetch all billing information for treatment histories
    let billings = [];
    if (treatmentHistoryIds.length > 0) {
      billings = await this.entityManager.query(billingQuery, [
        treatmentHistoryIds,
      ]);
    }
    // Create a map of medicine by ID
    const medicineMap = medicines.reduce(
      (acc, med) => {
        acc[med.id] = med;
        return acc;
      },
      {} as Record<number, Medicine>,
    );

    // Create a map of staff by ID
    const staffMap = staff.reduce(
      (acc, stf) => {
        acc[stf.id] = stf;
        return acc;
      },
      {} as Record<number, Staff>,
    );
    // Create a map of billing by treatment_history_id
    const billingMap = billings.reduce(
      (acc, bill) => {
        acc[bill.treatment_history_id] = bill;
        return acc;
      },
      {} as Record<number, Billing>,
    );
    // Group procedures by treatment_history_id
    const procedureMap = treatmentHistoryIds.reduce(
      (acc, historyId) => {
        acc[historyId] = procedures.filter(
          (proc) => proc.treatment_history_id === historyId,
        );
        return acc;
      },
      {} as Record<number, Procedure[]>,
    );

    // Append procedures with medicine and staff information
    for (const history of treatmentHistories) {
      history.procedures = (procedureMap[history.id] || []).map((proc) => ({
        ...proc,
        medicine: proc.medicine_id
          ? medicineMap[proc.medicine_id] || null
          : null,
        staff: proc.staff_id ? staffMap[proc.staff_id] || null : null,
      }));
      history.billing = billingMap[history.id] || null; // Assign billing or null
    }

    const patient = {
      ...patients[0],
      address: addresses.length > 0 ? addresses[0] : null,
      allergies: allergies.length > 0 ? allergies : [],
      treatmentHistories:
        treatmentHistories.length > 0 ? treatmentHistories : [],
    };

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id);
    const { first_name, last_name, dob, gender, blood_type, cid } =
      updatePatientDto;
    // Convert the date to YYYY-MM-DD format using native JavaScript
    const formattedDob = new Date(dob).toISOString().split('T')[0];
    const query = `
      UPDATE patient
      SET first_name = ?, last_name = ?, dob = ?, gender = ?, blood_type = ?, cid = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      first_name,
      last_name,
      formattedDob,
      gender,
      blood_type,
      cid,
      id,
    ]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM patient WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Patient deleted successfully', id, statusCode: 200 };
  }

  async getAllPatientNoPagination() {
    const query = 'SELECT * FROM patient;';
    const result = await this.entityManager.query(query);
    return result;
  }
}
