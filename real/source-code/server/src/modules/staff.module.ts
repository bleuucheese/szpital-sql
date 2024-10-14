import { Module } from '@nestjs/common';
import { StaffService } from '../services/staff.service';
import { StaffController } from '../controllers/staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Qualification } from 'src/entities/qualification.entity';
import { Shift } from 'src/entities/shift.entity';
import { Procedure } from 'src/entities/procedure.entity';
import { Department } from 'src/entities/department.entity';
import { Appointment } from 'src/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Qualification, Shift, Department, Procedure, Appointment])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule { }
