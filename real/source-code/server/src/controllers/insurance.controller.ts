import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateInsuranceDto } from 'src/dtos/insurance/create-insurance.dto';
import { UpdateInsuranceDto } from 'src/dtos/insurance/update-insurance.dto';
import { InsuranceService } from 'src/services/insurance.service';

@ApiTags('insurance')
@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new insurance record' })
  @ApiBody({ type: CreateInsuranceDto })
  @ApiResponse({ status: 201, description: 'Insurance created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insuranceService.create(createInsuranceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all insurance records' })
  @ApiResponse({
    status: 200,
    description: 'All insurance records retrieved.',
    type: [CreateInsuranceDto],
  })
  findAll() {
    return this.insuranceService.findAll();
  }

  @Get(':patientId')
  @ApiOperation({ summary: 'Retrieve an insurance record by ID' })
  @ApiParam({
    name: 'patientId',
    type: 'integer',
    description: 'ID of the patient record to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Insurance record found.' })
  @ApiResponse({ status: 404, description: 'Insurance record not found.' })
  findOne(@Param('patientId') id: string) {
    return this.insuranceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an insurance record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the insurance record to update',
  })
  @ApiBody({ type: UpdateInsuranceDto })
  @ApiResponse({ status: 200, description: 'Insurance updated successfully.' })
  @ApiResponse({ status: 404, description: 'Insurance record not found.' })
  update(
    @Param('id') id: string,
    @Body() updateInsuranceDto: UpdateInsuranceDto,
  ) {
    return this.insuranceService.update(+id, updateInsuranceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an insurance record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the insurance record to delete',
  })
  @ApiResponse({ status: 200, description: 'Insurance deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Insurance record not found.' })
  remove(@Param('id') id: string) {
    return this.insuranceService.remove(+id);
  }
}
