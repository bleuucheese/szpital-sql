import { PartialType } from '@nestjs/swagger';
import { CreatePatientAllergyDto } from './create-patient-allergy.dto';

export class UpdatePatientAllergyDto extends PartialType(CreatePatientAllergyDto) {}
