import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateBillingDto } from 'src/dtos/billing/create-billing.dto';
import { UpdateBillingDto } from 'src/dtos/billing/update-billing.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class BillingService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async create(createBillingDto: CreateBillingDto) {
    const {
      amount,
      billing_date,
      due_date,
      payment_status,
      treatment_history_id,
      patient_id,
    } = createBillingDto;
    const query = `
      INSERT INTO billing (amount, billing_date, due_date, payment_status, treatment_history_id, patient_id)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    await this.entityManager.query(query, [
      amount,
      billing_date,
      due_date,
      payment_status,
      treatment_history_id,
      patient_id,
    ]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = 'SELECT * FROM billing;';
    return await this.entityManager.query(query);
  }
  async findOne(id: number) {
    const query = 'SELECT * FROM billing WHERE id = ?;';
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateBillingDto: UpdateBillingDto) {
    const {
      amount,
      billing_date,
      due_date,
      payment_status,
      treatment_history_id,
      patient_id,
    } = updateBillingDto;
    const query = `
      UPDATE billing
      SET amount = ?, billing_date = ?, due_date = ?, payment_status = ?, treatment_history_id = ?, patient_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      amount,
      billing_date,
      due_date,
      payment_status,
      treatment_history_id,
      patient_id,
      id,
    ]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM billing WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Billing deleted successfully', id };
  }
}
