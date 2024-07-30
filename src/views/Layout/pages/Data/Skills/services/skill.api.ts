// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

// Models
import { Skill } from "@/models/skill.model";

export type GetSkillQuery = {
  limit?: number,
  offset?: number,
}

export type GetSkillData = PaginationResponse<'skills', Skill>

export const skillApi = (http: AxiosInstance) => ({
  async getSkills(params: GetSkillQuery): Promise<AxiosResponse<GetSkillData>> {
    return await http.get('/skill', {
      params,
    });
  }
})