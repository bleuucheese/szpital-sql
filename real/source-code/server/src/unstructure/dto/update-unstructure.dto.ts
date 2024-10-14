import { PartialType } from '@nestjs/swagger';
import { CreateUnstructureDto } from './create-unstructure.dto';

export class UpdateUnstructureDto extends PartialType(CreateUnstructureDto) {}
