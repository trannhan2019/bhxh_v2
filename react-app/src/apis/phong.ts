import axiosClient from "@/lib/axios-client";
import type { TPhong } from "@/types/phong";

const apiUrl = "/phong";

export const getPhongs = async () => {
  const res = await axiosClient.get<TPhong[]>(apiUrl);
  return res.data;
};

export const getPhongById = async (id: number) => {
  const res = await axiosClient.get<TPhong>(`${apiUrl}/${id}`);
  return res.data;
};

export const createPhong = (phong: Omit<TPhong, "id">) => {
  return axiosClient.post<TPhong>(apiUrl, phong);
};

export const updatePhong = (id: number, phong: Omit<TPhong, "id">) => {
  return axiosClient.patch<TPhong>(`${apiUrl}/${id}`, phong);
};

export const deletePhong = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};