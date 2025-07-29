<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right:10px;" @click="iconChange">
        <component :is="SettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <!-- 面包屑要去动态展示路由名字和标题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
            :to="item.path">
            <!-- 对应图标 -->
            <el-icon style="vertical-align:-20%;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 对应标题 -->
            <span style="margin: 0px 5px;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router';
/* 点击图标的方法 */
/* let fold =ref(false) */
/* 由于多个组件受是否折叠的影响,所以是否折叠的变量可以
放在pinia仓库中,这样所有的组件都从仓库中获取数据的话数据就是
同步的 */
const SettingStore = useSettingStore()

const iconChange = () => {
    SettingStore.fold = !SettingStore.fold
}

let $route = useRoute()
/* const handler = () => {
console.log($route.matched)
} */
</script>

<style scoped></style>