<template>
    <template v-for="(item) in menuList" :key="item.path">

        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </template>

        <template v-if="item.children && item.children.length === 1">
            <el-menu-item v-if="!item.meta.hidden" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <span>{{ item.children[0].meta.title }}</span>
            </el-menu-item>
        </template>

        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>

    </template>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
//获取父组件传过来的全部路由数据
defineProps(['menuList'])

let $router = useRouter();
/* 这个vc获取到的究竟是什么 */
const goRoute = (vc: any) => {
    $router.push(vc.index)
}

</script>
<!-- 递归组件起名 -->
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped></style>