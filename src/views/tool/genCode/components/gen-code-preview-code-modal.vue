<template>
  <el-dialog
    v-model="fromOpenStatus"
    width="1500"
    :show-close="false"
    top="5vh"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
      </div>
    </template>
    <div class="tab-container">
      <input
        v-for="(tab, index) in tabConfigs"
        :key="index"
        type="radio"
        :name="tab.name"
        :id="tab.id"
        :class="['tab', `tab--${index + 1}`]"
      />
      <label
        v-for="(tab, index) in tabConfigs"
        :key="index + 'label'"
        class="tab_label"
        :for="tab.id"
        @click="codeMenuClick(tab.modalName)"
      >
        {{ tab.label }}
      </label>

      <div class="indicator"></div>
    </div>
    <editor
      v-model="genCodeStore.codeArrays[currentCodeMenu]"
      readonly="true"
      height="700px"
      :theme="layoutSettingStore.getThemeStatus"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
//仓库
import useGenCodeStore from '@/store/modules/tool/genCode'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

//获取当前组件实例
const genCodeStore = useGenCodeStore()
const layoutSettingStore = useLayoutSettingStore()
const currentCodeMenu = ref('vm/java/controller.java.vm')
//表单打开的状态
const fromOpenStatus = ref(false)
const title = ref('')
// 定义 tab 配置项类型
type TabConfig = {
  id: string
  name: string
  label: string
  modalName: string
}

// tab 配置项数组，可根据实际需求扩展或修改，这里和原来的各个选项对应
const tabConfigs: TabConfig[] = [
  {
    id: 'tab1',
    name: 'tab',
    label: 'Controller',
    modalName: 'vm/java/controller.java.vm',
  },
  {
    id: 'tab2',
    name: 'tab',
    label: 'domain',
    modalName: 'vm/java/domain.java.vm',
  },
  {
    id: 'tab3',
    name: 'tab',
    label: 'Service',
    modalName: 'vm/java/service.java.vm',
  },
  {
    id: 'tab4',
    name: 'tab',
    label: 'ServiceImpl',
    modalName: 'vm/java/serviceImpl.java.vm',
  },
  {
    id: 'tab5',
    name: 'tab',
    label: 'Mapper',
    modalName: 'vm/java/mapper.java.vm',
  },
  {
    id: 'tab6',
    name: 'tab',
    label: 'Mapper.xml',
    modalName: 'vm/xml/mapper.xml.vm',
  },
  {
    id: 'tab7',
    name: 'tab',
    label: 'Api.ts',
    modalName: 'vm/ts/api.ts.vm',
  },
  {
    id: 'tab8',
    name: 'tab',
    label: 'index.vue',
    modalName: 'vm/vue/index.vue.vm',
  },
  {
    id: 'tab9',
    name: 'tab',
    label: 'indexStore.ts',
    modalName: 'vm/store/indexStore.ts.vm',
  },
  {
    id: 'tab10',
    name: 'tab',
    label: 'addDialog.vue',
    modalName: 'vm/vue/components/indexAddModal.vue.vm',
  },
  {
    id: 'tab11',
    name: 'tab',
    label: 'updateDialog.vue',
    modalName: 'vm/vue/components/indexUpdateModal.vue.vm',
  },
]

const codeMenuClick = (modalName: string) => {
  currentCodeMenu.value = modalName
}
// 打开modal框
const open = (item: any) => {
  fromOpenStatus.value = true
  title.value = '预览 [' + item.tableName + '] 代码'
}

defineExpose({ open })
</script>
<style lang="scss" scoped>
.el-dialog__header {
  padding-bottom: 0 !important;
}

/* Remove this container when use */
.component-title {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 999;
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: #888888;
}
.tab-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  padding: 2px;
  border-radius: 9px;
  background-color: #fafafa;
  flex-direction: row;
}
.indicator {
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 9;
  width: 130px;
  height: 28px;
  border: 0.5px solid rgb(0 0 0 / 4%);
  border-radius: 7px;
  background: #ffffff;
  box-shadow:
    0 3px 8px rgb(0 0 0 / 12%),
    0 3px 1px rgb(0 0 0 / 4%);
  transition: all 0.2s ease-out;
  content: '';
}
.dark {
  .tab-container {
    background-color: #000000;
  }
  .indicator {
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 9;
    width: 130px;
    height: 28px;
    border: 0.5px solid rgb(255 255 255 / 4%);
    border-radius: 7px;
    background: #1e1b1b;
    box-shadow:
      0 3px 8px rgb(255 255 255 / 12%),
      0 3px 1px rgb(255 255 255 / 4%);
    transition: all 0.2s ease-out;
    content: '';
  }
}
.tab {
  position: absolute;
  z-index: 99;
  width: 130px;
  height: 28px;
  opacity: 0;
  outline: none;
}
.tab_label {
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 28px;
  font-size: 0.75rem;
  border: 0;
  opacity: 0.6;
  cursor: pointer;
}
.tab--1:checked ~ .indicator {
  left: 2px;
}
.tab--2:checked ~ .indicator {
  left: calc(130px + 2px);
}
.tab--3:checked ~ .indicator {
  left: calc(130px * 2 + 2px);
}
.tab--4:checked ~ .indicator {
  left: calc(130px * 3 + 2px);
}
.tab--5:checked ~ .indicator {
  left: calc(130px * 4 + 2px);
}
.tab--6:checked ~ .indicator {
  left: calc(130px * 5 + 2px);
}
.tab--7:checked ~ .indicator {
  left: calc(130px * 6 + 2px);
}
.tab--8:checked ~ .indicator {
  left: calc(130px * 7 + 2px);
}
.tab--9:checked ~ .indicator {
  left: calc(130px * 8 + 2px);
}
.tab--10:checked ~ .indicator {
  left: calc(130px * 9 + 2px);
}
.tab--11:checked ~ .indicator {
  left: calc(130px * 10 + 2px);
}
</style>
