import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

export const phongSchema = z.object({
  ten: z.string().min(1),
  tenVietTat: z.string().min(1),
  soThuTu: z.coerce.number().min(1).default(0),
});

export const chucVuSchema = z.object({
  ten: z.string().min(1),
  tenVietTat: z.string().min(1),
  soThuTu: z.coerce.number().min(1).default(0),
});

export const nhanVienSchema = z.object({
  ten: z.string().min(1),
  phongId: z.coerce.number().min(1),
  chucVuId: z.coerce.number().min(1),
  soThuTu: z.coerce.number().min(1).default(0),
  trangThai: z.boolean().default(true),
  nhanVienVhsc: z.boolean().default(false),
});

export const luongToiThieuVungSchema = z.object({
  mucLuong: z.coerce.number().min(1),
  thoiGianApDung: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  canCuPhapLy: z.string().nullable(),
  apDung: z.boolean().default(false),
});

const BacLuongSchema = z.object({
  bac: z.number().int("Bậc phải là số nguyên").min(1, "Bậc phải >= 1"),

  heSo: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: "Hệ số không hợp lệ" })
    .gt(0, "Hệ số phải lớn hơn 0"),

  thoiGianNangBac: z
    .number()
    .int("Thời gian nâng bậc phải là số nguyên")
    .nonnegative("Thời gian nâng bậc phải >= 0"),
});

export const ngachLuongSchema = z.object({
  maNgach: z.string().min(1),
  tenNgach: z.string().min(1),
  soThuTu: z.coerce.number().min(1).default(0),
  bacLuongs: z.array(BacLuongSchema).min(1, "Phải có ít nhất 1 bậc lương"),
});

export const heSoSchema = z.object({
  chucDanh: z.string().min(1),
  heSo: z.number().refine((v) => !Number.isNaN(v), { message: "Hệ số không hợp lệ" }).gt(0, "Hệ số phải lớn hơn 0"),
  loai: z.enum(["CHUC_VU", "TRACH_NHIEM"]),
});
