// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue"

// APIs
import { educationApi, GetEducationData, GetEducationQuery } from "./education.api"

// Stores
import { useHttpStore } from "@/store/http.store";

type EducationStore = {
  educationInfo: ComputedRef<Ref<GetEducationData>>;
  getEducation(param: GetEducationQuery): Promise<void>;
}

export const useEducationStore = defineStore<'education', EducationStore>('education', () => {
  const educations = ref<GetEducationData>();

  const educationInfo = computed<Ref<GetEducationData>>(() => educations as Ref<GetEducationData>);

  const http = computed(() => {
    return useHttpStore().instance();
  })

  const getEducation = async (param: GetEducationQuery) => {
    const response = await educationApi(http.value).getEducation(param);
    educations.value = response.data;
  }

  return {
    getEducation,
    educationInfo,
  }
})