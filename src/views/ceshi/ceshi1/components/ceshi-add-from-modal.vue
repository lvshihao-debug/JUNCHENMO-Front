<template>
  <div class="web-1735272155665">
    <el-dialog v-model="fromOpenStatus" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">请输入标题</h4>
        </div>
      </template>
      <el-form ref="formRef" :model="customStore.commonform" :rules="formRules" size="default"
        label-width="100px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="customStore.commonform.mobile" placeholder="请输入" :maxlength="11" show-word-limit
            clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="小数" prop="field102">
          <el-input v-model="customStore.commonform.field102" type="number" placeholder="请输入" clearable
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="整数" prop="field103">
          <el-input v-model="customStore.commonform.field103" type="number" placeholder="请输入" clearable
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="多行文本" prop="field104">
          <el-input v-model="customStore.commonform.field104" type="textarea" placeholder="请输入"
            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="field105">
          <el-input v-model="customStore.commonform.field105" placeholder="请输入" clearable show-password
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="下拉选择" prop="field106">
          <el-select v-model="customStore.commonform.field106" placeholder="请选择下拉选择" clearable
            :style="{width: '100%'}">
            <el-option v-for="(item, index) in field106Options" :key="index" :label="item.label"
              :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单选框组" prop="field107">
          <el-radio-group v-model="customStore.commonform.field107" size="default">
            <el-radio v-for="(item, index) in field107Options" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多选框组" prop="field108">
          <el-checkbox-group v-model="customStore.commonform.field108" size="default">
            <el-checkbox v-for="(item, index) in field108Options" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="颜色选择" prop="field114" required>
          <el-color-picker v-model="customStore.commonform.field114" size="default"></el-color-picker>
        </el-form-item>
        <el-form-item label="上传" prop="field115" required>
          <el-upload ref="field115" :file-list="field115fileList" :action="field115Action"
            :before-upload="field115BeforeUpload">
            <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="日期范围" prop="field113">
          <el-date-picker type="daterange" v-model="customStore.commonform.field113" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" :style="{width: '100%'}" start-placeholder="开始日期" end-placeholder="结束日期"
            range-separator="至" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="开关" prop="field110" required>
          <el-switch v-model="customStore.commonform.field110"></el-switch>
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
 *  time: 2024/12/27 12:02:35  
 */
//TODO 防止格式变乱默认注释，使用时候自行取消 
import type {FormInstance} from 'element-plus'
//TODO 导入你的store
import useCustomStore from '@/store/modules/custom'
//TODO 导入表单规则
import {formRules} from '../types/form.rules'
//添加表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData']);
//获取当前组件实例
const instance = getCurrentInstance();
//TODO 使用你的store 仓库
const customStore = useCustomStore();
//表单对象引用
const formRef = ref < FormInstance > ()
//打开弹窗
const open = () => {
  (instance?.proxy as any).$resetObj(customStore.commonform)
  fromOpenStatus.value = true;
}
//关闭弹窗
const close = () => {
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

function field115BeforeUpload(file) {
  let isRightSize = file.size / 1024 / 1024 < 2
  if (!isRightSize) {
    this.$message.error('文件大小超过 2MB')
  }
  return isRightSize
}
defineExpose({
  open,
  close
});

</script>
<style lang="scss">
.web-1735272155665 {
  .el-upload__tip {
    line-height: 1.2;
  }
}

</style>
