import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreatePatientAllergyDto } from '../dtos/patient-allergy/create-patient-allergy.dto';
import { UpdatePatientAllergyDto } from '../dtos/patient-allergy/update-patient-allergy.dto';

@Injectable()
export class PatientAllergyService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

  async create(createPatientAllergyDto: CreatePatientAllergyDto) {
    const { patient_id, allergy_id, severity } = createPatientAllergyDto;
    await this.entityManager.query(
      'INSERT INTO patient_allergy (patient_id, allergy_id, severity) VALUES (?, ?, ?)',
      [patient_id, allergy_id, severity]
    );
    return 'New patient allergy added';
  }

  async findAll() {
    const allergies = await this.entityManager.query('SELECT * FROM patient_allergies');
    return allergies;
  }

  async findOne(id: number) {
    const allergy = await this.entityManager.query(
      'SELECT * FROM patient_allergies WHERE id = ?',
      [id]
    );
    return allergy.length ? allergy[0] : `No patient allergy found with ID #${id}`;
  }

  async update(id: number, updatePatientAllergyDto: UpdatePatientAllergyDto) {
    const { severity } = updatePatientAllergyDto;
    const result = await this.entityManager.query(
      'UPDATE patient_allergies SET severity = ? WHERE id = ?',
      [severity, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Patient allergy #${id} not found`);
    }
    return `Patient allergy #${id} updated`;
  }

  async remove(id: number) {
    const result = await this.entityManager.query(
      'DELETE FROM patient_allergies WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Patient allergy #${id} not found`);
    }
    return `Patient allergy #${id} removed`;
  }
  async delete(patient_id: number, allergy_id: number) {
    const query = `DELETE FROM patient_allergy WHERE patient_id = ? AND allergy_id = ?`;
    const result = await this.entityManager.query(
      query,
      [patient_id, allergy_id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Patient allergy not found`);
    }
    return `Patient allergy removed`;
  }
}
