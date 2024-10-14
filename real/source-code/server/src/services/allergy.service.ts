import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAllergyDto } from 'src/dtos/allergy/create-allergy.dto';
import { UpdateAllergyDto } from 'src/dtos/allergy/update-allergy.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AllergyService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  async create(createAllergyDto: CreateAllergyDto) {
    const { allergen, symptoms, category } = createAllergyDto;
    const query = `INSERT INTO allergy (allergen, symptoms, category) VALUES (?, ?, ?);`;
    await this.entityManager.query(query, [allergen, symptoms, category]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [insertResult] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(insertResult.id);
  }

  async update(id: number, updateAllergyDto: UpdateAllergyDto) {
    // Deconstructing all possible fields from DTO
    const { allergen, symptoms, category } = updateAllergyDto;

    // Update query with placeholders for all fields
    const query = `
      UPDATE allergy
      SET allergen = ?, symptoms = ?, category = ?
      WHERE id = ?;
    `;

    // Array of parameters to replace placeholders in the query
    const params = [
      allergen, // Value for allergen
      symptoms, // Value for symptoms
      category, // Value for category
      id, // Condition to specify which record to update
    ];

    // Executing the update query
    await this.entityManager.query(query, params);

    // Returning the updated allergy record
    return this.findOne(id);
  }
  async findAll() {
    const query = `SELECT * FROM allergy;`;
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = `SELECT * FROM allergy WHERE id = ?;`;
    const allergy = await this.entityManager.query(query, [id]);
    if (!allergy) {
      throw new NotFoundException('Allergy not found');
    }
    return allergy;
  }

  async remove(id: number) {
    const query = `DELETE FROM allergy WHERE id = ?;`;
    await this.entityManager.query(query, [id]);
    return { deleted: true, id };
  }
  async findAllPatient(id: number, page: number, count: number) {
    const allergy = await this.findOne(id);
    const offset = (page - 1) * count;
    const query = `
      SELECT p.*
      FROM patient p
      JOIN patient_allergy pa ON p.id = pa.patient_id
      WHERE pa.allergy_id = ?
      LIMIT ? OFFSET ? ;
    `;

    // Execute the query and return the result
    const patients = await this.entityManager.query(query, [id, count, offset]);

    // Return the allergy with its associated patients
    return { allergy, patients };
  }
}
