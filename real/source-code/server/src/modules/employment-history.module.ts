import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentHistoryController } from 'src/controllers/employment-history.controller';
import { Department } from 'src/entities/department.entity';
import { EmploymentHistory } from 'src/entities/employment-history.entity';
import { Staff } from 'src/entities/staff.entity';
import { EmploymentHistoryService } from 'src/services/employment-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentHistory, Staff, Department])],
  controllers: [EmploymentHistoryController],
  providers: [EmploymentHistoryService],
})
export class EmploymentHistoryModule { }
