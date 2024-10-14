import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateInsuranceDto {
    @ApiProperty({
        description: 'The expiration date of the insurance',
        example: '2025-12-31',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    @IsNotEmpty()
    expired_date: Date;

    @ApiProperty({
        description: 'The ID of the patient associated with this insurance',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    patient_id: number;
}
