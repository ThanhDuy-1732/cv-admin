/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import 'ant-design-vue/dist/reset.css';
import './index.css'
import router from '@/router/index';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App);

registerPlugins(app)

router.isReady().then(() => {
  app.mount('#app');
})

