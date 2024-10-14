import { Module } from '@nestjs/common';
import { PatientAllergyController } from '../controllers/patient-allergy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientAllergy } from '../entities/patient-allergy.entity';
import { Patient } from 'src/entities/patient.entity';
import { Allergy } from 'src/entities/allergy.entity';
import { PatientAllergyService } from 'src/services/patient-allergy.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientAllergy, Patient, Allergy])],
  controllers: [PatientAllergyController],
  providers: [PatientAllergyService],
})
export class PatientAllergyModule { }
