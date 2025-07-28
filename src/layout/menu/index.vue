<template>
    <el-menu v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path">
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item v-if="!item.meta.hidden" :index="item.children[0].path">
                <span>{{ item.children[0].meta.title }}</span>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu v-if="!item.meta.hidden">
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<script setup lang="ts">
//获取父组件传过来的全部路由数据
defineProps(['menuList'])

</script>
<!-- 递归组件起名 -->
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped></style>