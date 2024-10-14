import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateAllergyDto {
    @ApiProperty({ description: 'The substance that causes the allergic reaction', example: 'Pollen' })
    @IsString()
    @MaxLength(255)
    allergen: string;

    @ApiProperty({ description: 'Symptoms caused by the allergen', example: 'Sneezing, runny nose' })
    @IsString()
    @MaxLength(255)
    symptoms: string;

    @ApiProperty({ description: 'Category of the allergen', example: 'Environmental' })
    @IsString()
    @MaxLength(255)
    category: string;
}
