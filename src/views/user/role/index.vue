<template>
  <div class="fade">
    <el-card class="searchCard">
      <el-form :inline="true" :model="roleStore.searchForm" class="searchForm" label-position="right" label-width="auto"
        ref="searchFormRef">
        <el-row style="display: flex">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleStore.searchForm.name" />
          </el-form-item>
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="roleStore.searchForm.code" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="roleStore.searchForm.status">
              <el-option label="启用" value="0" />
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
            <span>用户列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="roleAddFromModal?.open()">
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
      </template>

      <el-table :data="roleStore.dataList.list" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="roleId" label="ID" align="center" />
        <el-table-column prop="name" label="角色名称" align="center" />
        <el-table-column prop="code" label="角色编码" align="center" />
        <el-table-column prop="status" label="角色状态" align="center">
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
            <template v-if="!isAdminById(scope.row.roleId)">
              <el-button size="small" type="primary" @click="disableItem(scope.row)" text>
                停用
              </el-button>
            </template>
            <el-button size="small" type="primary" @click="roleUpdateFromModal?.open(scope.row)" text>
              修改
            </el-button>
            <template v-if="!isAdminById(scope.row.roleId)">
              <el-button size="small" type="primary" @click="roleAuthMenusFromModal?.open(scope.row)" text>
                分配菜单
              </el-button>
            </template>

            <template v-if="!isAdminById(scope.row.roleId)">
              <el-button size="small" type="danger" @click="deleteItem(scope.row)" text>

                删除
              </el-button>
            </template>

          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div class="pagination-style">
          <!--分页-->
          <el-pagination :page-sizes="[10, 20, 30, 40]" :default-page-size="Number(layoutSettingStore.setting.size)"
            small="small" background="true" layout="total, sizes, prev, pager, next, jumper" :total="roleStore.dataList.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>
    <!--加载动画-->
    <div class="table-data-loading" v-else>
      <Loading />
    </div>
    <!--弹出框组件列表-->
    <RoleAddFromModal ref="roleAddFromModal"></RoleAddFromModal>
    <RoleAuthMenusFromModal ref="roleAuthMenusFromModal"></RoleAuthMenusFromModal>
    <RoleUpdateFromModal ref="roleUpdateFromModal"></RoleUpdateFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'

//弹出窗
import RoleAddFromModal from './components/role-add-from-modal.vue'
import RoleAuthMenusFromModal from './components/role-auth-menus-from-modal.vue'
import RoleUpdateFromModal from './components/role-update-from-modal.vue'
//仓库
import useRoleStore from '@/store/modules/user/role'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//权限工具类
import { isAdminById } from '@/utils/permission'

//获取当前组件实例
const instance = getCurrentInstance()
const roleStore = useRoleStore()
const layoutSettingStore = useLayoutSettingStore()


onMounted(() => {
  roleStore.tableLoading = true;

  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size))
  
  setTimeout(() => {
    roleStore.tableLoading = false
  }, 500)
})

//表单对象
const searchFormRef = ref<FormInstance>()
//user弹出窗对象
const roleAddFromModal = ref<FromModal>()
const roleAuthMenusFromModal = ref<FromModal>()
const roleUpdateFromModal = ref<FromModal>()


//刷新数据方法
const refresh = () => {
  const searchQuery = roleStore.searchForm;
  (instance?.proxy as any).$addPage(searchQuery, roleStore.dataList.page, roleStore.dataList.size);
  roleStore.roleList(searchQuery);
}

//根据搜索条件进行搜索
const searchList = () => {
  roleStore.tableLoading = true;

  refresh();

  setTimeout(() => {
    roleStore.tableLoading = false
  }, 500)
}
//页面数据加载的状态
const loadingStatus = computed(() => {
  return !roleStore.tableLoading || !layoutSettingStore.setting.dataLoading;
});

//页码变更处理方法
const handleCurrentChange = (currentPage: number) => {
  roleStore.dataList.page = currentPage
  refresh();
}
//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  roleStore.dataList.size = pageSize
  refresh();
}

//选中数据触发的事件
const handleSelectionChange = (val: []) => {
  roleStore.multipleSelection = val
}

//删除角色触发的事件
const deleteItem = (item: any) => {
  roleStore.deleteRole([item.roleId]).then(() => {
    refresh();
  })
}

//删除多个字典类型触发的事件
const deleteItems = () => {
  const roleIds = roleStore.multipleSelection.map((item: any) => item.roleId);
  roleStore.deleteRole(roleIds).then(() => {
    refresh();
  })
}

//停用用户触发的事件
const disableItem = (item: any) => {
  if (item.status == 1) {
    ElMessage.warning({ message: '角色已经是停用状态' })
  } else {
    roleStore.upStatusRole(item).then(() => {
        searchList()
    })
  }
}

//提供给子组件刷新数据的方法
const refreshData = () => {
  searchList()
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
</script>
<script lang="ts">
export default {
  name: 'role',
}
</script>
<style scoped></style>
