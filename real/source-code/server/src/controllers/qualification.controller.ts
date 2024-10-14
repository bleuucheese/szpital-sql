import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { QualificationService } from '../services/qualification.service';
import { CreateQualificationDto } from '../dtos/qualification/create-qualification.dto';
import { UpdateQualificationDto } from '../dtos/qualification/update-qualification.dto';

@ApiTags('qualification')
@Controller('qualification')
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a qualification' })
  @ApiResponse({ status: 201, description: 'Qualification created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateQualificationDto })
  create(@Body() createQualificationDto: CreateQualificationDto) {
    return this.qualificationService.create(createQualificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all qualifications' })
  @ApiResponse({ status: 200, description: 'All qualifications retrieved successfully.' })
  findAll() {
    return this.qualificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single qualification' })
  @ApiResponse({ status: 200, description: 'Qualification retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Qualification not found.' })
  @ApiParam({ name: 'id', description: 'Qualification ID' })
  findOne(@Param('id') id: string) {
    return this.qualificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a qualification' })
  @ApiResponse({ status: 200, description: 'Qualification updated successfully.' })
  @ApiResponse({ status: 404, description: 'Qualification not found.' })
  @ApiBody({ type: UpdateQualificationDto })
  @ApiParam({ name: 'id', description: 'Qualification ID' })
  update(@Param('id') id: string, @Body() updateQualificationDto: UpdateQualificationDto) {
    return this.qualificationService.update(+id, updateQualificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a qualification' })
  @ApiResponse({ status: 200, description: 'Qualification deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Qualification not found.' })
  @ApiParam({ name: 'id', description: 'Qualification ID' })
  remove(@Param('id') id: string) {
    return this.qualificationService.remove(+id);
  }
}
