import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateMedicineDto {
    @ApiProperty({
        description: 'The name of the medicine',
        example: 'Acetaminophen'
    })
    @IsString()
    @MaxLength(255)
    name: string;

    @ApiProperty({
        description: 'The price of the medicine per unit',
        example: 10.5
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'The primary effect of the medicine',
        example: 'Reduces pain and fever'
    })
    @IsString()
    @MaxLength(255)
    effect: string;

    @ApiProperty({
        description: 'Possible side effects of the medicine',
        example: 'Nausea, dizziness'
    })
    @IsString()
    @MaxLength(255)
    side_effect: string;
}
