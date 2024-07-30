// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

// Models
import { Education } from "@/models/education.model";

export type GetEducationQuery = {
  limit?: number;
  offset?: number;
}

export type GetEducationData = PaginationResponse<'educations', Education>;

export const educationApi = (http: AxiosInstance) => ({
  async getEducation(params: GetEducationQuery): Promise<AxiosResponse<GetEducationData>> {
    return await http.get('/education', {
      params,
    })
  }
})