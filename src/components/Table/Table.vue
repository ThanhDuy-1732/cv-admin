<template>
  <div class="w-full">
    <a-table sticky :columns="columns" :data-source="data" :scroll="{ x: 1500 }" bordered>
      <template #bodyCell="{ column, value }">
        <slot name="cell" :column="column" :value="value" />
        <template v-if="column.key === 'actions'">
          <slot name="action">
            <div class="flex justify-center gap-1">
              <a-button shape="circle" class="flex justify-center" :icon="h(FileDescriptionIcon)" />
              <a-button shape="circle" class="flex justify-center" :icon="h(PencilIcon)" />
            </div>
          </slot>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { FileDescriptionIcon, PencilIcon } from 'vue-tabler-icons'
  import { h } from 'vue';

  // Components
  import { 
    Table as ATable,
    TableColumnType,
    Button as AButton,
  } from 'ant-design-vue';

  export type TableProps = {
    data: Array<any>;
    columns: Array<TableColumnType>;
  };

  withDefaults(defineProps<TableProps>(), { 
    data: () => [],
    columns: () => [],
  });
</script>

<style lang="scss" scoped></style>