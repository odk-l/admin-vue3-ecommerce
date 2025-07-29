<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登录的表单 -->
                <el-form class="login_form" :model="loginForm" ref="loginForms" :rules="rules">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" color="#409EFF" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
//引入use相关小仓库
import useUserStore from '@/store/modules/users';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
import { useRoute } from 'vue-router';

const loginForm = reactive({ username: '', password: '' })
const userStore = useUserStore();
const $router = useRouter()
let loading = ref(false)
const loginForms = ref()
//路由对象
let $route = useRoute()

const login = async () => {
    await loginForms.value.validate()
    loading.value = true
    //点击登录后,让仓库发请求
    try {
        //请求成功到首页
        await userStore.userLogin(loginForm)
        //为了使点击登录的时候回到原先退出时的那个页面
        //判断是否有query参数有就往query参数跳转,如果没有就到首页
        let redirect: any = $route.query.redirect
        $router.push({ path: redirect || '/' })
        ElNotification({
            type: 'success',
            title: `Hi.${getTime()}好`,
            message: '欢迎回来'
        })
    } catch {
        //请求失败弹出失败信息
        ElNotification({
            type: 'error',
            message: '登录失败',
        })
        loading.value = false
    }
}

//自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即可
    //如果不符合条件,注入错误信息
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号长度至少五位'))
    }
}

const validatorPassName = (rule: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号长度至少六位'))
    }
}

//添加表单校验需要的配置对象
const rules = {
    username: [
        //一个规则就是一个对象
        { trigger: 'change', validator: validatorUserName }
    ],
    password: [
        { trigger: 'change', validator: validatorPassName }
    ]
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>