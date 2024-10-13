import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Value } from '../../helper/value.helper';
import { join } from 'path';
import * as fs from 'node:fs';
import * as ExcelJS from 'exceljs';

@Injectable()
export class SkpService {
  constructor(private readonly prisma: PrismaService) {}

  async createSkp(request, file) {
    const { tahun, statusCheckValue, creatorDetailUserId } = request;
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
    if (!getSkp) {
      throw new HttpException('skp not found', HttpStatus.NOT_FOUND);
    }

    const filePath = join(process.cwd(), 'public', getSkp.file);

    if (!fs.existsSync(filePath)) {
      throw new HttpException(
        'skp has ben deleted or not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[8];

    // PerilakuKerja
    const cellBerorientasiPelayananValue = worksheet.getCell('L31').value;
    const cellBerorientasiPelayanan = worksheet.getCell('K32').value;
    if (cellBerorientasiPelayanan !== null) {
      worksheet.getCell('K32').value = berorientasiPelayanan;
    }
    if (cellBerorientasiPelayananValue !== null) {
      worksheet.getCell('L31').value =
        Value.statusNilai[berorientasiPelayananValue]; // Mengubah nilai di L31
    }

    const cellAkuntabelValue = worksheet.getCell('L35').value;
    const cellAkuntabel = worksheet.getCell('K36').value;
    if (cellAkuntabel !== null) {
      worksheet.getCell('K36').value = akuntabel;
    }
    if (cellAkuntabelValue !== null) {
      worksheet.getCell('L35').value = Value.statusNilai[akuntabelValue]; // Mengubah nilai di L35
    }

    const cellKompetenValue = worksheet.getCell('L39').value;
    const cellKompeten = worksheet.getCell('K40').value;
    if (cellKompeten !== null) {
      worksheet.getCell('K40').value = kompeten;
    }
    if (cellKompetenValue !== null) {
      worksheet.getCell('L39').value = Value.statusNilai[kompetenValue]; // Mengubah nilai di L39
    }

    const cellHarmonisValue = worksheet.getCell('L43').value;
    const cellHarmonis = worksheet.getCell('K44').value;
    if (cellHarmonis !== null) {
      worksheet.getCell('K44').value = harmonis;
    }
    if (cellHarmonisValue !== null) {
      worksheet.getCell('L43').value = Value.statusNilai[harmonisValue]; // Mengubah nilai di L43
    }

    const cellLoyalValue = worksheet.getCell('L48').value;
    const cellLoyal = worksheet.getCell('K49').value;
    if (cellLoyal !== null) {
      worksheet.getCell('K49').value = loyal;
    }
    if (cellLoyalValue !== null) {
      worksheet.getCell('L48').value = Value.statusNilai[loyalValue]; // Mengubah nilai di L47
    }

    const cellAdaptifValue = worksheet.getCell('L52').value;
    const cellAdaptif = worksheet.getCell('K53').value;
    if (cellAdaptif !== null) {
      worksheet.getCell('K53').value = adapatif;
    }
    if (cellAdaptifValue !== null) {
      worksheet.getCell('L52').value = Value.statusNilai[adapatifValue]; // Mengubah nilai di L51
    }

    const cellKolaboratifValue = worksheet.getCell('L56').value;
    const cellKolaboratif = worksheet.getCell('K57').value;
    if (cellKolaboratif !== null) {
      worksheet.getCell('K57').value = kolaboratif;
    }
    if (cellKolaboratifValue !== null) {
      worksheet.getCell('L56').value = Value.statusNilai[kolaboratifValue]; // Mengubah nilai di L55
    }

    await workbook.xlsx.writeFile(filePath);

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
