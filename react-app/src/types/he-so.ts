export type THeSo = {
  id: number;
  chucDanh: string;
  heSo: number;
  loai: HeSoLoaiType;
};

export type HeSoLoaiType = "CHUC_VU" | "TRACH_NHIEM";

// enum HeSoLoai {
//   PHU_CAP = "PHU_CAP",
//   TRACH_NHIEM = "TRACH_NHIEM",
// }

export const heSoDefaultValues: Omit<THeSo, "id"> = {
  chucDanh: "",
  heSo: 0.1,
  loai: "CHUC_VU",
};

export const heSoLoaiOptions = [
  { value: "CHUC_VU", label: "Chức vụ" },
  { value: "TRACH_NHIEM", label: "Trách nhiệm" },
];


