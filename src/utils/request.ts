import axios from 'axios'
import { ElMessage } from 'element-plus';
//引入用户相关仓库
import useUserStore from '@/store/modules/users';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    //获取用户相关的小仓库:获取仓库内部token,登录成功后携带给服务器
    const userStore = useUserStore()
    //当然,登录前是没有token的,所以需要判断是否存在token
    if (userStore.token) {
        config.headers.token = userStore.token
    }

    return config;
})

request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    let message = '';
    if (error.response) {
        let status = error.response.status;
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break;
            case 403:
                message = '无权访问'
                break;
            case 404:
                message = '请求地址错误'
                break;
            case 500:
                message = '服务器出现问题'
                break;
            default:
                message = '网络出现问题'
        }
    }
    //提示错误信息
    ElMessage({
        type: 'error',
        message
    });
    return Promise.reject(error)
})

export default request;