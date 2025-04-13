import type { LoginUser, SignupUser } from "@/types/user";
import { client } from "./client";

export const signupApi = async (user: SignupUser) => {
  const { data } = await client.post("/auth/user", user);
  return data;
};

export const loginApi = async (user: LoginUser) => {
  const { data } = await client.post("/auth/token", user);
  return data;
};
