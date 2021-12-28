import axios from 'axios'
import router from '@/router/index.js'
const instance = axios.create({
    // baseURL: 'https://dspapi.appletcloud.net',
    // baseURL: 'http://localhost:8080/api',
    baseURL:'http://192.168.0.78:8080/api',
    withCredentials: false,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }

});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    // console.log(config, "请求拦截器")
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(function (response) {
    // console.log(response, "响应拦截器")
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default instance
