import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LuongToiThieuVungDto {
  @IsInt()
  @IsNotEmpty()
  mucLuong: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  thoiGianApDung: Date;

  @IsString()
  @IsOptional()
  canCuPhapLy?: string;

  @IsBoolean()
  @IsNotEmpty()
  apDung: boolean;
}