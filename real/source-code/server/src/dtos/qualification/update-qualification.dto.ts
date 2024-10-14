import { PartialType } from '@nestjs/swagger';
import { CreateQualificationDto } from './create-qualification.dto';

export class UpdateQualificationDto extends PartialType(CreateQualificationDto) {}
