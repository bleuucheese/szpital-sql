import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreatmentHistoryService } from '../services/treatment-history.service';
import { CreateTreatmentHistoryDto } from '../dtos/treatment-history/create-treatment-history.dto';
import { UpdateTreatmentHistoryDto } from '../dtos/treatment-history/update-treatment-history.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('treatment-history')
@Controller('treatment-history')
export class TreatmentHistoryController {
  constructor(private readonly treatmentHistoryService: TreatmentHistoryService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new treatment history' })
  @ApiBody({ type: CreateTreatmentHistoryDto })
  @ApiResponse({ status: 201, description: 'Treatment history created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createTreatmentHistoryDto: CreateTreatmentHistoryDto) {
    return this.treatmentHistoryService.create(createTreatmentHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all treatment histories' })
  @ApiResponse({ status: 200, description: 'All treatment histories retrieved.', type: [CreateTreatmentHistoryDto] })
  findAll() {
    return this.treatmentHistoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a treatment history by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the treatment history to retrieve' })
  @ApiResponse({ status: 200, description: 'Treatment history found.' })
  @ApiResponse({ status: 404, description: 'Treatment history not found.' })
  findOne(@Param('id') id: string) {
    return this.treatmentHistoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a treatment history' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the treatment history to update' })
  @ApiBody({ type: UpdateTreatmentHistoryDto })
  @ApiResponse({ status: 200, description: 'Treatment history updated successfully.' })
  @ApiResponse({ status: 404, description: 'Treatment history not found.' })
  update(@Param('id') id: string, @Body() updateTreatmentHistoryDto: UpdateTreatmentHistoryDto) {
    return this.treatmentHistoryService.update(+id, updateTreatmentHistoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a treatment history' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the treatment history to delete' })
  @ApiResponse({ status: 200, description: 'Treatment history deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Treatment history not found.' })
  remove(@Param('id') id: string) {
    return this.treatmentHistoryService.remove(+id);
  }
}
