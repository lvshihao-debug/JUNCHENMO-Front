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
                        <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="refresh()">
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
                            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="genTableCode(undefined)">
                                <template #icon>
                                    <svg-icon name="下载" />
                                </template>
                            </JcmButton>
                            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="importFromModal?.open()">
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

            <el-card class="card-table-style">
                <el-table :data="genCodeStore.dataList.list" table-layout="auto"
                    @selection-change="handleSelectionChange" v-loading="!loadingStatus" element-loading-text="Loading..." >
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="tableId" label="序号" align="center" />
                    <el-table-column prop="tableName" label="表名称" align="center" />
                    <el-table-column prop="tableComment" label="表描述" align="center" />
                    <el-table-column prop="className" label="实体" align="center" />
                    <el-table-column prop="createTime" label="创建时间" align="center" />
                    <el-table-column prop="updateTime" label="更新时间" align="center" />

                    <el-table-column align="center" label="操作">
                        <template #default="scope">
                            <el-button size="small" type="primary" @click="previewTableCode(scope.row)" text>
                                预览
                            </el-button>
                            <el-button size="small" type="primary" @click="editItem(scope.row)" text>
                                编辑
                            </el-button>
                            <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
                                删除
                            </el-button>
                            <el-button size="small" type="primary" @click="synchDB(scope.row)" text>
                                同步
                            </el-button>
                            <el-button size="small" type="primary" @click="genTableCode(scope.row)" text>
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
            
        <GenCodeImportFromModal ref="importFromModal"></GenCodeImportFromModal>
        <PreviewCodeModal ref="previewCodeModal"></PreviewCodeModal>
   </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
import API_ENUM from '@/enum/api-enum'
//路由
import { useRouter } from 'vue-router'

//弹出窗
import GenCodeImportFromModal from './components/gen-code-import-from-modal.vue'
import PreviewCodeModal from './components/gen-code-preview-code-modal.vue'
//仓库
import useGenCodeStore from '@/store/modules/tool/genCode'
import useTabsStore from '@/store/modules/layout/tabs'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const genCodeStore = useGenCodeStore();
const tabStore = useTabsStore();
const layoutSettingStore = useLayoutSettingStore();

const $router = useRouter()
//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();
//弹出窗对象
const importFromModal = ref<FromModal>()
const previewCodeModal = ref<FromModal>()
//请求时间范围
const createTimeRange = ref([]);

onMounted(() => {
    instance?.proxy?.$resetObj(genCodeStore.searchForm);
    //进入页面初始化的数据 手动触发更新页数的逻辑
    handleSizeChange(Number(layoutSettingStore.setting.size));
})

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
const refresh = async() => {
    genCodeStore.tableLoading = true;

    const searchQuery = genCodeStore.searchForm;
    (instance?.proxy as any).$addPage(searchQuery, genCodeStore.dataList.page, genCodeStore.dataList.size);
    await genCodeStore.genList(searchQuery);

    genCodeStore.tableLoading = false
}

//预览代码
const previewTableCode = async (item: any) => {
    await genCodeStore.previewTableCode(item.tableId);
    previewCodeModal?.value?.open(item);
}

//删除角色触发的事件
const deleteItem = (item: any) => {
    genCodeStore.deleteGenCode([item.tableId]).then(() => {
        refresh();
    })
}
const editItem = (item: any) => {
    const updateRouter = {
        title: "修改[" + item.tableName + "]生成配置",
        path: "/tool/genCode/edit/" + item.tableId,
        icon: "修改",
        closable: true,
        checked: true
    }
    tabStore.addTab(updateRouter, $router,'add');
}
//删除多个字典类型触发的事件
const deleteItems = () => {
    if (genCodeStore.multipleSelection.length == 0) return
    const tableIds = genCodeStore.multipleSelection.map((item: any) => item.tableId);
    genCodeStore.deleteGenCode(tableIds).then(() => {
        refresh();
    })
}
/** 生成代码操作 */
function genTableCode(item: any) {
    console.log(item);
    const tbNames = (item && item.tableName) || genCodeStore.multipleSelection.map((item: any) => item.tableName).join(",");
    if (tbNames == "") {
        ElMessage.warning("请选择要生成的数据");
        return;
    }
    if (item && item.genType === "1") {
        genCodeStore.genCode(item.tableName).then(() => {
            ElMessage.success("成功生成到自定义路径：" + item.genPath);
        });
    } else {
        (instance?.proxy as any).$downloadZip.zip(`${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/batchGenCode/?tables=` + tbNames, "jcm.zip");
    }
}

//同步数据库
const synchDB = (item: any) => {
    genCodeStore.synchDB(item.tableName).then(() => {
        refresh();
    })
}

//页面数据加载的状态
const loadingStatus = computed(() => {
    return !genCodeStore.tableLoading || !layoutSettingStore.setting.dataLoading;
});

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