import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty({
        description: 'Purpose of the appointment',
        example: 'Routine check-up'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    purpose: string;

    @ApiProperty({
        description: 'Status of the appointment',
        example: 'Scheduled'
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    status: string;

    @ApiProperty({
        description: 'Start time of the appointment',
        example: '2024-09-21T09:00:00Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty()
    start_time: Date;

    @ApiProperty({
        description: 'End time of the appointment',
        example: '2024-09-21T10:00:00Z',
        type: 'string',
        format: 'date-time'
    })
    @IsNotEmpty()
    end_time: Date;

    @ApiProperty({
        description: 'ID of the patient',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    patient_id: number;

    @ApiProperty({
        description: 'ID of the staff member',
        example: 2
    })
    @IsNumber()
    @IsNotEmpty()
    staff_id: number;
    date: Date;
}
