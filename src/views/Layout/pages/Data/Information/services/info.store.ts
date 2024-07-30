import { computed, ComputedRef, ref, Ref } from "vue"
import { GetInfoData, GetInfoQuery, infoApi } from "./info.api"
import { defineStore } from "pinia";
import { useHttpStore } from "@/store/http.store";

type InfoStore = {
  getInfo(params: GetInfoQuery): Promise<void>;
  listInformationData: ComputedRef<Ref<GetInfoData>>;
}

export const useInfoStore = defineStore<'information', InfoStore>('information', () => {
  const information = ref<GetInfoData>();

  const listInformationData = computed<Ref<GetInfoData>>(() => information as Ref<GetInfoData>);

  const http = computed(() =>  useHttpStore().instance());

  const getInfo = async (params: GetInfoQuery) => {
    const response = await infoApi(http.value).getInfo(params);
    information.value = response.data;
  }

  return {
    getInfo,
    listInformationData,
  }
})