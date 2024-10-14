import { PartialType } from '@nestjs/swagger';
import { CreateEmploymentHistoryDto } from './create-employment-history.dto';

export class UpdateEmploymentHistoryDto extends PartialType(CreateEmploymentHistoryDto) {}
