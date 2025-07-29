<template>
    <router-view v-slot="{ Component }">
        <!-- 过渡动画效果 -->
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss"></style>