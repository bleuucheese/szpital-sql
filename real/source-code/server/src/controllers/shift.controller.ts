import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftService } from '../services/shift.service';
import { CreateShiftDto } from '../dtos/shift/create-shift.dto';
import { UpdateShiftDto } from '../dtos/shift/update-shift.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('shift')
@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new shift' })
  @ApiBody({ type: CreateShiftDto })
  @ApiResponse({ status: 201, description: 'Shift created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all shifts' })
  @ApiResponse({ status: 200, description: 'All shifts retrieved successfully.', type: [CreateShiftDto] })
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a shift by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the shift to retrieve' })
  @ApiResponse({ status: 200, description: 'Shift found.' })
  @ApiResponse({ status: 404, description: 'Shift not found.' })
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shift' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the shift to update' })
  @ApiBody({ type: UpdateShiftDto })
  @ApiResponse({ status: 200, description: 'Shift updated successfully.' })
  @ApiResponse({ status: 404, description: 'Shift not found.' })
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftService.update(+id, updateShiftDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shift' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the shift to delete' })
  @ApiResponse({ status: 200, description: 'Shift deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Shift not found.' })
  remove(@Param('id') id: string) {
    return this.shiftService.remove(+id);
  }
}
