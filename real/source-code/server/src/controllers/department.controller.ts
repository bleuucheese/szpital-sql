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

import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateDepartmentDto } from 'src/dtos/department/create-department.dto';
import { UpdateDepartmentDto } from 'src/dtos/department/update-department.dto';
import { DepartmentService } from 'src/services/department.service';

@ApiTags('departments')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Department created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all departments' })
  @ApiResponse({
    status: 200,
    description: 'All departments retrieved.',
    type: [CreateDepartmentDto],
  })
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a department by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the department to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Department found.' })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }
  @Get(':id/staffs')
  @ApiOperation({ summary: 'Retrieve all staff by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the department to retrieve',
  })
  findAllStaff(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('count') count: string = '5',
  ) {
    return this.departmentService.findAllStaff(+id, +page, +count);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update a department' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the department to update',
  })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Department updated successfully.' })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the department to delete',
  })
  @ApiResponse({ status: 200, description: 'Department deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
