import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from 'src/controllers/appointment.controller';
import { Appointment } from 'src/entities/appointment.entity';
import { Patient } from 'src/entities/patient.entity';
import { Staff } from 'src/entities/staff.entity';
import { AppointmentNote, AppointmentNoteSchema } from 'src/schemas/apointment-note.schema';
import { AppointmentService } from 'src/services/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Staff]), MongooseModule.forFeature([{ name: AppointmentNote.name, schema: AppointmentNoteSchema }])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule { }
