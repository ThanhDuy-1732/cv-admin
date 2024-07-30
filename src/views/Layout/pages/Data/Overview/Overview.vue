<template>
  <div class="flex flex-col">
    <Title>Overview</Title>
    <Table
      :data="dataSource"
      :columns="OVERVIEW_COLUMNS"
    />
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted } from 'vue';

  // Stores
  import { useOverviewStore } from './services/overview.store';

  // Constants
  import { OVERVIEW_COLUMNS } from '@/constants/table';

  const overviewStore = useOverviewStore();

  const dataSource = computed(() => overviewStore.overviewInfo?.value?.overview);

  onMounted(() => {
    overviewStore.getOverview({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './Overview.scss';
</style>