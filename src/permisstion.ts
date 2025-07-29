//路由鉴权
//即项目中的路由能不能被访问的设置(某一个路由什么条件下可以访问)
import router from "./routers";
import nprogress from 'nprogress'
//引入进度条的样式
import "nprogress/nprogress.css"

//全局守卫:项目中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
    //访问某个路由之前触发
    //to:你要访问哪个路由
    //from: 你从哪个路由而来
    //next: 路由的放行函数
    nprogress.start()
    next()
})
//全局后置守卫
router.afterEach(() => {
    nprogress.done()
})

//任意路由的切换实现进度条业务