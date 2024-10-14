import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MySqlModule } from './databases/mysql.module';
import { TreatmentHistoryModule } from './modules/treatment-history.module';
import { PatientModule } from './modules/patient.module';
import { PatientAllergyModule } from './modules/patient-allergy.module';
import { StaffModule } from './modules/staff.module';
import { QualificationModule } from './modules/qualification.module';
import { ShiftModule } from './modules/shift.module';
import { ProcedureModule } from './modules/procedure.module';
import { AdmissionModule } from './modules/admission.module';
import { BillingModule } from './modules/billing.module';
import { AllergyModule } from './modules/allergy.module';
import { AddressModule } from './modules/address.module';
import { InsuranceModule } from './modules/insurance.module';
import { AppointmentModule } from './modules/appointment.module';
import { DepartmentModule } from './modules/department.module';
import { MedicineModule } from './modules/medicine.module';
import { EmploymentHistoryModule } from './modules/employment-history.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DataSource } from 'typeorm';
import { MongodbModule } from './databases/mongodb.module';
import { MediaModule } from './media/media.module';
import { UnstructureModule } from './unstructure/unstructure.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MySqlModule, MongodbModule, AdmissionModule, TreatmentHistoryModule, BillingModule, PatientModule, InsuranceModule, AddressModule, AllergyModule, PatientAllergyModule, AppointmentModule, StaffModule, QualificationModule, ShiftModule, DepartmentModule, EmploymentHistoryModule, ProcedureModule, MedicineModule, MediaModule, UnstructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
}
