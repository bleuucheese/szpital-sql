import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePatientAllergyDto {
    @ApiProperty({
        description: 'ID of the patient',
        example: 1,
        type: 'integer'
    })
    @IsInt()
    @IsNotEmpty()
    patient_id: number;

    @ApiProperty({
        description: 'ID of the allergy',
        example: 2,
        type: 'integer'
    })
    @IsInt()
    @IsNotEmpty()
    allergy_id: number;

    @ApiProperty({
        description: 'Severity of the allergy',
        example: 'High',
        maxLength: 255
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    severity: string;
}
