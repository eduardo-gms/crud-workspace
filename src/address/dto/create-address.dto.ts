import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
}
