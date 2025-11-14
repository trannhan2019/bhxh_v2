import axiosClient from "@/lib/axios-client";
import type { TLogin } from "@/types/auth";

export const login = (data:TLogin) => {
    return axiosClient.post('/auth/login',data)
}