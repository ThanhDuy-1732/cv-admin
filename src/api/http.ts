// Utilities
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

export { http };