import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateInsuranceDto } from 'src/dtos/insurance/create-insurance.dto';
import { UpdateInsuranceDto } from 'src/dtos/insurance/update-insurance.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async create(createInsuranceDto: CreateInsuranceDto) {
    const { expired_date, patient_id } = createInsuranceDto;
    const query = `
      INSERT INTO insurance (expired_date, patient_id)
      VALUES (?, ?);
    `;
    await this.entityManager.query(query, [expired_date, patient_id]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as code;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.code);
  }

  async findAll() {
    const query = 'SELECT * FROM insurance;';
    return await this.entityManager.query(query);
  }

  async findOne(patientId: number) {
    const query = 'SELECT * FROM insurance WHERE patient_id = ?;';
    return await this.entityManager.query(query, [patientId]);
  }

  async update(code: number, updateInsuranceDto: UpdateInsuranceDto) {
    const { expired_date, patient_id } = updateInsuranceDto;
    const query = `
      UPDATE insurance
      SET expired_date = ?, patient_id = ?
      WHERE code = ?;
    `;
    await this.entityManager.query(query, [expired_date, patient_id, code]);
    return this.findOne(code);
  }

  async remove(code: number) {
    const deleteQuery = 'DELETE FROM insurance WHERE code = ?;';
    await this.entityManager.query(deleteQuery, [code]);
    return { message: 'Insurance removed successfully', code };
  }
}
