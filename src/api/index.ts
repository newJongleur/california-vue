import api from "./requests.js";
// 简写的写法
export const getXXX = (id: string) => api.get('/url', id)
// 详细的写法
export const postXXX = (id: string) => api({
    url: '', // 请求地址
    method: 'post', // 请求方式
    params: id // 请求参数
})

// 登录
interface IResponseType<P = {}> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}
interface ILogin {
    token: string;
    expires: number;
}
export const getLogin = (username: string, password: string) => {
    return api<IResponseType<ILogin>>({
        url: '/api/auth/login',
        method: 'post',
        data: {
            username,
            password
        }
    });
};
export const Login = (username: string, password: string) =>
    api.get<IResponseType<ILogin>>(
        '/api/auth/login', {
        username,
        password
    })


// get

// 博客
export const getBlog = (id: string) => api.get('/blog', { id })
// post
export const postBlog = (BlogTitle: string, BlogContext: string) => api.post('/blog/add', { BlogTitle, BlogContext })

export const postLogin = (AccountEmail: string, PasswordHash: string) => api.post('/Login', { AccountEmail, PasswordHash })
