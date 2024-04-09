import axios from "axios";

const BASE_URL = "http://localhost:8069/api";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Добавление интерцептора запроса
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавление интерцептора ответа
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Проверяем код ошибки и наличие флага повтора запроса
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем запрос как пытающийся повториться
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // Отправляем запрос на обновление токена
        const response = await instance.post("/auth/access", { refreshToken });
        // Сохраняем новый access токен
        localStorage.setItem("accessToken", response.data.accessToken);
        // Устанавливаем новый access токен в заголовки и повторяем исходный запрос
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token, please log in again", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/log";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
