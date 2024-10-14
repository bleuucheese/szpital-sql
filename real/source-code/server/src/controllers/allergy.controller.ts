import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAllergyDto } from 'src/dtos/allergy/create-allergy.dto';
import { UpdateAllergyDto } from 'src/dtos/allergy/update-allergy.dto';
import { AllergyService } from 'src/services/allergy.service';

@ApiTags('Allergies')
@Controller('allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new allergy' })
  @ApiBody({ type: CreateAllergyDto })
  create(@Body() createAllergyDto: CreateAllergyDto) {
    return this.allergyService.create(createAllergyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all allergies' })
  findAll() {
    return this.allergyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an allergy by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the allergy',
    type: 'integer',
  })
  findOne(@Param('id') id: string) {
    return this.allergyService.findOne(+id);
  }
  @Get(':id/patients')
  @ApiOperation({ summary: 'Get all patients by allergy ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the allergy',
    type: 'integer',
  })
  findAllPatient(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('count') count: string = '5',
  ) {
    return this.allergyService.findAllPatient(+id, +page, +count);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an allergy by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the allergy to delete',
    type: 'integer',
  })
  remove(@Param('id') id: string) {
    return this.allergyService.remove(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an allergy by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the allergy',
    type: 'integer',
  })
  @ApiBody({ type: UpdateAllergyDto })
  update(@Param('id') id: string, @Body() updateAllergyDto: UpdateAllergyDto) {
    return this.allergyService.update(+id, updateAllergyDto);
  }
}
