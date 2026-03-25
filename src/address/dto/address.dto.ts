import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    number: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    zipCode: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
