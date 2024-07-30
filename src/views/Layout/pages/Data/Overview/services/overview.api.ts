// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

// Models
import { Overview } from "@/models/overview.model";

export type GetOverviewQuery = {
  limit?: number;
  offset?: number;
}

export type GetOverviewData = PaginationResponse<'overview', Overview>

export const overviewApi = (http: AxiosInstance) => ({
  async getOverview(params: GetOverviewQuery): Promise<AxiosResponse<GetOverviewData>> {
    return await http.get('/overview', {
      params,
    })
  }
})