<template>
  <div>
    <el-card class="searchCard">
      <el-form :inline="true" :model="operationLogStore.searchForm" class="searchForm" label-position="right"
        label-width="auto" ref="searchFormRef">
        <el-row style="display: flex">
          <el-form-item label="操作用户" prop="operName">
            <el-select v-model="operationLogStore.searchForm.operName">
              <template v-for="name in operationLogStore.nameOptionSelect">
                <el-option :label="name" :value="name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="操作模块" prop="title">
            <el-select v-model="operationLogStore.searchForm.title" @change="changeTitle">
              <template v-for="title in operationLogStore.titleOptionSelect">
                <el-option :label="title" :value="title" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="业务名称" prop="businessName">
            <el-select v-model="operationLogStore.searchForm.businessName">
              <template v-for="businessName in operationLogStore.businessNameOptionSelect">
                <el-option :label="businessName" :value="businessName" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item v-show="more" label="执行结果" prop="status">
            <el-select v-model="operationLogStore.searchForm.status">
              <el-option label="成功" value="0" />
              <el-option label="失败" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="more" prop="requestTimeRange" label="执行时间">
            <el-date-picker v-model="requestTimeRange" type="datetimerange" range-separator="-"
              value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"
              format="YYYY-MM-DD HH:mm:ss"  />
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
            <span>操作日志列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="exportData()">
              <template #icon>
                <svg-icon name="导出excel"  />
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

    <el-card class="card-table-style" v-if="loadingStatus">
      <el-table :data="operationLogStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="operName" label="操作人员" align="center" />
        <el-table-column label="模块/业务" align="center">
          <template #default="scope">
            <span>{{ scope.row.title }} / {{ scope.row.businessName }}</span><br />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="执行结果" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small">
                成功
              </el-tag>
            </template>
            <template v-if="scope.row.status === 1">
              <el-tag checked size="small" color="#393e46">
                失败
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="操作日志" align="center">
          <template #default="scope">
            <div><span v-html="scope.row.description"></span></div>
            <template v-if="scope.row.errorMsg != ''">
              <div class="ellipsis-text"><span v-html="scope.row.errorMsg"></span></div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="requestTime" label="请求时间" align="center" />
        <el-table-column label="留痕地址" align="center">
          <template #default="scope">
            <span style="font-size: 13px;">{{ scope.row.operLocation }}</span><br />
            <span @click="(instance?.proxy as any).$copyText(scope.row.operIp)" class="copy-span"
              style="font-size: 12px;color: rgb( 134,144,156 );">{{ scope.row.operIp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="耗时" align="center">
          <template #default="scope">
            <span>{{ scope.row.costTime }} 毫秒</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
              详情
            </el-button>
            <el-button size="small" type="danger" @click="deleteItem(scope.row)" text>

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
            layout="total, sizes, prev, pager, next, jumper" :total="operationLogStore.dataList.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>
    <!--加载动画-->
    <div class="table-data-loading" v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import API_ENUM from '@/enum/api-enum'
//仓库
import useOperationLogStore from '@/store/modules/user/operationLog'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const operationLogStore = useOperationLogStore()
const layoutSettingStore = useLayoutSettingStore()

//获取当前组件实例
const instance = getCurrentInstance();

onMounted(() => {
  operationLogStore.tableLoading = true;

  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size))
  //加载可选操作人员名称选项
  operationLogStore.getOperNameOptionSelect()
  //加载可选操作模块选项
  operationLogStore.getTitleOptionSelect()

  setTimeout(() => {
    operationLogStore.tableLoading = false
  }, 500)
})
//表单对象
const searchFormRef = ref<FormInstance>()
//更多按钮状态
const more = ref(false)
//请求时间范围
const requestTimeRange=ref([])



//刷新数据方法
const refresh = () => {
  const searchQuery = operationLogStore.searchForm;
  (instance?.proxy as any).$addPage(searchQuery,operationLogStore.dataList.page,operationLogStore.dataList.size);
  (instance?.proxy as any).$addDateRange(searchQuery, requestTimeRange.value, 'RequestTime');
  operationLogStore.operationLogList(searchQuery);
}
//根据搜索条件进行搜索
const searchList = () => {
  operationLogStore.tableLoading = true;

  refresh();

  setTimeout(() => {
    operationLogStore.tableLoading = false
  }, 500)
}

//页面数据加载的状态
const loadingStatus = computed(() => {
  return !operationLogStore.tableLoading || !layoutSettingStore.setting.dataLoading;
});

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  operationLogStore.dataList.page = currentPage
  refresh();
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  operationLogStore.dataList.size = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  operationLogStore.multipleSelection = val
}

//删除操作日志触发的事件
const deleteItem = (item: any) => {
  operationLogStore
    .deleteOperationLog(item.operId)
    .then(() => {
      refresh();
    })
}

//删除多个操作日志触发的事件
const deleteItems = () => {
  const operIds = operationLogStore.multipleSelection.map((item: any) => item.operId).join(',');
  if(operationLogStore.multipleSelection.length == 0){
      ElMessage.warning({ message: '请选择要删除的数据' })
      return;
  }
  operationLogStore.deleteOperationLog(operIds).then(() => {
    refresh();
  })
}

//导出操作日志数据
const exportData = () => {
  const searchQuery=operationLogStore.searchForm;
  (instance?.proxy as any).$addDateRange(searchQuery, requestTimeRange.value, 'RequestTime');
  (instance?.proxy as any).$download(`${API_ENUM.SERVER_MODE_NAME.OPERACTION_LOG_DATA}/export`, {
    ...searchQuery,
  },`user_${new Date().getTime()}.xlsx`);
}

//清空操作日志数据
const clearItems = () => {
  operationLogStore.clearOperationLog().then(() => {
    refresh();
  })
}

const changeTitle = () => {
  const title = operationLogStore.searchForm.title
  operationLogStore.getBusinessNameOptionSelect(title)
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
</script>
<script lang="ts">
export default {
  name: 'operationLog',
}
</script>
<style scoped>
.ellipsis-text {
  display: inline-block;
  /* 确保可以设置宽度等样式，对于行内元素生效 */
  max-width: 100px;
  /* 根据需要设置最大宽度，超出此宽度的文本将被省略 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
