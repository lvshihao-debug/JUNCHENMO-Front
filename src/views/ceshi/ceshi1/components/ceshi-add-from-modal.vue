<template>
    <div class="web-1735213094018">
      <el-dialog v-model="fromOpenStatus" :show-close="false">
        <template #header="{ titleId, titleClass }">
          <div class="my-header">
            <h4 :id="titleId" :class="titleClass">请输入标题</h4>
          </div>
        </template>
        <el-form ref="formRef" :model="customStore.commonform" :rules="formRules" size="default"
          label-width="100px">
          <el-form-item label="一级标题" prop="undefined">
            <h1 class="head-title-h1">一级标题</h1>
          </el-form-item>
          <el-row type="flex" justify="start" align="top" gutter="15">
            <el-col :span="12">
              <el-form-item label="单行文本" prop="field102">
                <el-input v-model="customStore.commonform.field102" placeholder="请输入" clearable
                  :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小数" prop="field103">
                <el-input v-model="customStore.commonform.field103" type="number" placeholder="请输入" clearable
                  :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="整数" prop="field104">
            <el-input v-model="customStore.commonform.field104" type="number" placeholder="请输入" clearable
              :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="多行文本" prop="field105">
            <el-input v-model="customStore.commonform.field105" type="textarea" placeholder="请输入多行文本"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="field107">
            <el-input v-model="customStore.commonform.field107" placeholder="请输入" clearable show-password
              :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="modal-style">
            <el-button @click="fromOpenStatus = false">取消</el-button>
            <el-button type="primary" text bg @click="customItem(formRef)"> 确定 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  <script setup lang="ts">
  /** 
   *  作者: JUN CHEN MO
   *  time: 2024/12/26 19:38:14  
   */
  import type {
    FormInstance
  }
  from 'element-plus'
  //TODO 导入你的store
  import useCustomStore from '@/store/modules/custom'
  //导入表单规则
  import {
    formRules
  }
  from '../types/form.rules'
  import type {
    ComponentInternalInstance
  }
  from 'vue'
  //获取当前组件实例
  const instance: ComponentInternalInstance | null = getCurrentInstance();
  //表单对象引用
  const formRef = ref < FormInstance > ()
  //添加表单打开的状态
  const fromOpenStatus = ref(false)
  //接收刷新父组件数据的方法
  const emit = defineEmits(['refreshData']); //TODO 使用你的store 仓库
  const customStore = useCustomStore();
  const open = () => {
    instance?.proxy?.$resetObj(customStore.commonform)
    fromOpenStatus.value = true;
  }
  const close = () => {
    instance?.proxy?.$resetObj(customStore.commonform)
    fromOpenStatus.value = false;
  }
  const customItem = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        // TODO 提交表单
      }
      else {
        //弹出数据校验失败的message
        ElMessage.error({
          message: '请将信息填写完整'
        })
      }
    })
  }
  defineExpose({
    open
  });
  
  </script>
  <style lang="scss">
  .web-1735213094018 {
    .head-title-h1 {
      color: #1A93F9;
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      text-shadow: #5B96E9AB 2px 2px 3px;
      border-left: 5px solid #3f92d991;
      padding-left: 10px;
    }
  }
  
  </style>
  