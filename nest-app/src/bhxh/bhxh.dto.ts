import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Prisma, BacLuong } from '@prisma/client';

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

export class BhxhNangBacDto {
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
}

export const bhxhDataInclude = {
  nhanVien: {
    include: {
      phong: true,
      chucVu: true,
    },
  },
  ngachLuong: {
    include: {
      bacLuongs: true,
    },
  },
  bacLuong: true,
  heSoChucVu: true,
  heSoTrachNhiem: true,
};

/**
 * 2. Sử dụng 'Prisma.BhxhGetPayload' để tự động lấy type của 'item'
 * dựa trên cấu trúc 'include' ở trên.
 *
 * -> 'BhxhItemPayload' SẼ CÓ ĐẦY ĐỦ CÁC TRƯỜNG:
 * nhanVien (với phong, chucVu),
 * ngachLuong (với bacLuongs),
 * bacLuong, heSoChucVu, heSoTrachNhiem...
 */
type BhxhItemPayload = Prisma.BhxhGetPayload<{
  include: typeof bhxhDataInclude;
}>;

/**
 * 3. Định nghĩa DTO cho phần 'tinhToan' mà bạn thêm vào
 */
interface TinhToanDto {
  tongHeSo: number;
  mucLuong: number;
  maxBac: {
    isMax: boolean;
    bacMax: number;
  };
  // Giả sử 'nextBac' có type là 'BacLuong' từ Prisma
  nextBac: BacLuong | null;
  nextTongHeSo: number;
  nextMucLuong: number;
  nextNgayApDung: Date | null;
}

/**
 * 4. Kết hợp lại: Type cuối cùng = (Type của 'item' TỪ PRISMA) & (Type của 'tinhToan')
 * Đây chính là DTO mà bạn sẽ sử dụng ở mọi nơi.
 */
export type BhxhDataDto = BhxhItemPayload & {
  tinhToan: TinhToanDto;
};
