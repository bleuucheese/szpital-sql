import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UnstructureService } from './unstructure.service';
import { CreateDoctorNoteDto } from 'src/dtos/doctor-note/create-doctor-note.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateLabResultDto } from 'src/dtos/lab-result/create-lab-result.dto';
import { DoctorNote } from 'src/schemas/doctor-note.schema';
import { LabResult } from 'src/schemas/lab-result.schema';
import { CreateDiagnosticDto } from 'src/dtos/diagnostic/create-diagnostic';
import { CreateCertificateDTO } from 'src/dtos/certificate/create-certificate';


@Controller('unstructure')
export class UnstructureController {
  constructor(private readonly unstructureService: UnstructureService) { }
  @Post('/doctor-note')
  @ApiOperation({ summary: 'Create a new doctor note' })
  @ApiResponse({ status: 201, description: 'The doctor note has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateDoctorNoteDto })
  createDoctorNote(
    @Body() createDoctorNoteDto: CreateDoctorNoteDto,
  ) {
    return this.unstructureService.createDoctorNote(createDoctorNoteDto);
  }
  @Get('/doctor-note/:procedure_id')
  @ApiOperation({
    summary: 'Get all doctor notes by procedure ID',
    description: 'Retrieves all doctor notes associated with a specific procedure ID.'
  })
  @ApiParam({
    name: 'procedure_id',
    description: 'The ID of the procedure to retrieve doctor notes for',
    required: true,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all doctor notes for the specified procedure.',
    type: [DoctorNote]
  })
  @ApiResponse({
    status: 404,
    description: 'No doctor notes found for the specified procedure ID.'
  })
  findAllByProcedureId(@Param('procedure_id') procedure_id: number): Promise<DoctorNote[]> {
    return this.unstructureService.findAllDoctorNotesByProcedureId(procedure_id);
  }
  @Post('/lab-result')
  @ApiOperation({ summary: 'Create a new lab result', description: 'Stores a new lab result in the database.' })
  @ApiResponse({ status: 201, description: 'Lab result created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. The provided data did not pass validation checks.' })
  @ApiBody({ type: CreateLabResultDto, description: 'The data needed to create a new lab result.' })
  createLabResult(@Body() createLabResultDto: CreateLabResultDto) {
    return this.unstructureService.createLabResult(createLabResultDto);
  }
  @Get('/lab-result/:procedure_id')
  @ApiOperation({
    summary: 'Retrieve all lab results by procedure ID',
    description: 'Retrieves all lab results associated with a specific procedure ID.'
  })
  @ApiParam({
    name: 'procedure_id',
    description: 'The ID of the procedure to retrieve lab results for',
    required: true,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all lab results for the specified procedure.',
    type: [LabResult]
  })
  @ApiResponse({
    status: 404,
    description: 'No lab results found for the specified procedure ID.'
  })
  findAllLabResultsByProcedureId(@Param('procedure_id') procedure_id: number): Promise<LabResult[]> {
    return this.unstructureService.findAllLabResultsByProcedureId(procedure_id);
  }
  @Post('/diagnostic')
  @ApiOperation({ summary: 'Create a diagnostic', description: 'Stores a diagnostic in the database.' })
  @ApiResponse({ status: 201, description: 'Diagnostic created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. The provided data did not pass validation checks.' })
  @ApiBody({ type: CreateLabResultDto, description: 'The data needed to create a diagnostic.' })
  createDiagnostic(@Body() createDiagnosticDto: CreateDiagnosticDto) {
    return this.unstructureService.createDiagnostic(createDiagnosticDto);
  }
  @Get('/diagnostic/:procedure_id')
  @ApiOperation({
    summary: 'Retrieve all diagnostic images by procedure ID',
    description: 'Retrieves all diagnostic images associated with a specific procedure ID.'
  })
  @ApiParam({
    name: 'procedure_id',
    description: 'The ID of the procedure to retrieve diagnostic images for',
    required: true,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all diagnostic images for the specified procedure.',
    type: [LabResult]
  })
  @ApiResponse({
    status: 404,
    description: 'No diagnostic images found for the specified procedure ID.'
  })
  getAllDiagnostic(@Param('procedure_id') procedure_id: string) {
    return this.unstructureService.findAllDiagnosticsByProcedureId(+procedure_id);
  }
  @Post('/certificate')
  @ApiOperation({ summary: 'Create a certificate', description: 'Stores a certificate in the database.' })
  @ApiResponse({ status: 201, description: 'Certificate created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. The provided data did not pass validation checks.' })
  @ApiBody({ type: CreateLabResultDto, description: 'The data needed to create a certificate.' })
  createCertificate(@Body() createCertiDto: CreateCertificateDTO) {
    return this.unstructureService.createCerti(createCertiDto);
  }
  @Get('/certificate/:staff_id')
  @ApiOperation({
    summary: 'Retrieve all diagnostic images by procedure ID',
    description: 'Retrieves all diagnostic images associated with a specific procedure ID.'
  })
  @ApiParam({
    name: 'procedure_id',
    description: 'The ID of the procedure to retrieve diagnostic images for',
    required: true,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all diagnostic images for the specified procedure.',
    type: [LabResult]
  })
  @ApiResponse({
    status: 404,
    description: 'No diagnostic images found for the specified procedure ID.'
  })
  getAllCerti(@Param('staff_id') staff_id: string) {
    return this.unstructureService.findAllCertiByStaffId(+staff_id);
  }
}
