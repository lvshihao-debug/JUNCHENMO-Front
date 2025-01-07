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
    <el-card class="searchCard" style="margin-top: 10px;">
      <el-form :inline="true" :model="genCodeStore.tableSearchForm" class="searchForm" label-position="right"
        label-width="auto" ref="tableSearchForm">
        <el-row>
          <el-form-item label="表名称" prop="tableName">
            <el-input v-model="genCodeStore.tableSearchForm.tableName" />
          </el-form-item>
          <el-form-item label="表描述" prop="tableComment">
            <el-input v-model="genCodeStore.tableSearchForm.tableComment" />
          </el-form-item>
          <el-form-item label="实体类名称" prop="tableName">
            <el-input v-model="genCodeStore.tableSearchForm.tableName" />
          </el-form-item>
          <el-form-item label="作者" prop="tableName">
            <el-input v-model="genCodeStore.tableSearchForm.tableName" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注" prop="tableName" style="width: 100%;">
              <el-input v-model="genCodeStore.tableSearchForm.desc" type="textarea"  />
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
      <vxe-table :edit-config="editConfig"  ref="tableRef"
                 :data="tableData">
                <vxe-column type="seq" width="60" drag-sort></vxe-column>
                <vxe-column field="columnName" title="字段列名" width="180" >
                    <template #default="{ row }">
                        <span>{{ row.columnName }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="columnComment" title="字段描述" width="180" :edit-render="{}">
                  <template #edit="{ row }">
                        <el-input v-model="row.columnComment" />
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.columnComment }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="columnType" title="物理类型" width="180" >
                    <template #default="{ row }">
                        <span>{{ row.columnType }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="javaType" title="Java类型" width="180" :edit-render="{}">
                  <template #edit="{ row }">
                        <el-select v-model="row.javaType">
                            <template v-for="item in loadDictDataByName('mysqlType')">
                                <el-option :label="item.value" :value="item.value" />
                            </template>
                        </el-select>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.javaType }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="javaField" title="Java属性" width="180" :edit-render="{}">
                    <template #default="{ row }">
                        <span>{{ row.javaField }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="isInsert" title="插入" width="100" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-checkbox v-model="row.isInsert"></el-checkbox>
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.isInsert"></el-checkbox>
                    </template>
                </vxe-column>
                <vxe-column field="isEdit" title="编辑" width="100" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-checkbox v-model="row.isEdit"></el-checkbox>
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.isEdit"></el-checkbox>
                    </template>
                </vxe-column>
                <vxe-column field="isList" title="列表" width="100" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-checkbox v-model="row.isList"></el-checkbox>
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.isList"></el-checkbox>
                    </template>
                </vxe-column>
                <vxe-column field="isQuery" title="查询" width="100" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-checkbox v-model="row.isQuery"></el-checkbox>
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.isQuery"></el-checkbox>
                    </template>
                </vxe-column>
                <vxe-column field="queryType" title="查询方式" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-select v-model="row.queryType">
                            <template v-for="item in loadDictDataByName('mysqlType')">
                                <el-option :label="item.value" :value="item.value" />
                            </template>
                        </el-select>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.queryType }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="isRequired" title="必填" width="100" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-checkbox v-model="row.isRequired"></el-checkbox>
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.isRequired"></el-checkbox>
                    </template>
                </vxe-column>
                <vxe-column field="htmlType" title="显示类型" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-select v-model="row.htmlType">
                            <template v-for="item in loadDictDataByName('mysqlType')">
                                <el-option :label="item.value" :value="item.value" />
                            </template>
                        </el-select>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.htmlType }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="dictType" title="字典类型" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <el-select v-model="row.dictType">
                            <template v-for="item in loadDictDataByName('mysqlType')">
                                <el-option :label="item.value" :value="item.value" />
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
    <el-card class="searchCard" style="margin-top: 10px;">

    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { VxeTablePropTypes, VxeTableInstance } from 'vxe-table'
//仓库
import useGenCodeStore from '@/store/modules/tool/genCode'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const genCodeStore = useGenCodeStore();
const layoutSettingStore = useLayoutSettingStore();

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

// 按照RowVO接口定义生成两条数据示例
const rowVOData1 = {
    id: 1,
    columnName: "user_name",
    columnComment: "用户名",
    columnType: "varchar",
    javaType: "String",
    javaField: "userName",
    isInsert: true,
    isEdit: true,
    isList: true,
    isQuery: true,
    queryType: "like",
    isRequired: true,
    htmlType: "input",
    dictType: ""
};

const rowVOData2 = {
    id: 2,
    columnName: "user_age",
    columnComment: "用户年龄",
    columnType: "int",
    javaType: "Integer",
    javaField: "userAge",
    isInsert: false,
    isEdit: false,
    isList: true,
    isQuery: false,
    queryType: "",
    isRequired: false,
    htmlType: "input",
    dictType: ""
};

// 可以将生成的数据存储在数组中方便后续使用，例如：
const tableData = ref([rowVOData1, rowVOData2]);
//表格引用
const tableRef = ref<VxeTableInstance<RowVO>>();

const editConfig = reactive<VxeTablePropTypes.EditConfig>({
  trigger: 'click',
  mode: 'cell'
})
onMounted(() => {

})


</script>
<script lang="ts">
export default {
  name: 'genCodeTableEditFrom',
}
</script>
<style scoped></style>