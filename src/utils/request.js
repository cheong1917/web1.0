import axios from "axios";
import {toast} from "@/utils/Putil.js";
import {GetToken} from "@/utils/auth.js";
import {useUserinfo} from "@/store/userinfo.js";

const service = axios.create({
    baseURL: "/api"
})

service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    //往header头自动添加token

    const token = GetToken()

    if (token) {
        config.headers["token"] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    const msg = error.response.data.msg || "请求失败"
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const store = useUserinfo()
    if (msg === "非法token，请先登录！") {
        store.logout().finally(() => location.reload())
    }
    toast(msg, "error")
    return Promise.reject(error);
});
export default service