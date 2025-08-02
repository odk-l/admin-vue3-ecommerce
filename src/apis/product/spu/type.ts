export interface SPUresponse {
    code: number,
    message: string,
    ok: boolean,
}

export interface SPUdata {
    id?: number,
    spuName: string,
    current: number,
    pages: number,
    description: string,
    category3Id: number | string,
    tmId: number,
    spuSaleAttrList: null,
    spuImageList: null,
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