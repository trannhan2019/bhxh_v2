import axiosClient from "@/lib/axios-client";
import type { TNhanVien, TNhanVienRes } from "@/types/nhan-vien";

const apiUrl = "/nhan-vien";

export const getNhanViens = async (page = 1, pageSize = 15, search = "") => {
  const res = await axiosClient.get<{data:TNhanVienRes[],total:number}>(apiUrl, {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return res.data;
};

export const getNhanVienById = async (id: number) => {
  const res = await axiosClient.get<TNhanVienRes>(`${apiUrl}/${id}`);
  return res.data;
};

export const createNhanVien = (nhanVien: Omit<TNhanVien, "id">) => {
  return axiosClient.post<TNhanVien>(apiUrl, nhanVien);
};

export const updateNhanVien = (id: number, nhanVien: Omit<TNhanVien, "id">) => {
  return axiosClient.patch<TNhanVien>(`${apiUrl}/${id}`, nhanVien);
};

export const deleteNhanVien = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};
