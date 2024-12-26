<template>
    <div class="web-1735213190257">
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
   *  time: 2024/12/26 19:39:50  
   */
  import type {FormInstance } from 'element-plus'
  //TODO 导入你的store
  import useCustomStore from '@/store/modules/custom'
  //导入表单规则
  import { formRules } from './types/form.rules'
  //表单对象引用
  const formRef = ref < FormInstance > () //TODO 使用你的store 仓库
  const customStore = useCustomStore();
  const submitForm = ()=> {
    formRef.value.validate(valid => {
      if (!valid) return
      // TODO 提交表单
    })
  }
  
  const resetForm = ()=> {
    formRef.value.resetFields()
  }
  
  </script>
  <style lang="scss">
  .web-1735213190257 {
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
  