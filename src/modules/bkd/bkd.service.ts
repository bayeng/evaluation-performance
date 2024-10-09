import { Injectable } from '@nestjs/common';
import { CreateBkdDto } from './dto/create-bkd.dto';
import { UpdateBkdDto } from './dto/update-bkd.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BkdService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBkdDto: CreateBkdDto) {
    return 'This action adds a new bkd';
  }

  findAll() {
    return `This action returns all bkd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bkd`;
  }

  update(id: number, updateBkdDto: UpdateBkdDto) {
    return `This action updates a #${id} bkd`;
  }

  remove(id: number) {
    return `This action removes a #${id} bkd`;
  }
}
