import store from "@/store";
import axios from "axios";

// 创建一个axios实例
// 通过axios创建出来的实例跟axios一模一样
// 但是集成了一些配置项
const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
});

request.interceptors.request.use(
  (config) => {
    // config >> 当前配置项
    // 设置token
    // 判断token是否存在
    const token = store.state?.user?.token;

    // 判断token是否存在
    // 存在 >> 添加请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 配置完return >> config配置项
    return config;
  },
  (err) => {
    // 为了报错
    return Promise.reject(err);
  }
);
request.interceptors.request.use();

export default request;
