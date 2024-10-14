import axios from "axios";

const isProduction = import.meta.env.PROD;

// Log which backend URL is being used
console.log(
  "Backend URL:",
  isProduction ? import.meta.env.VITE_BACKEND_URL : "/api"
);

const api = axios.create({
  baseURL: isProduction ? import.meta.env.VITE_BACKEND_URL : "/api",
  withCredentials: true,
});

export default api;
