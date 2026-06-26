import { api } from "@/lib/axios";
import { User } from "@/types";

export const authService = {
  login: async (data: any) => {
    const res = await api.post("/auth/login", data);
    return res.data as { token: string; user: User };
  },
  logout: async () => {
    await api.post("/auth/logout").catch(() => {});
  },
  me: async () => {
    const res = await api.get("/auth/me");
    return res.data as User;
  },
};
