import { computed, ComputedRef, ref, Ref } from "vue"
import { GetOverviewData, GetOverviewQuery, overviewApi } from "./overview.api"
import { defineStore } from "pinia";
import { useHttpStore } from "@/store/http.store";

type OverviewStore = {
  overviewInfo: ComputedRef<Ref<GetOverviewData>>;
  getOverview(params: GetOverviewQuery): Promise<void>;
}

export const useOverviewStore = defineStore<'overview', OverviewStore>('overview', () => {
  const overview = ref<GetOverviewData>();

  const overviewInfo = computed<Ref<GetOverviewData>>(() => overview as Ref<GetOverviewData>);

  const http = computed(() => useHttpStore().instance());

  const getOverview = async (params: GetOverviewQuery) => {
    const response = await overviewApi(http.value).getOverview(params);

    overview.value = response.data;
  }

  return {
    getOverview,
    overviewInfo,
  }
})