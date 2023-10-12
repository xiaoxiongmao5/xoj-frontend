import axios from "axios";
import router from "@/router";

const isDev = process.env.NODE_ENV === "development";

axios.defaults.baseURL = isDev
  ? "http://localhost:8091"
  : "http://60.204.157.168:8091";
axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.baseURL = isDev
      ? "http://localhost:8091"
      : "http://60.204.157.168:8091";
    config.withCredentials = true;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("响应拦截器,response=", response);
    // 服务端判断未登录
    if (response.data.code == 401) {
      router.push({
        path: `/user/login`,
      });
      return response;
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
