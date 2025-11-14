export type TChucVu = {
  id: number;
  ten: string;
  tenVietTat: string;
  soThuTu: number;
};

export type TChucVuSelectOption = {
  id: number;
  ten: string;
}

export const chucVuDefaultValues: Omit<TChucVu, "id"> = {
  ten: "",
  tenVietTat: "",
  soThuTu: 0,
};
