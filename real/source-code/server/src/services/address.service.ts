import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/dtos/address/create-address.dto';
import { UpdateAddressDto } from 'src/dtos/address/update-address.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  async create(createAddressDto: CreateAddressDto) {
    const { city, district, ward, address_line, patient_id } = createAddressDto;
    const insertQuery = `
      INSERT INTO address (city, district, ward, address_line, patient_id)
      VALUES (?, ?, ?, ?, ?);
    `;
    await this.entityManager.query(insertQuery, [
      city,
      district,
      ward,
      address_line,
      patient_id,
    ]);

    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const result = await this.entityManager.query(lastInsertIdQuery);
    const { id } = result[0]; // Ensure the id is correctly extracted

    return this.findOne(id);
  }

  async findAll() {
    const query = `SELECT * FROM address;`;
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = `SELECT * FROM address WHERE id = ?;`;
    const addresses = await this.entityManager.query(query, [id]);
    if (!addresses.length) {
      throw new NotFoundException('address not found');
    }
    return addresses[0];
  }
  async findByPatient(patientId: number) {
    const query = `SELECT * FROM address WHERE patient_id = ?;`;
    const addresses = await this.entityManager.query(query, [patientId]);
    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('No addresses found for this patient');
    }
    return addresses[0];
  }
  async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id);
    const { city, district, ward, address_line } = updateAddressDto;
    const updateQuery = `
      UPDATE address
      SET city = ?, district = ?, ward = ?, address_line = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(updateQuery, [
      city,
      district,
      ward,
      address_line,
      id,
    ]);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    const findQuery = `SELECT * FROM address WHERE id = ?;`;
    const deletedAddress = await this.entityManager.query(findQuery, [id]);
    const deleteQuery = `DELETE FROM address WHERE id = ?;`;
    await this.entityManager.query(deleteQuery, [id]);
    return deletedAddress;
  }
}
