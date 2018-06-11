import axios from "axios";
import AppConfig from "../commons/config";

const axiosInstance = axios.create({
  baseURL: AppConfig.__APP_API__
});

axiosInstance.interceptors.request.use(
  config => {
    let tempConfig = config;
    let authToken = sessionStorage.getItem("authToken") || '';
    console.log(authToken);
    if (authToken) {
      tempConfig.headers.Authorization = `Bearer ${authToken}`;
    }

    return tempConfig;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
