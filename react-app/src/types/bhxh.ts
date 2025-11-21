import type { TBacLuong, TNgachLuong } from "./bac-luong";
import type { THeSo } from "./he-so";
import type { TNhanVienPhong, TNhanVienRes } from "./nhan-vien";

export interface TBhxh {
  id: number;
  nhanVienId: number;
  ngachLuongId: number;
  bacLuongId: number;
  heSoChucVuId: number | null;
  heSoTrachNhiemId: number | null;
  ngayApDung: Date;
  ghiChu: string | null;
  soThuTu: number;
}

interface BhxhTinhToan {
  tongHeSo: number;
  mucLuong: number;
  maxBac: {
    isMax: boolean;
    bacMax: number;
  };
  nextBac: TBacLuong | null;
  nextTongHeSo: number | null;
  nextMucLuong: number | null;
  nextNgayApDung: Date | null;
}

export interface TBhxhItem extends TBhxh {
  nhanVien: TNhanVienRes;
  ngachLuong: TNgachLuong;
  bacLuong: TBacLuong;
  heSoChucVu: THeSo | null;
  heSoTrachNhiem: THeSo | null;
  tinhToan: BhxhTinhToan;
}

export interface TBhxhRes {
  data: TBhxhItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface TBhxhNhanVienPhong extends TBhxh {
  nhanVien: TNhanVienPhong;
}

export const bhxhDefaultValues: Omit<TBhxh, "id"> = {
  nhanVienId: 0,
  ngachLuongId: 0,
  bacLuongId: 0,
  heSoChucVuId: null,
  heSoTrachNhiemId: null,
  ngayApDung: new Date(),
  ghiChu: null,
  soThuTu: 0,
};

export interface TBhxhNangLuong {
  ngayApDung: Date;
  ghiChu: string | null;
}

export const nangLuongBhxhDefaultValues = {
  ngayApDung: new Date(),
  ghiChu: "",
};

export interface TBhxhChuyenNgach {
  ngachLuongId: number;
  bacLuongId: number;
  heSoChucVuId: number | null;
  heSoTrachNhiemId: number | null;
  ngayApDung: Date;
  ghiChu: string | null;
}

export const chuyenNgachBhxhDefaultValues = {
  ngachLuongId: 0,
  bacLuongId: 0,
  heSoChucVuId: null,
  heSoTrachNhiemId: null,
  ngayApDung: new Date(),
  ghiChu: "",
};
