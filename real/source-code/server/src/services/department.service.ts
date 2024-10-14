import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateDepartmentDto } from 'src/dtos/department/create-department.dto';
import { UpdateDepartmentDto } from 'src/dtos/department/update-department.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { name, manager_id } = createDepartmentDto;
    const query = `
      INSERT INTO department (name, manager_id)
      VALUES (?, ?);
    `;
    await this.entityManager.query(query, [name, manager_id]);
    const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as id;';
    const [result] = await this.entityManager.query(lastInsertIdQuery);
    return this.findOne(result.id);
  }

  async findAll() {
    const query = 'SELECT * FROM department;';
    return await this.entityManager.query(query);
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM department WHERE id = ?;';
    const department = await this.entityManager.query(query, [id]);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found.`);
    }
    return department;
  }
  async findAllStaff(departmentId: number, page: number, count: number) {
    const dept = await this.findOne(departmentId);
    const offset = (page - 1) * count;
    const query = `SELECT * FROM staff WHERE department_id = ? LIMIT ? OFFSET ?`;
    const staffs = await this.entityManager.query(query, [
      departmentId,
      count,
      offset,
    ]);
    return { dept, staffs };
  }
  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { name, manager_id } = updateDepartmentDto;
    const query = `
      UPDATE department
      SET name = ?, manager_id = ?
      WHERE id = ?;
    `;
    await this.entityManager.query(query, [name, manager_id, id]);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteQuery = 'DELETE FROM department WHERE id = ?;';
    await this.entityManager.query(deleteQuery, [id]);
    return { message: 'Department deleted successfully', id };
  }
}
