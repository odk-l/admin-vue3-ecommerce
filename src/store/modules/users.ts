//用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin } from '@/apis/user'
import type { loginForm, loginResponseData } from "@/apis/user/type";
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";

const useUserStore = defineStore('User', {
    state: () => {
        // define your state properties here, e.g. userInfo: null
        return {
            token: GET_TOKEN()
        }
    },
    actions: {
        // define your actions here
        //async返回promise对象
        async userLogin(data: loginForm) {
            let result: loginResponseData = await reqLogin(data);
            //如果登录成功在pinia仓库中存储token
            console.log(result)
            if (result.code === 200) {
                this.token = (result.data.token as string)
                //本地存储,持久化
                SET_TOKEN((result.data.token as string));
                //保证promise函数返回成功的promise
                return 'ok';
            } else {
                return Promise.reject(new Error())
            }
        }
    },
    getters: {
        // define your getters here
    }
})

export default useUserStore;