import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateMedicineDto } from 'src/dtos/medicine/create-medicine.dto';
import { UpdateMedicineDto } from 'src/dtos/medicine/update-medicine.dto';
import { MedicineService } from 'src/services/medicine.service';

@ApiTags('medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new medicine record' })
  @ApiBody({ type: CreateMedicineDto })
  @ApiResponse({ status: 201, description: 'Medicine created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all medicines' })
  @ApiResponse({ status: 200, description: 'All medicines retrieved.', type: [CreateMedicineDto] })
  findAll() {
    return this.medicineService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a medicine record by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the medicine to retrieve' })
  @ApiResponse({ status: 200, description: 'Medicine found.' })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a medicine record' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the medicine to update' })
  @ApiBody({ type: UpdateMedicineDto })
  @ApiResponse({ status: 200, description: 'Medicine updated successfully.' })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medicine record' })
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the medicine to delete' })
  @ApiResponse({ status: 200, description: 'Medicine deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Medicine not found.' })
  remove(@Param('id') id: string) {
    return this.medicineService.remove(+id);
  }
}
