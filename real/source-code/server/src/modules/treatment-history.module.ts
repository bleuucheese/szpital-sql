import { Module } from '@nestjs/common';
import { TreatmentHistoryService } from '../services/treatment-history.service';
import { TreatmentHistoryController } from '../controllers/treatment-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentHistory } from '../entities/treatment-history.entity';
import { Patient } from 'src/entities/patient.entity';
import { Procedure } from 'src/entities/procedure.entity';
import { Admission } from 'src/entities/admission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentHistory, Admission, Patient, Procedure])],
  controllers: [TreatmentHistoryController],
  providers: [TreatmentHistoryService],
})
export class TreatmentHistoryModule { }
