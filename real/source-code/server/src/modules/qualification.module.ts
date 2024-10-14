import { Module } from '@nestjs/common';
import { QualificationService } from '../services/qualification.service';
import { QualificationController } from '../controllers/qualification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qualification } from '../entities/qualification.entity';
import { Staff } from 'src/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qualification, Staff])],
  controllers: [QualificationController],
  providers: [QualificationService],
})
export class QualificationModule { }
