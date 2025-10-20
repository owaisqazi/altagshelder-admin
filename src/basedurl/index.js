import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "https://alltagshelden.dev-mn.xyz/api/admin/";

const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const Data = error?.response?.data;
    const errors = Data?.errors;
    console.log(error, "errors");
    if (errors) {
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          toast.error(errors[key]);
        }
      }
    } else {
      toast.error(Data.message);
    }
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
