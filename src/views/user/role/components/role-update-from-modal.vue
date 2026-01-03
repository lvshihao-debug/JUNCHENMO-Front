<template>
  <!--修改角色弹出框-->
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增角色</h4>
      </div>
    </template>
    <el-form
      :model="roleStore.commonForm"
      label-width="80"
      :rules="formRules"
      ref="formRef"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleStore.commonForm.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="modal-style">
        <el-button @click="fromOpenStatus = false">取消</el-button>
        <el-button type="primary" text bg @click="updateInfoItem(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import useRoleStore from '@/store/modules/user/role'
import { formRules } from '../types/form.rules'
//仓库
const roleStore = useRoleStore()
//获取当前组件实例
const instance = getCurrentInstance()
//表单对象引用
const formRef = ref<FormInstance>()
//添加表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData'])

// 打开
const open = (item: any) => {
  ;(instance?.proxy as any).$resetObj(roleStore.commonForm)
  ;(instance?.proxy as any).$assign(roleStore.commonForm, item)
  fromOpenStatus.value = true
}

const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      roleStore.upInfoRole(roleStore.commonForm).then(() => {
        const searchQuery = roleStore.searchForm
        ;(instance?.proxy as any).$addPage(
          searchQuery,
          roleStore.dataList.page,
          roleStore.dataList.size,
        )
        roleStore.roleList(searchQuery)
        fromOpenStatus.value = false
      })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
    }
  })
}

defineExpose({ open })
</script>

<style scoped></style>
