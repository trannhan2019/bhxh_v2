import type { TUser } from "./user";

export interface TLogin {
    email: string;
    password: string;
}

export const loginDefaultValues: TLogin = {
    email: "",
    password: "",
}

export interface TAuth {
    user: TUser | null;
    token: string | null;
}