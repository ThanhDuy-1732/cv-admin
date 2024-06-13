/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import 'ant-design-vue/dist/reset.css';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App);

registerPlugins(app)

app.mount('#app')
