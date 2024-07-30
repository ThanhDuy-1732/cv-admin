<template>
  <div class="flex flex-col">
    <Title>Work Experience</Title>
    <Table 
      :data="dataSource"
      :columns="WORK_COLUMNS"
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'description'">
          <ul>
            <li v-for="(item, index) of value" :key="index">
              {{ item.content }}
            </li>
          </ul>
        </template>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted } from 'vue';

  // Stores
  import { useWorkStore } from './services/work.store';

  // Constants
  import { WORK_COLUMNS } from '@/constants/table';

  const workStore = useWorkStore();

  const dataSource = computed(() => workStore.listWork?.value?.workExperience);

  onMounted(() => {
    workStore.getWorks({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './WorkExperience.scss';
</style>