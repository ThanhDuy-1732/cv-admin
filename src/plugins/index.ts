/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router/index';

// Types
import type { App } from 'vue';

// Plugin Store
import pinia from '@/libs/store/index';
import { useAuthStore } from '@/store/auth.store';
import { useDeviceStore } from '@/store/device.store';

export function registerPlugins (app: App) {
  app.use(vuetify)
      .use(pinia)
      .use(router)

  useDeviceStore();
  useAuthStore();
}
