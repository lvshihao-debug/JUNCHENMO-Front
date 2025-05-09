<template>
    <div>
        <div v-if="loadingStatus">
            <!--Redis基本信息-->
            <el-row :gutter="10">
                <el-col :span="6">
                    <JcmInfoCard :iconName="'服务器'" :title="'服务信息'" :infoData="cacheMonitorStore?.baseInfo?.server" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard :iconName="'内存'" :title="'内存信息'" :infoData="cacheMonitorStore?.baseInfo?.memory" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard :iconName="'状态'" :title="'状态信息'" :infoData="cacheMonitorStore?.baseInfo?.stats" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard :iconName="'数据库'" :title="'DB 0 信息'" :infoData="cacheMonitorStore?.baseInfo?.db0" />
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <JcmInfoCard :iconName="'其他'" :title="'其他信息'" :infoData="cacheMonitorStore?.baseInfo?.other" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard :iconName="'持久化'" :title="'持久化信息'"
                        :infoData="cacheMonitorStore?.baseInfo?.persistenceInfo" />
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="24">
                            <div class="card-header-style">
                                <div class="card-header">
                                    <span>Redis全部信息</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-card class="card-table-style">
                        <vxe-table border="inner" height="345" :data="cacheMonitorStore.info" empty-text="没有更多数据了！"
                            :scroll-y="{ enabled: true, gt: 0 }">
                            <vxe-column field="configName" title="key" width="300"></vxe-column>
                            <vxe-column field="configValue" title="value"></vxe-column>
                        </vxe-table>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--加载动画-->
        <div class="table-data-loading" v-else>
            <Loading />
        </div>
    </div>
</template>

<script setup lang="ts">
import useCacheMonitorStore from '@/store/modules/montior/cacheMonitor'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const cacheMonitorStore = useCacheMonitorStore()
const layoutSettingStore = useLayoutSettingStore()

onMounted(() => {
    cacheMonitorStore.loading = true
    // setInterval(intervalCacheBaseInfo, 5000)
    cacheMonitorStore.getCacheInfo().then(() => {
        cacheMonitorStore.getCacheBaseInfo().then(() => {
            cacheMonitorStore.loading = false
        });
    });
})
const intervalCacheBaseInfo = () => {
    cacheMonitorStore.getCacheBaseInfo()
}

//页面数据加载的状态
const loadingStatus = computed(() => {
    return !cacheMonitorStore.loading || !layoutSettingStore.setting.dataLoading;
});
</script>
<script lang="ts">
export default {
    name: 'cacheMonitor',
}
</script>
<style lang="scss" scoped></style>
