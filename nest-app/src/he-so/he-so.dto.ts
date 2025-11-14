import { HeSoLoai } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';

export class HeSoDto {
  @IsString()
  @IsNotEmpty()
  chucDanh: string;

  @IsNumber()
  @IsNotEmpty()
  heSo: number;

  @IsEnum(HeSoLoai)
  loai: HeSoLoai;
}
