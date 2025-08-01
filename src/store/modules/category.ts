//商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/apis/product/attr";
import type { CategoryResponseData } from "@/apis/product/attr/type";
import type { CategoryState } from "./types/type";

let useCategoryStore = defineStore('Category', {
    state: (): CategoryState => {
        return {
            c1Arr: [],
            c2Arr: [],
            c3Arr: [],
            c1Id: '',
            c2Id: '',
            c3Id: ''
        }
    },
    actions: {
        async getC1() {
            let result1: CategoryResponseData = await reqC1()
            if (result1.code === 200) {
                this.c1Arr = result1.data;
            }
        },
        async getC2() {
            let result2: CategoryResponseData = await reqC2(this.c1Id)
            if (result2.code === 200) {
                this.c2Arr = result2.data;
            }
        },
        async getC3() {
            let result3: CategoryResponseData = await reqC3(this.c2Id)
            if (result3.code === 200) {
                this.c3Arr = result3.data;
            }
        },
    },
    getters: {

    }
})

export default useCategoryStore;