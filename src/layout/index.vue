<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: SettingStore.fold ? true : false }">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件-->
                <el-menu :collapse="SettingStore.fold" :default-active="$route.path" background-color="#001529"
                    text-color="white">
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: SettingStore.fold ? true : false }">
            <!-- layout组件的顶部导航tabbar -->
            <Tabbar></Tabbar>
        </div>

        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{ fold: SettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Logo from '@/layout/Logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/users';
import Main from '@/layout/main/index.vue'
/* 引入顶部tabbar组件 */
import Tabbar from '@/layout/tabbar/index.vue'
import { useSettingStore } from '@/store/modules/setting';

const userStore = useUserStore()

const $route = useRoute()

const SettingStore = useSettingStore()

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    position: fixed;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }

        &.fold {
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }

    }
}
</style>