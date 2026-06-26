import { api } from "@/lib/axios";
import { Task, PaginatedResponse } from "@/types";

export const tasksService = {
  getTasks: async (params?: any): Promise<PaginatedResponse<Task>> => {
    const res = await api.get("/tasks", { params });
    return res.data;
  },
  createTask: async (data: any): Promise<Task> => {
    const res = await api.post("/tasks", data);
    return res.data;
  },
  updateTask: async (id: string, data: any): Promise<Task> => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
