import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateShiftDto {
    @ApiProperty({
        description: 'Day of the week for the shift',
        example: 'Monday'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    day_of_week: string;

    @ApiProperty({
        description: 'Start hour of the shift',
        example: '08:00',
        type: 'string',
        format: 'time'
    })
    @IsString()
    @IsNotEmpty()
    start_hour: string;

    @ApiProperty({
        description: 'End hour of the shift',
        example: '17:00',
        type: 'string',
        format: 'time'
    })
    @IsString()
    @IsNotEmpty()
    end_hour: string;
}
