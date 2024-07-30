// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef, Ref, ref } from "vue";

// Models
import { Award } from "@/models/award.model";

// Stores
import { useHttpStore } from "@/store/http.store";

// APIs
import { awardApi, GetAwardQuery } from "./award.api";

type AwardStore = {
  listAward: ComputedRef<Ref<PaginationResponse<'awards', Award>>>;
  getAward(param: GetAwardQuery): Promise<void>;
}

export const useAwardStore = defineStore<'award', AwardStore>('award', () => {
  const awards = ref<PaginationResponse<'awards', Award>>();

  const listAward = computed(() => awards as Ref<PaginationResponse<'awards', Award>>);

  const http = computed(() => {
    return useHttpStore().instance();
  })

  const getAward = async (param: GetAwardQuery) => {
    const response = await awardApi(http.value).getAward(param);
    awards.value = response.data;
  }

  return {
    listAward,
    getAward,
  }
})