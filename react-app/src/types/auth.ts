

export type TAuthUser = {
    name: string;
    email: string;
}

export interface TLogin {
    email: string;
    password: string;
}

export const loginDefaultValues: TLogin = {
    email: "",
    password: "",
}

export interface TAuth {
    user: TAuthUser | null;
    token: string | null;
}