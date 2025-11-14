import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NhanVienDto {
  @IsString()
  @IsNotEmpty()
  ten: string;

  @IsInt()
  @IsNotEmpty()
  phongId: number;

  @IsInt()
  @IsNotEmpty()
  chucVuId: number;

  @IsInt()
  @IsNotEmpty()
  soThuTu: number;

  @IsBoolean()
  @IsNotEmpty()
  trangThai: boolean = true;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  daNghiViec?: Date;

  @IsBoolean()
  @IsNotEmpty()
  nhanVienVhsc: boolean = false;
}

export class NhanVienQueryDto {
  @IsOptional()
  @Type(() => Number) // chuyển đổi từ string → number
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
