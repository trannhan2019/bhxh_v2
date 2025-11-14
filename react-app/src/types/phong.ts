export type TPhong = {
  id: number;
  ten: string;
  tenVietTat: string;
  soThuTu: number;
};

export type TPhongSelectOption = {
  id: number;
  ten: string;
}

export const phongDefaultValues: Omit<TPhong, "id"> = {
  ten: "",
  tenVietTat: "",
  soThuTu: 0,
};
