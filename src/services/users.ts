import { api } from "@/lib/axios";
import { User, PaginatedResponse } from "@/types";

export const usersService = {
  getUsers: async (params?: any): Promise<PaginatedResponse<User>> => {
    const res = await api.get("/users", { params });
    return res.data;
  },
  createUser: async (data: any): Promise<User> => {
    const res = await api.post("/users", data);
    return res.data;
  },
  updateUser: async (id: string, data: any): Promise<User> => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
