<template>
    <div>
        <el-card class="box-card">
            <!-- 添加品牌的按钮 -->
            <el-button type="primary" size="default" icon="Plus" style="color: white;padding: 0 10px;"
                @click="addTrademark">添加品牌</el-button>
            <!-- 表格组件用于展示数据 -->
            <el-table style="margin: 10px 0;" border :data="trademarkArr">
                <!-- table:border 设置表格纵向是否有边框
             table-column--label某一列的标题,width某一列的宽度,align设置一列的对齐方式
            -->
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <!-- table-column:默认展示数据用的是div -->
                <!-- 不想用div,比如想使用插槽, -->
                <el-table-column label="品牌名称">
                    <template #="{ row }">
                        <pre>{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row }">
                        <img :src="row.logoUrl" alt="NUll" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件 -->
            <el-pagination v-model:currentPage="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
                @current-change="changePageNo" @size-change="changePageSize" />
        </el-card>
        <!-- 对话框组件 -->
        <!-- v-model控制对话框的显示和隐藏 true显示 false隐藏
      title:设置对话框左上角标题 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 80%;">
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="80px">
                    <!-- 
                action:上传图片需要发请求,action后面是请求地址
                 -->
                    <!-- <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload> -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :on-error="handleAvatarError"
                        :before-upload="beforeAvatarUpload" name="file">

                        <!-- 显示当前状态用于调试 -->
                        <div style="margin-bottom: 10px; font-size: 12px; color: #999;">
                            调试信息: logoUrl = {{ trademarkParams.logoUrl || '未设置' }}
                        </div>

                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"
                            @load="() => console.log('✅ 图片加载成功')" @error="(e) => console.error('❌ 图片加载失败:', e)" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽footer -->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
//引入请求
import { reqHasTrademark, reqAddOrUpdataTrademark } from '@/apis/product/trademark'
import type { Records, TradeMark, TradeMarkResponseData } from '@/apis/product/trademark/type'
import { ElMessage, type UploadProps } from 'element-plus'
//当前页码
let pageNo = ref<number>(1)
//每页展示多少数据
let limit = ref<number>(3)
//存储已有品牌数据的总量
let total = ref<number>(0)
//存储已有品牌数据
let trademarkArr = ref<Records>([])
//通过接口获取商品数据封装成一个函数
//控制对话框的显示和隐藏的属性
let dialogFormVisible = ref(false)
//定义一个收集品牌数据的值
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
const getHasTrademark = async (pager = 1) => {
    //为什么可以这样做,因为当刷新或者size变化时pager就是默认值为1,如果是触发的currentchange那么
    //由于这个方法会给事件的回调注入页码,所以pager就是实际跳转的页码
    pageNo.value = pager
    console.log(pageNo.value, limit.value)
    try {
        const result = await reqHasTrademark(pageNo.value, limit.value)
        if (result.code === 200) {
            total.value = result.data.total
            trademarkArr.value = result.data.records
        } else {
            ElMessage.error(result.message || '获取数据失败')
        }
    } catch (error) {
        ElMessage.error('网络请求失败')
        console.error('获取商标数据失败:', error)
    }
}

onMounted(() => {
    getHasTrademark();
})


//对于当前页码发生变化的自定义时间,组件pagination向父组件回传了数据(当前页码)不太明白
const changePageNo = () => {
    //当前页码变化
    getHasTrademark(pageNo.value)
}
//当下拉菜单数值发生变化时会触发此方法,组件pagination向父组件回传了数据(会将下拉菜单选中的数值返回)
const changePageSize = () => {
    //当前每一页的数据量发生变化时,当前页码归一
    /* pageNo.value=1; */ //这样写是可以的
    getHasTrademark()
}

const addTrademark = () => {
    dialogFormVisible.value = true;
}
//修改已有品牌按钮
const updateTrademark = (data: TradeMark) => {
    dialogFormVisible.value = true
    trademarkParams.logoUrl = data.logoUrl
    trademarkParams.tmName = data.tmName
    trademarkParams.id = data.id
}

// 重置表单数据,关闭时重置表单
const resetForm = () => {
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    trademarkParams.id = 0
}

const cancel = () => {
    dialogFormVisible.value = false
    resetForm()
}

const confirm = async () => {
    dialogFormVisible.value = false
    let result = await reqAddOrUpdataTrademark(trademarkParams)
    if (result.code === 200) {
        dialogFormVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        //更新数据
        getHasTrademark(trademarkParams.id ? pageNo.value : 1)
        resetForm()
    } else {
        dialogFormVisible.value = false
        ElMessage({
            type: 'error',
            message: '添加失败'
        })
        resetForm()
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //钩子是在图片上传之前触发,上传文件之前可以约束上传文件大小和类型
    //要求上传格式必须是png,jpg,gif, 4M
    console.log(rawFile.type)
    if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件格式务必png|jpg|gif'
        })
        return false;
    }

}


//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    //收集上传图片的地址,添加一个新的品牌的时候带给服务
    trademarkParams.logoUrl = response.data
}

const handleAvatarError: UploadProps['onError'] = (error, uploadFile) => {
    console.log('=== 上传失败 ===')
    console.error('错误信息:', error)

    // 解析错误信息
    let errorMessage = '上传失败'
    try {
        const errorObj = JSON.parse(error.message)
        errorMessage = errorObj.message || '服务器内部错误，请稍后重试'
    } catch (e) {
        errorMessage = '服务器异常，请联系管理员'
    }

    ElMessage({
        type: 'error',
        message: errorMessage,
        duration: 5000
    })
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>