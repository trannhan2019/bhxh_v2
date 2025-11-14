import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class BacLuongDto {
  @IsInt()
  @IsNotEmpty()
  bac: number;

  @IsNumber()
  @IsNotEmpty()
  heSo: number;

  @IsInt()
  @Min(0)
  thoiGianNangBac: number;
}

export class NgachLuongDto {
  @IsString()
  @IsNotEmpty()
  tenNgach: string;

  @IsString()
  @IsNotEmpty()
  maNgach: string;

  @IsInt()
  @Min(0)
  soThuTu: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BacLuongDto)
  bacLuongs: BacLuongDto[];
}

export class UpdateNgachLuongDto {
  @IsString()
  @IsNotEmpty()
  tenNgach: string;

  @IsString()
  @IsNotEmpty()
  maNgach: string;

  @IsInt()
  @Min(0)
  soThuTu: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BacLuongDto)
  bacLuongs: (BacLuongDto & { id?: number })[];
}
