import type { TBacLuong, TNgachLuong } from "./bac-luong";
import type { THeSo } from "./he-so";
import type { TLuongToiThieuVung } from "./luong-toi-thieu-vung";

export interface TLichSuBhxh {
  id: number;
  nhanVienId: number;
  ngachLuongId: number;
  bacLuongId: number;
  heSoChucVuId: number | null;
  heSoTrachNhiemId: number | null;
  luongToiThieuVungId: number;
  ngayApDung: Date;
  ghiChu: string | null;
}

export interface TLichSuBhxhItem extends TLichSuBhxh {
  ngachLuong: TNgachLuong;
  bacLuong: TBacLuong;
  heSoChucVu: THeSo;
  heSoTrachNhiem: THeSo;
  luongToiThieuVung: TLuongToiThieuVung;
  luong: number;
}

export const lichSuBhxhDefaultValues = (nhanVienId: number) => {
  return {
    nhanVienId: nhanVienId || 0,
    ngachLuongId: 0,
    bacLuongId: 0,
    heSoChucVuId: null,
    heSoTrachNhiemId: null,
    luongToiThieuVungId: 0,
    ngayApDung: new Date(),
    ghiChu: null,
  };
};
