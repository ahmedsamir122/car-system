import axios from "axios";
import { URL } from "../utils/url";

const api = axios.create({
  baseURL: URL,
});
const isTokenExpired = () => {
  const tokenExpiredDate = localStorage.getItem("expiresin");

  return Date.now() > Number(tokenExpiredDate);
};
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresin");
      localStorage.removeItem("user");

      window.location.href = "/signin";
      return;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!token) {
    window.location.href = "/signin";
    return;
  }

  return config;
});
export default api;
