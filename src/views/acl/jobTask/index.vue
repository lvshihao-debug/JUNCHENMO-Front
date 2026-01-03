<template>
  <div class="fade">
    <el-card class="searchCard">
      <el-form
        :inline="true"
        :model="sysJobStore.searchForm"
        class="searchForm"
        label-position="right"
        label-width="auto"
        ref="searchFormRef"
      >
        <el-row>
          <el-form-item label="任务名称" prop="jobName">
            <el-input
              v-model="sysJobStore.searchForm.jobName"
              placeholder="请输入任务名称"
              clearable
              @keyup.enter="refresh"
            />
          </el-form-item>
          <el-form-item label="任务分组" prop="jobGroup">
            <el-select
              v-model="sysJobStore.searchForm.jobGroup"
              placeholder="请选择任务组名"
              clearable
            >
              <el-option
                v-for="dict in (instance?.proxy as any).$loadDictDataByName(
                  sysJobStore,
                  'jobTaskGroup',
                )"
                :key="dict.value"
                :label="dict.description"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="任务状态" prop="jobGroup">
            <el-select
              v-model="sysJobStore.searchForm.status"
              placeholder="请选择任务状态"
              clearable
            >
              <el-option
                v-for="dict in (instance?.proxy as any).$loadDictDataByName(
                  sysJobStore,
                  'jobTaskStatus',
                )"
                :key="dict.value"
                :label="dict.description"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>

          <div style="margin-left: auto" class="card-search-end">
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="resetSearchForm(searchFormRef)"
            >
              <template #icon>
                <svg-icon name="擦除" />
              </template>
            </JcmButton>
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="refresh()"
            >
              <template #icon>
                <svg-icon name="搜索" />
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
            <span>定时任务调度列表</span>
          </div>
          <div class="card-end">
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="ceshi()"
            >
              <template #icon>
                <svg-icon name="jobTaskLog" />
              </template>
            </JcmButton>
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="exportData()"
            >
              <template #icon>
                <svg-icon name="导出excel" />
              </template>
            </JcmButton>
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="jobAddFromModal?.open()"
            >
              <template #icon>
                <svg-icon name="加号" />
              </template>
            </JcmButton>
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="deleteItems()"
            >
              <template #icon>
                <svg-icon name="垃圾桶" />
              </template>
            </JcmButton>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-card class="card-table-style">
      <el-table
        :data="sysJobStore.dataList.list"
        table-layout="auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="任务ID" align="center" prop="jobId" />
        <el-table-column label="任务名称" align="center" prop="jobName" />
        <el-table-column label="任务组名" align="center" prop="jobGroup">
          <template #default="scope">
            {{ getStrByJobGroup(scope.row.jobGroup) }}
          </template>
        </el-table-column>
        <el-table-column
          label="调用目标字符串"
          align="center"
          prop="invokeTarget"
        />
        <el-table-column
          label="cron执行表达式"
          align="center"
          prop="cronExpression"
        />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <!--状态-->
            <el-popconfirm
              width="200"
              icon-color="#626AEF"
              :title="
                scope.row.status === 0
                  ? '确定要将当前任务改为暂停状态?'
                  : '确定要将当前前任务改为正常状态?'
              "
              @confirm="tagUpdateStatusButtonClick(scope.row)"
            >
              <template #reference>
                <template v-if="Number(scope.row.status) === 0">
                  <el-tag checked size="small" class="menu-status-tag">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="点击切换状态"
                      placement="top"
                    >
                      正常
                    </el-tooltip>
                  </el-tag>
                </template>
                <template v-if="Number(scope.row.status) === 1">
                  <el-tag
                    checked
                    size="small"
                    color="#393e46"
                    class="menu-status-tag"
                  >
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="点击切换状态"
                      placement="top"
                    >
                      暂停
                    </el-tooltip>
                  </el-tag>
                </template>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="jobUpdateFromModal?.open(scope.row)"
              text
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="deleteItem(scope.row)"
              text
            >
              删除
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="runItem(scope.row)"
              text
            >
              执行一次
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="Item(scope.row)"
              text
            >
              任务详情
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="ceshi2(scope.row)"
              text
            >
              调度日志
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="pagination-style">
          <!--分页-->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            small="small"
            background="true"
            :default-page-size="Number(layoutSettingStore.setting.size)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="sysJobStore.dataList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </el-card>

    <JobAddFromModal ref="jobAddFromModal"></JobAddFromModal>
    <JobUpdateFromModal ref="jobUpdateFromModal"></JobUpdateFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
import API_ENUM from '@/enum/api-enum'
//路由
import { useRouter } from 'vue-router'
//弹出窗
import JobAddFromModal from './components/job-add-from-modal.vue'
import JobUpdateFromModal from './components/job-update-from-modal.vue'
//仓库
import useDictDataStore from '@/store/modules/acl/dictData'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useSysJobStore from '@/store/modules/acl/jobTask'

const dictDataStore = useDictDataStore()
const layoutSettingStore = useLayoutSettingStore()
const sysJobStore = useSysJobStore()

//job弹出窗对象
const jobAddFromModal = ref<FromModal>()
const jobUpdateFromModal = ref<FromModal>()

const $router = useRouter()
//获取当前组件实例
const instance = getCurrentInstance()
//表单对象
const searchFormRef = ref<FormInstance>()

onMounted(() => {
  const searchForm = sysJobStore.searchForm
  instance?.proxy?.$resetObj(searchForm)
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size))

  //初始化字典数据
  loadDictData()
})

const ceshi = () => {
  $router.push('/log/jobTaskLog')
}

const ceshi2 = (item: any) => {
  $router.push('/log/jobTaskLog?' + 'jobId=' + item.jobId)
}

//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  sysJobStore.dataList.page = currentPage
  refresh()
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  sysJobStore.dataList.size = pageSize
  refresh()
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  sysJobStore.multipleSelection = val
}

//删除sysJob触发的事件
const deleteItem = (item: any) => {
  sysJobStore.del(item.jobId).then(() => {
    refresh()
  })
}

//删除多个sysJob触发的事件
const deleteItems = () => {
  if (sysJobStore.multipleSelection.length == 0) {
    ElMessage.warning({ message: '请选择要删除的数据' })
    return
  }
  const jobIds = sysJobStore.multipleSelection
    .map((item: any) => item.jobId)
    .join(',')
  sysJobStore.del(jobIds).then(() => {
    refresh()
  })
}
const runItem = (item: any) => {
  sysJobStore.run(item)
}
//刷新数据方法
const refresh = async () => {
  sysJobStore.tableLoading = true

  const searchQuery = sysJobStore.searchForm
  const page = sysJobStore.dataList.page
  const size = sysJobStore.dataList.size
  ;(instance?.proxy as any).$addPage(searchQuery, page, size)
  await sysJobStore.list(searchQuery)

  sysJobStore.tableLoading = false
}

//导出操作日志数据
const exportData = () => {
  const searchQuery = sysJobStore.searchForm
  const url = `${API_ENUM.SERVER_MODE_NAME.SYS_JOB}/export`
  ;(instance?.proxy as any).$download(
    url,
    {
      ...searchQuery,
    },
    `job_${new Date().getTime()}.xlsx`,
  )
}

//加载所需要的字典数据
const loadDictData = () => {
  const dictNamesStr =
    'jobTaskGroup,jobTaskStatus,jobTaskMisfirePolicy,jobTaskConcurrent,'
  const dictNames = dictNamesStr
    .substring(0, dictNamesStr.length - 1)
    .split(',')
  dictDataStore
    .dictDataInfoList(dictNames)
    .then((resp) => {
      sysJobStore.dictData = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

const tagUpdateStatusButtonClick = (item: any) => {
  item.status = Number(item.status) === 0 ? 1 : 0
  sysJobStore.changeStatus(item).then(() => {
    refresh()
  })
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

//根据状态值转化为组名
const getStrByJobGroup = (type: any) => {
  const typeNumber = Number.parseInt(type)
  switch (typeNumber) {
    case 0:
      return '默认'
    case 1:
      return '系统'
  }
}
</script>

<script lang="ts">
export default {
  name: 'jobTask',
}
</script>

<style scoped>
.menu-status-tag {
  cursor: pointer;
}
</style>
