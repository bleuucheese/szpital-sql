import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from "class-validator";

export class CreateAdmissionDto {
    @ApiProperty({ description: 'The current status of the admission', example: 'admitted' })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    status: string;

    @ApiProperty({ description: 'The date the patient was admitted', example: '2024-08-01', type: 'string', format: 'date' })
    @IsDateString()
    admitted_date: Date;

    @ApiProperty({ description: 'The date the patient was discharged', example: '2024-08-10', type: 'string', format: 'date' })
    @IsDateString()
    @IsOptional()
    discharged_date: Date;

    @ApiProperty({ description: 'Type of room assigned to the patient', example: 'standard' })
    @IsString()
    @MaxLength(255)
    room_type: string;

    @ApiProperty({ description: 'The price for the admission', example: 1200.50 })
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'The treatment history ID associated with the admission', example: 1 })
    @IsNotEmpty()
    treatment_history_id: number;

}
