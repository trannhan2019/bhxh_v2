import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateBhxhDto {
  // --- Các trường bắt buộc ---
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  nhanVienId: number; // Liên kết với Nhân viên

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  ngachLuongId: number; // Liên kết với Ngạch lương

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  bacLuongId: number; // Liên kết với Bậc lương

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  ngayApDung: Date; // Ngày áp dụng (chuỗi ISO 8601)

  // --- Các trường tùy chọn (Nullable) ---

  @IsInt()
  @IsOptional()
  @Min(1)
  heSoChucVuId?: number | null; // Hệ số chức vụ

  @IsInt()
  @IsOptional()
  @Min(1)
  heSoTrachNhiemId?: number | null; // Hệ số trách nhiệm

  @IsString()
  @IsOptional()
  ghiChu?: string | null;

  @IsInt()
  @Min(0)
  soThuTu: number;
}

export class BhxhQueryDto {
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
