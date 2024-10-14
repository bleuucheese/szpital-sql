import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateStaffDto } from '../dtos/staff/create-staff.dto';
import { UpdateStaffDto } from '../dtos/staff/update-staff.dto';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  async create(createStaffDto: CreateStaffDto) {
    console.log(createStaffDto)
    const {
      first_name,
      last_name,
      dob,
      job_type,
      salary,
      hired_date,
      department_id,
    } = createStaffDto;
    const departmentExists = await this.entityManager.query(
      `SELECT id FROM department WHERE id = ?`,
      [department_id]
    );
    if (departmentExists.length === 0) {
      throw new NotFoundException(`Department with id ${department_id} does not exist.`);
    }
    // Insert staff record if department exists
    const query = `
  INSERT INTO staff (first_name, last_name, dob, job_type, salary, hired_date, department_id)
  VALUES (?, ?, ?, ?, ?, ?, ?);
`;
    const formattedDob = new Date(dob).toISOString().split('T')[0];
    const formattedHiredDate = new Date(hired_date).toISOString().split('T')[0];
    // Check if department exists

    await this.entityManager.query(query, [
      first_name,
      last_name,
      formattedDob,
      job_type,
      salary,
      formattedHiredDate,
      department_id,
    ]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll(page: number, count: number, searchQuery: string, department: string, sort: string) {
    const offset = (page - 1) * count;
    let totalQuery = `SELECT COUNT(*) as total FROM staff s JOIN department d ON s.department_id = d.id`;
    let staffQuery = `
      SELECT s.*, d.name AS department_name 
      FROM staff s 
      JOIN department d ON s.department_id = d.id
    `;

    const params: any[] = [];

    const conditions: string[] = [];

    // Add conditions for first_name or last_name search
    if (searchQuery) {
      conditions.push(`(s.first_name LIKE ? OR s.last_name LIKE ? OR CONCAT(first_name, ' ', last_name) LIKE ?)`);
      const searchPattern = `%${searchQuery}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    // Add condition for department name search
    if (department) {
      conditions.push(`d.name LIKE ?`);
      const departmentPattern = `%${department}%`;
      params.push(departmentPattern);
    }

    // Combine conditions with "AND" if there are any
    if (conditions.length > 0) {
      totalQuery += ` WHERE ` + conditions.join(' AND ');
      staffQuery += ` WHERE ` + conditions.join(' AND ');
    }

    // Apply sorting logic based on the sort parameter
    switch (sort) {
      case 'FA': // First Name Ascending
        staffQuery += ` ORDER BY s.first_name ASC`;
        break;
      case 'FD': // First Name Descending
        staffQuery += ` ORDER BY s.first_name DESC`;
        break;
      case 'LA': // Last Name Ascending
        staffQuery += ` ORDER BY s.last_name ASC`;
        break;
      case 'LD': // Last Name Descending
        staffQuery += ` ORDER BY s.last_name DESC`;
        break;
      default:
        staffQuery += ` ORDER BY s.first_name ASC`; // Default to First Name Ascending
    }
    // Add LIMIT and OFFSET for pagination
    staffQuery += ` LIMIT ? OFFSET ?`;
    params.push(count, offset);

    // Query to get the total count of staff
    const totalResult = await this.entityManager.query(totalQuery, params);
    const totalStaffs = totalResult[0].total;

    // Query to get the paginated list of staff
    const staffs = await this.entityManager.query(staffQuery, params);

    // Calculate total pages
    const totalPages = Math.ceil(totalStaffs / count);

    return {
      staffs,
      totalPages,
      currentPage: page,
    };
  }


  async findOne(id: number) {
    const staffQuery = `
    SELECT s.*, 
           m.id AS manager_id, 
           m.first_name AS manager_first_name, 
           m.last_name AS manager_last_name, 
           m.dob AS manager_dob, 
           m.job_type AS manager_job_type, 
           m.salary AS manager_salary, 
           m.hired_date AS manager_hired_date,
           d.id AS department_id,
           d.name AS department_name
    FROM staff s
    LEFT JOIN staff m ON s.manager_id = m.id
    LEFT JOIN department d ON s.department_id = d.id
    WHERE s.id = ?;
  `;
    const proceduresQuery = `
  SELECT p.*, m.id AS medicine_id, m.name AS medicine_name, m.price AS medicine_price,
         m.effect AS medicine_effect, m.side_effect AS medicine_side_effect,
         t.patient_id, pt.first_name AS patient_first_name, pt.last_name AS patient_last_name,
         pt.dob AS patient_dob
  FROM \`procedure\` p
  LEFT JOIN medicine m ON p.medicine_id = m.id
  LEFT JOIN treatment_history t ON p.treatment_history_id = t.id
  LEFT JOIN patient pt ON t.patient_id = pt.id
  WHERE p.staff_id = ?;
`;
    const appointmentQuery = `
  SELECT a.*, 
         pt.id as patient_id, 
         pt.first_name , 
         pt.last_name , 
         pt.dob
  FROM appointment a
  LEFT JOIN patient pt ON a.patient_id = pt.id
  WHERE a.staff_id = ?;
`;
    const shiftQuery = `
        SELECT sh.id, sh.day_of_week, sh.start_hour, sh.end_hour
        FROM shift sh
        JOIN shift_staff ss ON ss.shift_id = sh.id
        WHERE ss.staff_id = ?;
    `;
    // Execute both queries in parallel
    const [staffs, procedures, appointments, shifts] = await Promise.all([
      this.entityManager.query(staffQuery, [id]),
      this.entityManager.query(proceduresQuery, [id]),
      this.entityManager.query(appointmentQuery, [id]),
      this.entityManager.query(shiftQuery, [id])
    ]);
    const {
      manager_id,
      manager_first_name,
      manager_last_name,
      manager_dob,
      manager_job_type,
      manager_salary,
      manager_hired_date,
      department_id,
      department_name,
      ...staffWithoutManagerDetails // This keeps all other fields from the staff object
    } = staffs[0];
    const result = {
      ...staffWithoutManagerDetails, // Spread the rest of the staff details
      manager: manager_id ? {
        id: manager_id,
        first_name: manager_first_name,
        last_name: manager_last_name,
        dob: manager_dob,
        job_type: manager_job_type,
        salary: manager_salary,
        hired_date: manager_hired_date,
      } : null, // If no manager, set to null
      department: department_id ? {
        id: department_id,
        name: department_name
      } : null,// If no department, set to null
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      procedures: procedures.map(({ medicine_id, staff_id, medicine_name, medicine_price, medicine_effect, medicine_side_effect, patient_id, patient_first_name, patient_last_name, patient_dob, ...rest }) => ({
        ...rest,
        medicine: medicine_id ? {
          id: medicine_id,
          name: medicine_name,
          price: medicine_price,
          effect: medicine_effect,
          side_effect: medicine_side_effect,
        } : null,
        patient: {
          id: patient_id,
          first_name: patient_first_name,
          last_name: patient_last_name,
          dob: patient_dob
        }
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      appointments: appointments.map(({ staff_id, patient_id, first_name, last_name, dob, ...rest }) => ({
        ...rest,
        patient: {
          id: patient_id,
          first_name,
          last_name,
          dob
        }
      })),
      shifts
    };
    return result;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const {
      first_name,
      last_name,
      dob,
      job_type,
      salary,
      hired_date,
      department_id,
    } = updateStaffDto;
    const query = `
      UPDATE staff
      SET first_name = ?, last_name = ?, dob = ?, job_type = ?, salary = ?, hired_date = ?, department_id = ?
      WHERE id = ?;
    `;
    const formattedDob = new Date(dob).toISOString().split('T')[0];
    const formattedHiredDate = new Date(hired_date).toISOString().split('T')[0];
    await this.entityManager.query(query, [
      first_name,
      last_name,
      formattedDob,
      job_type,
      salary,
      formattedHiredDate,
      department_id,
      id,
    ]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM staff WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Staff deleted successfully', id };
  }
  async findAllStaffWithShift(page: number, count: number, searchQuery: string, dayOfWeek: string, startTime: string, endTime: string) {
    const offset = (page - 1) * count;

    const resultQuery = `
        SELECT s.id as staff_id, s.first_name, s.last_name,sh.id as shift_id, sh.day_of_week, sh.start_hour, sh.end_hour
        FROM staff s
        JOIN shift_staff ss ON s.id = ss.staff_id
        JOIN shift sh ON ss.shift_id = sh.id
        WHERE (s.first_name LIKE ? OR s.last_name LIKE ?)
        AND sh.day_of_week = ?
        AND (
            (sh.start_hour < sh.end_hour AND sh.start_hour >= ? AND sh.end_hour <= ?)
            OR
            (sh.start_hour > sh.end_hour AND (sh.start_hour >= ? OR sh.end_hour <= ?))
        )
        ;
    `;


    const staffsWithShifts = await this.entityManager.query(resultQuery, [
      `%${searchQuery}%`,
      `%${searchQuery}%`,
      dayOfWeek,
      startTime,
      endTime,
      startTime,
      endTime,
      count,
      offset
    ]);

    // Group staff by staff_id and their shifts
    const staffMap = staffsWithShifts.reduce((acc, { staff_id, first_name, last_name, shift_id, day_of_week, start_hour, end_hour }) => {
      if (!acc[staff_id]) {
        acc[staff_id] = {
          staff_id,
          first_name,
          last_name,
          shifts: []
        };
      }
      acc[staff_id].shifts.push({
        shift_id,
        day_of_week,
        start_hour,
        end_hour
      });
      return acc;
    }, {});
    // Convert object to array
    const staffs = Object.values(staffMap);
    const totalStaff = staffs.length;
    const totalPages = Math.ceil(totalStaff / count);

    // Paginate the result
    const paginatedStaff = staffs.slice(offset, offset + count);
    // Return the result with pagination
    return {
      totalPages,
      currentPage: page,
      paginatedStaff
    };
  }

  async getAllStaffNoPagination() {
    const query = 'SELECT * FROM staff;';
    const result = await this.entityManager.query(query);
    return result;
  }
}
