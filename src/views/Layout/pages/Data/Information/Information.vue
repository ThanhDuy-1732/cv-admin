<template>
  <div class="flex flex-col">
    <Title>Information</Title>
    <Table
      :data="dataSource"
      :columns="INFORMATION_COLUMNS"
    />
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted } from 'vue';

  // Stores
  import { useInfoStore } from './services/info.store';

  // Constants
  import { INFORMATION_COLUMNS } from '@/constants/table';

  const infoStore = useInfoStore();

  const dataSource = computed(() => infoStore.listInformationData?.value?.information);

  onMounted(() => {
    infoStore.getInfo({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './Information.scss';
</style>