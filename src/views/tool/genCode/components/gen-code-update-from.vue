<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="card-header-style">
          <div class="card-header">
            <span>基本信息</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-card class="searchCard" style="margin-top: 10px">
      <el-form
        :inline="true"
        :model="genCodeStore.tableSearchForm"
        class="searchForm"
        label-position="right"
        label-width="auto"
        ref="tableSearchForm"
      >
        <el-form-item label="表名称" prop="tableName">
          <el-input v-model="genCodeStore.editTableData.table.tableName" />
        </el-form-item>
        <el-form-item label="表描述" prop="tableComment">
          <el-input v-model="genCodeStore.editTableData.table.tableComment" />
        </el-form-item>
        <el-form-item label="实体类名称" prop="className">
          <el-input v-model="genCodeStore.editTableData.table.className" />
        </el-form-item>
        <el-form-item label="作者" prop="functionAuthor">
          <el-input v-model="genCodeStore.editTableData.table.functionAuthor" />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark" style="width: 100%">
              <el-input
                v-model="genCodeStore.editTableData.table.remark"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row>
      <el-col :span="24">
        <div class="card-header-style">
          <div class="card-header">
            <span>字段信息</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-card class="card-table-style">
      <vxe-table
        :edit-config="editConfig"
        ref="tableRef"
        :data="genCodeStore.editTableData.columns"
      >
        <vxe-column type="seq" min-width="60" drag-sort></vxe-column>
        <vxe-column field="columnName" title="字段列名" width="120">
          <template #default="{ row }">
            <span>{{ row.columnName }}</span>
          </template>
        </vxe-column>
        <vxe-column
          field="columnComment"
          title="字段描述"
          width="100"
          show-overflow
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-input v-model="row.columnComment" style="width: auto" />
          </template>
          <template #default="{ row }">
            <el-tooltip :content="row.columnComment" placement="left">
              <span>{{ row.columnComment }}</span>
            </el-tooltip>
          </template>
        </vxe-column>
        <vxe-column field="columnType" title="物理类型" width="100">
          <template #default="{ row }">
            <span>{{ row.columnType }}</span>
          </template>
        </vxe-column>
        <vxe-column
          field="javaType"
          title="Java类型"
          width="105"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-select v-model="row.javaType" style="width: 100px">
              <template
                v-for="item in (instance?.proxy as any).$loadDictDataByName(
                  genCodeStore,
                  'javaType',
                )"
              >
                <el-option :label="item.value" :value="item.value" />
              </template>
            </el-select>
          </template>
          <template #default="{ row }">
            <span>{{ row.javaType }}</span>
          </template>
        </vxe-column>
        <vxe-column
          field="javaField"
          title="Java属性"
          width="105"
          show-overflow
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-input v-model="row.javaField" style="width: auto" />
          </template>
          <template #default="{ row }">
            <el-tooltip :content="row.javaField" placement="left">
              <span>{{ row.javaField }}</span>
            </el-tooltip>
          </template>
        </vxe-column>
        <vxe-column field="isInsert" title="插入" width="70" :edit-render="{}">
          <template #edit="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isInsert"
            ></el-checkbox>
          </template>
          <template #default="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isInsert"
            ></el-checkbox>
          </template>
        </vxe-column>
        <vxe-column field="isEdit" title="编辑" width="70" :edit-render="{}">
          <template #edit="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isEdit"
            ></el-checkbox>
          </template>
          <template #default="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isEdit"
            ></el-checkbox>
          </template>
        </vxe-column>
        <vxe-column field="isList" title="列表" width="70" :edit-render="{}">
          <template #edit="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isList"
            ></el-checkbox>
          </template>
          <template #default="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isList"
            ></el-checkbox>
          </template>
        </vxe-column>
        <vxe-column field="isQuery" title="查询" width="70" :edit-render="{}">
          <template #edit="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isQuery"
            ></el-checkbox>
          </template>
          <template #default="{ row }">
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="row.isQuery"
            ></el-checkbox>
          </template>
        </vxe-column>
        <vxe-column
          field="queryType"
          title="查询方式"
          width="110"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-select v-model="row.queryType" style="width: 105px">
              <template
                v-for="item in (instance?.proxy as any).$loadDictDataByName(
                  genCodeStore,
                  'queryType',
                )"
              >
                <el-option :label="item.description" :value="item.value" />
              </template>
            </el-select>
          </template>
          <template #default="{ row }">
            <span>{{ row.queryType }}</span>
          </template>
        </vxe-column>
        <vxe-column
          field="isRequired"
          title="必填"
          width="70"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-checkbox v-model="row.isRequired"></el-checkbox>
          </template>
          <template #default="{ row }">
            <el-checkbox v-model="row.isRequired"></el-checkbox>
          </template>
        </vxe-column>
        <vxe-column
          field="htmlType"
          title="显示类型"
          width="110"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-select v-model="row.htmlType" style="width: 105px">
              <template
                v-for="item in (instance?.proxy as any).$loadDictDataByName(
                  genCodeStore,
                  'htmlType',
                )"
              >
                <el-option :label="item.description" :value="item.value" />
              </template>
            </el-select>
          </template>
          <template #default="{ row }">
            <span>{{ row.htmlType }}</span>
          </template>
        </vxe-column>
        <vxe-column
          field="dictType"
          title="字典类型"
          min-width="210"
          :edit-render="{}"
        >
          <template #edit="{ row }">
            <el-select v-model="row.dictType" style="width: 200px">
              <el-option label="" value="" />
              <template v-for="item in genCodeStore.dictTypeOptions">
                <el-option
                  :label="item.name + '-' + item.description"
                  :value="item.name"
                />
              </template>
            </el-select>
          </template>
          <template #default="{ row }">
            <span>{{ row.dictType }}</span>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
    <el-row>
      <el-col :span="24">
        <div class="card-header-style">
          <div class="card-header">
            <span>生成信息</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-card class="searchCard" style="margin-top: 10px">
      <el-form
        :inline="true"
        :model="genCodeStore.tableSearchForm"
        class="searchForm"
        label-position="right"
        label-width="auto"
        ref="tableSearchForm"
      >
        <el-row>
          <el-form-item label="生成模版" prop="tableName">
            <el-select v-model="genCodeStore.editTableData.table.tplCategory">
              <template
                v-for="item in (instance?.proxy as any).$loadDictDataByName(
                  genCodeStore,
                  'moduleType',
                )"
              >
                <el-option :label="item.description" :value="item.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="生成包路径" prop="packageName">
            <el-input v-model="genCodeStore.editTableData.table.packageName" />
          </el-form-item>
          <el-form-item label="生成模块名" prop="moduleName">
            <el-input v-model="genCodeStore.editTableData.table.moduleName" />
          </el-form-item>
          <el-form-item label="生成业务名" prop="businessName">
            <el-input v-model="genCodeStore.editTableData.table.businessName" />
          </el-form-item>
          <el-form-item label="生成功能名" prop="functionName">
            <el-input v-model="genCodeStore.editTableData.table.functionName" />
          </el-form-item>
          <el-form-item label="生成代码方式" prop="tableName">
            <el-radio-group
              v-model="genCodeStore.editTableData.table.genType"
              size="small"
            >
              <el-radio-button label="zip压缩包" value="0" />
              <el-radio-button label="自定义路径" value="1" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="自定义路径"
            prop="genPath"
            v-show="genPathStatus"
          >
            <el-input v-model="genCodeStore.editTableData.table.genPath" />
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <el-row style="margin-top: 10px">
      <el-col :span="9"></el-col>
      <el-col :span="2">
        <JcmButton
          :buttonBgColor="layoutSettingStore.getTheme"
          @click="cancelClick()"
        >
          <template #icon>
            <svg-icon name="取消" />
          </template>
        </JcmButton>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="2">
        <JcmButton
          :buttonBgColor="layoutSettingStore.getTheme"
          @click="saveClick()"
        >
          <template #icon>
            <svg-icon name="数据保存" />
          </template>
        </JcmButton>
      </el-col>
      <el-col :span="9"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//导入Router
import { useRouter, useRoute } from 'vue-router'
import type { VxeTablePropTypes, VxeTableInstance } from 'vxe-table'
//仓库
import useTabsStore from '@/store/modules/layout/tabs'
import useGenCodeStore from '@/store/modules/tool/genCode'
import useDictDataStore from '@/store/modules/acl/dictData'
import useDictTypeStore from '@/store/modules/acl/dictType'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const genCodeStore = useGenCodeStore()
const dictDataStore = useDictDataStore()
const dictTypeStore = useDictTypeStore()
const tabStore = useTabsStore()
const layoutSettingStore = useLayoutSettingStore()

//获取当前组件实例
const instance = getCurrentInstance()
const $router = useRouter()
const route = useRoute()
const genPathStatus = ref(false)
interface RowVO {
  id: number
  columnName: string | undefined
  columnComment: string | undefined
  columnType: string | undefined
  javaType: string | undefined
  javaField: string | undefined
  isInsert: boolean | undefined
  isEdit: boolean | undefined
  isList: boolean | undefined
  isQuery: boolean | undefined
  queryType: string | undefined
  isRequired: boolean | undefined
  htmlType: string | undefined
  dictType: string | undefined
}

//表格引用
const tableRef = ref<VxeTableInstance<RowVO>>()

const editConfig = reactive<VxeTablePropTypes.EditConfig>({
  trigger: 'click',
  mode: 'cell',
})

onMounted(async () => {
  await loadDictData()
  await loadDictTypeSelect()
  const tableId = route.params && route.params.tableId
  if (tableId) {
    await genCodeStore.tableColumnsInfo(tableId).then(() => {
      console.log(genCodeStore.editTableData.table.genType)
      genPathStatus.value =
        genCodeStore.editTableData.table.genType == '1' ? true : false
      console.log(genPathStatus.value)
    })
  }
})

// 监听自定义路径变更
watch(
  () => genCodeStore.editTableData.table.genType,
  (v) => {
    genPathStatus.value = v == '1' ? true : false
  },
)

//取消修改
const cancelClick = () => {
  const tableId = route.params && route.params.tableId
  if (tableId) {
    const updateRouter = {
      title: '修改生成配置',
      path: '/tool/genCode/edit/' + tableId,
      icon: 'home',
      closable: true,
      checked: true,
    }
    tabStore.removeTab(updateRouter, $router)
  }
}
//保存修改
const saveClick = () => {
  genCodeStore
    .updateTableColumns()
    .then(() => {
      ElMessage.success({ message: '修改成功' })
      cancelClick()
    })
    .catch((error) => {
      ElMessage.error({ message: '修改失败:' + error })
    })
}

//加载字典类型选项的数据
const loadDictTypeSelect = () => {
  dictTypeStore
    .dictTypeOptionSelect()
    .then((resp) => {
      console.log(resp.data)
      genCodeStore.dictTypeOptions = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}

//加载所需要的字典数据
const loadDictData = async () => {
  const dictNames = ['javaType', 'queryType', 'htmlType', 'moduleType']
  await dictDataStore
    .dictDataInfoList(dictNames)
    .then((resp) => {
      genCodeStore.dictData = resp.data
    })
    .catch((error) => {
      ElMessage.error({ message: error })
    })
}
</script>
<script lang="ts">
export default {
  name: 'genCodeTableEditFrom',
}
</script>
<style scoped></style>
