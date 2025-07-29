<template>
    <router-view v-slot="{ Component }">
        <!-- 过渡动画效果 -->
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting';
import { watch, ref, nextTick } from 'vue';

const SettingStore = useSettingStore()
//监听仓库内部数据是否发生变化,如果发生变化说明用户点击了刷新按钮
//销毁和重建是通过子路由上的v-if实现的
let flag = ref(true)
watch(() => SettingStore.refresh, () => {
    flag.value = false
    //销毁完毕后再创建出来
    nextTick(() => {
        flag.value = true;
    })
})
</script>

<style scoped lang="scss"></style>