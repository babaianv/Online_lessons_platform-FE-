import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8069/api',
    withCredentials: true,
  });
  
  export default instance;

  // instance.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       config.headers["Authorization"] = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );