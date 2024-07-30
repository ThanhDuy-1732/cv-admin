// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue"

// APIs
import { GetProjectsData, GetProjectsQuery, projectApi } from "./project.api"

// Stores
import { useHttpStore } from "@/store/http.store";

type ProjectStore = {
  listProject: ComputedRef<Ref<GetProjectsData>>;
  getProjects(params: GetProjectsQuery): Promise<void>;
}

export const useProjectStore = defineStore<'project', ProjectStore>('project', () => {
  const projects = ref<GetProjectsData>();

  const listProject = computed<Ref<GetProjectsData>>(() => projects as Ref<GetProjectsData>);

  const http = computed(() => useHttpStore().instance());

  const getProjects = async (params: GetProjectsQuery) => {
    const response = await projectApi(http.value).getAllProjects(params);

    projects.value = response.data;
  }

  return {
    listProject,
    getProjects,
  }
})