import type { categoryObj } from "@/apis/product/attr/type";

export interface CategoryState {
    c1Id: string | number,
    c2Id: string | number,
    c3Id: string | number,
    c1Arr: categoryObj[]
    c2Arr: categoryObj[]
    c3Arr: categoryObj[]
}