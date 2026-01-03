<template>
  <!--修改字典配置项弹出框-->
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">修改字典配置项</h4>
      </div>
    </template>
    <el-form
      :model="dictTypeStore.commonForm"
      label-width="100"
      :rules="formRules"
      ref="formRef"
    >
      <el-form-item label="配置项" prop="name">
        <el-input
          v-model="dictTypeStore.commonForm.name"
          autocomplete="off"
          placeholder="请输入配置项"
        />
      </el-form-item>
      <el-form-item label="配置值类型" prop="type">
        <el-select v-model="dictTypeStore.commonForm.type">
          <template
            v-for="item in (instance?.proxy as any).$loadDictDataByName(
              dictTypeStore,
              'extrasDefaultStatus',
            )"
          >
            <el-option :label="item.description" :value="item.value" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="配置描述" prop="description">
        <el-input
          v-model="dictTypeStore.commonForm.description"
          autocomplete="off"
          placeholder="请输入配置描述"
        />
      </el-form-item>
      <el-divider>额外参数定义</el-divider>
      <div v-for="(param, index) in dictTypeStore.extraSchemas" :key="index">
        <el-form-item
          :label="'额外参数' + (index + 1)"
          :prop="'extra' + (index + 1)"
        >
          <el-select v-model="param.type" style="width: 30%">
            <template
              v-for="item in (instance?.proxy as any).$loadDictDataByName(
                dictTypeStore,
                'extrasDefaultStatus',
              )"
            >
              <el-option :label="item.description" :value="item.value" />
            </template>
          </el-select>
          <el-input
            v-model="param.parameter"
            autocomplete="off"
            placeholder="参数名称"
            style="width: 60%"
          />

          <el-button
            size="small"
            @click="deleteExtraClick(index)"
            text
            style="width: 10%; height: 100%"
          >
            <svg-icon
              name="减号"
              width="18px"
              height="18px"
              :color="layoutSettingStore.theme ? 'black' : 'white'"
            />
          </el-button>
        </el-form-item>
      </div>

      <div class="tag-container">
        <div
          class="tag-wrapper"
          v-for="item in (instance?.proxy as any).$loadDictDataByName(
            dictTypeStore,
            'extrasDefaultTag',
          )"
        >
          <el-tag
            type="primary"
            class="flex-tag"
            @click="addExtraClick(item.value, item.type)"
          >
            {{ item.value }}
          </el-tag>
        </div>
        <div class="button-wrapper">
          <el-button
            size="small"
            type="info"
            @click="addExtraClick(null, null)"
            style="width: 100%"
            text
          >
            <svg-icon
              name="加号"
              width="18px"
              height="18px"
              :color="layoutSettingStore.theme ? 'black' : 'white'"
            />
          </el-button>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="modal-style">
        <el-button @click="fromOpenStatus = false">取消</el-button>
        <el-button type="primary" text bg @click="updateInfoItem(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import useDictTypeStore from '@/store/modules/acl/dictType'
import { formRules } from '../types/form.rules'
//仓库
const layoutSettingStore = useLayoutSettingStore()
const dictTypeStore = useDictTypeStore()
//获取当前组件实例
const instance = getCurrentInstance()
//表单对象引用
const formRef = ref<FormInstance>()
//表单打开的状态
const fromOpenStatus = ref(false)
//接收刷新父组件数据的方法
const emit = defineEmits(['refreshData'])

// 打开modal框
const open = (item: any) => {
  dictTypeStore.extraSchemas.length = 0
  ;(instance?.proxy as any).$resetObj(dictTypeStore.commonForm)
  dictTypeStore.commonForm.dictTypeId = item.dictTypeId
  dictTypeStore.commonForm.name = item.name
  dictTypeStore.commonForm.type = item.type.toString()
  dictTypeStore.commonForm.description = item.description
  for (const schema of JSON.parse(item.extraSchema)) {
    dictTypeStore.extraSchemas.push(schema)
  }
  fromOpenStatus.value = true
}

//点击修改按钮触发的事件
const updateInfoItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      dictTypeStore.commonForm.extraSchema = JSON.stringify(
        dictTypeStore.extraSchemas,
      )
      // 验证额外参数
      if (dictTypeStore.extraSchemas) {
        for (let i = 0; i < dictTypeStore.extraSchemas.length; i++) {
          const extraSchema = dictTypeStore.extraSchemas[i]
          // 为空
          if (!extraSchema.parameter) {
            ElMessage.warning({ message: '额外参数' + (i + 1) + '不能为空' })
            return false
          }
        }
      }
      dictTypeStore.upInfoDictType(dictTypeStore.commonForm).then(() => {
        const searchQuery = dictTypeStore.searchForm
        ;(instance?.proxy as any).$addPage(
          searchQuery,
          dictTypeStore.dataList.page,
          dictTypeStore.dataList.size,
        )
        dictTypeStore.dictTypeList(searchQuery)
        fromOpenStatus.value = false
      })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
    }
  })
}

const addExtraClick = (parameter: string, type: number) => {
  const newParam = {
    parameter: parameter,
    type: type,
  }
  if (parameter && parameter.trim() !== '') {
    const isDuplicate = dictTypeStore.extraSchemas.some(
      (item) => item.parameter === parameter,
    )
    if (!isDuplicate) {
      dictTypeStore.extraSchemas.push(newParam)
    }
  } else {
    // 处理 parameter 为空字符串的情况，例如给出提示或进行其他逻辑
    dictTypeStore.extraSchemas.push(newParam)
  }
}

const deleteExtraClick = (index: number) => {
  dictTypeStore.extraSchemas.splice(index, 1)
}

defineExpose({ open })
</script>

<style scoped>
.tag-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag-wrapper {
  margin-right: 3px; /* 设置每个标签之间相隔5px */
  margin-left: 18px;
  max-width: calc(
    10 / 9 * 100%
  ); /* 最大el-tag可占用10/7的大小，这里使用calc函数结合百分比设置宽度 */
}
.flex-tag {
  cursor: pointer;
  width: auto; /* 让el-tag宽度自适应内容宽度 */
}
.button-wrapper {
  width: calc(10 / 1 * 100%); /* el-button占用10/3的宽度 */
}
</style>
