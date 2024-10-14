import { Module } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientController } from '../controllers/patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { TreatmentHistory } from 'src/entities/treatment-history.entity';
import { PatientAllergy } from 'src/entities/patient-allergy.entity';
import { Billing } from 'src/entities/billing.entity';
import { Appointment } from 'src/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, TreatmentHistory, Billing, PatientAllergy, Appointment])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule { }
