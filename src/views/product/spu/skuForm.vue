<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="请你输入名称" v-model="skuParams.skuName"></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
            </el-form-item>

            <el-form-item label="重量">
                <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
            </el-form-item>

            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item) in attrArr" :key="item.id" :label="item.attrName">
                        <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
                            <el-option v-for="(attrValue) in item.attrValueList" :key="attrValue.id"
                                :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item) in saleArr" :key="item.id" :label="item.saleAttrName">
                        <el-select placeholder="请选择" v-model="item.saleIdAndValueId">
                            <el-option v-for="(saleAttrValue) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                                :label="saleAttrValue.valueName"
                                :value="`${item.id}:${item.saleAttrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="图片名称">
                <el-table ref="table" border :data="imgArr">
                    <el-table-column type="selection" align="center" width="80px"></el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row }">
                            <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row }">
                            <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-column>
                <el-button type="primary" size="default" @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-column>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reqAttr } from '@/apis/product/attr';
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/apis/product/spu';
import type { SkuData } from '@/apis/product/spu/type';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

let $emit = defineEmits(['changeScene']);
//平台属性
let attrArr = ref<any>([])
//销售属性
let saleArr = ref<any>([])
//照片墙
let imgArr = ref<any>([])
//收集sku的参数
let skuParams = reactive<SkuData>({
    //父组件传递
    category3Id: '',
    spuId: '',
    tmId: '',
    //v-model收集
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [
        {
            attrId: '',
            valueId: '',
        }
    ],
    skuSaleAttrValueList: [
        {
            saleAttrId: '',
            saleAttrValueId: ''
        }
    ],
    skuDefaultImg: ''
})

//获取table组件实例vc
const table = ref<any>()

const cancel = () => {
    $emit('changeScene', { flag: 1, params: '' })
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    //获取平台属性
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    //获取对应的销售属性
    let result1: any = await reqSpuHasSaleAttr(spu.id)
    //获取照片墙的数据
    let result2: any = await reqSpuImageList(spu.id)
    attrArr.value = result.data
    saleArr.value = result1.data
    imgArr.value = result2.data

    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
}

//设置默认图片的方法回调
const handler = (row: any) => {
    //点击时全部复选框不勾选
    imgArr.value.array.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    });
    //选中的图片才勾选
    table.value.toggleRowSelection(row, true)
    //收集图片地址
    skuParams.skuDefaultImg = row.imgUrl
}

const save = async () => {
    let attrArrs = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    }, [])
    skuParams.skuAttrValueList = attrArrs
    let saleArrs = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    })
    skuParams.skuSaleAttrValueList = saleArrs

    let result: any = await reqAddSku(skuParams);
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
        $emit('changeScene', { flag: 1, params: 'update' })
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }
    //$emit('changeScene', { flag: 1, params: 'update' })
}

defineExpose({ initSkuData })
</script>

<style scoped></style>