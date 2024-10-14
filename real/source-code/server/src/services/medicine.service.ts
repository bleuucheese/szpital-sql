import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateMedicineDto } from 'src/dtos/medicine/create-medicine.dto';
import { UpdateMedicineDto } from 'src/dtos/medicine/update-medicine.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class MedicineService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }

  async create(createMedicineDto: CreateMedicineDto) {
    const { name, price, effect, side_effect } = createMedicineDto;
    const query = `
      INSERT INTO medicine (name, price, effect, side_effect)
      VALUES (?, ?, ?, ?);
    `;
    await this.entityManager.query(query, [name, price, effect, side_effect]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = 'SELECT * FROM medicine;';
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM medicine WHERE id = ?;';
    return await this.entityManager.query(query, [id]);
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const { name, price, effect, side_effect } = updateMedicineDto;
    const query = `
      UPDATE medicine
      SET name = ?, price = ?, effect = ?, side_effect = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [name, price, effect, side_effect, id]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM medicine WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Medicine deleted successfully', id };
  }
}
