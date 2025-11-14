export interface TBacLuong {
  id: number;
  bac: number;
  heSo: number;
  thoiGianNangBac: number;
  ngachLuongId: number;
}

export interface TNgachLuong {
  id: number;
  tenNgach: string;
  maNgach: string;
  soThuTu: number;
  bacLuongs: TBacLuong[];
}

export interface TNgachLuongReq {
  tenNgach: string;
  maNgach: string;
  soThuTu: number;
  bacLuongs: Omit<TBacLuong, "id" | "ngachLuongId">[];
}

export const ngachLuongDefaultValues: TNgachLuongReq = {
  tenNgach: "",
  maNgach: "",
  soThuTu: 0,
  bacLuongs: [{ bac: 1, heSo: 1.0, thoiGianNangBac: 2 }],
};
