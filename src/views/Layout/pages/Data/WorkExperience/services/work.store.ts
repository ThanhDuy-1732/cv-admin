// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue"

// APIs
import { GetWorkData, GetWorkQuery, workApi } from "./work.api";

// Stores
import { useHttpStore } from "@/store/http.store";

type WorkStore = {
  listWork: ComputedRef<Ref<GetWorkData>>;
  getWorks(params: GetWorkQuery): Promise<void>;
}

export const useWorkStore = defineStore<'work-experience', WorkStore>('work-experience', () => {
  const works = ref<GetWorkData>();

  const listWork = computed<Ref<GetWorkData>>(() => works as Ref<GetWorkData>);

  const http = computed(() => useHttpStore().instance());

  const getWorks = async (params: GetWorkQuery) => {
    const response = await workApi(http.value).getAllWork(params);

    works.value = response.data;
  }

  return {
    listWork,
    getWorks,
  }
})