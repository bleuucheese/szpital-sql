import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcedureService } from '../services/procedure.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProcedureDto } from 'src/dtos/procedure/create-procedure.dto';
import { UpdateProcedureDto } from 'src/dtos/procedure/update-procedure.dto';

@ApiTags('procedure')
@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new medical procedure' })
  @ApiBody({ type: CreateProcedureDto })
  @ApiResponse({ status: 201, description: 'Procedure created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.procedureService.create(createProcedureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all medical procedures' })
  @ApiResponse({ status: 200, description: 'All procedures retrieved.', type: [CreateProcedureDto] })
  findAll() {
    return this.procedureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a medical procedure by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the procedure to retrieve' })
  @ApiResponse({ status: 200, description: 'Procedure found.' })
  @ApiResponse({ status: 404, description: 'Procedure not found.' })
  findOne(@Param('id') id: string) {
    return this.procedureService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a medical procedure' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the procedure to update' })
  @ApiBody({ type: UpdateProcedureDto })
  @ApiResponse({ status: 200, description: 'Procedure updated successfully.' })
  @ApiResponse({ status: 404, description: 'Procedure not found.' })
  update(@Param('id') id: string, @Body() updateProcedureDto: UpdateProcedureDto) {
    return this.procedureService.update(+id, updateProcedureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medical procedure' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the procedure to delete' })
  @ApiResponse({ status: 200, description: 'Procedure deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Procedure not found.' })
  remove(@Param('id') id: string) {
    return this.procedureService.remove(+id);
  }
}
