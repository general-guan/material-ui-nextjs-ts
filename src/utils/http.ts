import axios from "axios";

const http = axios.create({
  baseURL: "https://www.jlcsmt.com/api",
});

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
