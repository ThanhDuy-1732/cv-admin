import { Information } from "@/models/information.model";
import { AxiosInstance, AxiosResponse } from "axios";

export type GetInfoQuery = {
  limit?: number;
  offset?: number;
}

export type GetInfoData = PaginationResponse<'information', Information>

export const infoApi = (http: AxiosInstance) => ({
  async getInfo(params: GetInfoQuery): Promise<AxiosResponse<GetInfoData>> {
    return await http.get('/information', {
      params
    })
  }
})