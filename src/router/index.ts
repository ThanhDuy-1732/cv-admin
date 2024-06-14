// Utilities
import * as process from 'process';

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// Stores
import { ApiError } from '@/store/http.store';
import { useAuthStore } from '@/store/auth.store';

// Constants
import { HTTP_STATUS } from '@/constants/http';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    redirect: '/auth/login',
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ "../views/Auth/Auth.vue"),
    children: [
      {
        name: 'Login',
        path: 'login',
        component: import(/* webpackChunkName: "Login" */ "../views/Auth/pages/Login/Login.vue"),
      }
    ]
  },
  {
    path: '/',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "layout" */ "../views/Layout/Layout.vue"),
    children: [
      {
        name: 'Home',
        path: '',
        component: import(/* webpackChunkName: "Home" */ "../views/Layout/pages/Home/Home.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const AuthRoute = ['Auth', 'Login'];

router.beforeEach(async (to, from, next) => {
  try {
    const authStore = useAuthStore();
  
    if(AuthRoute.includes(to.name as string)) {
      return next();
    }
  
    if (to.meta.requiresAuth) {
      await authStore.getMe();
  
      if (authStore.user) {
        return next();
      }
    }
  
    next({ name: 'Login' })
  } catch (error) {
    if(ApiError.isApiError(error) && to.meta.requiresAuth && error.status === HTTP_STATUS.UNAUTHORIZED) {
      next({ name: 'Login' })
    }
  }
})

export default router;
