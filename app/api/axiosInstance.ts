import axios from "axios";
import { refreshToken } from "./login/api";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "/api/v2",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  withCredentials: true,
});

// 요청 인터셉터 – accessToken 주입
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 – 401일 경우 토큰 재발급 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한루프 방지
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          useAuthStore.getState().setAuth({
            accessToken: newToken,
            refreshToken: useAuthStore.getState().refreshToken!,
            isRegistered: useAuthStore.getState().isRegistered,
          });

          // 새 토큰으로 Authorization 갱신 후 재요청
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("토큰 갱신 실패", err);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
