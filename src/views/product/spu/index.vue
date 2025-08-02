<template>
    <div>
        <Category :scene="scene" />
        <el-card>
            <el-button type="primary" size="default" icon="Plus" @click=""
                :disabled="CategoryStore.c3Id ? false : true">添加SPU</el-button>
            <el-table border style="margin: 10px 0;" :data="records">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="SPU名称" width="120px" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="SPU操作" width="120px">
                    <template #=""><!-- row代表已有的属性对象 -->
                        <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="" title="修改SKU"></el-button>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { reqSPU } from '@/apis/product/spu';
import type { HasSpuResponseData, Records } from '@/apis/product/spu/type';
import useCategoryStore from '@/store/modules/category';

let scene = ref<number>(1)

let pageNo = ref<number>(1)

let pageSize = ref<number>(3)

let records = ref<Records>([])

let CategoryStore = useCategoryStore()

//存储已有的SPU总个数
let total = ref<number>(0)

const getSPU = async (pager = 1) => {
    pageNo.value = pager
    let result: HasSpuResponseData = await reqSPU(pageNo.value, pageSize.value, CategoryStore.c3Id)
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
</script>

<style scoped></style>