import axiosClient from "@/lib/axios-client";
import type { TLichSuBhxh, TLichSuBhxhItem } from "@/types/lich-su-bhxh";

const apiUrl = "/lich-su-bhxh";

export const getLichSuBhxhByNhanVienId = async (nhanVienId:number) => {
  const res = await axiosClient.get<TLichSuBhxhItem[]>(`${apiUrl}/nhan-vien/${nhanVienId}`);
  return res.data;
};

export const createLichSuBhxh = async (values: Omit<TLichSuBhxh, "id">) => {
  return await axiosClient.post<TLichSuBhxh>(`${apiUrl}/nhan-vien`, values);
  
};

export const updateLichSuBhxh = async (id: number, values: Omit<TLichSuBhxh, "id">) => {
  return await axiosClient.patch<TLichSuBhxh>(`${apiUrl}/nhan-vien/${id}`, values);
};

export const deleteLichSuBhxh = async (id: number) => {
  return await axiosClient.delete(`${apiUrl}/${id}`);
};
