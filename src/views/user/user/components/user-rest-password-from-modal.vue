<template>
    <!--修改用户密码弹出框-->
    <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">重置密码</h4>
            </div>
        </template>
        <el-form :model="userStore.commonForm" label-width="60" :rules="formRules" ref="formRef">
            <el-form-item label="用户名">
                <el-input v-model="userStore.commonForm.username" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userStore.commonForm.nickname" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userStore.commonForm.password" autocomplete="off" type="password" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="modal-style">
                <el-button @click="fromOpenStatus = false">
                    取消
                </el-button>
                <el-button type="primary" text bg @click="updatePasswordItem(formRef)">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import useUserStore from '@/store/modules/user/user'
import { formRules } from '../types/form.rules'
//仓库
const userStore = useUserStore()
//获取当前组件实例
const instance = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);


// 打开modal框
const open = (item:any) => {
    userStore.commonForm.userId = item.userId
    userStore.commonForm.username = item.username
    userStore.commonForm.nickname = item.nickname
    fromOpenStatus.value = true;
};

//点击修改密码按钮触发的事件
const updatePasswordItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore.upPasswordUser(userStore.commonForm).then(() => {
        const searchQuery = userStore.searchForm;
        (instance?.proxy as any).$addPage(searchQuery, userStore.dataList.page, userStore.dataList.size);
        userStore.userList(searchQuery);
        fromOpenStatus.value = false;
      })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
    }
  })
}

defineExpose({ open });

</script>

<style scoped>
</style>
