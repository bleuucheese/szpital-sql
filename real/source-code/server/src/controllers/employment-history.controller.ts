import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateEmploymentHistoryDto } from 'src/dtos/employment-history/create-employment-history.dto';
import { UpdateEmploymentHistoryDto } from 'src/dtos/employment-history/update-employment-history.dto';
import { EmploymentHistoryService } from 'src/services/employment-history.service';

@ApiTags('employment-history')
@Controller('employment-history')
export class EmploymentHistoryController {
  constructor(private readonly employmentHistoryService: EmploymentHistoryService) { }

  @Post()
  @ApiOperation({ summary: 'Create employment history' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateEmploymentHistoryDto })
  create(@Body() createEmploymentHistoryDto: CreateEmploymentHistoryDto) {
    return this.employmentHistoryService.create(createEmploymentHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all employment history records' })
  @ApiResponse({ status: 200, description: 'All employment history records retrieved.' })
  findAll() {
    return this.employmentHistoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single employment history record' })
  @ApiResponse({ status: 200, description: 'Record found.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @ApiParam({ name: 'id', description: 'Record ID' })
  findOne(@Param('id') id: string) {
    return this.employmentHistoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update employment history record' })
  @ApiResponse({ status: 200, description: 'Record updated successfully.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @ApiBody({ type: UpdateEmploymentHistoryDto })
  @ApiParam({ name: 'id', description: 'Record ID' })
  update(@Param('id') id: string, @Body() updateEmploymentHistoryDto: UpdateEmploymentHistoryDto) {
    return this.employmentHistoryService.update(+id, updateEmploymentHistoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employment history record' })
  @ApiResponse({ status: 200, description: 'Record deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @ApiParam({ name: 'id', description: 'Record ID' })
  remove(@Param('id') id: string) {
    return this.employmentHistoryService.remove(+id);
  }
}
