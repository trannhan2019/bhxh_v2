



export type TNhanVien = {
  id: number;
  ten: string;
  phongId:number;
  chucVuId:number;
  soThuTu: number;
  trangThai: boolean;
  nhanVienVhsc:boolean;
  daNghiViec?: Date | null;
}

interface SelectOption {
  id: number;
  ten: string;
}

export type TNhanVienRes = {
  id: number;
  ten: string;
  phong:SelectOption;
  chucVu:SelectOption;
  soThuTu: number;
  trangThai: boolean;
  nhanVienVhsc:boolean;
  daNghiViec: Date | null;
};



export const nhanVienDefaultValues: Omit<TNhanVien, "id"> = {
  ten: "",
  phongId: 0,
  chucVuId: 0,
  soThuTu: 0,
  trangThai: true,
  nhanVienVhsc: false,
  daNghiViec: null,
};
