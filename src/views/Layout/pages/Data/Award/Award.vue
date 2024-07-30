<template>
  <div class="flex flex-col">
    <Title>Award</Title>
    <Table
      :data="dataSource"
      :columns="AWARDS_COLUMNS"
    />
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted } from 'vue';
  import { useAwardStore } from './services/award.store';

  // Constants
  import { AWARDS_COLUMNS } from '@/constants/table';

  const awardStore = useAwardStore();

  const awards = computed(() => awardStore.listAward);

  const dataSource = computed(() => {
    return awards.value?.value?.awards;
  })

  onMounted(async () => {
    awardStore.getAward({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './Award.scss';
</style>