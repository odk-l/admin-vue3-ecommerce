import { defineStore } from "pinia";

export const useSettingStore = defineStore('Setting', {
    state: () => {
        return {
            fold: false,
        }
    }
})
