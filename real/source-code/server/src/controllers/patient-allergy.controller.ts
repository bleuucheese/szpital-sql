import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientAllergyService } from '../services/patient-allergy.service';
import { CreatePatientAllergyDto } from '../dtos/patient-allergy/create-patient-allergy.dto';
import { UpdatePatientAllergyDto } from '../dtos/patient-allergy/update-patient-allergy.dto';

@Controller('patient-allergy')
export class PatientAllergyController {
  constructor(private readonly patientAllergyService: PatientAllergyService) { }

  @Post()
  create(@Body() createPatientAllergyDto: CreatePatientAllergyDto) {
    return this.patientAllergyService.create(createPatientAllergyDto);
  }

  @Get()
  findAll() {
    return this.patientAllergyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientAllergyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientAllergyDto: UpdatePatientAllergyDto) {
    return this.patientAllergyService.update(+id, updatePatientAllergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientAllergyService.remove(+id);
  }
  @Delete()
  delete(@Query('patient_id') patient_id: string, @Query('allergy_id') allergy_id: string) {
    return this.patientAllergyService.delete(+patient_id, +allergy_id);
  }
}
