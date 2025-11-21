import axiosClient from "@/lib/axios-client";
import type { TUser } from "@/types/user";

const apiUrl = "/user";

export const getUsers = async () => {
  const res = await axiosClient.get<TUser[]>(apiUrl);
  return res.data;
};

export const createUser = (data: Omit<TUser, "id">) => {
  return axiosClient.post<TUser>(apiUrl, data);
};

export const updateUser = (id: number, data: Omit<TUser, "id">) => {
  return axiosClient.patch<TUser>(`${apiUrl}/${id}`, data);
};

export const deleteUser = (id: number) => {
  return axiosClient.delete(`${apiUrl}/${id}`);
};