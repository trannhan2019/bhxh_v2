import axiosClient from "@/lib/axios-client";
import type { THeSo } from "@/types/he-so";

const apiUrl = "/he-so";

export const getHeSos = async () => {
  const res = await axiosClient.get<THeSo[]>(apiUrl);
  return res.data;
};

// export const getChucVuById = async (id: number) => {
//   const res = await axiosClient.get<TChucVu>(`${apiUrl}/${id}`);
//   return res.data;
// };

export const createHeSo = (heSo: Omit<THeSo, "id">) => {
  return axiosClient.post<THeSo>(apiUrl, heSo);
};

export const updateHeSo = (id: number, heSo: Omit<THeSo, "id">) => {
  return axiosClient.patch<THeSo>(`${apiUrl}/${id}`, heSo);
};

export const deleteHeSo = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};

export const getLoaiHeSo = async () => {
  const res = await axiosClient.get<{chucVu:THeSo[],trachNhiem:THeSo[]}>(`${apiUrl}/loai`);
  return res.data;
};
