<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-row>
                    <el-col :span="24">
                        <div class="card-header-style">
                            <div class="card-header">
                                <svg-icon name="缓存列表" :color="layoutSettingStore.getThemeInvert" :width="12"
                                    :height="12" />
                                <span style="margin-left: 5px;">缓存列表</span>
                            </div>
                            <div class="card-end">
                                <svg-icon name="刷新" :color="layoutSettingStore.getThemeInvert" :width="13"
                                    style="cursor: pointer;" :height="13" @click="refreshKeyName()" />
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-card class="card-table-style">
                    <vxe-table border="inner" height="550" width="100%" :data="cacheListStore.dictData" align="center"
                        empty-text="没有更多数据了！" @cell-click="cacheNameClick" :scroll-y="{ enabled: true, gt: 0 }">
                        <vxe-column type="seq" width="70"></vxe-column>
                        <vxe-column field="value" title="缓存名称" resizble="false"></vxe-column>
                        <vxe-column field="description" title="备注" width="110"></vxe-column>
                        <vxe-column field="flag1" title="操作" width="80">
                            <template #default="{ row }">
                                <el-button size="small" type="primary" @click.stop="deleteCacheNameClick(row.value)"
                                    text>
                                    删除
                                </el-button>
                            </template>
                        </vxe-column>
                    </vxe-table>
                </el-card>
            </el-col>
            <el-col :span="8">

                <el-row>
                    <el-col :span="24">
                        <div class="card-header-style">
                            <div class="card-header">
                                <svg-icon name="缓存KEY" :color="layoutSettingStore.getThemeInvert" :width="12"
                                    :height="12" />
                                <span style="margin-left: 5px;">键名列表</span>
                            </div>
                            <div class="card-end">
                                <svg-icon name="刷新" :color="layoutSettingStore.getThemeInvert" :width="13"
                                    style="cursor: pointer;" :height="13" @click="refreshKeyNameKey()" />
                            </div>
                        </div>
                    </el-col>
                </el-row>


                <el-card class="card-table-style">
                    <vxe-table border="inner" height="550" :data="cacheListStore.cacheNameData" empty-text="没有更多数据了！"
                        :scroll-y="{ enabled: true, gt: 0 }" @cell-click="cacheNameKeyClick">
                        <vxe-column type="seq" width="70"></vxe-column>
                        <vxe-column field="keyName" title="缓存键名" align="center"></vxe-column>
                        <vxe-column field="flag1" title="操作" align="center" width="80">
                            <template #default="{ row }">
                                <el-button size="small" type="primary" @click.stop="deleteCacheKeyClick(row.keyName)"
                                    text>
                                    删除
                                </el-button>
                            </template>
                        </vxe-column>
                    </vxe-table>
                </el-card>
            </el-col>
            <el-col :span="8">

                <el-row>
                    <el-col :span="24">
                        <div class="card-header-style">
                            <div class="card-header">
                                <span>缓存内容</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-card class="card-table-style">
                    <el-form :inline="true" label-position="right" label-width="auto" ref="searchFormRef"
                        style="height: 550px;">
                        <el-form-item label="缓存名称" prop="username">
                            <el-input v-model="cacheListStore.viewData.cacheName" disabled />
                        </el-form-item>
                        <el-form-item label="缓存键名" prop="nickname">
                            <el-input v-model="cacheListStore.viewData.cachekeyName" disabled />
                        </el-form-item>
                        <el-form-item label="缓存内容" prop="status" disabled></el-form-item>
                        <!-- json 查看器模态框 -->
                        <editor v-model="cacheListStore.viewData.context" readonly="true" height="390px"
                            :theme="layoutSettingStore.getThemeStatus" />
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { VxeTableEvents } from 'vxe-table'
//仓库
import useDictDataStore from '@/store/modules/acl/dictData'
import useCacheListStore from '@/store/modules/montior/cacheList'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const layoutSettingStore = useLayoutSettingStore()
const dictDataStore = useDictDataStore()
const cacheListStore = useCacheListStore()

onMounted(() => {
    //初始化字典数据
    loadDictData()
})



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



const refreshKeyName = () => {
    loadDictData();
    ElMessage.success({ message: "缓存列表刷新成功" })
}

const refreshKeyNameKey = () => {
    if (cacheListStore.viewData.cacheName != "") {
        getCacheName(cacheListStore.viewData.cacheName);
    }
    ElMessage.success({ message: "缓存键名刷新成功" })
}


const cacheNameClick: VxeTableEvents.CellClick<any> = ({ row, column }) => {
    cacheListStore.viewData.cacheName = row.value
    cacheListStore.viewData.cachekeyName = ""
    cacheListStore.viewData.context = ""
    getCacheName(row.value)
}

const getCacheName = (cacheName: string) => {
    cacheListStore
        .getKeyCacheList(cacheName)
        .then((resp) => {
            cacheListStore.cacheNameData = resp
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}


const cacheNameKeyClick: VxeTableEvents.CellClick<any> = ({ row, column }) => {
    cacheListStore.viewData.cachekeyName = row.keyName
    getCacheNameKey(row.keyName)
}


const getCacheNameKey = (keyName: string) => {
    cacheListStore
        .getKeyDataCache(cacheListStore.viewData.cacheName + keyName)
        .then((resp) => {
            cacheListStore.viewData.context = JSON.stringify(resp, undefined, 4);
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}

//删除缓存名称
const deleteCacheNameClick = (keyName: string) => {

    cacheListStore
        .deleteRedisKeys(keyName)
        .then((resp) => {
            refreshKeyNameKey();
            cacheListStore.viewData.cachekeyName = ""
            cacheListStore.viewData.context = ""
            ElMessage.success({ message: keyName + ":前缀名称的缓存删除成功" })
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}
//删除缓存键名
const deleteCacheKeyClick = (key: string) => {
    cacheListStore
        .deleteRedisDelKey(cacheListStore.viewData.cacheName + key)
        .then((resp) => {
            cacheListStore.viewData.cachekeyName = ""
            cacheListStore.viewData.context = ""
            getCacheName(cacheListStore.viewData.cacheName)
            ElMessage.success({ message: key + ":缓存删除成功" })
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}
</script>
<script lang="ts">
export default {
    name: 'cacheList',
}
</script>
<style scoped>
.el-form-item {
    width: 100%;

    .el-input {
        width: 100%;
    }
}
</style>
