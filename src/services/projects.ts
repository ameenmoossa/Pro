import { api } from "@/lib/axios";
import { Project, PaginatedResponse } from "@/types";

export const projectsService = {
  getProjects: async (params?: any): Promise<Project[]> => {
    const res = await api.get("/projects", { params });
    return res.data;
  },
  getProject: async (id: string): Promise<Project> => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },
  createProject: async (data: any): Promise<Project> => {
    const res = await api.post("/projects", data);
    return res.data;
  },
  updateProject: async (id: string, data: any): Promise<Project> => {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  },
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
