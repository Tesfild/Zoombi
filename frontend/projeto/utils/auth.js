// utils/auth.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Cria instância do Axios com cookies
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // envia cookies
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Interceptor de respostas
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Tenta atualizar o token via refresh
                await api.post("/usuarios/refresh/");
                processQueue(null);
                return api(originalRequest); // repete a request original
            } catch (refreshError) {
                processQueue(refreshError, null);

                // Limpa os cookies
                document.cookie =
                    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie =
                    "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // Redireciona para login
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// Funções de API
export const registerUser = async (email, password, username) => {
    const response = await api.post("/usuarios/register/", { email, password, username });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post("/usuarios/login/", { email, password });
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/usuarios/logout/");
    return response.data;
};

export const getUserInfo = async () => {
    const response = await api.get("/usuarios/user-info/");
    return response.data;
};
