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

  const tokenExpiredDate = localStorage.getItem("expiresin");
  const isExpired = tokenExpiredDate && Date.now() > Number(tokenExpiredDate);

  if (!token || isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresin");
    localStorage.removeItem("user");

    // better to NOT redirect here directly
    // just reject request instead
    return Promise.reject("No valid token");
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
export default api;
