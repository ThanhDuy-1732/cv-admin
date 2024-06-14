// Stores
import { useHttpStore } from '@/store/http.store';

const httpStore = useHttpStore();

const http = httpStore.instance;

export { http };