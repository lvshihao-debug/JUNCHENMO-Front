<template>
  <div class="web-1735268749663">
    <el-form ref="formRef" :model="customStore.commonform" :rules="formRules" size="default"
      label-width="100px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="customStore.commonform.mobile" placeholder="请输入" :maxlength="11" show-word-limit
          clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="单行文本" prop="field103">
        <el-input v-model="customStore.commonform.field103" placeholder="请输入" clearable
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="小数" prop="field104">
        <el-input v-model="customStore.commonform.field104" type="number" placeholder="请输入" clearable
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="整数" prop="field105">
        <el-input v-model="customStore.commonform.field105" type="number" placeholder="请输入" clearable
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="多行文本" prop="field106">
        <el-input v-model="customStore.commonform.field106" type="textarea" placeholder="请输入"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="field107">
        <el-input v-model="customStore.commonform.field107" placeholder="请输入" clearable show-password
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
/** 
 *  作者: JUN CHEN MO
 *  time: 2024/12/27 11:05:49  
 */
//TODO 防止格式变乱默认注释，使用时候自行取消 
import type {FormInstance} from 'element-plus'
//TODO 导入你的store
import useCustomStore from '@/store/modules/custom'
//导入表单规则
TODO import { formRules } from './types/form.rules'
//获取当前组件实例
const instance = getCurrentInstance();
//TODO 使用你的store 仓库
const customStore = useCustomStore();
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);
//表单对象引用
const formRef = ref < FormInstance > ()
//添加表单打开的状态
const fromOpenStatus = ref(false)

function submitForm() {
  formRef.value.validate(valid => {
    if (!valid) return
    // TODO 提交表单
  })
}

function resetForm() {
  formRef.value.resetFields()
}

</script>
<style lang="scss">
.web-1735268749663 {}

</style>
