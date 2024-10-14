import { PartialType } from '@nestjs/swagger';
import { CreateTreatmentHistoryDto } from './create-treatment-history.dto';

export class UpdateTreatmentHistoryDto extends PartialType(CreateTreatmentHistoryDto) {}
