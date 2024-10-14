import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceController } from 'src/controllers/insurance.controller';
import { Insurance } from 'src/entities/insurance.entity';
import { Patient } from 'src/entities/patient.entity';
import { InsuranceService } from 'src/services/insurance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance, Patient])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule { }
