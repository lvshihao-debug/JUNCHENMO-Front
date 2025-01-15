<template>
    <div class="fade">
        <el-card class="searchCard">
            <el-form :inline="true" :model="sysLogininforStore.searchForm" class="searchForm" label-position="right"
                label-width="auto" ref="searchFormRef">
                <el-row>
                    <el-form-item label="用户账号" prop="userName">
                        <el-input v-model="sysLogininforStore.searchForm.userName" placeholder="请输入用户账号" clearable
                            @keyup.enter="refresh" />
                    </el-form-item>
                    <el-form-item label="登录IP地址" prop="ipaddr">
                        <el-input v-model="sysLogininforStore.searchForm.ipaddr" placeholder="请输入登录IP地址" clearable
                            @keyup.enter="refresh" />
                    </el-form-item>
                    <el-form-item label="登录状态" prop="status">
                        <el-select v-model="sysLogininforStore.searchForm.status" placeholder="请选择登录状态" clearable>
                            <el-option v-for="dict in loadDictDataByName('loginStatus')" :key="dict.value"
                                :label="dict.description" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="more" label="操作系统" prop="os">
                        <el-input v-model="sysLogininforStore.searchForm.os" placeholder="请输入操作系统" clearable
                            @keyup.enter="refresh" />
                    </el-form-item>
                    <el-form-item v-show="more" label="访问时间" prop="loginTime">
                        <el-date-picker v-model="loginTimeRange" type="datetimerange" range-separator="-"
                            value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss" />
                    </el-form-item>
                    <div style="margin-left: auto" class="card-search-end">
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="resetSearchForm(searchFormRef)">
                            <template #icon>
                                <svg-icon name="擦除" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="refresh()">
                            <template #icon>
                                <svg-icon name="搜索" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="more = true" v-show="!more">
                            <template #icon>
                                <svg-icon name="展开" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="more = false" v-show="more">
                            <template #icon>
                                <svg-icon name="收起" />
                            </template>
                        </JcmButton>
                    </div>
                </el-row>
            </el-form>
        </el-card>

        <el-row>
            <el-col :span="24">
                <div class="card-header-style">
                    <div class="card-header">
                        <span>系统访问记录列表</span>
                    </div>
                    <div class="card-end">
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="exportData()">
                            <template #icon>
                                <svg-icon name="导出excel" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="clearItems()">
                            <template #icon>
                                <svg-icon name="清空" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="deleteItems()">
                            <template #icon>
                                <svg-icon name="垃圾桶" />
                            </template>
                        </JcmButton>
                    </div>
                </div>
            </el-col>
        </el-row>


        <el-card class="card-table-style">
            <el-table :data="sysLogininforStore.dataList.list" table-layout="auto"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="用户账号" align="center" prop="userName" />
                <el-table-column label="浏览器类型" align="center" prop="browser" />
                <el-table-column label="操作系统" align="center" prop="os" />
                <el-table-column label="登录状态" align="center" prop="status">
                    <template #default="scope">
                        <template v-if="Number(scope.row.status) === 0">
                            <el-tag checked size="small">
                                成功
                            </el-tag>
                        </template>
                        <template v-if="Number(scope.row.status) === 1">
                            <el-tag checked size="small" color="#393e46">
                                失败
                            </el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="提示消息" align="center" prop="msg" />
                <el-table-column label="请求时间" align="center" prop="loginTime" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.loginTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="留痕地址" align="center" prop="ipaddr">
                    <template #default="scope">
                        <span style="font-size: 13px;">{{ scope.row.loginLocation }}</span><br />
                        <span @click="(instance?.proxy as any).$copyText(scope.row.ipaddr)" class="copy-span"
                            style="font-size: 12px;color: rgb( 134,144,156 );">{{ scope.row.ipaddr }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <div class="pagination-style">
                    <!--分页-->
                    <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
                        :default-page-size="Number(layoutSettingStore.setting.size)"
                        layout="total, sizes, prev, pager, next, jumper" :total="sysLogininforStore.dataList.total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </template>
        </el-card>

    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import API_ENUM from '@/enum/api-enum'
//仓库
import useDictDataStore from '@/store/modules/acl/dictData'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useSysLogininforStore from '@/store/modules/log/logininfor'

const dictDataStore = useDictDataStore()
const layoutSettingStore = useLayoutSettingStore();
const sysLogininforStore = useSysLogininforStore();

//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();
//更多按钮状态
const more = ref(false)
//登录时间范围
const loginTimeRange = ref([])

onMounted(() => {
    const searchForm = sysLogininforStore.searchForm;
    instance?.proxy?.$resetObj(searchForm);
    //进入页面初始化的数据 手动触发更新页数的逻辑
    handleSizeChange(Number(layoutSettingStore.setting.size));

    //初始化字典数据
    loadDictData()
})


//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
    sysLogininforStore.dataList.page = currentPage
    refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
    sysLogininforStore.dataList.size = pageSize
    refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
    sysLogininforStore.multipleSelection = val
}

//删除多个sysLogininfor触发的事件
const deleteItems = () => {
    if (sysLogininforStore.multipleSelection.length == 0) {
        ElMessage.warning({ message: '请选择要删除的数据' })
        return;
    }
    const infoIds = sysLogininforStore.multipleSelection.map((item: any) => item.infoId).join(',');
    sysLogininforStore.del(infoIds).then(() => {
        refresh();
    })
}

//刷新数据方法
const refresh = () => {
    const searchQuery = sysLogininforStore.searchForm;
    const page = sysLogininforStore.dataList.page;
    const size = sysLogininforStore.dataList.size;
    (instance?.proxy as any).$addPage(searchQuery, page, size);
    (instance?.proxy as any).$addDateRange(searchQuery, loginTimeRange.value, 'LoginTime');
    sysLogininforStore.list(searchQuery);
}

//清空操作日志数据
const clearItems = () => {
    sysLogininforStore.clear().then(() => {
        refresh();
    })
}

//导出操作日志数据
const exportData = () => {
    const searchQuery = sysLogininforStore.searchForm;
    const url = `${API_ENUM.SERVER_MODE_NAME.SYS_LOGININFOR}/export`;
    (instance?.proxy as any).$download(url, {
        ...searchQuery,
    }, `logininfor_${new Date().getTime()}.xlsx`);
}

//加载所需要的字典数据
const loadDictData = () => {
    const dictNamesStr = 'loginStatus,';
    const dictNames = dictNamesStr.substring(0, dictNamesStr.length - 1).split(",");
    dictDataStore
        .dictDataInfoList(dictNames)
        .then((resp) => {
            sysLogininforStore.dictData = resp.data
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}
//根据名称加载字典数据
const loadDictDataByName = (name: string) => {
    return sysLogininforStore.dictData.filter((item: any) => item.name === name)
}
//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
    if (!ruleFormRef) return
    ruleFormRef.resetFields()
    loginTimeRange.value = []
}
</script>
<script lang="ts">
export default {
    name: 'logininfor',
}
</script>
<style scoped></style>