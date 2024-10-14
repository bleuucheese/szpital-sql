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
  ApiQuery,
} from '@nestjs/swagger';
import { CreateAppointmentDto } from 'src/dtos/appointment/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/dtos/appointment/update-appointment.dto';
import { AppointmentService } from 'src/services/appointment.service';

@ApiTags('appointments')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }
  @Post('check-shifts')
  @ApiOperation({ summary: 'Check if an appointment is available ' })
  @ApiResponse({
    status: 200,
    description: 'Check Done.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  checkAvailabilityForShift(@Body() data: {
    staff_id: number;
    date: Date;
    start_time: string;
    end_time: string;
  }) {
    return this.appointmentService.checkAvailabilityOfShift(data);
  }
  @Post('check-appointments')
  @ApiOperation({ summary: 'Check if an appointment is available ' })
  @ApiResponse({
    status: 200,
    description: 'Check Done.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  checkAvailabilityAppointment(@Body() data: {
    staff_id: number;
    date: Date;
    start_time: string;
    end_time: string;
  }) {
    return this.appointmentService.checkAvailabilityOfAppointment(data);
  }
  @Get()
  @ApiOperation({ summary: 'Retrieve all appointments' })
  @ApiResponse({
    status: 200,
    description: 'All appointments returned.',
    type: [CreateAppointmentDto],
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('count') count: string = '5',
    @Query('query') query: string = '',
  ) {
    return this.appointmentService.findAll(+page, +count, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an appointment by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The ID of the appointment to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Appointment found.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The ID of the appointment to update',
  })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  update(
    @Param('id') id: string,
  ) {
    return this.appointmentService.cancel(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment by ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The ID of the appointment to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
  // New method for getting appointments by patient name
  @Get('patient')
  @ApiOperation({ summary: 'Retrieve appointments by patient name' })
  @ApiQuery({
    name: 'name',
    type: 'string',
    description: 'The name of the patient to retrieve appointments for',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointments found.',
  })
  @ApiResponse({ status: 404, description: 'No appointments found for the given patient.' })
  findByPatientName(@Query('name') name: string) {
    return this.appointmentService.findByPatientName(name);
  }
}
