<template>
  <div class="fade">
    <el-card class="searchCard">
      <el-form :inline="true" :model="sysJobLogStore.searchForm" class="searchForm" label-position="right"
        label-width="auto" ref="searchFormRef">
        <el-row>
          <el-form-item label="任务名称" prop="jobName">
            <el-input v-model="sysJobLogStore.searchForm.jobName" placeholder="请输入任务名称" clearable
              @keyup.enter="refresh" />
          </el-form-item>
          <el-form-item label="任务组名" prop="jobGroup">
            <el-select v-model="sysJobLogStore.searchForm.jobGroup" placeholder="请选择任务组名" clearable>
              <el-option v-for="dict in loadDictDataByName('jobTaskGroup')" :key="dict.value" :label="dict.description"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item prop="taskTimeRange" label="执行时间">
            <el-date-picker v-model="jobTaskExecuteTimeRange" type="datetimerange" range-separator="-"
              value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"
              format="YYYY-MM-DD HH:mm:ss" />
          </el-form-item>
          <el-form-item v-show="more" label="执行状态" prop="jobGroup">
            <el-select v-model="sysJobLogStore.searchForm.status" placeholder="请选择执行状态" clearable>
              <el-option v-for="dict in loadDictDataByName('jobTaskLogStatus')" :key="dict.value"
                :label="dict.description" :value="dict.value" />
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
            <span>定时任务调度日志列表</span>
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
      <el-table :data="sysJobLogStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="任务名称" align="center" prop="jobName" />
        <el-table-column label="任务组名" align="center" prop="jobGroup">
          <template #default="scope">
            <el-tag checked>{{ getStrByJobGroup(scope.row.jobGroup) }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="调用目标字符串" align="center" prop="invokeTarget" />
        <el-table-column label="日志信息" align="center" prop="jobMessage" />
        <el-table-column label="执行状态" align="center" prop="status">
          <template #default="scope">
            <el-tag checked>{{ getStrByStatus(scope.row.status) }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="执行时间" align="center" prop="executeTime" width="180">
          <template #default="scope">
            <span>{{ scope.row.executeTime }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template #default="scope">
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
            layout="total, sizes, prev, pager, next, jumper" :total="sysJobLogStore.dataList.total"
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
import useSysJobLogStore from '@/store/modules/log/jobTaskLog'

const dictDataStore = useDictDataStore()
const layoutSettingStore = useLayoutSettingStore();
const sysJobLogStore = useSysJobLogStore();

//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();
//更多按钮状态
const more = ref(false)
//定时任务执行时间范围
const jobTaskExecuteTimeRange = ref([])


onMounted(() => {
  const searchForm = sysJobLogStore.searchForm;
  instance?.proxy?.$resetObj(searchForm);
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size));

  //初始化字典数据
  loadDictData()
})


//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  sysJobLogStore.dataList.page = currentPage
  refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  sysJobLogStore.dataList.size = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  sysJobLogStore.multipleSelection = val
}

//删除sysJobLog触发的事件
const deleteItem = (item: any) => {
  sysJobLogStore
    .del(item.jobLogId)
    .then(() => {
      refresh();
    })
}

//删除多个sysJobLog触发的事件
const deleteItems = () => {
  if (sysJobLogStore.multipleSelection.length == 0) {
    ElMessage.warning({ message: '请选择要删除的数据' })
    return;
  }
  const jobLogIds = sysJobLogStore.multipleSelection.map((item: any) => item.jobLogId).join(',');
  sysJobLogStore.del(jobLogIds).then(() => {
    refresh();
  })
}

//刷新数据方法
const refresh = () => {
  const searchQuery = sysJobLogStore.searchForm;
  const page = sysJobLogStore.dataList.page;
  const size = sysJobLogStore.dataList.size;
  (instance?.proxy as any).$addPage(searchQuery, page, size);
  (instance?.proxy as any).$addDateRange(searchQuery, jobTaskExecuteTimeRange.value, 'ExecuteTime');
  sysJobLogStore.list(searchQuery);
}

//清空操作日志数据
const clearItems = () => {
    sysJobLogStore.clear().then(() => {
        refresh();
    })
}

//导出操作日志数据
const exportData = () => {
  const searchQuery = sysJobLogStore.searchForm;
  (instance?.proxy as any).$addDateRange(searchQuery, jobTaskExecuteTimeRange.value, 'ExecuteTime');
  const url = `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/export`;
  (instance?.proxy as any).$download(url, {
    ...searchQuery,
  }, `log_${new Date().getTime()}.xlsx`);
}

//加载所需要的字典数据
const loadDictData = () => {
  const dictNamesStr = 'jobTaskGroup,jobTaskLogStatus,';
  const dictNames = dictNamesStr.substring(0, dictNamesStr.length - 1).split(",");
  dictDataStore
    .dictDataInfoList(dictNames)
    .then((resp) => {
      sysJobLogStore.dictData = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}
//根据名称加载字典数据
const loadDictDataByName = (name: string) => {
  return sysJobLogStore.dictData.filter((item: any) => item.name === name)
}
//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}


//根据状态值转化为组名
const getStrByJobGroup = (type: any) => {
  const typeNumber = Number.parseInt(type);
  switch (typeNumber) {
    case 0:
      return '默认';
    case 1:
      return '系统';
  }
}
//根据状态值转化为状态名
const getStrByStatus = (type: any) => {
  const typeNumber = Number.parseInt(type);
  switch (typeNumber) {
    case 0:
      return '正常';
    case 1:
      return '失败';
  }
}
</script>
<script lang="ts">
export default {
  name: 'jobLog',
}
</script>
<style scoped></style>