import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreatePatientDto } from 'src/dtos/patient/create-patient.dto';
import { UpdatePatientDto } from 'src/dtos/patient/update-patient.dto';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiBody({ type: CreatePatientDto })
  @ApiResponse({ status: 201, description: 'Patient created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all patients' })
  @ApiResponse({
    status: 200,
    description: 'All patients retrieved.',
    type: [CreatePatientDto],
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('count') count: string = '5',
    @Query('query') query: string = ''
  ) {
    return this.patientService.findAll(+page, +count, query);
  }
  @Get('appointment/all-patients')
  @ApiOperation({ summary: 'Retrieve all patient without pagination' })
  getAllPatient() {
    return this.patientService.getAllPatientNoPagination();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a patient by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the patient to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Patient found.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the patient to update',
  })
  @ApiBody({ type: UpdatePatientDto })
  @ApiResponse({ status: 200, description: 'Patient updated successfully.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the patient to delete',
  })
  @ApiResponse({ status: 200, description: 'Patient deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
