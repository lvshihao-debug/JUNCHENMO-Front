<template>
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增log</h4>
      </div>
    </template>
    <el-form :model="sysJobLogStore.commonForm" label-width="80" :rules="formRules" ref="formRef">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="sysJobLogStore.commonForm.jobName" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务组名" prop="jobGroup">
        <el-select v-model="sysJobLogStore.commonForm.jobGroup" placeholder="请选择任务组名">
          <el-option v-for="dict in loadDictDataByName('jobTaskGroup')" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调用目标字符串" prop="invokeTarget">
        <el-input v-model="sysJobLogStore.commonForm.invokeTarget" type="textarea" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="日志信息" prop="jobMessage">
        <el-input v-model="sysJobLogStore.commonForm.jobMessage" type="textarea" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="异常信息" prop="exceptionInfo">
        <el-input v-model="sysJobLogStore.commonForm.exceptionInfo" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="modal-style">
        <el-button @click="fromOpenStatus = false" text bg>取消</el-button>
        <el-button type="primary" text bg @click="addItem(formRef)">
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
import useSysJobLogStore from '@/store/modules/montior/jobTaskLog'
import useDictTypeStore from '@/store/modules/acl/dictType'

const sysJobLogStore = useSysJobLogStore();
const dictTypeStore = useDictTypeStore()

//获取当前组件实例
const instance = getCurrentInstance();
//表单打开的状态
const fromOpenStatus = ref(false)
//表单对象引用
const formRef = ref<FormInstance>()

// 打开modal框
const open = () => {
  const commonForm = sysJobLogStore.commonForm;
  (instance?.proxy as any).$resetObj(commonForm)
  fromOpenStatus.value = true;
};

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      sysJobLogStore.add(sysJobLogStore.commonForm).then(() => {
        const searchQuery = sysJobLogStore.searchForm;
        const page = sysJobLogStore.dataList.page;
        const size = sysJobLogStore.dataList.size;
        (instance?.proxy as any).$addPage(searchQuery, page, size);
        sysJobLogStore.list(searchQuery);
        fromOpenStatus.value = false;
      })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请按提示填写完整' })
    }
  })
}


//根据名称加载字典数据
const loadDictDataByName = (name: string) => {
  return sysJobLogStore.dictData.filter((item: any) => item.name === name)
}


defineExpose({ open });

</script>

<style scoped></style>
