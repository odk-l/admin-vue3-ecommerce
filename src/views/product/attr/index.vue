<template>
    <div>
        <Category :scene="scene" />
        <div v-show="scene">
            <el-card>
                <el-button type="primary" size="default" icon="Plus" @click="addAttr">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-tag v-for="(item) in row.attrValueList" :key="item.id" style="margin: 5px;">{{
                                item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row }"><!-- row代表已有的属性对象 -->
                            <el-button type="primary" size="small" icon="Edit" @click="updateAttr()"></el-button>
                            <el-button type="primary" size="small" icon="Delete" @click="deleteAttr"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div v-show="!scene">
            <el-card style="margin-top: 10px;">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default"
                    @click="addAttrValue" icon="Plus">添加属性值</el-button>
                <el-button type="primary" size="default" @click="cancel" icon="Plus">取消</el-button>
                <el-table style="margin: 10px 0;" border :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-input v-if="row.flag" :ref="(vc: any) => inputArr[$index] = vc"
                                @blur="toLook(row, $index)" placeholder="输入属性值名称" v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{ row, index }">
                            <el-button type="primary" size="small" icon="Delete"
                                @click="attrParams.attrValueList.splice(index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

import { reqAttr, reqAddOrUpdateAttr } from '@/apis/product/attr';
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData, Attr } from '@/apis/product/attr/type';
import { ref, nextTick } from 'vue';
import { ElMessage } from 'element-plus';


let CategoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([]);
//定义卡片组件内容切换变量
let scene = ref(true);

//收集新增的属性的数据
let attrParams = reactive<Attr>({
    attrName: "",//新增的属性名字
    attrValueList: [],//新增属性值数组
    categoryId: '',//三级分类的id
    categoryLevel: 3//代表的是三级分类
})

let inputArr = ref<any>([])

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

const updateAttr = () => {
    scene.value = !scene.value;
}

const deleteAttr = () => {

}

const addAttr = () => {
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: CategoryStore.c3Id,
        categoryLevel: 3
    })
    scene.value = !scene.value;
}

const addAttrValue = () => {
    //点击添加属性值按钮的时候,向数组添加一个属性值对
    attrParams.attrValueList.push({
        valueName: '',
        flag: true
    })
    //获取最后的el-inout组件使他聚焦
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}

const cancel = () => {
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: CategoryStore.c3Id,
        categoryLevel: 3
    })
    scene.value = !scene.value;
}

const save = async () => {
    let result: any = await reqAddOrUpdateAttr(attrParams)
    if (result.code === 200) {
        scene.value = true
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
}

const toLook = (data: any, $index: number) => {
    if (data.valueName.trim() === '') {
        attrParams.attrValueList.splice($index, 1)
        //提示信息
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }

    let repeat = attrParams.attrValueList.find((item) => {
        if (item != data) {
            //加这个判断是为了不和自己本身比较名字是不是相同
            return item.valueName === data.valueName
        }
    })

    if (repeat) {
        //将重复的属性值从数组中删除
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return;
    }

    data.flag = false
}

const toEdit = (data: any, $index: number) => {
    data.flag = true
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
</script>

<style scoped></style>