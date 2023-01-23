import axios from 'axios'
// import router from '@/router'//路由文件
// import { Message } from 'element-ui'
let api_base_url = ''// 请求后端路径
if (process.env.NODE_ENV === 'development') {
    api_base_url = 'http://127.0.0.1:8080/api'
} else if (import.meta.env.NODE_ENV === 'production') {
    api_base_url = 'http://127.0.0.1:8081/api'
}

/*  防止请求重复
1. 我们需要对所有正在进行中的请求进行缓存。在请求发起前判断缓存列表中该请求是否正在进行，如果有则取消本次请求。
2.在任意请求完成后，需要在缓存列表中删除该次请求，以便可以重新发送该请求
*/

//正在请求的API队列
let requestList = []
/**
 * @name:  阻止请求
 * @param {array} requestList 当前API请求队列
 * @param {string} currentUrl  当前请求API
 * @param {function} cancelFn  请求中断函数
 * @param {string} errorMsg   中断错误信息
 */
const stopRepeatRequest = (requestList, currentUrl, cancelFn, errorMsg) => {
    const errorMessage = errorMsg || '请求出错拥堵'
    for (let i = 0; i < requestList.length; i++) {
        if (requestList[i] === currentUrl) {
            cancelFn(errorMessage)
            return
        }
    }
    // 将当前请求加入执行队列
    requestList.push(currentUrl)
}
/**
 * @name:  请求完成后从队列删除当前请求
 * @param {array} requestList 当前API请求队列
 * @param {string} currentUrl  当前请求API
 */
const allowRequest = (requestList, currentUrl) => {
    for (let i = 0; i < requestList.length; i++) {
        if (requestList[i] === currentUrl) {
            requestList.splice(i, 1)
            break
        }
    }
}
let instance = axios.create({
    baseURL: api_base_url,
    timeout: 1000 * 80,
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8',
    // },
})
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// instance.defaults.responseType = 'json'
// instance.defaults.withCredentials = true
// instance.defaults.transformRequest = [
//     data => {
//         return qs.stringify(data)
//     }
// ]
instance.defaults.validateStatus = function () {
    // return status >= 200 && status < 400; // 200- 399  resolve  其他状态码 reject
    // 如果在响应拦截设置了状态码判断，这里设置返回 true
    return true
}
// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 设置cancelToken
        let cancelFn = null;
        config.cancelToken = new axios.CancelToken(function (c) {
            cancelFn = c
        })
        //阻止重复请求
        stopRepeatRequest(requestList, config.url, cancelFn, '不要连续请求：${config.url}，速度太快了')
        //{url: "/slides", method: "get", headers: {…}, baseURL: "http://api.hzwlb.org", transformRequest: Array(1), responseType: "json",…}
        return config
    },
    error => {
        // Message.error({ message: '请求超时!' })
        // console.log('请求超时！');
        return Promise.reject(error)
    }
)
// 响应拦截器即异常处理
// 服务器 Response 对象
instance.interceptors.response.use(
    response => {
        //不得重复发送
        setTimeout(() => {
            allowRequest(requestList, response.config.url), 1000
        })
        // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
        let data = response.data     //响应的数据部分(服务器返回部分)
        let status = response.status  //标准状态码
        if (status === 200) {  //如果响应正常则放行 数据
            return Promise.resolve(data)
        }
        else if (status >= 400 && status <= 499) {
            // Message.error({ message: '客户端请求错误!' })
            console.log('客户端请求错误码：', status);
            return
        }
        else {
            //其他错误
            // Message.error({ message: response.statusText })
            // console.log('服务器错误,错误码：', status);
            // return Promise.reject(response)
            if (axios.isCancel(thrown)) {
                console.log(thrown.message);
            } else {
                return Promise.reject(response)
            }
        }
    },
    error => {
        console.log('响应错误信息：')
        console.log(error.message)
    }
)
let api = {}
api.get = function (url, data) {
    console.log(data)
    console.log(data.BlogId)
    return new Promise((resolve, reject) => {
        instance
            .get(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
api.post = function (url, data) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
export default api
