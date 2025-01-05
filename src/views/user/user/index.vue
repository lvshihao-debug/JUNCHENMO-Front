<template>
  <div class="fade">
    <el-card class="searchCard">
      <el-form :inline="true" :model="userStore.searchForm" class="searchForm" label-position="right" label-width="auto"
        ref="searchFormRef">
        <el-row>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userStore.searchForm.username" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userStore.searchForm.nickname" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="userStore.searchForm.status">
              <el-option label="启用" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="more" label="手机号" prop="mobile">
            <el-input v-model="userStore.searchForm.mobile" />
          </el-form-item>
          <el-form-item v-show="more" label="邮箱" prop="email">
            <el-input v-model="userStore.searchForm.email" />
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
            <span>用户列表</span>
          </div>
          <div class="card-end">
            <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="userAddFromModal?.open()">
              <template #icon>
                <svg-icon name="加号" />
              </template>
            </JcmButton>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-card class="card-table-style" v-if="loadingStatus">
      <el-table :data="userStore.dataList.list" table-layout="auto">
        <el-table-column prop="userId" label="ID" align="center" />
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <template v-if="scope.row.avatar == null">
              <el-avatar :size="27" shape="square">
                {{ scope.row.username.charAt(0) }}
              </el-avatar>
            </template>
            <template v-else>
              <div style="display: flex;align-items: center;">
                <el-avatar :size="27" shape="square" :src="scope.row.avatar" align="center" />
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
          <template #default="scope">
            <span @click="(instance?.proxy as any).$copyText(scope.row.username)" class="copy-span">
              {{ scope.row.username }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center" />
        <el-table-column prop="mobile" label="手机号" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <template v-if="scope.row.status === 0">
              <el-tag checked size="small">启用</el-tag>
            </template>
            <template v-if="scope.row.status === 1">
              <el-tag checked size="small" color="#393e46">停用</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="loginDate" label="最后登录时间" align="center" />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="disableItem(scope.row)" text>
                停用
              </el-button>
            </template>
            <el-button size="small" type="primary" @click="userUpdateFromModal?.open(scope.row)" text>
              修改
            </el-button>
            <el-button size="small" type="primary" @click="handleDelete(scope.$index, scope.row)" text>
              详情
            </el-button>
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="userRestPasswordFromModal?.open(scope.row)" text>
                重置密码
              </el-button>
            </template>
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="userAuthRolesFromModal?.open(scope.row)" text>
                分配角色
              </el-button>
            </template>
            <template v-if="!isAdminById(scope.row.userId)">
              <el-button size="small" type="primary" @click="deleteItem(scope.row)" text>
                删除
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="pagination-style">
          <!--分页-->
          <el-pagination :page-sizes="[10, 20, 30, 40]" small="small" background="true"
            :default-page-size="Number(layoutSettingStore.setting.size)"
            layout="total, sizes, prev, pager, next, jumper" :total="userStore.dataList.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </template>
    </el-card>
    <!--加载动画-->
    <div class="table-data-loading" v-else>
      <Loading />
    </div>
    <!--弹出框组件列表-->
    <UserAddFromModal ref="userAddFromModal"></UserAddFromModal>
    <UserUpdateFromModal ref="userUpdateFromModal"></UserUpdateFromModal>
    <UserRestPasswordFromModal ref="userRestPasswordFromModal"></UserRestPasswordFromModal>
    <UserAuthRolesFromModal ref="userAuthRolesFromModal"></UserAuthRolesFromModal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FromModal } from '@/utils/commonType'
//导入类型
//弹出窗
import UserAddFromModal from './components/user-add-from-modal.vue'
import UserUpdateFromModal from './components/user-update-from-modal.vue'
import UserRestPasswordFromModal from './components/user-rest-password-from-modal.vue'
import UserAuthRolesFromModal from './components/user-auth-roles-from-modal.vue'
//仓库
import useUserStore from '@/store/modules/user/user'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//权限工具类
import { isAdminById } from '@/utils/permission'

//获取当前组件实例
const instance = getCurrentInstance()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  instance?.proxy?.$resetObj(userStore.searchForm);
  userStore.tableLoading = true;
  //进入页面初始化的数据 手动触发更新页数的逻辑
  handleSizeChange(Number(layoutSettingStore.setting.size));
  setTimeout(() => {
    userStore.tableLoading = false
  }, 500)
})

//表单对象
const searchFormRef = ref<FormInstance>()
//弹出窗对象
const userAddFromModal = ref<FromModal>()
const userUpdateFromModal = ref<FromModal>()
const userRestPasswordFromModal = ref<FromModal>()
const userAuthRolesFromModal = ref<FromModal>()
//更多按钮状态
const more = ref(false)

//刷新数据方法
const refresh = () => {
  const searchQuery = userStore.searchForm;
  (instance?.proxy as any).$addPage(searchQuery, userStore.dataList.page, userStore.dataList.size);
  userStore.userList(searchQuery);
}
//根据搜索条件进行搜索
const searchList = () => {
  userStore.tableLoading = true;

  refresh();

  setTimeout(() => {
    userStore.tableLoading = false
  }, 500)
}
//页面数据加载的状态
const loadingStatus = computed(() => {
  return !userStore.tableLoading || !layoutSettingStore.setting.dataLoading;
});

//页码变更触发的方法
const handleCurrentChange = (currentPage: number) => {
  userStore.dataList.page = currentPage
  refresh();
}

//页数切换触发的事件
const handleSizeChange = (pageSize: number) => {
  userStore.dataList.size = pageSize
  refresh();
}

//删除用户触发的事件
const deleteItem = (item: any) => {
  userStore.delUser(item.userId).then(() => {
    refresh();
  })

}

//停用用户触发的事件
const disableItem = (item: any) => {
  if (item.status == 1) {
    ElMessage.warning({ message: '用户已经是停用状态' })
  } else {
    userStore.upStatusUser(item).then(() => {
      refresh();
    })
  }
}

//重置搜索表单
const resetSearchForm = (ruleFormRef: any) => {
  console.log(ruleFormRef);
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
</script>

<script lang="ts">
export default {
  name: 'user',
}
</script>
<style scoped></style>
