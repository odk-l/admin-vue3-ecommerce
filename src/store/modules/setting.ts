import { defineStore } from "pinia";

export const useSettingStore = defineStore('Setting', {
    state: () => {
        return {
            fold: false,
            /* 与Main和Tabbar有关的数据,控制刷新效果 */
            refresh: false,
        }
    }
})
