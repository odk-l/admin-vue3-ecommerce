//用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from '@/apis/user';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入常量路由
import { routes } from "@/routers";

const useUserStore = defineStore('User', {
    state: () => {
        // define your state properties here, e.g. userInfo: null
        return {
            token: GET_TOKEN(),
            menuRoutes: routes,
            username: '',
            avatar: '',
        }
    },
    actions: {
        // define your actions here
        //async返回promise对象
        async userLogin(data: any) {
            let result: any = await reqLogin(data);
            //如果登录成功在pinia仓库中存储token
            console.log(result)
            if (result.code === 200) {
                this.token = (result.data as string)
                //本地存储,持久化
                SET_TOKEN((result.data as string));
                //保证promise函数返回成功的promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }
        },

        /* 获取用户信息 */
        async userInfo() {
            //获取用户信息储存在仓库中
            let result = await reqUserInfo()
            //如果获取用户信息成功,存储用户信息
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },

        /* 退出登录 */
        userLogout() {
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
        }
    },
    getters: {
        // define your getters here
    }
})

export default useUserStore;