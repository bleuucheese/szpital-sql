import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateProcedureDto } from 'src/dtos/procedure/create-procedure.dto';
import { UpdateProcedureDto } from 'src/dtos/procedure/update-procedure.dto';
import { EntityManager } from 'typeorm';


@Injectable()
export class ProcedureService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

  async create(createProcedureDto: CreateProcedureDto) {
    const { price, category, medicine_quantity, performed_date, medicine_id, staff_id, patient_id, treatment_history_id } = createProcedureDto;
    const query = `
      INSERT INTO procedure (price, category, medicine_quantity, performed_date, medicine_id, staff_id, patient_id, treatment_history_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await this.entityManager.query(query, [price, category, medicine_quantity, performed_date, medicine_id, staff_id, patient_id, treatment_history_id]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = 'SELECT * FROM procedure;';
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM procedure WHERE id = ?;';
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateProcedureDto: UpdateProcedureDto) {
    const { price, category, medicine_quantity, performed_date, medicine_id, staff_id, patient_id, treatment_history_id } = updateProcedureDto;
    const query = `
      UPDATE procedure
      SET price = ?, category = ?, medicine_quantity = ?, performed_date = ?, medicine_id = ?, staff_id = ?, patient_id = ?, treatment_history_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [price, category, medicine_quantity, performed_date, medicine_id, staff_id, patient_id, treatment_history_id, id]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM procedure WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Procedure deleted successfully', id };
  }
}
