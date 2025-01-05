<template>
    <el-dialog v-model="fromOpenStatus" width="800" :show-close="false">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">预览</h4>
            </div>
        </template>
        <editor v-model="genCodeStore.code" readonly="true" :theme="layoutSettingStore.getThemeStatus"/>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
//仓库
import useGenCodeStore from '@/store/modules/tool/genCode'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

//获取当前组件实例
const genCodeStore = useGenCodeStore();
const layoutSettingStore = useLayoutSettingStore();

//表单对象
const tableSearchForm = ref<FormInstance>();
//获取当前组件实例
const instance = getCurrentInstance();
//表单打开的状态
const fromOpenStatus = ref(false)

// 打开modal框
const open = () => {
    fromOpenStatus.value = true;
};

defineExpose({ open });
</script>
<style scoped></style>