import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty({
        description: 'The name of the department',
        example: 'Human Resources'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The ID of the staff member who will manage the department',
        example: 1,
        type: 'integer'
    })
    @IsNumber()
    @IsNotEmpty()
    manager_id: number;
}
