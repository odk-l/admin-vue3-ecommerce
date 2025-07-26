import SvgIcon from '@/components/Svgicon/index.vue'

const allGlobalComponent = { SvgIcon }

export default {
    install: (app: any) => {
        (Object.keys(allGlobalComponent) as Array<keyof typeof allGlobalComponent>).forEach(key => {
            app.component(key, allGlobalComponent[key]);
        });
    }
}