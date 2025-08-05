<template>
    <div>
        <Category :scene="scene" />
        <el-card style="margin: 10px 0px;">
            <div v-show="scene === 1">
                <el-card style="margin: 10px 0px;">
                    <el-button type="primary" size="default" icon="Plus" @click="addSpu"
                        :disabled="CategoryStore.c3Id ? false : true">添加SPU</el-button>
                    <el-table border style="margin: 10px 0;" :data="records">
                        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                        <el-table-column label="SPU名称" width="120px" prop="spuName"></el-table-column>
                        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                        <el-table-column label="SPU操作" width="120px">
                            <template #="{ row }"><!-- row代表已有的属性对象 -->
                                <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                    @click="addSku(row)"></el-button>
                                <el-button type="primary" size="small" icon="Edit" @click="updateSpu(row)"
                                    title="修改SKU"></el-button>
                                <el-popconfirm title="确定删除吗?" @confirm="deleteSpu(row)" width="200px">
                                    <template #reference>
                                        <el-button type="primary" size="small" icon="Delete"></el-button>
                                    </template>
                                </el-popconfirm>
                                <el-button type="primary" size="small" icon="View" @click="findSku(row)"
                                    title="查看SKU列表"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:currentPage="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                        :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total=total
                        @current-change="changePageNo" @size-change="changePageSize" />
                </el-card>
            </div>
            <spuForm ref="spu" v-show="scene === 0" @changeScene="changeScene"></spuForm>
            <skuForm ref="sku" v-show="scene === 2" @changeScene="changeScene"></skuForm>
            <!-- dialog对话框 -->
            <el-dialog v-model="show" title="Sku列表">
                <el-table :data="skuArr">
                    <el-table-column label="SKU名字" prop="spuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SPU重量" prop="weight"></el-table-column>
                    <el-table-column label="SPU图片">
                        <template #="{ row }">
                            <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/apis/product/spu';
import type { HasSpuResponseData, Records, SkuData, SPUdata } from '@/apis/product/spu/type';
import useCategoryStore from '@/store/modules/category';
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
import { ElMessage } from 'element-plus';

let scene = ref<number>(1)

let pageNo = ref<number>(1)

let pageSize = ref<number>(3)

let records = ref<Records>([])

let CategoryStore = useCategoryStore()

//存储已有的SPU总个数
let total = ref<number>(0)

let skuArr = ref<any>([])
//控制sku数据的显示与隐藏
let show = ref<boolean>(false)

const spu = ref()
const sku = ref()

const getSPU = async (pager = 1) => {
    pageNo.value = pager
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, CategoryStore.c3Id)
    if (result.code === 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}

watch(() => CategoryStore.c3Id, () => {
    if (CategoryStore.c3Id) {
        getSPU()
    }
})

//对于当前页码发生变化的自定义时间,组件pagination向父组件回传了数据(当前页码)不太明白
const changePageNo = () => {
    //当前页码变化
    getSPU(pageNo.value)
}
//当下拉菜单数值发生变化时会触发此方法,组件pagination向父组件回传了数据(会将下拉菜单选中的数值返回)
const changePageSize = () => {
    getSPU()
}

const addSpu = () => {
    scene.value = 0
    //调用子组件的方法初始化数据
    spu.value.initAddSpu(CategoryStore.c3Id)
}

const updateSpu = (row: any) => {
    scene.value = 0
    //获取spu组件实例上的方法调用实例中的函数
    spu.value.initHasSpuData(row)
}

const changeScene = ({ flag, params }: any) => {
    //子组件点击取消变成场景1:展示已有的spu
    scene.value = flag
    //再次获取全部的SPU
    if (params === 'update') {
        //更新留在当前页
        getSPU(pageNo.value)
    } else if (params === 'add') {
        //添加留在第一页
        getSPU()
    }
}

const addSku = (row: any) => {
    sku.value.initSkuData(CategoryStore.c1Id, CategoryStore.c2Id, row)
    scene.value = 2
}

const findSku = async (row: any) => {
    let result = await reqSkuList((row.id as number))
    if (result.code === 200) {
        skuArr.value = result.data
        show.value = true
    }
}

const deleteSpu = async (row: SPUdata) => {
    let result = await reqRemoveSpu((row.id as number))
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getSPU(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
</script>

<style scoped></style>