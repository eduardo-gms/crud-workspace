import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ description: 'Data de atualização' })
    updatedAt: Date;
}
