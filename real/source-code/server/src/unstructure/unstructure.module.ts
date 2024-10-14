import { Module } from '@nestjs/common';
import { UnstructureService } from './unstructure.service';
import { UnstructureController } from './unstructure.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiagnosticImage, DiagnosticImageSchema } from 'src/schemas/diagnostic-image.schema';
import { DoctorNote, DoctorNoteSchema } from 'src/schemas/doctor-note.schema';
import { LabResult, LabResultSchema } from 'src/schemas/lab-result.schema';
import { StaffCertificate, StaffCertificateSchema } from 'src/schemas/staff-certificate.schema';
import { TrainingMaterial, TrainingMaterialSchema } from 'src/schemas/training-material.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: DoctorNote.name, schema: DoctorNoteSchema }, { name: DiagnosticImage.name, schema: DiagnosticImageSchema }, { name: LabResult.name, schema: LabResultSchema }, { name: StaffCertificate.name, schema: StaffCertificateSchema }, { name: TrainingMaterial.name, schema: TrainingMaterialSchema }])],
  controllers: [UnstructureController],
  providers: [UnstructureService],
})
export class UnstructureModule { }
