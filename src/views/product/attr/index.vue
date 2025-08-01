<template>
    <div>
        <Category />
        <el-card>
            <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
            <el-table border style="margin: 10px 0;" :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row }">
                        <el-tag v-for="(item, index) in row.attrValueList" :key="item.id" style="margin: 5px;">{{
                            item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row }"><!-- row代表已有的属性对象 -->
                        <el-button type="primary" size="small" icon="Edit"></el-button>
                        <el-button type="primary" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { reqAttr } from '@/apis/product/attr';
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData, Attr } from '@/apis/product/attr/type';
import { ref } from 'vue';
let CategoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([]);
//监听仓库三级分类ID的变化
watch(() => CategoryStore.c3Id, () => {
    //如果三级分类发生变化应该清空上一次查询的属性与属性值
    attrArr.value = []
    if (CategoryStore.c3Id) {
        getAttr()
    }
})

const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = CategoryStore;
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    console.log(result.data)
    if (result.code === 200) {
        attrArr.value = result.data
    }
}
</script>

<style scoped></style>