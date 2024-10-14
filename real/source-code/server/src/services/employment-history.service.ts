import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateEmploymentHistoryDto } from 'src/dtos/employment-history/create-employment-history.dto';
import { UpdateEmploymentHistoryDto } from 'src/dtos/employment-history/update-employment-history.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class EmploymentHistoryService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

  async create(createEmploymentHistoryDto: CreateEmploymentHistoryDto) {
    const {
      applied_date,
      previous_salary,
      current_salary,
      previous_job_title,
      current_job_title,
      previous_department_id,
      current_department_id,
      staff_id
    } = createEmploymentHistoryDto;

    const query = `
      INSERT INTO employment_history (
        applied_date, previous_salary, current_salary, previous_job_title, current_job_title, previous_department_id, current_department_id, staff_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await this.entityManager.query(query, [
      applied_date, previous_salary, current_salary, previous_job_title, current_job_title, previous_department_id, current_department_id, staff_id
    ]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = 'SELECT * FROM employment_history;';
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM employment_history WHERE id = ?;';
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateEmploymentHistoryDto: UpdateEmploymentHistoryDto) {
    const {
      applied_date,
      previous_salary,
      current_salary,
      previous_job_title,
      current_job_title,
      previous_department_id,
      current_department_id,
      staff_id
    } = updateEmploymentHistoryDto;

    const query = `
      UPDATE employment_history
      SET 
        applied_date = ?, previous_salary = ?, current_salary = ?, previous_job_title = ?, current_job_title = ?,
        previous_department_id = ?, current_department_id = ?, staff_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      applied_date, previous_salary, current_salary, previous_job_title, current_job_title, previous_department_id, current_department_id, staff_id, id
    ]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM employment_history WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Employment history deleted successfully', id };
  }
}
