import axiosClient from "@/lib/axios-client";
import type { TChucVu } from "@/types/chuc-vu";

const apiUrl = "/chuc-vu";

export const getChucVus = async () => {
  const res = await axiosClient.get<TChucVu[]>(apiUrl);
  return res.data;
};

export const getChucVuById = async (id: number) => {
  const res = await axiosClient.get<TChucVu>(`${apiUrl}/${id}`);
  return res.data;
};

export const createChucVu = (chucVu: Omit<TChucVu, "id">) => {
  return axiosClient.post<TChucVu>(apiUrl, chucVu);
};

export const updateChucVu = (id: number, chucVu: Omit<TChucVu, "id">) => {
  return axiosClient.patch<TChucVu>(`${apiUrl}/${id}`, chucVu);
};

export const deleteChucVu = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};