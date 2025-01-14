<template>
    <!--修改用户信息弹出框-->
    <el-dialog
        v-model="fromOpenStatus"
        width="500"
        :show-close="false"
    >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">修改用户信息</h4>
        </div>
      </template>
      <el-form
          :model="sysJobLogStore.commonForm"
          label-width="80"
          ref="formRef"
          :rules="formRules"
      >
                        <el-form-item label="任务名称" prop="jobName">
                          <el-input v-model="sysJobLogStore.commonForm.jobName" placeholder="请输入任务名称" />
                        </el-form-item>
                        <el-form-item label="任务组名" prop="jobGroup">
                          <el-select v-model="sysJobLogStore.commonForm.jobGroup" placeholder="请选择任务组名" clearable>
                            <el-option
                                v-for="dict in loadDictDataByName('jobTaskGroup')"
                                :key="dict.value"
                                :label="dict.label"
                                :value="dict.value"
                            ></el-option>
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
    import useSysJobLogStore from '@/store/modules/montior/jobTaskLog'
    import useDictTypeStore from '@/store/modules/acl/dictType'
  
    const sysJobLogStore = useSysJobLogStore()
    const dictTypeStore = useDictTypeStore()
  
    //获取当前组件实例
    const instance  = getCurrentInstance();
    //表单对象引用
    const formRef = ref<FormInstance>()
    //添加表单打开的状态
    const fromOpenStatus = ref(false)
  
    // 打开
    const open = (item:any) => {
      const commonForm = sysJobLogStore.commonForm;
      (instance?.proxy as any).$resetObj(commonForm);
      (instance?.proxy as any).$assign(commonForm,item);
      fromOpenStatus.value = true;
    };
  
    const updateInfoItem = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
            const searchQuery = sysJobLogStore.searchForm;
            const commonForm = sysJobLogStore.commonForm;
            const page = sysJobLogStore.dataList.page;
            const size =  sysJobLogStore.dataList.size;
            sysJobLogStore.update(commonForm).then(() => {
                (instance?.proxy as any).$addPage(searchQuery,page,size);
                sysJobLogStore.list(searchQuery);
                fromOpenStatus.value = false;
            })
        } else {
          //弹出数据校验失败的message
          ElMessage.error({ message: '请将信息填写完整' })
        }
      })
    }
  
    //根据名称加载字典数据
    const loadDictDataByName = (name:string) => {
      return sysJobLogStore.dictData.filter((item: any) => item.name === name)
    }
  
  
    defineExpose({ open });
  
  
  </script>
  
  <style scoped>
  </style>
  