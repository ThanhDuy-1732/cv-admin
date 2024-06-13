// Utilities
import * as process from 'process';

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Auth" */ "../views/Auth/Auth.vue"),
    children: [
      {
        path: '',
        component: import(/* webpackChunkName: "Login" */ "../views/Auth/components/Login/Login.vue"),
      }
    ]
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ "../views/Layout/Layout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
