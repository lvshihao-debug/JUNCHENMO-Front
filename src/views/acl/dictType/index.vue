<template>
  <div>
    <el-card class="searchCard">
      <el-form :inline="true" :model="dictTypeStore.searchForm" class="searchForm" label-position="right"
        label-width="auto" ref="searchFormRef">
        <el-row style="display: flex">
          <el-form-item label="配置项" prop="name">
            <el-input v-model="dictTypeStore.searchForm.name" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="dictTypeStore.searchForm.description" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="dictTypeStore.searchForm.status">
              <el-option label="正常" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
          <div style="margin-left: auto" class="card-search-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="resetSearchForm(searchFormRef)">
              <template #icon>
                <svg-icon name="擦除" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="searchList()">
              <template #icon>
                <svg-icon name="搜索" />
              </template>
            </JcmButton>
          </div>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card-table-style" v-if="loadingStatus">
      <template #header>
        <div class="card-header-style">
          <div class="card-header">
            <span>字典配置项</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="dictTypeAddFromModal?.open()">
              <template #icon>
                <svg-icon name="加号" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="refreshCache()">
              <template #icon>
                <svg-icon name="刷新" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="deleteItems()">
              <template #icon>
                <svg-icon name="垃圾桶" />
              </template>
            </JcmButton>
          </div>
        </div>
      </template>

      <el-table :data="dictTypeStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="dictTypeId" label="ID" align="center" />
        <el-table-column prop="name" label="配置项" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="type" label="类型" align="center">
          <template #default="scope">
            <el-tag size="small" style="color:white">
              {{ getStatusByType(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="extraSchema" label="额外配置" align="center" width="250">
          <template #default="scope">
            <template v-if="scope.row.extraSchema !== ''">
              <template v-for="item in extraStrToJson(scope.row.extraSchema)">
                <el-tag checked size="small" :color="getColorByType(item.type)" style="margin-right: 2px;">
                  {{ item.parameter }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
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
            <el-button size="small" type="primary" @click="getInfoButtonClick(scope.row)" text>
              查看
            </el-button>
            <el-button size="small" type="primary" @click="dictTypeUpdateFromModal?.open(scope.row)" text>
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
            layout="total, sizes, prev, pager, next, jumper" :total="dictTypeStore.dataList.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
        </div>
      </template>
    </el-card>
    <!--加载动画-->
    <div class="table-data-loading" v-else>
      <Loading />
    </div>

    <!--弹出框组件列表-->
    <DictTypeAddFromModal ref="dictTypeAddFromModal" ></DictTypeAddFromModal>
    <DictTypeUpdateFromModal ref="dictTypeUpdateFromModal" ></DictTypeUpdateFromModal>
    <!-- json 查看器模态框 -->
    <JsonEditor ref="dictTypeViewFromModal" />
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'

//弹出窗
import DictTypeAddFromModal from './components/dict-type-add-from-modal.vue'
import DictTypeUpdateFromModal from './components/dict-type-update-from-modal.vue'
//仓库
import useDictTypeStore from '@/store/modules/acl/dictType'
import useDictDataStore from '@/store/modules/acl/dictData'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

//获取当前组件实例
const instance = getCurrentInstance()
const dictDataStore = useDictDataStore()
const dictTypeStore = useDictTypeStore()
const layoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  dictTypeStore.tableLoading = true

  //手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size))
  //初始化字典数据
  loadDictData()

  setTimeout(() => {
    dictTypeStore.tableLoading = false
  }, 500)
});

//表单对象
const searchFormRef = ref<FormInstance>()
//弹出窗对象
const dictTypeAddFromModal = ref<FromModal>()
const dictTypeUpdateFromModal = ref<FromModal>()
const dictTypeViewFromModal = ref();

//页面数据加载的状态
const loadingStatus = computed(() => {
  return !dictTypeStore.tableLoading || !layoutSettingStore.setting.dataLoading;
});

//刷新数据方法
const refresh = () => {
  const searchQuery = dictTypeStore.searchForm;
  (instance?.proxy as any).$addPage(searchQuery, dictTypeStore.dataList.page, dictTypeStore.dataList.size);
  dictTypeStore.dictTypeList(searchQuery);
}

//根据搜索条件进行搜索
const searchList = () => {
  dictTypeStore.tableLoading = true

  refresh();

  setTimeout(() => {
    dictTypeStore.tableLoading = false
  }, 500)
}

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  dictTypeStore.dataList.page = currentPage
  refresh();
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  dictTypeStore.dataList.size = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  dictTypeStore.multipleSelection = val
}

//删除字典类型触发的事件
const deleteItem = (item: any) => {
  dictTypeStore
    .deleteDictType([item.dictTypeId])
    .then(() => {
      refresh();
    })
}

//删除多个字典类型触发的事件
const deleteItems = () => {
  const dictTypeIds = dictTypeStore.multipleSelection.map((item: any) => item.dictTypeId);
  dictTypeStore
    .deleteDictType(dictTypeIds)
    .then(() => {
      refresh();
    })
}

//点击查看按钮触发的事件
const getInfoButtonClick = (item: any) => {
  dictDataStore.
    dictDataInfo(item.name)
    .then((resp) => {
      dictTypeViewFromModal?.value?.open(resp.data, item.name + ' - ' + item.description)
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//刷新字典数据列表缓存
const refreshCache = () => {
  dictDataStore.dictDataRefreshCache()
}
//加载所需要的字典数据
const loadDictData = () => {
  const dictNames = ['extrasDefaultTag', 'extrasDefaultStatus']
  dictDataStore
    .dictDataInfoList(dictNames)
    .then((resp) => {
      dictTypeStore.dictData = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

const extraStrToJson = (item: any) => {
  if (undefined === item || item === '') return
  return JSON.parse(item)
}

//根据状态值转化为状态标签
const getStatusByType = (type: any) => {
  switch (type) {
    case 0:
      return '字符串';
    case 1:
      return '整数';
    case 2:
      return '小数';
    case 3:
      return '布尔值';
    case 4:
      return '颜色';
    default:
      return '未知状态';
  }
}

//根据状态值转化为颜色值
const getColorByType = (type: any) => {
  const typeNumber = Number.parseInt(type);
  switch (typeNumber) {
    case 0:
      return '#7a08fa';
    case 1:
      return '#4ecca3';
    case 2:
      return '#80d6ff';
    case 3:
      return '#355c7d';
    case 4:
      return '#e03e36';
  }
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}

</script>
<script lang="ts">
export default {
  name: 'dictType',
}
</script>
<style scoped></style>