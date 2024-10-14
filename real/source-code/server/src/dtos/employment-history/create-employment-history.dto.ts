import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateEmploymentHistoryDto {
    @ApiProperty({
        description: 'The date the employment application was applied',
        example: '2024-08-01',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    @IsNotEmpty()
    applied_date: Date;

    @ApiProperty({
        description: 'Salary at the previous job',
        example: 50000,
        type: 'float'
    })
    @IsNumber()
    previous_salary: number;

    @ApiProperty({
        description: 'Salary at the current job',
        example: 75000,
        type: 'float'
    })
    @IsNumber()
    current_salary: number;

    @ApiProperty({
        description: 'Job title at the previous job',
        example: 'Junior Developer'
    })
    @IsString()
    @MaxLength(255)
    previous_job_title: string;

    @ApiProperty({
        description: 'Job title at the current job',
        example: 'Senior Developer'
    })
    @IsString()
    @MaxLength(255)
    current_job_title: string;

    @ApiProperty({
        description: 'ID of the department for the previous job',
        example: 1,
        type: 'integer'
    })
    @IsNumber()
    previous_department_id: number;

    @ApiProperty({
        description: 'ID of the department for the current job',
        example: 2,
        type: 'integer'
    })
    @IsNumber()
    current_department_id: number;

    @ApiProperty({
        description: 'ID of the staff member this history belongs to',
        example: 3,
        type: 'integer'
    })
    @IsNumber()
    staff_id: number;
}
