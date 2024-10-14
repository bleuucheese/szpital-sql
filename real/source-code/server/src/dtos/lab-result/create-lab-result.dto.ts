import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLabResultDto {
    @ApiProperty({
        description: 'The ID of the procedure associated with the lab result',
        example: 123,
        type: 'integer'
    })
    @IsNumber()
    @IsNotEmpty()
    procedure_id: number;

    @ApiProperty({
        description: 'Type of lab test performed',
        example: 'Blood Test',
        type: 'string',
        required: false // This is optional as the Prop decorator did not specify required: true
    })
    @IsString()
    @IsOptional()
    lab_type?: string;

    @ApiProperty({
        description: 'Description of the lab result',
        example: 'Results indicate normal white blood cell count.',
        type: 'string',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Date the lab results were recorded',
        example: '2024-08-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;
}
