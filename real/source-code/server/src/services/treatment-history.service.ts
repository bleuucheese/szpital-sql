import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateTreatmentHistoryDto } from '../dtos/treatment-history/create-treatment-history.dto';
import { UpdateTreatmentHistoryDto } from '../dtos/treatment-history/update-treatment-history.dto';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class TreatmentHistoryService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

  async create(createTreatmentHistoryDto: CreateTreatmentHistoryDto) {
    const { type, disease, visited_date, patient_id } = createTreatmentHistoryDto;
    const query = `
      INSERT INTO treatment_history (type, disease, visited_date, patient_id)
      VALUES (?, ?, ?, ?);
    `;
    await this.entityManager.query(query, [type, disease, visited_date, patient_id]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = `SELECT t.*,p.id as patient_id, p.first_name, p.last_name FROM treatment_history t
    JOIN patient p on p.id = t.patient_id
    ;`;
    const res = await this.entityManager.query(query)
    const treatmentHistories = res.map(result => {
      return {
        id: result.id,
        type: result.type,
        disease: result.disease,
        visited_date: result.visited_date,
        patient: {
          patient_id: result.patient_id,
          last_name: result.last_name,
          first_name: result.first_name,
        }

      };
    })
    return treatmentHistories
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM treatment_history WHERE id = ?;';
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateTreatmentHistoryDto: UpdateTreatmentHistoryDto) {
    const { type, disease, visited_date, patient_id } = updateTreatmentHistoryDto;
    const query = `
      UPDATE treatment_history
      SET type = ?, disease = ?, visited_date = ?, patient_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [type, disease, visited_date, patient_id, id]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM treatment_history WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Treatment history deleted successfully', id };
  }
}
