import { Project } from "@/models/project.model";
import { AxiosInstance, AxiosResponse } from "axios";

export type GetProjectsQuery = {
  limit?: number;
  offset?: number;
}

export type GetProjectsData = PaginationResponse<'projects', Project>

export const projectApi = (http: AxiosInstance) => ({
  async getAllProjects(params: GetProjectsQuery): Promise<AxiosResponse<GetProjectsData>> {
    return await http.get('/project', {
      params,
    })
  }
})