export interface TUser {
  id: number
  name: string
  email: string
  role: Role
  password?: string
}

type Role = "ADMIN" | "USER";

export const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

export const userDefaultValues: Omit<TUser, "id"> = {
  name: "",
  email: "",
  role: "USER",
};