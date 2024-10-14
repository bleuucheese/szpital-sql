import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQualificationDto } from '../dtos/qualification/create-qualification.dto';
import { UpdateQualificationDto } from '../dtos/qualification/update-qualification.dto';

@Injectable()
export class QualificationService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async create(createQualificationDto: CreateQualificationDto) {
    const { name, provider, issue_date, staff_id } = createQualificationDto;
    await this.entityManager.query(
      `INSERT INTO qualification (name, provider, issue_date, staff_id) VALUES (?, ?, ?, ?)`,
      [name, provider, issue_date, staff_id],
    );
    return 'New qualification added'; // For MySQL, fetching the newly added row requires a separate query.
  }

  async findAll() {
    return await this.entityManager.query(`SELECT * FROM qualification`);
  }

  async findOne(id: number) {
    const result = await this.entityManager.query(
      `SELECT * FROM qualification WHERE id = ?`,
      [id],
    );
    if (result.length === 0) {
      throw new Error(`Qualification with ID #${id} not found`);
    }
    return result[0];
  }

  async update(id: number, updateQualificationDto: UpdateQualificationDto) {
    const { name, provider, issue_date, staff_id } = updateQualificationDto;
    const update = await this.entityManager.query(
      `UPDATE qualification SET name = ?, provider = ?, issue_date = ?, staff_id = ? WHERE id = ?`,
      [name, provider, issue_date, staff_id, id],
    );
    if (update.affectedRows === 0) {
      throw new Error(`Qualification with ID #${id} not found`);
    }
    return `Qualification #${id} updated`;
  }

  async remove(id: number) {
    const result = await this.entityManager.query(
      `DELETE FROM qualification WHERE id = ?`,
      [id],
    );
    if (result.affectedRows === 0) {
      throw new Error(`Qualification with ID #${id} not found`);
    }
    return `Qualification #${id} removed`;
  }
}
