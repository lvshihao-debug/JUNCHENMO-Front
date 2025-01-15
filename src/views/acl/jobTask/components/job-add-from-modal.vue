<template>
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增job</h4>
      </div>
    </template>
    <el-form :model="sysJobStore.commonForm" label-width="90" :rules="formRules" ref="formRef">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="sysJobStore.commonForm.jobName" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务分组" prop="jobGroup">
        <el-select v-model="sysJobStore.commonForm.jobGroup" placeholder="请选择任务组名" clearable>
          <el-option v-for="dict in loadDictDataByName('jobTaskGroup')" :key="dict.value" :label="dict.description"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="invokeTarget">
        <template #label>
          <div style="display: flex;align-items: center;justify-content: space-evenly;">
            <div>调用方法</div>
            <el-tooltip effect="dark" placement="top">
              <template #content>
                Bean调用示例：jcmTask.jcmParams('jcm')<br />
                Class类调用示例：com.jcm.job.task.JcmTask.jcmParams('jcm')<br />
                参数说明：支持字符串，布尔类型，长整型，浮点型，整型"</template>
              <svg-icon style="cursor: pointer;margin-left: 2px;" name="问号" width="20" height="20" :color="layoutSettingStore.getThemeInvert" />
            </el-tooltip>
          </div>
        </template>
        <el-input v-model="sysJobStore.commonForm.invokeTarget" placeholder="请输入调用目标字符串" />
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="sysJobStore.commonForm.cronExpression" placeholder="请输入cron执行表达式" />
      </el-form-item>
      <el-form-item label="执行策略" prop="misfirePolicy">
        <el-radio-group v-model="sysJobStore.commonForm.misfirePolicy" size="small">
          <el-radio-button v-for="dict in loadDictDataByName('jobTaskMisfirePolicy')" :key="dict.value"
            :label="dict.description" :value="dict.value" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否并发" prop="concurrent">
        <el-radio-group v-model="sysJobStore.commonForm.concurrent" size="small">
          <el-radio-button v-for="dict in loadDictDataByName('jobTaskConcurrent')" :key="dict.value"
            :label="dict.description" :value="dict.value" />
        </el-radio-group>
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
import useSysJobStore from '@/store/modules/acl/jobTask'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const sysJobStore = useSysJobStore();
const layoutSettingStore = useLayoutSettingStore();
//获取当前组件实例
const instance = getCurrentInstance();
//表单打开的状态
const fromOpenStatus = ref(false)
//表单对象引用
const formRef = ref<FormInstance>()

// 打开modal框
const open = () => {
  const commonForm = sysJobStore.commonForm;
  (instance?.proxy as any).$resetObj(commonForm)
  fromOpenStatus.value = true;
};

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      sysJobStore.add(sysJobStore.commonForm).then(() => {
        const searchQuery = sysJobStore.searchForm;
        const page = sysJobStore.dataList.page;
        const size = sysJobStore.dataList.size;
        (instance?.proxy as any).$addPage(searchQuery, page, size);
        sysJobStore.list(searchQuery);
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
  return sysJobStore.dictData.filter((item: any) => item.name === name)
}


defineExpose({ open });

</script>

<style scoped></style>