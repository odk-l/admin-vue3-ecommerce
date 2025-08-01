import type { ResponseData } from "../trademark/type"


export interface responseData {
    code: number,
    message: string,
    ok: boolean
}

export interface categoryObj {
    id: number,
    name: string,
    category1Id?: number,
    category2Id?: number
}



export interface CategoryResponseData extends responseData {
    data: categoryObj[],
}


export interface Attr {
    id: number,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList: AttrValueList
}

export interface AttrValue {
    id: number,
    valueName: string,
    attrId: number
}

export type AttrValueList = AttrValue[]

export interface AttrResponseData extends ResponseData {
    data: Attr[]
}