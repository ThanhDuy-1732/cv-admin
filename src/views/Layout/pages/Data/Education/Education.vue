<template>
  <div class="flex flex-col">
    <Title>Education</Title>
    <Table
      :columns="EDUCATION_COLUMNS"
      :data="dataSource"
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'subInfo'">
          <div v-for="(info, index) of value" :key="index">
            {{ info?.content }}
          </div>
        </template>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted } from 'vue';

  // Stores
  import { useEducationStore } from './services/education.store';

  // Constants
  import { EDUCATION_COLUMNS } from '@/constants/table';

  const educationStore = useEducationStore();
  const educations = computed(() => educationStore.educationInfo);

  const dataSource = computed(() => educations.value?.value?.educations);

  onMounted(() => {
    educationStore.getEducation({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './Education.scss';
</style>