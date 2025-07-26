import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import globalComponent from '@/components/index'
import '@/styles/index.scss'
import router from "./routers";

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,//国际化配置
})
app.use(globalComponent)
app.use(router)





//最后app.mount
app.mount("#app");