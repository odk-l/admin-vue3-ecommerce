//书写品牌管理模块的接口
import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";


const TARDEMARK_URL = "/admin/product/baseTrademark/"
export const reqHasTrademark = (page: number, limit: number) => {
    return request.get<any, TradeMarkResponseData>(TARDEMARK_URL + `${page}/${limit}`);
}

export const reqAddOrUpdataTrademark = (data: TradeMark) => {
    if (data.id) {
        return request.put<any, any>('/admin/product/baseTrademark/update', data)
    } else {
        return request.post<any, any>('/admin/product/baseTrademark/save', data)
    }
}