import axiosClient from "@/lib/axios-client";
import type {
  TBhxh,
  TBhxhItem,
  TBhxhNhanVienPhong,
  TBhxhRes,
} from "@/types/bhxh";

const apiUrl = "/bhxh";

export const getBhxhs = async (page = 1, pageSize = 15, search = "") => {
  const res = await axiosClient.get<TBhxhRes>(apiUrl, {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return res.data;
};

export const createBhxh = async (data: Omit<TBhxh, "id">) => {
  return await axiosClient.post<TBhxh>(apiUrl, data);
};

export const updateBhxh = async (id: number, data: Omit<TBhxh, "id">) => {
  return await axiosClient.patch<TBhxh>(`${apiUrl}/${id}`, data);
};

export const getBhxhById = async (id: number) => {
  const res = await axiosClient.get<TBhxhItem>(`${apiUrl}/${id}`);
  return res.data;
};

export const reportExcelById = async (id: number) => {
  const response = await axiosClient.get<Promise<Blob>>(
    `${apiUrl}/export/${id}`,
    {
      responseType: "arraybuffer",
    }
  );
  return response.data;
};

export const deleteBhxh = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};

export const getBhxhNotification = async () => {
  const res = await axiosClient.get<TBhxhNhanVienPhong[]>(
    `${apiUrl}/notification`
  );
  return res.data;
};

export const nangBacBhxh = async (id: number, data: Omit<TBhxh, "id" | "soThuTu">) => {
  return await axiosClient.patch(`${apiUrl}/nang-bac/${id}`, data);
};

export const chuyenNgachBhxh = async (id: number, data: Omit<TBhxh, "id" | "soThuTu">) => {
  return await axiosClient.patch(`${apiUrl}/chuyen-ngach/${id}`, data);
};
