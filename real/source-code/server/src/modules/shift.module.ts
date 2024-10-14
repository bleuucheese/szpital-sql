import { Module } from '@nestjs/common';
import { ShiftService } from '../services/shift.service';
import { ShiftController } from '../controllers/shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '../entities/shift.entity';
import { Staff } from 'src/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shift, Staff])],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule { }
