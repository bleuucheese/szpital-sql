import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDiagnosticDto {
    @ApiProperty({
        description: 'The ID of the procedure associated with the diagnostic',
        example: 1,
        type: 'integer'
    })
    @IsNumber()
    @IsNotEmpty()
    procedure_id: number;
    @ApiProperty({
        description: 'The image type of the diagnostic',
        type: 'string'
    })
    @IsString()
    image_type: string;
    @ApiProperty({
        description: 'The image image of the diagnostic',
        type: 'string'
    })
    @IsString()
    image_url: string;
    @ApiProperty({
        description: 'The date the note was written',
        example: '2024-09-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsDateString()
    @IsNotEmpty()
    date_taken: Date;
}