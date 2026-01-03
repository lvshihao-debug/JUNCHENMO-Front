<template>
  <el-dialog v-model="fromOpenStatus" width="800" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">导入表</h4>
      </div>
    </template>
    <el-card class="searchCard">
      <el-form
        :inline="true"
        :model="genCodeStore.tableSearchForm"
        class="searchForm"
        label-position="right"
        label-width="auto"
        ref="tableSearchForm"
      >
        <el-row>
          <el-form-item label="表名称" prop="tableName">
            <el-input v-model="genCodeStore.tableSearchForm.tableName" />
          </el-form-item>
          <el-form-item label="表描述" prop="tableComment">
            <el-input v-model="genCodeStore.tableSearchForm.tableComment" />
          </el-form-item>
          <div style="margin-left: auto" class="card-search-end">
            <JcmButton
              :buttonBgColor="layoutSettingStore.getTheme"
              @click="resetSearchForm(tableSearchForm)"
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
    <el-card class="card-table-style">
      <el-table
        :data="genCodeStore.tableDataList.list"
        table-layout="auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="tableName" label="表名称" align="center" />
        <el-table-column prop="tableComment" label="表描述" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
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
            :total="genCodeStore.tableDataList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </el-card>
    <template #footer>
      <div class="modal-style">
        <el-button @click="fromOpenStatus = false">取消</el-button>
        <el-button type="primary" text bg @click="addItem()">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
//仓库
import useGenCodeStore from '@/store/modules/tool/genCode'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

//获取当前组件实例
const genCodeStore = useGenCodeStore()
const layoutSettingStore = useLayoutSettingStore()

//表单对象
const tableSearchForm = ref<FormInstance>()
//获取当前组件实例
const instance = getCurrentInstance()
//表单打开的状态
const fromOpenStatus = ref(false)

//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  genCodeStore.tableDataList.page = currentPage
  refresh()
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  genCodeStore.tableDataList.size = pageSize
  refresh()
}

//刷新数据方法
const refresh = () => {
  const searchQuery = genCodeStore.tableSearchForm
  ;(instance?.proxy as any).$addPage(
    searchQuery,
    genCodeStore.tableDataList.page,
    genCodeStore.tableDataList.size,
  )
  genCodeStore.DBList(searchQuery)
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  genCodeStore.tableMultipleSelection = val
}

// 打开modal框
const open = () => {
  instance?.proxy?.$resetObj(genCodeStore.tableSearchForm)
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size))
  fromOpenStatus.value = true
}

//点击添加按钮触发的事件
const addItem = async () => {
  if (genCodeStore.tableMultipleSelection.length == 0) return
  const tableNames = genCodeStore.tableMultipleSelection
    .map((item: any) => item.tableName)
    .join(',')
  await genCodeStore.importTable({ tables: tableNames })
  await genCodeStore.genList(genCodeStore.searchForm)
  fromOpenStatus.value = false
}
//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

defineExpose({ open })
</script>

<style scoped></style>
