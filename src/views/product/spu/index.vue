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
                                    @click="addSku"></el-button>
                                <el-button type="primary" size="small" icon="Edit" @click="updateSpu(row)"
                                    title="修改SKU"></el-button>
                                <el-popconfirm title="确定删除吗?" @confirm="">
                                    <template #reference>
                                        <el-button type="primary" size="small" icon="Delete"></el-button>
                                    </template>
                                </el-popconfirm>
                                <el-button type="primary" size="small" icon="View" @click="" title="查看SKU"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:currentPage="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                        :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total=total
                        @current-change="changePageNo" @size-change="changePageSize" />
                </el-card>
            </div>
            <spuForm ref="spu" v-show="scene === 0" @changeScene="changeScene"></spuForm>
            <skuForm v-show="scene === 2" @changeScene="changeScene"></skuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { reqHasSpu } from '@/apis/product/spu';
import type { HasSpuResponseData, Records } from '@/apis/product/spu/type';
import useCategoryStore from '@/store/modules/category';
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';

let scene = ref<number>(1)

let pageNo = ref<number>(1)

let pageSize = ref<number>(3)

let records = ref<Records>([])

let CategoryStore = useCategoryStore()

//存储已有的SPU总个数
let total = ref<number>(0)

const spu = ref()

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

const addSku = () => {
    scene.value = 2
}
</script>

<style scoped></style>