<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>

        <el-form-item label="SPU品牌">
            <el-select v-model="SpuParams.tmId" placeholder="请选择品牌">
                <el-option v-for="(item) in AllTradeMark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请你输入spu的描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible" style="width: 600px; height: 500px;">
                <img w-full :src="dialogImageUrl" alt=" Preview Image" style="width: 100%; height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性" :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : `无`">
            <el-select style="width: 180px;" v-model="saleAttrIdAndValueName">
                <el-option v-for="(item) in unSelectSaleAttr" :label="item.name" :key="item.id"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" type="primary"
                size="default" icon="Plus" style="margin-left: 10px;">添加属性值</el-button>
            <!-- 展示已有销售属性与属性值 -->
            <el-table border style="margin: 10px 0;" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性的名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template #="{ row, $index }">
                        <el-tag v-for="(item) in row.spuSaleAttrList" :key="item.id" style="margin: 5px;"
                            @close="row.spuSaleAttrValueList.splice($index, 1)">{{
                                item.spuSaleAttrValueName }}</el-tag>
                        <el-input v-if="row.flag === true" placeholder="请输入属性值" size="samll" style="width: 100px;"
                            @blur="toLook(row)" v-model="saleAttrValueName"></el-input>
                        <el-button type="primary" size="small" @click="toEdit(row)" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="销售属性操作" width="120px">
                    <template #="{ $index }">
                        <el-button type="primary" size="small" @click="saleAttr.splice($index, 1)"
                            icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button :disabled="(SpuParams.spuSaleAttrList && SpuParams.spuSaleAttrList.length > 0) ? false : true"
                type="primary" size="default" style="margin-left: 10px;" @click="save">保存</el-button>
            <el-button type="primary" size="default" style="margin-left: 10px;" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/apis/product/spu';
import type { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleArrtResponseData, SaleAttr, SaleAttrValue, SPUdata, SpuHasImg, SpuImg } from '@/apis/product/spu/type';
import type { TradeMark } from '@/apis/product/trademark/type';
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue';

let $emit = defineEmits(['changeScene'])

const cancel = () => {
    $emit('changeScene', { flag: 1, params: 'update' })
}

//存储已有的spu数据
let AllTradeMark = ref<TradeMark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])

let SpuParams = ref<SPUdata>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
})

//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//储存预览图片地址
let dialogImageUrl = ref<string>('')
//还未选择的销售属性的id与属性的名字
let saleAttrIdAndValueName = ref<string>('')
//属性值的名字
let saleAttrValueName = ref<string>('')


const initHasSpuData = async (spu: SPUdata) => {
    SpuParams.value = spu
    //spu是父组件传递过来的已有的SPU对象
    //获取全局品牌的数据
    let result: AllTradeMark = await reqAllTradeMark()
    console.log(result.data)
    //获取某个品牌旗下全部售卖商品的图片
    let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
    //获取已有SPU销售属性的数据
    let result2: SaleArrtResponseData = await reqSpuHasSaleAttr(spu.id as number)
    //获取整个项目全部spu销售属性
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr();


    AllTradeMark.value = result.data

    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })

    imgList.value = result1.data
    saleAttr.value = result2.data
    allSaleAttr.value = result3.data
}

//照片墙点击预览(放大镜)的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    //对话框弹出
    dialogVisible.value = true
}
//照片墙删除文件的钩子
const handleRemove = () => {

}
//收集照片墙数据的工作v-model已经做好了

//计算当前spu还未拥有的属性
let unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name === item1.saleAttrValueName
        })
    })
    return unSelectArr;
})

const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')

    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr)
}

const toEdit = (row: SaleAttr) => {
    row.flag = true;
}

const toLook = (row: SaleAttr) => {
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId: row.baseSaleAttrId as number,
        saleAttrValueName: saleAttrValueName.value
    }
    //非法情况判断
    if (newSaleAttrValue.saleAttrValueName === '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
    //判断属性值是狗再数组中存在
    let repeat = row.spuSaleAttrValueList?.find(item => {
        return item.saleAttrValueName === newSaleAttrValue.saleAttrValueName
    })
    if (repeat) {
        return
    }
    row.spuSaleAttrValueList?.push(newSaleAttrValue)
    row.flag = false
    newSaleAttrValue.baseSaleAttrId = 0
    newSaleAttrValue.saleAttrValueName = ''
}

const save = async () => {
    //整理参数
    //1,照片墙
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    //2,属性值
    SpuParams.value.spuSaleAttrList = saleAttr.value
    //发送请求
    let result = await reqAddOrUpdateSpu(SpuParams.value);
    if (result === 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        $emit('changeScene', { flag: 1, params: SpuParams.value.id ? 'update' : 'add' })

    } else {
        ElMessage({
            type: 'error',
            message: '更新失败'
        })
    }
    //$emit('changeScene', 1)
}

//添加一个新的SPU初始化请求的方法
const initAddSpu = async (c3Id: number | string) => {
    Object.assign(SpuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    })
    imgList.value = []
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''
    //储存三级分类的ID
    SpuParams.value.category3Id = c3Id
    let result: AllTradeMark = await reqAllTradeMark()
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr();

    AllTradeMark.value = result.data
    allSaleAttr.value = result3.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>