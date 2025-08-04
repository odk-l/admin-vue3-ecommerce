<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="请你输入名称" v-model=""></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-input placeholder="价格(元)" v-model="" type="number"></el-input>
            </el-form-item>

            <el-form-item label="重量">
                <el-input placeholder="重量(g)" v-model="" type="number"></el-input>
            </el-form-item>

            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" v-model="" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item label="内存">
                        <el-select placeholder="请选择">
                            <el-option></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-select v-model="" placeholder="请选择">
                            <el-option v-for="(item) in " :key="item.id" :label="item.tmName" :value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-select v-model="" placeholder="请选择">
                            <el-option v-for="(item) in " :key="item.id" :label="item.tmName" :value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="内存">
                        <el-select v-model="" placeholder="请选择">
                            <el-option v-for="(item) in " :key="item.id" :label="item.tmName" :value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-select v-model="" placeholder="请选择">
                            <el-option v-for="(item) in " :key="item.id" :label="item.tmName" :value=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-select v-model="" placeholder="请选择">
                            <el-option v-for="(item) in " :key="item.id" :label="item.tmName" :value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="销售属性">
                <el-form>
                    <el-item-form label="">
                        <el-select placeholder="请选择品牌">
                            <el-option></el-option>
                        </el-select>
                    </el-item-form>
                </el-form>
            </el-form-item>

            <el-form-item label="图片名称">
                <el-table border>
                    <el-table-column type="selection" align="center" width="80px"></el-table-column>
                    <el-table-column label="图片"></el-table-column>
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                </el-table>
            </el-form-item>

            <el-form-column>
                <el-button type="primary" size="default">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-column>
        </el-form>
    </div>
</template>

<script setup lang="ts">
let $emit = defineEmits(['changeScene']);

const cancel = () => {
    $emit('changeScene', { flag: 1, params: '' })
}
</script>

<style scoped></style>