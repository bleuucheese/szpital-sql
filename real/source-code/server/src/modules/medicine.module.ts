import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineController } from 'src/controllers/medicine.controller';
import { Medicine } from 'src/entities/medicine.entity';
import { Procedure } from 'src/entities/procedure.entity';
import { MedicineService } from 'src/services/medicine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Procedure])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule { }
