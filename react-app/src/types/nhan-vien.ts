import type { TPhong } from "./phong";

export interface TNhanVien {
  id: number;
  ten: string;
  phongId: number;
  chucVuId: number;
  soThuTu: number;
  trangThai: boolean;
  nhanVienVhsc: boolean;
}

export interface TNhanVienPhong extends TNhanVien {
  phong: TPhong;
}

interface SelectOption {
  id: number;
  ten: string;
}
interface TBhxh{
  id: number;
}

export type TNhanVienRes = {
  id: number;
  ten: string;
  phong: SelectOption;
  chucVu: SelectOption;
  soThuTu: number;
  trangThai: boolean;
  nhanVienVhsc: boolean;
  bhxh: TBhxh;
};

export const nhanVienDefaultValues: Omit<TNhanVien, "id"> = {
  ten: "",
  phongId: 0,
  chucVuId: 0,
  soThuTu: 0,
  trangThai: true,
  nhanVienVhsc: false,
};
