import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBkdDto {
  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsNumber()
  tahunAjaranId: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  creatorDetailUserId: number;

  @IsNotEmpty()
  @IsNumber()
  assesorDetailUserId: number;
}
