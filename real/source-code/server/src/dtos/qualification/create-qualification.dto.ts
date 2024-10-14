import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQualificationDto {
    @ApiProperty({
        description: 'Name of the qualification',
        example: 'Bachelor of Science in Computer Science'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Provider of the qualification',
        example: 'Massachusetts Institute of Technology'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    provider: string;

    @ApiProperty({
        description: 'Date when the qualification was issued',
        example: '2010-06-01',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    @IsNotEmpty()
    issue_date: Date;

    @ApiProperty({
        description: 'ID of the staff who owns this qualification',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    staff_id: number;
}
