//书写属性api的文件

import request from "@/utils/request";
import type { AttrResponseData, CategoryResponseData, Attr } from "./type";

export const reqC1 = () => {
    return request.get<any, CategoryResponseData>('/admin/product/getCategory1')
}

export const reqC2 = (Category1Id: number | string) => {
    return request.get<any, CategoryResponseData>(`/admin/product/getCategory2/${Category1Id}`)
}

export const reqC3 = (Category2Id: number | string) => {
    return request.get<any, CategoryResponseData>(`/admin/product/getCategory3/${Category2Id}`)
}

//获取分类下已有属性及属性值接口

export const reqAttr = (Category1Id: number | string, Category2Id: number | string, Category3Id: number | string) => {
    return request.get<any, AttrResponseData>(`/admin/product/attrInfoList/${Category1Id}/${Category2Id}/${Category3Id}`)
}

//给某个三级分类添加或者修改属性
export const reqAddOrUpdateAttr = (data: Attr) => {
    return request.post<any, any>('/admin/product/saveAttrInfo', data)
}

//已有属性删除
export const reqRemoveAttr = (attrId: number) => {
    return request.delete<any, any>(`admin/product/deleteAttr/${attrId}`)
}

