<template>
  <div class="flex flex-col">
    <Title>Skills</Title>
    <Table 
      :data="dataSource"
      :columns="SKILL_COLUMNS"
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'skills'">
          <ul>
            <li v-for="(skill, index) of value" :key="index">
              {{ skill.content }}
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
  import { useSkillStore } from './services/skill.store';

  // Constants
  import { SKILL_COLUMNS } from '@/constants/table';

  const skillStore = useSkillStore();

  const dataSource = computed(() => skillStore.listSkill?.value?.skills);

  onMounted(() => {
    skillStore.getSkills({
      limit: 10,
      offset: 0,
    })
  })
</script>

<style lang="scss" scoped>
  @import './Skills.scss';
</style>