import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/dtos/address/create-address.dto';
import { UpdateAddressDto } from 'src/dtos/address/update-address.dto';
import { AddressService } from 'src/services/address.service';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({ type: CreateAddressDto })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get address by id' })
  @ApiParam({ name: 'id', description: 'The ID of the address', type: String })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }
  @Get('/patient/:patientId')
  @ApiOperation({ summary: 'Get address by patient ID' })
  @ApiParam({ name: 'id', description: 'The ID of the patient', type: String })
  findByPatient(@Param('patientId') patientId: string) {
    return this.addressService.findByPatient(+patientId);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update address by id' })
  @ApiParam({ name: 'id', description: 'The ID of the address', type: String })
  @ApiBody({ type: UpdateAddressDto })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete address by id' })
  @ApiParam({ name: 'id', description: 'The ID of the address', type: String })
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
