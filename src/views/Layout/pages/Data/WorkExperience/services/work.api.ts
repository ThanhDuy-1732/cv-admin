// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

// Models
import { WorkExperience } from "@/models/workExperience.model";

export type GetWorkQuery = {
  limit?: number,
  offset?: number,
}

export type GetWorkData = PaginationResponse<'workExperience', WorkExperience>

export const workApi = (http: AxiosInstance) => ({
  async getAllWork(params: GetWorkQuery): Promise<AxiosResponse<GetWorkData>> {
    return await http.get('/work-experience', {
      params,
    });
  }
})