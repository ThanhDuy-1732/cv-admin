import { createPinia } from "pinia";

import { deviceStorePlugin } from '@/store/device.store';
import { authStorePlugin } from '@/store/auth.store';

const pinia = createPinia();
pinia.use(deviceStorePlugin);
pinia.use(authStorePlugin);

export default pinia;