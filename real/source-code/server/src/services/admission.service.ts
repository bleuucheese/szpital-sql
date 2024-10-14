import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAdmissionDto } from 'src/dtos/admission/create-admission.dto';
import { UpdateAdmissionDto } from 'src/dtos/admission/update-admission.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async create(createAdmissionDto: CreateAdmissionDto) {
    const {
      status,
      admitted_date,
      discharged_date,
      room_type,
      price,
      treatment_history_id,
    } = createAdmissionDto;
    const query = `
      INSERT INTO admission (status, admitted_date, discharged_date, room_type, price, treatment_history_id)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    await this.entityManager.query(query, [
      status,
      admitted_date,
      discharged_date,
      room_type,
      price,
      treatment_history_id,
    ]);

    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [insertResult] = await this.entityManager.query(lastInsertIdQuery);

    return this.findOne(insertResult.id);
  }

  async findAll(page: number, count: number) {
    const offset = (page - 1) * count;
    const query = `SELECT * FROM admission LIMIT ? OFFSET ?;`;
    return await this.entityManager.query(query, [count, offset]);
  }

  async findOne(id: number) {
    const query = `SELECT * FROM admission WHERE id = ?;`;
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateAdmissionDto: UpdateAdmissionDto) {
    const {
      status,
      admitted_date,
      discharged_date,
      room_type,
      price,
      treatment_history_id,
    } = updateAdmissionDto;
    const query = `
      UPDATE admission
      SET status = ?, admitted_date = ?, discharged_date = ?, room_type = ?, price = ?, treatment_history_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      status,
      admitted_date,
      discharged_date,
      room_type,
      price,
      treatment_history_id,
      id,
    ]);

    return this.findOne(id);
  }

  async remove(id: number) {
    const findQuery = `SELECT * FROM admission WHERE id = ?;`;
    const [deletedAdmission] = await this.entityManager.query(findQuery, [id]);

    const deleteQuery = `DELETE FROM admission WHERE id = ?;`;
    await this.entityManager.query(deleteQuery, [id]);

    return deletedAdmission;
  }
}
