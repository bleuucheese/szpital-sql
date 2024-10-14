import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStaffDto {
    @ApiProperty({
        description: 'First name of the staff member',
        example: 'John'
    })
    @IsString()
    @MaxLength(255)
    first_name: string;

    @ApiProperty({
        description: 'Last name of the staff member',
        example: 'Doe'
    })
    @IsString()
    @MaxLength(255)
    last_name: string;

    @ApiProperty({
        description: 'Date of birth of the staff member',
        example: '1985-05-20',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    dob: Date;

    @ApiProperty({
        description: 'Job type or position of the staff member',
        example: 'Nurse'
    })
    @IsString()
    @MaxLength(255)
    job_type: string;

    @ApiProperty({
        description: 'Salary of the staff member',
        example: 50000.00,
        type: 'float'
    })
    @IsNumber()
    salary: number;

    @ApiProperty({
        description: 'Hired date of the staff member',
        example: '2023-01-15',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    hired_date: Date;

    @ApiProperty({
        description: 'ID of the department the staff member belongs to',
        example: 1,
        type: 'integer'
    })
    @IsNumber()
    department_id: number;
}
