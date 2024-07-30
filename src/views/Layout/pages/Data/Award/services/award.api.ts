// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

// Models
import { Award } from '@/models/award.model';

export type GetAwardQuery = {
  limit?: number,
  offset?: number,
}

export type GetAwardData = PaginationResponse<'awards', Award>

export const awardApi = (http: AxiosInstance) => ({
  async getAward(params: GetAwardQuery): Promise<AxiosResponse<GetAwardData>> {
    return await http.get('/award', {
      params,
    });
  }
})