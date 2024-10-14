import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DoctorNote } from 'src/schemas/doctor-note.schema';
import { Model } from 'mongoose';
import { CreateDoctorNoteDto } from 'src/dtos/doctor-note/create-doctor-note.dto';
import { LabResult } from 'src/schemas/lab-result.schema';
import { CreateLabResultDto } from 'src/dtos/lab-result/create-lab-result.dto';
import { CreateDiagnosticDto } from 'src/dtos/diagnostic/create-diagnostic';
import { DiagnosticImage } from 'src/schemas/diagnostic-image.schema';
import { CreateCertificateDTO } from 'src/dtos/certificate/create-certificate';
import { StaffCertificate } from 'src/schemas/staff-certificate.schema';

@Injectable()
export class UnstructureService {
  constructor(@InjectModel(DoctorNote.name) private doctorNoteModel: Model<DoctorNote>, @InjectModel(LabResult.name) private labResultModel: Model<LabResult>, @InjectModel(DiagnosticImage.name) private diagnosticImageModel: Model<DiagnosticImage>, @InjectModel(StaffCertificate.name) private staffCertiModel: Model<StaffCertificate>) { }
  async createDoctorNote(createDoctorNoteDto: CreateDoctorNoteDto) {
    const createdDoctorNote = new this.doctorNoteModel(createDoctorNoteDto);
    return createdDoctorNote.save();
  }
  async findAllDoctorNotesByProcedureId(procedure_id: number): Promise<DoctorNote[]> {
    return this.doctorNoteModel.find({ procedure_id: procedure_id }).exec();
  }
  async createLabResult(createLabResultDto: CreateLabResultDto) {
    const createdLabResult = new this.labResultModel(createLabResultDto);
    return createdLabResult.save();
  }
  async findAllLabResultsByProcedureId(procedure_id: number): Promise<LabResult[]> {
    return this.labResultModel.find({ procedure_id: procedure_id }).exec();
  }
  async createDiagnostic(createDiagnosticDto: CreateDiagnosticDto) {
    const createdDiagnostic = new this.diagnosticImageModel(createDiagnosticDto);
    return createdDiagnostic.save();
  }
  async findAllDiagnosticsByProcedureId(procedure_id: number): Promise<DiagnosticImage[]> {
    return this.diagnosticImageModel.find({ procedure_id: procedure_id }).exec();
  }
  async createCerti(createCertiDto: CreateCertificateDTO) {
    const createdCerti = new this.staffCertiModel(createCertiDto)
    return createdCerti.save()
  }
  async findAllCertiByStaffId(staff_id: number): Promise<StaffCertificate[]> {
    return this.staffCertiModel.find({ staff_id: staff_id }).exec()
  }
}
