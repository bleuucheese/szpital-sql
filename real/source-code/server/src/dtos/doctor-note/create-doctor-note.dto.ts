import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDoctorNoteDto {
    @ApiProperty({
        description: 'The ID of the procedure associated with the note',
        example: 1,
        type: 'integer'
    })
    @IsNumber()
    @IsNotEmpty()
    procedure_id: number;

    @ApiProperty({
        description: 'The content of the doctor\'s note',
        example: 'Patient is recovering well and should continue prescribed medications.',
        type: 'string'
    })
    @IsString()
    @IsOptional()  // Making this optional since the Prop decorator did not use required: true
    content?: string;

    @ApiProperty({
        description: 'The date the note was written',
        example: '2024-09-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;
}
