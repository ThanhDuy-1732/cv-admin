// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue"

// APIs
import { GetSkillData, GetSkillQuery, skillApi } from "./skill.api";

// Stores
import { useHttpStore } from "@/store/http.store";

type SkillStore = {
  listSkill: ComputedRef<Ref<GetSkillData>>;
  getSkills(params: GetSkillQuery): Promise<void>;
}

export const useSkillStore = defineStore<'skill', SkillStore>('skill', () => {
  const skills = ref<GetSkillData>();

  const listSkill = computed<Ref<GetSkillData>>(() => skills as Ref<GetSkillData>);

  const http = computed(() => useHttpStore().instance());

  const getSkills = async (params: GetSkillQuery) => {
    const response = await skillApi(http.value).getSkills(params);

    skills.value = response.data;
  }

  return {
    listSkill,
    getSkills,
  }
})