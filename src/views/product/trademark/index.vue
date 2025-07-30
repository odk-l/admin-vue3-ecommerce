<template>
    <el-card class="box-card">
        <!-- 添加品牌的按钮 -->
        <el-button type="primary" size="default" icon="Plus" style="color: white;padding: 0 10px;">添加品牌</el-button>
        <!-- 表格组件用于展示数据 -->
        <el-table style="margin: 10px 0;" border>
            <!-- table:border 设置表格纵向是否有边框
             table-column--label某一列的标题,width某一列的宽度,align设置一列的对齐方式
            -->
            <el-table-column label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="品牌名称"></el-table-column>
            <el-table-column label="品牌LOGO"></el-table-column>
            <el-table-column label="品牌操作"></el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination v-model:currentPage="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="400" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//当前页码
let pageNo = ref<number>(1)
//每页展示多少数据
let limit = ref<number>(3)
</script>

<style scoped></style>