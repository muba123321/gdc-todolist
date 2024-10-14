import axios from "axios";

const isProduction = import.meta.env.PROD;

const api = axios.create({
  baseURL: isProduction ? import.meta.env.VITE_BACKEND_URL : "/api",
  withCredentials: true,
});

export default api;
