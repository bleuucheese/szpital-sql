import { Module } from '@nestjs/common';
import { ProcedureService } from '../services/procedure.service';
import { ProcedureController } from '../controllers/procedure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from '../entities/procedure.entity';
import { Staff } from 'src/entities/staff.entity';
import { TreatmentHistory } from 'src/entities/treatment-history.entity';
import { Medicine } from 'src/entities/medicine.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Procedure, Medicine, Staff, TreatmentHistory]),],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule { }
