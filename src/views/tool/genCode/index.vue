<template>
    <div class="fade">
        <el-card class="searchCard">
            <el-form :inline="true" :model="genCodeStore.searchForm" class="searchForm" label-position="right"
                label-width="auto" ref="searchFormRef">
                <el-row>
                    <el-form-item label="表名称" prop="username">
                        <el-input v-model="genCodeStore.searchForm.tableName" />
                    </el-form-item>
                    <el-form-item label="表描述" prop="nickname">
                        <el-input v-model="genCodeStore.searchForm.tableComment" />
                    </el-form-item>
                    <el-form-item prop="requestTimeRange" label="创建时间">
                        <el-date-picker v-model="createTimeRange" type="datetimerange" range-separator="-"
                            value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss" />
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

        <el-row>
            <el-col :span="24">
                <div class="card-header-style">
                    <div class="card-header">
                        <span>数据表列表</span>
                    </div>
                    <div class="card-end">
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="download()">
                            <template #icon>
                                <svg-icon name="下载" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="add()">
                            <template #icon>
                                <svg-icon name="加号" />
                            </template>
                        </JcmButton>
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="genCodeAddFromModal?.open()">
                            <template #icon>
                                <svg-icon name="导入" />
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
            <el-table :data="genCodeStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="tableId" label="序号" align="center" />
                <el-table-column prop="tableName" label="表名称" align="center" />
                <el-table-column prop="tableComment" label="表描述" align="center" />
                <el-table-column prop="className" label="实体" align="center" />
                <el-table-column prop="createTime" label="创建时间" align="center" />
                <el-table-column prop="updateTime" label="更新时间" align="center" />
                
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="previewTableCode(scope.row.tableId)" text>
                            预览
                        </el-button>
                        <el-button size="small" type="primary" @click="PreviewCodeModal?.open()" text>
                            编辑
                        </el-button>
                        <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
                            删除
                        </el-button>
                        <el-button size="small" type="primary" @click="handleDelete(scope.$index, scope.row)" text>
                            同步
                        </el-button>
                        <el-button size="small" type="primary" @click="handleDelete(scope.$index, scope.row)" text>
                            生成代码
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <div class="pagination-style">
                    <!--分页-->
                    <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
                        :default-page-size="Number(layoutSettingStore.setting.size)"
                        layout="total, sizes, prev, pager, next, jumper" :total="genCodeStore.dataList.total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </template>
        </el-card>
        <GenCodeAddFromModal ref="genCodeAddFromModal"></GenCodeAddFromModal>
        <PreviewCodeModal ref="previewCodeModal" ></PreviewCodeModal>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
//弹出窗
import GenCodeAddFromModal from './components/gen-code-add-from-modal.vue'
import PreviewCodeModal from './components/gen-code-preview-code-modal.vue'
//仓库
import useGenCodeStore from '@/store/modules/tool/genCode'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const genCodeStore = useGenCodeStore();
const layoutSettingStore = useLayoutSettingStore();
//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();
//弹出窗对象
const genCodeAddFromModal = ref<FromModal>()
const previewCodeModal = ref<FromModal>()
//请求时间范围
const createTimeRange = ref([]);

onMounted(() => {
  instance?.proxy?.$resetObj(genCodeStore.searchForm);
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size));
})

//根据搜索条件进行搜索
const searchList = () => {
}

//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
    genCodeStore.dataList.page = currentPage
  refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
    genCodeStore.dataList.size = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
    genCodeStore.multipleSelection = val
}

//刷新数据方法
const refresh = () => {
    const searchQuery = genCodeStore.searchForm;
    (instance?.proxy as any).$addPage(searchQuery, genCodeStore.dataList.page, genCodeStore.dataList.size);
    genCodeStore.genList(searchQuery);
}

//预览代码
const previewTableCode = (tableId: number) => {
    genCodeStore.previewTableCode(tableId);
    previewCodeModal?.value?.open();
}

//删除角色触发的事件
const deleteItem = (item: any) => {
    genCodeStore.deleteGenCode([item.tableId]).then(() => {
    refresh();
  })
}

//删除多个字典类型触发的事件
const deleteItems = () => {
  if(genCodeStore.multipleSelection.length == 0) return
  const tableIds = genCodeStore.multipleSelection.map((item: any) => item.tableId);
  genCodeStore.deleteGenCode(tableIds).then(() => {
    refresh();
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
    name: 'genCode',
}
</script>
<style scoped></style>