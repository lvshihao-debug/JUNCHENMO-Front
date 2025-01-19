<template>
    <div class="fade">
        <el-card class="searchCard">
            <el-form :inline="true" :model="sysUserTaskStore.searchForm" class="searchForm" label-position="right"
                label-width="auto" ref="searchFormRef">
                <el-row>
                    <el-form-item label="任务标题" prop="title">
                        <el-input v-model="sysUserTaskStore.searchForm.title" placeholder="请输入任务标题" clearable
                            @keyup.enter="refresh" />
                    </el-form-item>
                    <el-form-item prop="taskTimeRange" label="任务日期">
                        <el-date-picker v-model="taskTimeRange" type="datetimerange" range-separator="-"
                            value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss" />
                    </el-form-item>
                    <el-form-item v-show="more" label="任务优先级" prop="priority">
                        <el-select v-model="sysUserTaskStore.searchForm.priority" placeholder="请选择任务优先级" clearable>
                            <el-option v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysUserTaskStore,'taskPriority')" :key="dict.value"
                                :label="dict.description" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="more" label="任务状态" prop="status">
                        <el-select v-model="sysUserTaskStore.searchForm.status" placeholder="请选择任务状态" clearable>
                            <el-option v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysUserTaskStore,'taskStatus')" :key="dict.value"
                                :label="dict.description" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="more" label="任务类型" prop="type">
                        <el-select v-model="sysUserTaskStore.searchForm.type" placeholder="请选择任务类型" clearable>
                            <el-option v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysUserTaskStore,'taskType')" :key="dict.value"
                                :label="dict.description" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="more" label="用户名称" prop="userId">
                        <el-select v-model="sysUserTaskStore.searchForm.userId" placeholder="请输入执行任务的用户" clearable>
                            <el-option v-for="user in sysUserTaskStore.userOptions" :key="user.userId"
                                :label="user.username" :value="user.userId" />
                        </el-select>
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
                        <span>用户任务列表</span>
                    </div>
                    <div class="card-end">
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="exportData()">
                            <template #icon>
                                <svg-icon name="导出excel" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="taskAddFromModal?.open()">
                            <template #icon>
                                <svg-icon name="加号" />
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
            <el-table :data="sysUserTaskStore.dataList.list" table-layout="auto"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="执行人" align="center" prop="username" />
                <el-table-column label="标题" align="center" prop="title" width="250">
                    <template #default="scope">
                        <el-tooltip class="box-item" effect="dark" :content="scope.row.title" placement="top">
                            <div class="ellipsis-text">{{ scope.row.title }}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="优先级" align="center" prop="priority" width="80">
                    <template #default="scope">
                        <template v-if="scope.row.priority === 0">
                            <el-tag checked type="info">{{ getStrByPriority(scope.row.priority) }} </el-tag>
                        </template>
                        <template v-if="scope.row.priority === 1">
                            <el-tag checked type="warning">{{ getStrByPriority(scope.row.priority) }} </el-tag>
                        </template>
                        <template v-if="scope.row.priority === 2">
                            <el-tag checked type="danger">{{ getStrByPriority(scope.row.priority) }} </el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="status" width="80">
                    <template #default="scope">
                        <el-tag checked size="small">{{ getStrByStatus(scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center" prop="type" width="80">
                    <template #default="scope">
                        <el-tag checked size="small">{{ getStrByType(scope.row.type) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="任务日期" align="center" prop="startDate" width="380">
                    <template #default="scope">
                        <span>{{ scope.row.startDate }} - {{ scope.row.endDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="taskUpdateFromModal?.open(scope.row)" text>
                            编辑
                        </el-button>
                        <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <div class="pagination-style">
                    <!--分页-->
                    <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
                        :default-page-size="Number(layoutSettingStore.setting.size)"
                        layout="total, sizes, prev, pager, next, jumper" :total="sysUserTaskStore.dataList.total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </template>
        </el-card>

        <TaskAddFromModal ref="taskAddFromModal"></TaskAddFromModal>
        <TaskUpdateFromModal ref="taskUpdateFromModal"></TaskUpdateFromModal>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
import API_ENUM from '@/enum/api-enum'
//弹出窗
import TaskAddFromModal from './components/task-add-from-modal.vue'
import TaskUpdateFromModal from './components/task-update-from-modal.vue'
//仓库
import useDictDataStore from '@/store/modules/acl/dictData'
import useUserStore from '@/store/modules/user/user'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useSysUserTaskStore from '@/store/modules/acl/task'

const dictDataStore = useDictDataStore()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore();
const sysUserTaskStore = useSysUserTaskStore();

//task弹出窗对象
const taskAddFromModal = ref<FromModal>()
const taskUpdateFromModal = ref<FromModal>()

//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();
//更多按钮状态
const more = ref(false)
//任务时间范围
const taskTimeRange = ref([])


onMounted(() => {
    const searchForm = sysUserTaskStore.searchForm;
    instance?.proxy?.$resetObj(searchForm);
    //进入页面初始化的数据 手动触发更新页数的逻辑
    handleSizeChange(Number(layoutSettingStore.setting.size));
    userStore.optionSelect().then((resp) => {
        sysUserTaskStore.userOptions = resp.data
    })
    //初始化字典数据
    loadDictData()
})


//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
    sysUserTaskStore.dataList.page = currentPage
    refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
    sysUserTaskStore.dataList.size = pageSize
    refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
    sysUserTaskStore.multipleSelection = val
}

//删除sysUserTask触发的事件
const deleteItem = (item: any) => {
    sysUserTaskStore
        .del(item.taskId)
        .then(() => {
            refresh();
        })
}

//删除多个sysUserTask触发的事件
const deleteItems = () => {
    if (sysUserTaskStore.multipleSelection.length == 0) {
        ElMessage.warning({ message: '请选择要删除的数据' })
        return;
    }
    const taskIds = sysUserTaskStore.multipleSelection.map((item: any) => item.taskId).join(',');
    sysUserTaskStore.del(taskIds).then(() => {
        refresh();
    })
}

//刷新数据方法
const refresh = () => {
    const searchQuery = sysUserTaskStore.searchForm;
    const page = sysUserTaskStore.dataList.page;
    const size = sysUserTaskStore.dataList.size;
    searchQuery.startDate = taskTimeRange.value[0];
    searchQuery.endDate = taskTimeRange.value[1];
    (instance?.proxy as any).$addPage(searchQuery, page, size);
    sysUserTaskStore.list(searchQuery);
}

//导出操作日志数据
const exportData = () => {
    const searchQuery = sysUserTaskStore.searchForm;
    searchQuery.startDate = taskTimeRange.value[0];
    searchQuery.endDate = taskTimeRange.value[1];
    const url = `${API_ENUM.SERVER_MODE_NAME.SYS_USER_TASK}/export`;
    (instance?.proxy as any).$download(url, {
        ...searchQuery,
    }, `task_${new Date().getTime()}.xlsx`);
}

//加载所需要的字典数据
const loadDictData = () => {
    const dictNamesStr = 'taskPriority,taskStatus,taskType,';
    const dictNames = dictNamesStr.substring(0, dictNamesStr.length - 1).split(",");
    dictDataStore
        .dictDataInfoList(dictNames)
        .then((resp) => {
            sysUserTaskStore.dictData = resp.data
        })
        .catch((error) => {
            ElMessage.error({ message: error })
        })
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
    if (!ruleFormRef) return;
    ruleFormRef.resetFields();
    taskTimeRange.value = [];
}

//根据状态值转化为状态标签
const getStrByStatus = (type: any) => {
    switch (type) {
        case 0:
            return '未开始';
        case 1:
            return '进行中';
        case 2:
            return '已完成';
        default:
            return '未知状态';
    }
}

//根据状态值转化为优先级
const getStrByPriority = (type: any) => {
    const typeNumber = Number.parseInt(type);
    switch (typeNumber) {
        case 0:
            return '一般';
        case 1:
            return '中等';
        case 2:
            return '紧急';
    }
}

//根据状态值转化为任务类型
const getStrByType = (type: any) => {
    const typeNumber = Number.parseInt(type);
    switch (typeNumber) {
        case 0:
            return '修复bug';
        case 1:
            return '修复bug';
    }
}

</script>
<script lang="ts">
export default {
    name: 'task',
}
</script>
<style scoped>
.ellipsis-text {
    /* 确保可以设置宽度等样式，对于行内元素生效 */
    max-width: 200px;
    /* 根据需要设置最大宽度，超出此宽度的文本将被省略 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>