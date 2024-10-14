import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
    @ApiProperty({
        description: 'The city of the address',
        example: 'Ho Chi Minh City'
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'The district of the address',
        example: 'District 1'
    })
    @IsString()
    @IsNotEmpty()
    district: string;

    @ApiProperty({
        description: 'The ward of the address',
        example: 'Ward Ben Nghe'
    })
    @IsString()
    @IsNotEmpty()
    ward: string;

    @ApiProperty({
        description: 'The address line of the address',
        example: 'Nguyen Hue'
    })
    @IsString()
    @IsNotEmpty()
    address_line: string;


    @ApiProperty({
        description: 'The patient ID that this address is associated with',
        example: 1
    })
    @IsNotEmpty()
    patient_id: number;
}
