import axiosClient from "@/lib/axios-client";
import type { TNgachLuong, TNgachLuongReq } from "@/types/bac-luong";

const apiUrl = "/bac-luong";

export const getBacLuongs = async () => {
  const res = await axiosClient.get<TNgachLuong[]>(apiUrl);
  return res.data;
};

export const getBacLuongById = async (id: number) => {
  const res = await axiosClient.get<TNgachLuong>(`${apiUrl}/${id}`);
  return res.data;
};

export const createBacLuong = (bacLuong: Omit<TNgachLuongReq, "id">) => {
  return axiosClient.post<TNgachLuong>(apiUrl, bacLuong);
};

export const updateBacLuong = (id: number, bacLuong: Omit<TNgachLuongReq, "id">) => {
  return axiosClient.patch<TNgachLuong>(`${apiUrl}/${id}`, bacLuong);
};

export const deleteBacLuong = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};