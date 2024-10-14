import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProcedureDto {
    @ApiProperty({
        description: 'The cost of the procedure',
        example: 300.00,
        type: 'float'
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Category of the procedure',
        example: 'Surgical'
    })
    @IsString()
    @MaxLength(255)
    category: string;

    @ApiProperty({
        description: 'Quantity of medicine used during the procedure',
        example: 2,
        type: 'integer'
    })
    @IsInt()
    medicine_quantity: number;

    @ApiProperty({
        description: 'Date and time when the procedure was performed',
        example: '2024-09-15T14:30:00Z',
        type: 'string',
        format: 'date-time'
    })
    @IsDateString()
    performed_date: Date;

    @ApiProperty({
        description: 'ID of the medicine used',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    medicine_id: number;

    @ApiProperty({
        description: 'ID of the staff member who performed the procedure',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    staff_id: number;

    @ApiProperty({
        description: 'ID of the patient who underwent the procedure',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    patient_id: number;

    @ApiProperty({
        description: 'ID of the treatment history this procedure is linked to',
        example: 1,
        type: 'integer'
    })
    @IsNotEmpty()
    treatment_history_id: number;
}
