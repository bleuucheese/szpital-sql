import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentHistory } from 'src/entities/treatment-history.entity';
import { Patient } from 'src/entities/patient.entity';
import { Billing } from 'src/entities/billing.entity';
import { BillingController } from 'src/controllers/billing.controller';
import { BillingService } from 'src/services/billing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, TreatmentHistory, Patient])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule { }
