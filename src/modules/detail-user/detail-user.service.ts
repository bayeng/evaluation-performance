import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetailUserDto } from './dto/create-detail-user.dto';
import { UpdateDetailUserDto } from './dto/update-detail-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DetailUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDetailUserDto: any) {
    const { nama, nip, tmt, jabatan, userId } = createDetailUserDto;

    const check = await this.prisma.detailUser.findFirst({
      where: { userId: Number(userId) },
    });

    if (check) {
      throw new HttpException('user has a detail user', HttpStatus.CONFLICT);
    }
    try {
      const data = await this.prisma.detailUser.create({
        data: {
          nama: nama,
          nip: nip,
          tmt: tmt,
          jabatan: jabatan,
          userId: Number(userId),
        },
      });

      return data;
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const datas = await this.prisma.detailUser.findMany();
    if (datas.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return datas;
  }

  async findOne(id: number) {
    const data = await this.prisma.detailUser.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  update(id: number, updateDetailUserDto: UpdateDetailUserDto) {
    return `This action updates a #${id} detailUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailUser`;
  }
}
