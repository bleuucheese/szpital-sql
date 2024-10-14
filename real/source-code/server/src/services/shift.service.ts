import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateShiftDto } from '../dtos/shift/create-shift.dto';
import { UpdateShiftDto } from '../dtos/shift/update-shift.dto';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class ShiftService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async create(createShiftDto: CreateShiftDto) {
    const { day_of_week, start_hour, end_hour } = createShiftDto;
    const query = `
      INSERT INTO shift (day_of_week, start_hour, end_hour)
      VALUES (?, ?, ?);
    `;
    await this.entityManager.query(query, [day_of_week, start_hour, end_hour]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = 'SELECT * FROM shift;';
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM shift WHERE id = ?;';
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateShiftDto: UpdateShiftDto) {
    const { day_of_week, start_hour, end_hour } = updateShiftDto;
    const query = `
      UPDATE shift
      SET day_of_week = ?, start_hour = ?, end_hour = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [
      day_of_week,
      start_hour,
      end_hour,
      id,
    ]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM shift WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Shift deleted successfully', id };
  }
}
