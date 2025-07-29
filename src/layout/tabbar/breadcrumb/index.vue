<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right:10px;" @click="iconChange">
        <component :is="SettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/modules/setting'

/* 点击图标的方法 */
/* let fold =ref(false) */
/* 由于多个组件受是否折叠的影响,所以是否折叠的变量可以
放在pinia仓库中,这样所有的组件都从仓库中获取数据的话数据就是
同步的 */
const SettingStore = useSettingStore()

const iconChange = () => {
    SettingStore.fold = !SettingStore.fold
}
</script>

<style scoped></style>