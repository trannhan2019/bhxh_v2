import { IsInt, IsNotEmpty, IsOptional, IsString, Min,IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class LichSuBhxhDto {
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

      @IsInt()
      @IsNotEmpty()
      @Min(1)
      luongToiThieuVungId: number; // Liên kết với Bậc lương
    
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
}
