import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTreatmentHistoryDto {
    @ApiProperty({
        description: 'Type of treatment provided',
        example: 'Surgical' // or 'Medical', 'Therapy', etc.
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        description: 'Disease diagnosed or condition treated',
        example: 'Appendicitis'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    disease: string;

    @ApiProperty({
        description: 'Date of the visit or treatment',
        example: '2024-08-29',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    visited_date: Date;

    @ApiProperty({
        description: 'ID of the patient this treatment history belongs to',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    patient_id: number;
}
