<template>
  <div class="menu w-60 h-screen sticky top-0 menu">
    <a-button type="primary" :class="collapsedButtonClass" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
      <div v-show="!state.collapsed">Collapsed Menu</div>
    </a-button>
    <a-menu
      theme="dark"
      mode="inline"
      :items="items"
      v-model:openKeys="state.openKeys"
      :inline-collapsed="state.collapsed"
      v-model:selectedKeys="state.selectedKeys"

      @select="handleItemMenuSelected"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import { reactive, watch, h, computed } from 'vue';

  // Components
  import {
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    UserSwitchOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons-vue';
  import { Menu as AMenu, Button as AButton, ItemType } from 'ant-design-vue';
  
  // Stores
  import { useAuthStore } from '@/store/auth.store';
  import { useDeviceStore } from '@/store/device.store';
  
  // Types
  import { SelectInfo } from 'ant-design-vue/es/menu/src/interface';
  type MenuType = {
    collapsed: boolean;
    openKeys: string[];
    preOpenKeys: string[];
    selectedKeys: string[];
  }

  const authStore = useAuthStore();
  const deviceStore = useDeviceStore();

  const state = reactive<MenuType>({
    openKeys: [],
    preOpenKeys: [],
    collapsed: false,
    selectedKeys: ['1'],
  });

  const items = reactive<ItemType[]>([
    {
      key: '1',
      icon: () => h(HomeOutlined),
      label: 'Home',
      title: 'home',
    },
    {
      key: '2',
      icon: () => h(PieChartOutlined),
      label: 'Data',
      title: 'data',
      children: [
        {
          key: '2-1',
          label: 'Information',
          title: 'information',
        },
        {
          key: '2-2',
          label: 'Overview',
          title: 'overview',
        },
        {
          key: '2-3',
          label: 'Education',
          title: 'education',
        },
        {
          key: '2-4',
          label: 'Work Experience',
          title: 'workExperience',
        },
        {
          key: '2-5',
          label: 'Award',
          title: 'award'
        },
        {
          key: '2-6',
          label: 'Skills',
          title: 'skills'
        },
        {
          key: '2-7',
          label: 'Projects',
          title: 'projects',
        }
      ],
    },
    {
      key: '3',
      icon: () => h(UserSwitchOutlined),
      label: 'User',
      title: 'user',
    },
    {
      key: '4',
      icon: () => h(UserOutlined),
      label: 'Account',
      title: 'account',
    },
    {
      key: '5',
      icon: () => h(LogoutOutlined),
      label: 'Logout',
      title: 'logout',
    }
  ]);
  
  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
  );
  const toggleCollapsed = (): void => {
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
  };

  const collapsedButtonClass = computed<any[]>(() => {
    return [
      'background-dark menu__collapsed',
      {
        'w-20 text-center': state.collapsed,
        'w-full pl-6 text-left flex items-center gap-2.5':!state.collapsed,
      }
    ]
  });

  const handleItemMenuSelected = async (item: SelectInfo): Promise<void> => {
    console.log('selected item', item);
    await authStore.logout();
  }
</script>

<style lang="scss" scoped>
  @import './Menu.scss';
  @import '@/styles/common.scss';
</style>