<template>
  <div>
    <el-card class="searchCard">
      <el-form :inline="true" :model="dictDataStore.searchForm" class="searchForm" label-position="right"
        label-width="auto" ref="searchFormRef">
        <el-row>
          <el-form-item label="配置项" prop="name">
            <el-input v-model="dictDataStore.searchForm.name" />
          </el-form-item>
          <el-form-item label="配置值" prop="value">
            <el-input v-model="dictDataStore.searchForm.value" />
          </el-form-item>
          <el-form-item label="配置描述" prop="description">
            <el-input v-model="dictDataStore.searchForm.description" />
          </el-form-item>
          <el-form-item v-show="more" label="配置参数" prop="extra">
            <el-input v-model="dictDataStore.searchForm.extra" />
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
            <span>字典配置值列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="dictDataAddFromModal?.open()">
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

    <el-card class="card-table-style" >
      <el-table :data="dictDataStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange" v-loading="!loadingStatus" element-loading-text="Loading..." >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="dictTypeId" label="ID" align="center" />
        <el-table-column prop="name" label="配置项" align="center" />
        <el-table-column prop="value" label="配置值" align="center" />
        <el-table-column prop="extra" width="240" label="额外参数" align="center" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.extra }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="配置描述" align="center" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small">
                启用
              </el-tag>
            </template>
            <template v-if="scope.row.status === 1">
              <el-tag checked size="small" color="#393e46">
                停用
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="dictDataUpdateFromModal?.open(scope.row)" text>
              修改
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
            layout="total, sizes, prev, pager, next, jumper" :total="dictDataStore.dataList.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>

    <!--弹出框组件列表-->
    <DictDataAddFromModal ref="dictDataAddFromModal"></DictDataAddFromModal>
    <DictDataUpdateFromModal ref="dictDataUpdateFromModal" ></DictDataUpdateFromModal>

  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'

//弹出窗
import DictDataAddFromModal from './components/dict-data-add-from-modal.vue'
import DictDataUpdateFromModal from './components/dict-data-update-from-modal.vue'
//仓库
import useDictDataStore from '@/store/modules/acl/dictData'
import useDictTypeStore from '@/store/modules/acl/dictType'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

//获取当前组件实例
const instance = getCurrentInstance()
const dictDataStore = useDictDataStore()
const dictTypeStore = useDictTypeStore()
const layoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  instance?.proxy?.$resetObj(dictDataStore.searchForm);
  

  //手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size))
  //加载字典类型选项的数据
  loadDictTypeSelect()
  
});

//表单对象
const searchFormRef = ref<FormInstance>()
//弹出窗对象
const dictDataAddFromModal = ref<FromModal>()
const dictDataUpdateFromModal = ref<FromModal>()
//更多按钮状态
const more = ref(false)

//页面数据加载的状态
const loadingStatus = computed(() => {
  return !dictDataStore.tableLoading || !layoutSettingStore.setting.dataLoading;
});

//刷新数据方法
const refresh = async() => {
  dictDataStore.tableLoading = true

  const searchQuery = dictDataStore.searchForm;
  (instance?.proxy as any).$addPage(searchQuery, dictDataStore.dataList.page, dictDataStore.dataList.size);
  await dictDataStore.dictDataList(searchQuery);

  dictDataStore.tableLoading = false
}

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  dictDataStore.dataList.page = currentPage
  refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dictDataStore.dataList.size = pageSize
  refresh();
}


//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  dictDataStore.multipleSelection = val
}

// 删除字典值触发的事件
const deleteItem = (item: any) => {
  dictDataStore
    .deleteDictData(item.dictDataId)
    .then(() => {
      refresh();
    })
}

//删除多个字典值触发的事件
const deleteItems = () => {
  const dictDataIds = dictDataStore.multipleSelection.map((item: any) => item.dictDataId).join(',');
  if(dictDataStore.multipleSelection.length == 0){
      ElMessage.warning({ message: '请选择要删除的数据' })
      return;
  }
  dictDataStore
    .deleteDictData(dictDataIds)
    .then(() => {
      refresh();
    })
}

//加载字典类型选项的数据
const loadDictTypeSelect = () => {
  dictTypeStore
    .dictTypeOptionSelect()
    .then((resp) => {
      dictDataStore.dictTypeWithExtra = resp.data
    }).catch((error) => {
      ElMessage.error({ message: error })
    })
}


//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

</script>
<script lang="ts">
export default {
  name: 'dictData',
}
</script>
<style scoped></style>