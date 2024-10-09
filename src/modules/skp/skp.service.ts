import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Value } from '../../helper/value.helper';
import { join } from 'path';
import * as fs from 'node:fs';
import * as XLSX from 'xlsx';

@Injectable()
export class SkpService {
  constructor(private readonly prisma: PrismaService) {}

  async createSkp(request, file) {
    const { tahun, statusCheckValue, creatorDetailUserId } = request;
    console.log(file);
    try {
      const skp = await this.prisma.skp.create({
        data: {
          file: 'skp/' + file.filename,
          tahun: tahun,
          statusCheckValue: Value.statusCheck[Number(statusCheckValue)],
          creatorDetailUserId: Number(creatorDetailUserId),
        },
      });

      return skp;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed create SKP', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllSkpByFilters() {
    const datas = await this.prisma.skp.findMany();
    if (datas.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return datas;
  }

  async findOne(id: number) {
    return `This action returns a #${id} skp`;
  }

  async updateSkp(id: number, request: any) {
    const {
      berorientasiPelayanan,
      akuntabel,
      kompeten,
      harmonis,
      loyal,
      adapatif,
      kolaboratif,
      berorientasiPelayananValue,
      akuntabelValue,
      kompetenValue,
      harmonisValue,
      loyalValue,
      adapatifValue,
      kolaboratifValue,
    } = request;

    const getSkp = await this.prisma.skp.findUnique({
      where: {
        id: Number(id),
      },
    });

    const filePath = join(process.cwd(), 'public', getSkp.file);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[8];
    const worksheet = workbook.Sheets[sheetName];

    // Ambil nilai dari cell tertentu (misal A1)
    const cellValue = worksheet['A61']?.v;
    console.log('Nilai di cell A61:', cellValue);

    return;

    const skp = await this.prisma.skp.update({
      where: {
        id: Number(id),
      },
      data: {
        beroriantasiPelayanan: berorientasiPelayanan,
        akuntabel: akuntabel,
        kompeten: kompeten,
        harmonis: harmonis,
        loyal: loyal,
        adaptif: adapatif,
        kolaboratif: kolaboratif,
        berorientasiPelayananValue: Number(berorientasiPelayananValue),
        akuntabelValue: Number(akuntabelValue),
        kompetenValue: Number(kompetenValue),
        harmonisValue: Number(harmonisValue),
        loyalValue: Number(loyalValue),
        adaptifValue: Number(adapatifValue),
        kolaboratifValue: Number(kolaboratifValue),
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} skp`;
  }
}
