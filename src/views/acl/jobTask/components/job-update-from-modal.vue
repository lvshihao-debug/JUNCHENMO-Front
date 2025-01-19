<template>
  <!--修改用户信息弹出框-->
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">修改用户信息</h4>
      </div>
    </template>
    <el-form :model="sysJobStore.commonForm" label-width="90" ref="formRef" :rules="formRules">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="sysJobStore.commonForm.jobName" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务分组" prop="jobGroup">
        <el-select v-model="sysJobStore.commonForm.jobGroup" placeholder="请选择任务组名" clearable>
          <el-option v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysJobStore,'jobTaskGroup')" :key="dict.value" :label="dict.description"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="调用方法" prop="invokeTarget">
        <el-input v-model="sysJobStore.commonForm.invokeTarget" placeholder="请输入调用目标字符串" />
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="sysJobStore.commonForm.cronExpression" placeholder="请输入cron执行表达式" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="sysJobStore.commonForm.status"  size="small">
          <el-radio v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysJobStore,'jobTaskStatus')" :key="dict.value" :value="dict.value" border>{{
            dict.description }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="执行策略" prop="misfirePolicy"  size="small">
        <el-radio-group v-model="sysJobStore.commonForm.misfirePolicy">
          <el-radio-button v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysJobStore,'jobTaskMisfirePolicy')" :key="dict.value"
            :label="dict.description" :value="dict.value" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否并发" prop="concurrent">
        <el-radio-group v-model="sysJobStore.commonForm.concurrent"  size="small">
          <el-radio-button v-for="dict in (instance?.proxy as any).$loadDictDataByName(sysJobStore,'jobTaskConcurrent')" :key="dict.value"
            :label="dict.description" :value="dict.value" />
        </el-radio-group>
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
import useSysJobStore from '@/store/modules/acl/jobTask'

const sysJobStore = useSysJobStore()

//获取当前组件实例
const instance = getCurrentInstance();
//表单对象引用
const formRef = ref<FormInstance>()
//添加表单打开的状态
const fromOpenStatus = ref(false)

// 打开
const open = (item: any) => {
  const commonForm = sysJobStore.commonForm;
  (instance?.proxy as any).$resetObj(commonForm);
  (instance?.proxy as any).$assign(commonForm, item);
  fromOpenStatus.value = true;
};

const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const searchQuery = sysJobStore.searchForm;
      const commonForm = sysJobStore.commonForm;
      const page = sysJobStore.dataList.page;
      const size = sysJobStore.dataList.size;
      sysJobStore.update(commonForm).then(() => {
        (instance?.proxy as any).$addPage(searchQuery, page, size);
        sysJobStore.list(searchQuery);
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

<style scoped></style>