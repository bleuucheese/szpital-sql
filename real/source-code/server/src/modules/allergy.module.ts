import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergyController } from 'src/controllers/allergy.controller';
import { Allergy } from 'src/entities/allergy.entity';
import { PatientAllergy } from 'src/entities/patient-allergy.entity';
import { AllergyService } from 'src/services/allergy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Allergy, PatientAllergy])],
  controllers: [AllergyController],
  providers: [AllergyService],
})
export class AllergyModule { }
