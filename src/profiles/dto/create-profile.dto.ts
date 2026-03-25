import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}
