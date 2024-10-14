import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateBillingDto } from 'src/dtos/billing/create-billing.dto';
import { UpdateBillingDto } from 'src/dtos/billing/update-billing.dto';
import { BillingService } from 'src/services/billing.service';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new billing record' })
  @ApiBody({ type: CreateBillingDto })
  @ApiResponse({
    status: 201,
    description: 'Billing record created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all billing records' })
  @ApiResponse({
    status: 200,
    description: 'All billing records retrieved.',
    type: [CreateBillingDto],
  })
  findAll() {
    return this.billingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a billing record by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the billing record to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Billing record found.' })
  @ApiResponse({ status: 404, description: 'Billing record not found.' })
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a billing record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the billing record to update',
  })
  @ApiBody({ type: UpdateBillingDto })
  @ApiResponse({
    status: 200,
    description: 'Billing record updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Billing record not found.' })
  update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(+id, updateBillingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a billing record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the billing record to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Billing record deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Billing record not found.' })
  remove(@Param('id') id: string) {
    return this.billingService.remove(+id);
  }
}
