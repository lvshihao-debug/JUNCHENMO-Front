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
          @keyup.enter="handleQuery"
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
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录方式" prop="loginMethod">
        <el-input
          v-model="txVipStore.searchForm.loginMethod"
          placeholder="请输入登录方式"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录账号" prop="loginAccount">
        <el-input
          v-model="txVipStore.searchForm.loginAccount"
          placeholder="请输入登录账号"
          clearable
          @keyup.enter="handleQuery"
        />
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
            <span>vip列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="download()">
              <template #icon>
                <svg-icon name="导入" />
              </template>
            </JcmButton>
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="add()">
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
                    <span>{{ parseTime(scope.row.startingTime, '{y}-{m}-{d}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="结束时间" align="center" prop="stopingTime" width="180">
                  <template #default="scope">
                    <span>{{ parseTime(scope.row.stopingTime, '{y}-{m}-{d}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="开通天数" align="center" prop="purchaseDays" />
                <el-table-column label="设备名称" align="center" prop="unitType" />
                <el-table-column label="状态(0在用，1下线)" align="center" prop="status" />
                <el-table-column label="登录方式" align="center" prop="loginMethod" />
                <el-table-column label="登录账号" align="center" prop="loginAccount" />

        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="PreviewCodeModal?.open()" text>
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

    <!-- 添加或修改vip对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="vipRef" :model="form" :rules="rules" label-width="80px">

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
//仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useTxVipStore from '@/store/modules/tool/genCode'

const layoutSettingStore = useLayoutSettingStore();
const txVipStore = useTxVipStore();
//获取当前组件实例
const instance = getCurrentInstance();
//表单对象
const searchFormRef = ref<FormInstance>();

onMounted(() => {
  instance?.proxy?.$resetObj(${businessNameLCUC}Store.searchForm});
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size));
})


//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  txVipStore.dataList.page} = currentPage
  refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  txVipStore.dataList.size} = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
   txVipStore.multipleSelection = val
}

//刷新数据方法
const refresh = () => {
  const searchQuery = txVipStore.searchForm};
  (instance?.proxy as any).$addPage(searchQuery, txVipStore.dataList.page}, txVipStore.dataList.size});
  txVipStore.list(searchQuery);
}

//弹出窗对象
/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/vip/export', {
    ...queryParams.value
  }, `vip_${new Date().getTime()}.xlsx`)
}

</script>
