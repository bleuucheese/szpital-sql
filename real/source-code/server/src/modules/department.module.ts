import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from 'src/controllers/department.controller';
import { Department } from 'src/entities/department.entity';
import { EmploymentHistory } from 'src/entities/employment-history.entity';
import { DepartmentService } from 'src/services/department.service';


@Module({
  imports: [TypeOrmModule.forFeature([Department, EmploymentHistory])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule { }
