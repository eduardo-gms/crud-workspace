import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  create(createAddressDto: CreateAddressDto) {
    return this.prisma.address.create({ data: createAddressDto });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  findOne(id: string) {
    return this.prisma.address.findUnique({ where: { id } });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.prisma.address.update({ where: { id }, data: updateAddressDto });
  }

  remove(id: string) {
    return this.prisma.address.delete({ where: { id } });
  }
}
