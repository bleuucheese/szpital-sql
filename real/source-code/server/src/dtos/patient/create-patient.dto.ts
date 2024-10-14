import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePatientDto {
    @ApiProperty({
        description: 'First name of the patient',
        example: 'John'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: 'Last name of the patient',
        example: 'Doe'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        description: 'Date of birth of the patient',
        example: '1985-05-20',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    dob: Date;

    @ApiProperty({
        description: 'Gender of the patient',
        example: 'Male'
    })
    @IsString()
    @MaxLength(255)
    gender: string;

    @ApiProperty({
        description: 'Blood type of the patient',
        example: 'O+'
    })
    @IsString()
    @MaxLength(255)
    blood_type: string;

    @ApiProperty({
        description: 'Citizen identification number of the patient',
        example: '1234567890'
    })
    @IsString()
    @MaxLength(255)
    cid: string;
}
