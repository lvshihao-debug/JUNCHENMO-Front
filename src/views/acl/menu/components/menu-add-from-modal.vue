<template>
  <!--新增菜单弹出框-->
  <el-dialog v-model="fromOpenStatus" width="500" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">新增菜单</h4>
      </div>
    </template>
    <el-form
      :model="menuStore.commonForm"
      label-width="80"
      :rules="formRules"
      ref="formRef"
    >
      <el-form-item
        v-show="!catalogueStatus"
        label="上级菜单"
        prop="parentId"
        required
      >
        <el-tree-select
          check-strictly
          v-model="menuStore.commonForm.parentId"
          :data="treeData"
          :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name" required>
        <el-input
          v-model="menuStore.commonForm.name"
          autocomplete="off"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type" required>
        <el-radio-group v-model="menuStore.commonForm.type" size="small">
          <template
            v-for="item in (instance?.proxy as any).$loadDictDataByName(
              menuStore,
              'menuType',
            )"
          >
            <el-radio-button :label="item.label" :value="item.value" />
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="!featureStatus" label="菜单图标" prop="icon">
        <JcmIconSelect
          :icon="menuStore.commonForm.icon"
          style="width: 100%"
          ref="iconSelectRef"
          @selected="selected"
        />
      </el-form-item>
      <el-form-item v-show="!featureStatus" label="组件" prop="component">
        <el-input
          v-model="menuStore.commonForm.component"
          autocomplete="off"
          placeholder="路由组件名称"
        />
      </el-form-item>
      <el-form-item v-show="!featureStatus" label="外联地址" prop="link">
        <el-input
          v-model="menuStore.commonForm.link"
          autocomplete="off"
          placeholder="组件名称与外联地址二选一"
        />
      </el-form-item>
      <el-form-item v-show="featureStatus" label="菜单权限" prop="permission">
        <el-input
          v-model="menuStore.commonForm.permission"
          autocomplete="off"
          placeholder="菜单权限 system:user:list"
        />
      </el-form-item>
      <el-form-item label="菜单顺序" prop="sort" required>
        <el-input-number v-model="menuStore.commonForm.sort" :min="0" />
      </el-form-item>
      <el-form-item
        v-show="!featureStatus"
        label="是否可见"
        prop="visible"
        required
      >
        <el-switch v-model="menuStore.commonForm.visible" class="mb-2" />
      </el-form-item>
      <el-form-item
        v-show="!featureStatus"
        label="是否缓存"
        prop="keepAlive"
        required
      >
        <el-switch v-model="menuStore.commonForm.keepAlive" class="mb-2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-divider border-style="double" />
      <div style="display: flex; justify-content: center">
        <el-button @click="fromOpenStatus = false">取消</el-button>
        <el-button type="primary" text bg @click="addItem(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import useMenuStore from '@/store/modules/acl/menu'
import { formRules } from '../types/form.rules'
//仓库
const menuStore = useMenuStore()
//获取当前组件实例
const instance = getCurrentInstance()
//表单对象引用
const formRef = ref<FormInstance>()
// 获取子组件的引用
const iconSelectRef = ref()
//表单打开的状态
const fromOpenStatus = ref(false)

//上级菜单的树形列表
let treeData = ref([]) as any
//菜单选项显示隐藏状态
const catalogueStatus = ref(false)
const featureStatus = ref(false)

// 打开modal框
const open = (item: any) => {
  //清除表单填写的内容
  clearCommonFrom()
  if (undefined == item) {
    getMenuLastSort(0)
  } else {
    getMenuLastSort(item.menuId)
    if (iconSelectRef.value) {
      iconSelectRef.value.clearIconInputValue()
    }
    menuStore.commonForm.type = item.type + 1
    menuStore.commonForm.parentId = `${item.menuId}`
  }
  treeData = menuStore.getTreeSelectData(menuStore.dataList)
  catalogueStatus.value = menuStore.commonForm.type == 0
  fromOpenStatus.value = true
}

//点击添加按钮触发的事件
const addItem = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      menuStore.addMenu(menuStore.commonForm).then(() => {
        const searchQuery = menuStore.searchForm
        menuStore.menuList(searchQuery)
        fromOpenStatus.value = false
      })
    } else {
      //弹出数据校验失败的message
      ElMessage.error({ message: '请将信息填写完整' })
    }
  })
}

//选择图标子组件调用的方法
const selected = (val: any) => {
  menuStore.commonForm.icon = val
}

//获取菜单最后的顺序号+100
const getMenuLastSort = (menuId: any) => {
  menuStore.lastSortMenu(menuId).then((resp: any) => {
    menuStore.commonForm.sort = resp.data
  })
}

//监听新增弹窗中，菜单的类型，如果是目录，则不展示父菜单选项，默认父菜单id是0
watch(
  () => menuStore.commonForm.type,
  (newVal) => {
    catalogueStatus.value = newVal == 0
    featureStatus.value = newVal == 2
  },
)

/**
 *  commonForm表单重置
 *  将commonForm的parentId,type,visible,keepAlive
 *  分别设置为0,0,false,false
 *  除parentId,type,visible,keepAlive外的其他字段
 *  都设置为"",包括name,icon,sort,remark,component,url
 *  @function clearCommonFrom
 *  @return {void}
 */
const clearCommonFrom = () => {
  instance?.proxy?.$resetObj(menuStore.commonForm)
  menuStore.commonForm.parentId = '0'
  menuStore.commonForm.type = 0
  menuStore.commonForm.keepAlive = false
  menuStore.commonForm.visible = false
}

defineExpose({ open })
</script>

<style scoped></style>
