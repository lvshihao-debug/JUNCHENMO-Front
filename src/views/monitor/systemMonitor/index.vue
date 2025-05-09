<template>
    <div>
        <div v-if="loadingStatus">
            <!--系统基本信息-->
            <el-row :gutter="10">
                <el-col :span="6">
                    <JcmInfoCard iconName="服务器" title="系统信息" :infoData="systemMonitorStore?.baseInfo?.server" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard iconName="cpu" title="系统CPU" :infoData="systemMonitorStore?.baseInfo?.cpu" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard iconName="内存" title="系统内存" :infoData="systemMonitorStore?.baseInfo?.memory" />
                </el-col>
                <el-col :span="6">
                    <JcmInfoCard iconName="内存" title="JVM内存" :infoData="systemMonitorStore?.baseInfo?.jvmMemory" />
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <div class="card-header-style">
                                <div class="card-header">
                                    <span>系统进程信息</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-card class="card-table-style">
                        <vxe-table border="inner" height="345" :data="systemMonitorStore?.baseInfo?.processes"
                            empty-text="没有更多数据了！" :scroll-y="{ enabled: true, gt: 0 }">
                            <vxe-column field="PID" title="PID" width="170"></vxe-column>
                            <vxe-column field="Name" title="Name"></vxe-column>
                            <vxe-column field="%CPU" title="%CPU"></vxe-column>
                            <vxe-column field="%MEM" title="%MEM"></vxe-column>
                            <vxe-column field="VSZ" title="VSZ"></vxe-column>
                            <vxe-column field="RSS" title="RSS"></vxe-column>
                        </vxe-table>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <div class="card-header-style">
                                <div class="card-header">
                                    <span>文件系统信息</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-card class="card-table-style">
                        <vxe-table border="inner" height="200" :data="systemMonitorStore?.baseInfo?.fileSystem"
                            empty-text="没有更多数据了！" :scroll-y="{ enabled: true, gt: 0 }">
                            <vxe-column field="name" title="name" width="170"></vxe-column>
                            <vxe-column field="total_space" title="total_space"></vxe-column>
                            <vxe-column field="usable_space" title="usable_space"></vxe-column>
                            <vxe-column field="usage" title="usage"></vxe-column>
                            <vxe-column field="description" title="description"></vxe-column>
                            <vxe-column field="type" title="type"></vxe-column>

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
import useSystemMonitorStore from '@/store/modules/montior/systemMonitor'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const systemMonitorStore = useSystemMonitorStore()
const layoutSettingStore = useLayoutSettingStore()

onMounted(() => {
    systemMonitorStore.loading = true
    systemMonitorStore.getSystemBaseInfo().then(() => {
        systemMonitorStore.loading = false
    })
})

const intervalSystemBaseInfo = () => {
    systemMonitorStore.getSystemBaseInfo()
}
setInterval(intervalSystemBaseInfo, 5000);
//页面数据加载的状态
const loadingStatus = computed(() => {
    return !systemMonitorStore.loading || !layoutSettingStore.setting.dataLoading;
});
</script>
<script lang="ts">
export default {
    name: 'systemMonitor',
}
</script>
<style lang="scss" scoped></style>
