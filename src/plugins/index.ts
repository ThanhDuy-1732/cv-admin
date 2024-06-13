/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router/index';
import { createPinia } from 'pinia';

// Types
import type { App } from 'vue';

// Plugin Store
import { deviceStorePlugin, useDeviceStore } from '@/store/device.store';

const pinia = createPinia();
pinia.use(deviceStorePlugin);

export function registerPlugins (app: App) {
  app.use(vuetify)
      .use(router)
      .use(pinia)

  useDeviceStore();
}
