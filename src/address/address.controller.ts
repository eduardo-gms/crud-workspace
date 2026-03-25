import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressDto } from './dto/address.dto';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiResponse({ status: 201, type: AddressDto })
  @ApiResponse({ status: 400 })
  create(@Body() createAddressDto: CreateAddressDto): Promise<AddressDto> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [AddressDto] })
  findAll(): Promise<AddressDto[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: AddressDto })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string): Promise<AddressDto | null> {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: AddressDto })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<AddressDto> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string): Promise<AddressDto> {
    return this.addressService.remove(id);
  }
}
