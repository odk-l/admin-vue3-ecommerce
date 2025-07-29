<template>
    <el-button size="small" :icon="Refresh" circle></el-button>
    <el-button size="small" :icon="FullScreen" circle></el-button>
    <el-button size="small" :icon="Setting" circle></el-button>
    <!-- 头像 -->
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting, ArrowDown } from '@element-plus/icons-vue';
</script>

<style scoped></style>