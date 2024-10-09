import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDetailUserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  nip: string;

  @IsNotEmpty()
  @IsString()
  pangkat: string;

  @IsNotEmpty()
  @IsString()
  unitKerja: string;

  @IsNotEmpty()
  @IsString()
  tmt: string;

  @IsNotEmpty()
  @IsString()
  jabatan: string;

  @IsNotEmpty()
  @IsNumber()
  userId: string;
}
