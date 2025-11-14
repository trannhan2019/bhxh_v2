import axiosClient from "@/lib/axios-client";
import type { TLuongToiThieuVung } from "@/types/luong-toi-thieu-vung";

const apiUrl = "/luong-toi-thieu-vung";

export const getLuongToiThieuVungs = async () => {
  const res = await axiosClient.get<TLuongToiThieuVung[]>(apiUrl);
  return res.data;
};

export const getLuongToiThieuVungById = async (id: number) => {
  const res = await axiosClient.get<TLuongToiThieuVung>(`${apiUrl}/${id}`);
  return res.data;
};

export const createLuongToiThieuVung = (luongToiThieuVung: Omit<TLuongToiThieuVung, "id">) => {
  return axiosClient.post<TLuongToiThieuVung>(apiUrl, luongToiThieuVung);
};

export const updateLuongToiThieuVung = (id: number, luongToiThieuVung: Omit<TLuongToiThieuVung, "id">) => {
  return axiosClient.patch<TLuongToiThieuVung>(`${apiUrl}/${id}`, luongToiThieuVung);
};

export const deleteLuongToiThieuVung = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};