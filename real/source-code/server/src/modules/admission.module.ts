import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionController } from 'src/controllers/admission.controller';
import { Admission } from 'src/entities/admission.entity';
import { TreatmentHistory } from 'src/entities/treatment-history.entity';
import { AdmissionService } from 'src/services/admission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admission, TreatmentHistory])],
  controllers: [AdmissionController],
  providers: [AdmissionService],
})
export class AdmissionModule { }
