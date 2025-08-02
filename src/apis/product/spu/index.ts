import request from "@/utils/request"
import type { HasSpuResponseData } from "./type"

export const reqSPU = (page: number, limit: number, category3Id: number | string) => {
    return request.get<any, HasSpuResponseData>(`/admin/product/${page}/${limit}?category3Id=${category3Id}`)
}