<template>
    <el-button size="small" :icon="Refresh" circle @click="refreshChange"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" :icon="Setting" circle></el-button>
    <!-- 头像 -->
    <img :src="userStore.avatar" style="width: 24px;height: 24px;margin: 0px 10px;border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting, ArrowDown } from '@element-plus/icons-vue';
/* 当组件挂载成功会向服务器发送请求进行展示,当刷新时是把二级路由组件销毁重新创建
重新创建就会再次进行一次挂载,也就会再次向服务器发送请求 */
//获取骨架小仓库
import { useSettingStore } from '@/store/modules/setting';
//获取用户相关的小仓库
import useUserStore from '@/store/modules/users';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

let SettingStore = useSettingStore()
/* 刷新按钮点击回调 */
const refreshChange = () => {
    SettingStore.refresh = !SettingStore.refresh
    /* 一旦refresh的值发生变化,说明点击了刷新,Main会监听是否发生变化,如果发生变化则进行
    一次销毁重建 */
}

/* 全屏按钮点击的回调 */
const fullScreen = () => {
    /* DOM有一个属性可以用来判断是否是全屏
    如果是则为真,不是则为null */
    let full = document.fullscreenElement
    if (!full) {
        /* 如果不全屏则变为全屏 */
        document.documentElement.requestFullscreen();
    } else {
        /* 否则退出全屏 */
        document.exitFullscreen()
    }
}

const userStore = useUserStore()

/* 退出登录点击的回调 */
const $router = useRouter()
const $route = useRoute()
const logout = () => {
    //第一件事,向服务器发请求[退出登录接口],告诉服务器本次登录用到的token失效
    //第二件事,仓库中关于用户相关的数据清除,在仓库做好了
    //第三件事,跳转到登录页面
    userStore.userLogout()//调用仓库中的清除数据方法
    //给跳转的时候给login组件携带query参数,使得下次登录时能够根据query跳转到对应界面
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped></style>