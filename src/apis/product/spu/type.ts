import type { ResponseData } from "../trademark/type"

export interface SPUresponse {
    code: number,
    message: string,
    ok: boolean,
}

export interface SPUdata {
    id?: number,
    spuName: string,
    current?: number,
    pages?: number,
    description: string,
    category3Id: number | string,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImg[],
}

export type Records = SPUdata[]
export interface HasSpuResponseData extends SPUresponse {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}

//所有品牌数据的ts类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string
}

//品牌接口返回的数据ts类型
export interface AllTradeMark extends ResponseData {
    data: Trademark[]
}

//商品图片的ts类型
export interface SpuImg {
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuid?: number,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string
}

//已有的SPU的照片墙数据的类型
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

//已有的销售属性值对象的ts类型
export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null
}

//存储已有的销售属性值数组类型
export type spuSaleAttrValueList = SaleAttrValue[]

//销售属性对象的ts类型
export interface SaleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId?: number | string,
    saleAttrValueName?: string,
    saleAttrName?: string,
    spuSaleAttrValueList?: spuSaleAttrValueList,
    flag?: boolean
}

//spu已有的销售属性接口返回数据ts类型
export interface SaleArrtResponseData extends ResponseData {
    data: SaleAttr[]
}

//已有的全部spu的返回数据ts类型
export interface HasSaleAttr {
    id: number,
    name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}