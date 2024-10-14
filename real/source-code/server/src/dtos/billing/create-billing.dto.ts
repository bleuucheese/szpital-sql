import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBillingDto {
    @ApiProperty({
        description: 'The total amount to be paid',
        example: 1500.50,
        type: 'float'
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'The date when the billing was issued',
        example: '2024-09-01',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    @IsNotEmpty()
    billing_date: Date;

    @ApiProperty({
        description: 'The due date for the payment',
        example: '2024-10-01',
        type: 'string',
        format: 'date'
    })
    @IsDateString()
    @IsNotEmpty()
    due_date: Date;

    @ApiProperty({
        description: 'The payment status of the bill',
        example: 'Unpaid',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    payment_status: string;

    @ApiProperty({
        description: 'The ID of the treatment history associated with the billing',
        example: 1,
        type: 'number'
    })
    @IsNotEmpty()
    treatment_history_id: number;

    @ApiProperty({
        description: 'The ID of the patient responsible for the billing',
        example: 1,
        type: 'number'
    })
    @IsNotEmpty()
    patient_id: number;
}
