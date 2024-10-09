import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSkpDto {
  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsString()
  tahun: string;

  @IsBoolean()
  isChecked: boolean;

  @IsNotEmpty()
  @IsNumber()
  detailUserId: number;
}
