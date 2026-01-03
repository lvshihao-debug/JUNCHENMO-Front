<template>
  <!--修改用户信息弹出框-->
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">修改用户信息</h4>
      </div>
    </template>
    <el-form
      :model="txVipStore.commonForm"
      label-width="80"
      ref="formRef"
      :rules="formRules"
    >
      <el-form-item label="咸鱼名称" prop="xyName">
        <el-input
          v-model="txVipStore.commonForm.xyName"
          placeholder="请输入咸鱼名称"
        />
      </el-form-item>
      <el-form-item label="起始时间" prop="startingTime">
        <el-date-picker
          clearable
          v-model="txVipStore.commonForm.startingTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择起始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="stopingTime">
        <el-date-picker
          clearable
          v-model="txVipStore.commonForm.stopingTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="开通天数" prop="purchaseDays">
        <el-input
          v-model="txVipStore.commonForm.purchaseDays"
          placeholder="请输入开通天数"
        />
      </el-form-item>
      <el-form-item label="设备名称" prop="unitType">
        <el-input
          v-model="txVipStore.commonForm.unitType"
          placeholder="请输入设备名称"
        />
      </el-form-item>
      <el-form-item label="登录方式" prop="loginMethod">
        <el-input
          v-model="txVipStore.commonForm.loginMethod"
          placeholder="请输入登录方式"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="modal-style">
        <el-button @click="fromOpenStatus = false" text bg>取消</el-button>
        <el-button type="primary" text bg @click="updateInfoItem(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { formRules } from '../types/form.rules'
//仓库
import useTxVipStore from '@/store/modules/vip/vip'
import useDictTypeStore from '@/store/modules/acl/dictType'

const txVipStore = useTxVipStore()
const dictTypeStore = useDictTypeStore()

//获取当前组件实例
const instance = getCurrentInstance()
//表单对象引用
const formRef = ref<FormInstance>()
//添加表单打开的状态
const fromOpenStatus = ref(false)

// 打开
const open = (item: any) => {
  const commonForm = txVipStore.commonForm
  ;(instance?.proxy as any).$resetObj(commonForm)
  ;(instance?.proxy as any).$assign(commonForm, item)
  fromOpenStatus.value = true
}

const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const searchQuery = txVipStore.searchForm
      const commonForm = txVipStore.commonForm
      const page = txVipStore.dataList.page
      const size = txVipStore.dataList.size
      txVipStore.update(commonForm).then(() => {
        ;(instance?.proxy as any).$addPage(searchQuery, page, size)
        txVipStore.list(searchQuery)
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
