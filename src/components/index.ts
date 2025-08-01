import SvgIcon from '@/components/Svgicon/index.vue'
//引入element提供的全部图标
import * as ElementPlusIconVue from '@element-plus/icons-vue';
import Category from './Category/index.vue'
const allGlobalComponent = { SvgIcon, Category }

export default {
    install: (app: any) => {
        (Object.keys(allGlobalComponent) as Array<keyof typeof allGlobalComponent>).forEach(key => {
            app.component(key, allGlobalComponent[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconVue)) {
            app.component(key, component)
        }
    }
}
