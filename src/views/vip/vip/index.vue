<template>
  <div class="fade">
    <el-card class="searchCard">
      <el-form :inline="true" :model="txVipStore.searchForm" class="searchForm" label-position="right"
               label-width="auto" ref="searchFormRef">
        <el-row>
      <el-form-item label="咸鱼名称" prop="xyName">
        <el-input
          v-model="txVipStore.searchForm.xyName"
          placeholder="请输入咸鱼名称"
          clearable
          @keyup.enter="refresh"
        />
      </el-form-item>
      <el-form-item label="起始时间" prop="startingTime">
        <el-date-picker clearable
          v-model="txVipStore.searchForm.startingTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择起始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="stopingTime">
        <el-date-picker clearable
          v-model="txVipStore.searchForm.stopingTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开通天数" prop="purchaseDays">
        <el-input
          v-model="txVipStore.searchForm.purchaseDays"
          placeholder="请输入开通天数"
          clearable
          @keyup.enter="refresh"
        />
      </el-form-item>
      <el-form-item label="设备名称" prop="unitType">
        <el-input
          v-model="txVipStore.searchForm.unitType"
          placeholder="请输入设备名称"
          clearable
          @keyup.enter="refresh"
        />
      </el-form-item>
      <el-form-item label="登录方式" prop="loginMethod">
        <el-input
          v-model="txVipStore.searchForm.loginMethod"
          placeholder="请输入登录方式"
          clearable
          @keyup.enter="refresh"
        />
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
            <span>vip列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="exportData()">
              <template #icon>
                <svg-icon name="导出excel"  />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="vipAddFromModal?.open()">
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
      <el-table :data="txVipStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="会员id" align="center" prop="vipId" />
                <el-table-column label="咸鱼名称" align="center" prop="xyName" />
                <el-table-column label="起始时间" align="center" prop="startingTime" width="180">
                  <template #default="scope">
                    <span>{{ scope.row.startingTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="结束时间" align="center" prop="stopingTime" width="180">
                  <template #default="scope">
                    <span>{{ scope.row.stopingTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="开通天数" align="center" prop="purchaseDays" />
                <el-table-column label="设备名称" align="center" prop="unitType" />
                <el-table-column label="登录方式" align="center" prop="loginMethod" />

        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="vipUpdateFromModal?.open(scope.row)" text>
              编辑
            </el-button>
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
                         layout="total, sizes, prev, pager, next, jumper" :total="txVipStore.dataList.total"
                         @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>

    <VipAddFromModal ref="vipAddFromModal"></VipAddFromModal>
    <VipUpdateFromModal ref="vipUpdateFromModal"></VipUpdateFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
import API_ENUM from '@/enum/api-enum'
//弹出窗
import VipAddFromModal from './components/vip-add-from-modal.vue'
import VipUpdateFromModal from './components/vip-update-from-modal.vue'
//仓库
import useDictDataStore from '@/store/modules/acl/dictData'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useTxVipStore from '@/store/modules/vip/vip'

const dictDataStore = useDictDataStore()
const layoutSettingStore = useLayoutSettingStore();
const txVipStore = useTxVipStore();

//vip弹出窗对象
const vipAddFromModal = ref<FromModal>()
const vipUpdateFromModal = ref<FromModal>()

//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();

onMounted(() => {
  const searchForm = txVipStore.searchForm;
  instance?.proxy?.$resetObj(searchForm);
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size));

  //初始化字典数据
  loadDictData()
})


//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  txVipStore.dataList.page = currentPage
  refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  txVipStore.dataList.size = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
   txVipStore.multipleSelection = val
}

//删除txVip触发的事件
const deleteItem = (item: any) => {
        txVipStore
      .del(item.vipId)
      .then(() => {
        refresh();
      })
}

//删除多个txVip触发的事件
const deleteItems = () => {
  if(txVipStore.multipleSelection.length == 0){
    ElMessage.warning({ message: '请选择要删除的数据' })
    return;
  }
  const vipIds = txVipStore.multipleSelection.map((item: any) => item.vipId).join(',');
  txVipStore.del(vipIds).then(() => {
    refresh();
  })
}

//刷新数据方法
const refresh = () => {
  const searchQuery = txVipStore.searchForm;
  const page = txVipStore.dataList.page;
  const size =  txVipStore.dataList.size;
  (instance?.proxy as any).$addPage(searchQuery,page,size);
  txVipStore.list(searchQuery);
}

//导出操作日志数据
const exportData = () => {
  const searchQuery=txVipStore.searchForm;
  const url = `${API_ENUM.SERVER_MODE_NAME.TX_VIP}/export`;
  (instance?.proxy as any).$download(url, {
    ...searchQuery,
  },`vip_${new Date().getTime()}.xlsx`);
}

//加载所需要的字典数据
const loadDictData = () => {
  const dictNamesStr = '';
  const dictNames = dictNamesStr.substring(0,dictNamesStr.length-1).split(",");
  dictDataStore
      .dictDataInfoList(dictNames)
      .then((resp) => {
         txVipStore.dictData = resp.data
      })
      .catch((error) => {
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
    name: 'vip',
  }
</script>
<style scoped></style>