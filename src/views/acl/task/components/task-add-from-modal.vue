<template>
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增task</h4>
      </div>
    </template>
    <el-form
      :model="sysUserTaskStore.commonForm"
      label-width="80"
      :rules="formRules"
      ref="formRef"
    >
      <el-form-item label="任务标题" prop="title">
        <el-input
          v-model="sysUserTaskStore.commonForm.title"
          placeholder="请输入任务标题"
        />
      </el-form-item>
      <el-form-item label="任务描述" prop="description">
        <el-input
          v-model="sysUserTaskStore.commonForm.description"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item prop="taskTimeRange" label="任务日期">
        <el-date-picker
          v-model="taskTimeRange"
          type="datetimerange"
          range-separator="-"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-select
          v-model="sysUserTaskStore.commonForm.priority"
          placeholder="请选择任务优先级"
        >
          <el-option
            v-for="dict in (instance?.proxy as any).$loadDictDataByName(
              sysUserTaskStore,
              'taskPriority',
            )"
            :key="dict.value"
            :label="dict.description"
            :value="parseInt(dict.value)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="sysUserTaskStore.commonForm.status"
          placeholder="请选择任务状态"
        >
          <el-option
            v-for="dict in (instance?.proxy as any).$loadDictDataByName(
              sysUserTaskStore,
              'taskStatus',
            )"
            :key="dict.value"
            :label="dict.description"
            :value="parseInt(dict.value)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="sysUserTaskStore.commonForm.type"
          placeholder="请选择任务类型"
        >
          <el-option
            v-for="dict in (instance?.proxy as any).$loadDictDataByName(
              sysUserTaskStore,
              'taskType',
            )"
            :key="dict.value"
            :label="dict.description"
            :value="parseInt(dict.value)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" prop="userId">
        <el-select
          v-model="sysUserTaskStore.commonForm.userId"
          placeholder="请输入执行任务的用户"
          clearable
        >
          <el-option
            v-for="user in sysUserTaskStore.userOptions"
            :key="user.userId"
            :label="user.username"
            :value="user.userId"
          />
        </el-select>
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
import useSysUserTaskStore from '@/store/modules/acl/task'
const sysUserTaskStore = useSysUserTaskStore()

//获取当前组件实例
const instance = getCurrentInstance()
//表单打开的状态
const fromOpenStatus = ref(false)
//表单对象引用
const formRef = ref<FormInstance>()
//任务时间范围
const taskTimeRange = ref([])

// 打开modal框
const open = () => {
  const commonForm = sysUserTaskStore.commonForm
  ;(instance?.proxy as any).$resetObj(commonForm)
  fromOpenStatus.value = true
}

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const commonForm = sysUserTaskStore.commonForm
      commonForm.startDate = taskTimeRange.value[0]
      commonForm.endDate = taskTimeRange.value[1]
      sysUserTaskStore.add(commonForm).then(() => {
        const searchQuery = sysUserTaskStore.searchForm
        const page = sysUserTaskStore.dataList.page
        const size = sysUserTaskStore.dataList.size
        ;(instance?.proxy as any).$addPage(searchQuery, page, size)
        sysUserTaskStore.list(searchQuery)
        fromOpenStatus.value = false
      })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请按提示填写完整' })
    }
  })
}

defineExpose({ open })
</script>

<style scoped></style>
