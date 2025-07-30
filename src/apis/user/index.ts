//统一管理项目用户相关接口
import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from "./type";


const LOGIN_URL = "/admin/acl/index/login"
const USERINFO_URL = "/admin/acl/index/info"
const LOGOUT_URL = "/admin/acl/index/logout"


export const reqLogin = (data: any) => {
    return request.post<any, any>(LOGIN_URL, data)
}

export const reqUserInfo = () => {
    return request.get<any, any>(USERINFO_URL)
}

export const reqLogout = () => {
    return request.post<any, any>(LOGOUT_URL)
}