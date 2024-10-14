import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dtos/staff/create-staff.dto';
import { UpdateStaffDto } from '../dtos/staff/update-staff.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new staff member' })
  @ApiBody({ type: CreateStaffDto })
  @ApiResponse({ status: 201, description: 'Staff member created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all staff members' })
  @ApiResponse({ status: 200, description: 'All staff members retrieved successfully.', type: [CreateStaffDto] })
  findAll(@Query('page') page: string = '1',
    @Query('count') count: string = '5', @Query('query') query: string = '', @Query('department') department: string = '', @Query('sort') sort: string = 'FA') {
    return this.staffService.findAll(+page, +count, query, department, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a staff member by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the staff member to retrieve' })
  @ApiResponse({ status: 200, description: 'Staff member found.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }
  @Get('shift/all')
  @ApiOperation({ summary: 'Retrieve all staffs with shifts' })
  @ApiResponse({ status: 200, description: 'Staff member found.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  findWithShift(@Query('page') page: string = '1',
    @Query('count') count: string = '5',
    @Query('searchQuery') searchQuery: string = '',
    @Query('dayOfWeek') dayOfWeek: string = 'MON',
    @Query('startTime') startTime: string = "00:00:00",
    @Query('endTime') endTime: string = "23:59:59") {
    return this.staffService.findAllStaffWithShift(
      +page,
      +count,
      searchQuery,
      dayOfWeek,
      startTime,
      endTime
    );
  }
  @Get('appointment/all-staff')
  @ApiOperation({ summary: 'Retrieve all staffs with shifts' })
  @ApiResponse({ status: 200, description: 'Staff member found.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  getAllStaff() {
    return this.staffService.getAllStaffNoPagination(

    );
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update a staff member' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the staff member to update' })
  @ApiBody({ type: UpdateStaffDto })
  @ApiResponse({ status: 200, description: 'Staff member updated successfully.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff member' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the staff member to delete' })
  @ApiResponse({ status: 200, description: 'Staff member deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
