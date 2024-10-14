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

import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAdmissionDto } from 'src/dtos/admission/create-admission.dto';
import { UpdateAdmissionDto } from 'src/dtos/admission/update-admission.dto';
import { AdmissionService } from 'src/services/admission.service';

@ApiTags('Admissions')
@Controller('admission')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admission' })
  @ApiBody({ type: CreateAdmissionDto })
  create(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionService.create(createAdmissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admissions' })
  findAll(
    @Query('page') page: string = '1',
    @Query('count') count: string = '5',
  ) {
    return this.admissionService.findAll(+page, +count);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an admission by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the admission',
    type: 'integer',
  })
  findOne(@Param('id') id: string) {
    return this.admissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an admission by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the admission to update',
    type: 'integer',
  })
  @ApiBody({ type: UpdateAdmissionDto })
  update(
    @Param('id') id: string,
    @Body() updateAdmissionDto: UpdateAdmissionDto,
  ) {
    return this.admissionService.update(+id, updateAdmissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admission by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the admission to delete',
    type: 'integer',
  })
  remove(@Param('id') id: string) {
    return this.admissionService.remove(+id);
  }
}
