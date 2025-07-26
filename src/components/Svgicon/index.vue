<template>
    <div>
        <!-- 这里为什么直接写{ width, height }就可以表示宽高,之前我以为这个只是代表
         变量的数字部分,其实是这个在对象中用了 对象字面量的增强写法,所以才能表示宽高 -->
        <svg class="icon" aria-hidden="true" :style="{ width, height }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'black'
    },
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})
</script>

<style scoped></style>