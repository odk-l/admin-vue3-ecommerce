//路由鉴权
//即项目中的路由能不能被访问的设置(某一个路由什么条件下可以访问)
import router from "./routers";
import nprogress from 'nprogress'
import setting from "./setting";
//引入进度条的样式
import "nprogress/nprogress.css"
nprogress.configure({ showSpinner: false })

//获取用户相关仓库中的token数据判断用户是否登录成功
import useUserStore from "./store/modules/users";
/* 
直接写userStore=useUserStore()是不行的,因为这个不在组件中
要想使用小仓库要先引入大仓库
 */
import pinia from "./store";

let userStore = useUserStore(pinia)
/* 看不懂为什么要把pinia写进里面 */



//全局守卫:项目中任意路由切换都会触发的钩子
//全局前置守卫
/*  router.beforeEach(async (to: any, from: any, next: any) => { */
/* 处理标签标题 */
/* document.title = `${setting.title}-${to.meta.title}` */
//访问某个路由之前触发
//to:你要访问哪个路由
//from: 你从哪个路由而来
//next: 路由的放行函数
nprogress.start()

//获取用户名字(仓库里面可能有名字也可能没有)
/* let username = userStore.username
if (userStore.token) {
    //登录
    if (to.path === '/login') {
        next({ path: '/home' })
    } else {
        //有用户信息
        if (username) {
            next()
        } else {
            //没有用户信息就获取再放行
            //在这里获取是因为, 除了首页别的页面刷新的话用户数据就会丢失, 
            // 在这里获取每次进入页面之前都可以获取一次,页面就可以得到用户数据
            try {
                //获取用户信息
                await userStore.userInfo();
                next()
            } catch (error) {
                //token过期无法获取信息
                //用户修改本地存储token
                userStore.userLogout()
                next({ path: '/login', query: { redirect: to.path } })

            }
        }
    }
} else {
    //未登录
    if (to.path === '/login') {
        next();
    } else {
        next({ path: '/login' })
    }
}
})  */
//全局后置守卫
router.afterEach(() => {
    nprogress.done()
})

//任意路由的切换实现进度条业务
//路由鉴权问题,路由组件访问权限的限制

//未登录:login,其余均不可
//登录:login不可,其余都可访问