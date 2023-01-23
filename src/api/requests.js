import axios from "axios";

const api_base_url = 'http://127.0.0.1:8080/api'
// const api_base_url_dev = process.env.VUE_APP_BASE_API
const api = axios.create({
    baseURL: api_base_url, // 请求后端地址
    timeout: 600 * 5, // 超时的设置
    // withCredentials: true, // 异步请求携带cookie
    headers: {
        'X-Custom-Header': 'foobar',
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        // 'token': 'your token',
        'X-Requested-With': 'XMLHttpRequest',
    }
});
// 请求拦截器
api.interceptors.request.use(config => {
    console.log(config);
    return config // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
}, err => {
    // 请求发生错误时的相关处理 抛出错误
    Promise.reject(err)
})
// 响应拦截器及异常处理
api.interceptors.response.use(res => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    console.log(res)
    // 2xx 范围内的状态码都会触发该函数。
    return Promise.resolve(res)
}, err => {
    // 服务器响应发生错误时的处理
    // 超出 2xx 范围的状态码都会触发该函数。
    Promise.reject(err)
})

export default api