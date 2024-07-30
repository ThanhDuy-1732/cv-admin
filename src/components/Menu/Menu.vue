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
  import { useRouter } from 'vue-router';
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

  // Constants
  import { MENU_KEYS } from '@/constants/menu';
  
  // Types
  import { SelectInfo } from 'ant-design-vue/es/menu/src/interface';
  type MenuType = {
    collapsed: boolean;
    openKeys: string[];
    preOpenKeys: string[];
    selectedKeys: string[];
  }

  const router = useRouter();

  const authStore = useAuthStore();

  const state = reactive<MenuType>({
    openKeys: [],
    preOpenKeys: [],
    collapsed: false,
    selectedKeys: ['1'],
  });

  const items = reactive<ItemType[]>([
    {
      label: 'Home',
      title: 'home',
      key: MENU_KEYS.HOME,
      icon: () => h(HomeOutlined),
    },
    {
      key: MENU_KEYS.DATA.DATA,
      icon: () => h(PieChartOutlined),
      label: 'Data',
      title: 'data',
      children: [
        {
          label: 'Information',
          title: 'information',
          key: MENU_KEYS.DATA.INFORMATION,
        },
        {
          label: 'Overview',
          title: 'overview',
          key: MENU_KEYS.DATA.OVERVIEW,
        },
        {
          label: 'Education',
          title: 'education',
          key: MENU_KEYS.DATA.EDUCATION,
        },
        {
          title: 'workExperience',
          key: MENU_KEYS.DATA.WORK,
          label: 'Work Experience',
        },
        {
          title: 'award',
          label: 'Award',
          key: MENU_KEYS.DATA.AWARD,
        },
        {
          title: 'skills',
          label: 'Skills',
          key: MENU_KEYS.DATA.SKILLS,
        },
        {
          label: 'Projects',
          title: 'projects',
          key: MENU_KEYS.DATA.PROJECTS,
        }
      ],
    },
    {
      label: 'User',
      title: 'user',
      key: MENU_KEYS.USER,
      icon: () => h(UserSwitchOutlined),
    },
    {
      label: 'Account',
      title: 'account',
      key: MENU_KEYS.ACCOUNT,
      icon: () => h(UserOutlined),
    },
    {
      label: 'Logout',
      title: 'logout',
      key: MENU_KEYS.LOGOUT,
      icon: () => h(LogoutOutlined),
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
    switch (item.key) {
      case MENU_KEYS.HOME:
      case MENU_KEYS.USER:
      case MENU_KEYS.ACCOUNT:
        router.push({ name: 'Home' });
        break;
      case MENU_KEYS.LOGOUT:
        await authStore.logout();
        router.push({ name: 'Login' })
        break;
      case MENU_KEYS.DATA.AWARD:
        router.push({ name: 'Award' });
        break;
      case MENU_KEYS.DATA.EDUCATION:
        router.push({ name: 'Education' });
        break;
      case MENU_KEYS.DATA.INFORMATION:
        router.push({ name: 'Information' });
        break;
      case MENU_KEYS.DATA.OVERVIEW:
        router.push({ name: 'Overview' });
        break;
      case MENU_KEYS.DATA.PROJECTS:
        router.push({ name: 'Projects' });
        break;
      case MENU_KEYS.DATA.SKILLS:
        router.push({ name: 'Skills' });
        break;
      case MENU_KEYS.DATA.WORK:
        router.push({ name: 'WorkExperience' });
        break;
    }
  }
</script>

<style lang="scss" scoped>
  @import './Menu.scss';
  @import '@/styles/common.scss';
</style>