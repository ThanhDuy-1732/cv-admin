<template>
  <div class="flex flex-col">
    <Title>Projects</Title>
    <Table 
      :data="dataSource"
      :columns="PROJECT_COLUMNS"
    />
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted } from 'vue';

  // Stores
  import { useProjectStore } from './services/project.store';

  // Constants
  import { PROJECT_COLUMNS } from '@/constants/table';

  const projectStore = useProjectStore();

  const dataSource = computed(() => projectStore.listProject?.value?.projects);

  onMounted(() => {
    projectStore.getProjects({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './Projects.scss';
</style>