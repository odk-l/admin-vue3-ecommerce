<template>
    <div>
        <el-card>
            <el-table border style="margin: 10px 0;" :data="skuArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="名称" width="100px" prop="spuName" show-overflow-tooltip></el-table-column>
                <el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="图片">
                    <template #default="{ row }">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="重量" prop="weight" show-overflow-tooltip></el-table-column>
                <el-table-column label="价格" prop="price" show-overflow-tooltip></el-table-column>
                <el-table-column label="SPU操作" width="120px" fixed="right">
                    <template #="{ row }"><!-- row代表已有的属性对象 -->
                        <el-button type="primary" size="small" :icon="row.isSale === 1 ? 'Bottom' : 'Top'" title="添加SKU"
                            @click="updateSale(row)"></el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
                        <el-button type="primary" size="small" icon="InfoFilled" @click="findSKu(row)"></el-button>
                        <el-popconfirm title="确定删除吗?" @confirm="removeSku(row.id)" width="200px">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total=total
                @current-change="changePageNo" @size-change="changePageSize" />
            <el-drawer v-model="drawer">
                <template #header>
                    <h4>查看商品的详情</h4>
                </template>
                <template #default>
                    <el-row style="margin:10px 0px;">
                        <el-col :span="6">名称</el-col>
                        <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                    </el-row>
                    <el-row style="margin:10px 0px;">
                        <el-col :span="6">描述</el-col>
                        <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                    </el-row>
                    <el-row style="margin:10px 0px;">
                        <el-col :span="6">平台属性</el-col>
                        <el-col :span="18">
                            <el-tag style="margin: 5px;" v-for="(item) in skuInfo.skuAttrValueList" :key="item.id">{{
                                item.valueName }}</el-tag>
                        </el-col>
                    </el-row>
                    <el-row style="margin:10px 0px;">
                        <el-col :span="6">销售属性</el-col>
                        <el-tag style="margin: 5px;" v-for="(item) in skuInfo.skuSaleAttrValueList" :key="item.id">{{
                            item.saleAttrValueName }}</el-tag>
                    </el-row>
                    <el-row style="margin:10px 0px;">
                        <el-col :span="6">商品图片</el-col>
                        <el-col :span="18">
                            <el-carousel :interval="4000" type="card" height="200px">
                                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                    <img :src="item.imgUrl" alt="" style="width:100%;height: 100%;">
                                </el-carousel-item>
                            </el-carousel>
                        </el-col>
                    </el-row>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqCancelSale, reqSaleSku, reqSkuInfo, reqSkuList, reqRemoveSku } from '@/apis/product/sku';
import type { SkuResponseData, SkuData, SkuInfoData } from '@/apis/product/sku/type';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';

let pageNo = ref(1)
let pageSize = ref(10)

let total = ref(0)
let skuArr = ref<SkuData[]>([])
let skuInfo = ref<any>({})
let drawer = ref(false)


const getSku = async (pager = 1) => {
    pageNo.value = pager
    let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code === 200) {
        total.value = result.data.total
        skuArr.value = result.data.records
    }
}

const changePageNo = () => {
    //当前页码变化
    getSku(pageNo.value)
}
//当下拉菜单数值发生变化时会触发此方法,组件pagination向父组件回传了数据(会将下拉菜单选中的数值返回)
const changePageSize = () => {
    getSku()
}

const updateSale = async (row: any) => {
    if (row.isSale === 0) {
        row.isSale = 1
        await reqSaleSku(row.id)
        ElMessage({
            type: 'success',
            message: '下架成功'
        })
        getSku(pageNo.value)
    } else {
        row.isSale = 0
        await reqCancelSale(row.id)
        ElMessage({
            type: 'success',
            message: '上架成功'
        })
        getSku(pageNo.value)

    }
}

const updateSku = () => {
    ElMessage({
        type: 'success',
        message: '努力更新中'
    })
}
const findSKu = async (row: any) => {
    drawer.value = true
    let result: SkuInfoData = await reqSkuInfo((row.id as number))
    skuInfo.value = result.data
}


const removeSku = async (id: number) => {
    let result: any = await reqRemoveSku(id);
    if (result.code == 200) {
        //提示信息
        ElMessage({ type: 'success', message: '删除成功' });
        //获取已有全部商品
        getSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        //删除失败
        ElMessage({ type: 'error', message: '系统数据不能删除' });
    }
}

onMounted(() => {
    getSku()
})
</script>

<style scoped></style>
