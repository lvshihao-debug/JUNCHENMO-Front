<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="7">
                <el-card class="card-table-style">
                    <template #header>
                        <div class="card-header-style">
                            <div class="card-header">
                                <span>缓存列表</span>
                            </div>
                        </div>
                    </template>
                    <vxe-table border="inner" height="550" :data="cacheListStore.dictData" :row-config="{ height: 30 }"
                        show-overflow empty-text="没有更多数据了！" :column-config="{ resizable: true }"    @cell-click="cellClickEvent"
                        :scroll-y="{ enabled: true, gt: 0 }">
                        <vxe-column type="seq" width="70"></vxe-column>
                        <vxe-column field="value" title="缓存名称"  align="center"  width="120"></vxe-column>
                        <vxe-column field="description" title="备注"  align="center"  width="110"></vxe-column>
                        <vxe-column field="flag1" title="操作" width="80" :cell-render="btnGroupCellRender"></vxe-column>
                    </vxe-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="card-table-style">
                    <template #header>
                        <div class="card-header-style">
                            <div class="card-header">
                                <span>键名列表</span>
                            </div>
                        </div>
                    </template>
                    <vxe-table border="inner" height="550" :data="cacheListStore.KeysData" :row-config="{ height: 30 }"
                        show-overflow empty-text="没有更多数据了！" :column-config="{ resizable: true }"
                        :scroll-y="{ enabled: true, gt: 0 }">
                        <vxe-column type="seq" width="70"></vxe-column>
                        <vxe-column field="keyName" title="缓存键名"  width="280" align="center"></vxe-column>
                        <vxe-column field="flag1" title="操作"  align="center" width="80" :cell-render="btnGroupCellRender"></vxe-column>
                    </vxe-table>

                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="card-table-style">
                    <template #header>
                        <div class="card-header-style">
                            <div class="card-header">
                                <span>缓存内容</span>
                            </div>
                        </div>
                    </template>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import type { VxeColumnPropTypes } from 'vxe-table'
import { VxeUI } from 'vxe-pc-ui'
import { VxeTableEvents } from 'vxe-table'
//仓库
import useDictDataStore from '@/store/modules/dictData'
import useCacheListStore from '@/store/modules/montior/cacheList'

const dictDataStore = useDictDataStore()
const cacheListStore = useCacheListStore()

onMounted(() => {
    //初始化字典数据
    loadDictData()
});

//加载所需要的字典数据
const loadDictData = () => {
    const dictNames = ['RedisCacheKey']
    dictDataStore
        .dictDataInfoList(dictNames)
        .then((resp) => {
            cacheListStore.dictData = resp.data
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}
const cellClickEvent: VxeTableEvents.CellClick<any> = ({ row, column }) => {
    cacheListStore
        .getKeyCacheList(row.value)
        .then((resp) => {
            cacheListStore.KeysData = resp
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}


const btnGroupCellRender = reactive<VxeColumnPropTypes.CellRender<any>>({
    name: 'VxeButtonGroup',
    props: {
        mode: 'text'
    },
    options: [
        { content: '删除', status: 'error', name: 'del' }
    ],
    events: {
        click(cellParams, params) {
            console.log(cellParams, params)
            VxeUI.modal.message({
                content: `点击了 ${params.name}`,
                status: 'success'
            })
        }
    }
})


</script>
<script lang="ts">
export default {
    name: 'cacheList',
}
</script>
<style scoped></style>