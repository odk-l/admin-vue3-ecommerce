//统一管理项目用户相关接口
import request from "@/utils/request";
import type { loginForm, loginResponseData } from "./type";

export default {

    reqLogin(data: loginForm) {
        return request.post<any, loginResponseData>('user/login', data)
    },

    reqUserInfo() {
        return request.get<any, loginResponseData>('user/info')
    }
}