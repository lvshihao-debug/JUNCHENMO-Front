<template>
  <div class="jcm-layout-icon">
    <div class="layout-icon-container" :style="{ backgroundColor: leftBgColor,border: currentSelectedIndex == index? '3px solid '+ themeColor : theme}">
      <div :class="['left-column', { 'custom-width': customLeftWidth }]"
        :style="{ width: leftWidth + '%', backgroundColor: leftBgColor }">
        <div class="left-menu-item" :style="{ backgroundColor: leftColor }"></div>
        <div class="left-menu-item" :style="{ backgroundColor: leftColor }"></div>
        <div class="left-menu-item" :style="{ backgroundColor: leftColor }"></div>
      </div>
      <div :class="['right-column', { 'custom-width': customRightWidth }]"
        :style="{ width: rightWidth + '%', backgroundColor: rightBgColor }">
        <div class="right-item" :style="{ backgroundColor: rightColor }"></div>
        <div class="right-item" :style="{ backgroundColor: rightColor }"></div>
        <div class="right-item" :style="{ backgroundColor: rightColor }"></div>
      </div>
    </div>
    <!-- 新增图标下方文字显示部分 -->
    <div class="icon-text">{{ iconText }}</div>

    <!-- 通过v-show来控制active-dot的显示，根据当前选中的索引判断 -->
    <div class="active-dot" v-show="currentSelectedIndex == index"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()
// 定义接收的props，使用类型注解明确参数类型
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  leftColor: {
    type: String,
    default: '#EDEEF0'
  },
  rightColor: {
    type: String,
    default: '#EDEEF0'
  },
  leftBgColor: {
    type: String,
    default: '#EDEEF0'
  },
  rightBgColor: {
    type: String,
    default: '#EDEEF0'
  },
  leftWidth: {
    type: Number,
    default: 35
  },
  rightWidth: {
    type: Number,
    default: 60
  },
  iconText: {
    type: String,
    default: '两栏布局' // 设置默认显示的文字，可根据需求修改
  }
});
const themeColor = ref<string>()
const theme = ref<string>()
themeColor.value=layoutSettingStore.setting.themeColor
theme.value=layoutSettingStore.setting.theme==0?"white":"black"
// 用于标记是否是自定义宽度，方便添加相应的类名来处理样式
const customLeftWidth = ref(false);
const customRightWidth = ref(false);
// 点击组件时触发的函数，更新当前选中的组件索引
const currentSelectedIndex = ref(0);

const selectIndex = (index: number) => {
  currentSelectedIndex.value = index;
};
watch(() => layoutSettingStore.setting.themeColor, (newVal) => {
  themeColor.value=newVal
});
watch(() => layoutSettingStore.setting.theme, (newVal) => {
  theme.value=newVal==0?"white":"black"
});
// 监听leftWidth和rightWidth的变化，当它们不等于默认值时，标记为自定义宽度
watch(() => props.leftWidth, (newVal) => {
  customLeftWidth.value = newVal !== 35;
});
watch(() => props.rightWidth, (newVal) => {
  customRightWidth.value = newVal !== 60;
});

// 使用defineExpose导出selectIndex方法，以便父组件可以调用
defineExpose({
  selectIndex
});
</script>

<style scoped>
.jcm-layout-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
}

.layout-icon-container {
  width: 66px;
  height: 45px;
  display: flex;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 8px #000003;
}

.layout-icon:active {}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
  border-radius: 5px 5px;
}

.left-menu-item {
  width: 100%;
  height: 4px;
}

.left-menu-item:nth-child(2) {
  width: 80%;
}

.right-column {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 0px 4px 4px 0px;
}

.right-item {
  width: 90%;
  height: 5px;
}

.right-item:nth-child(2) {
  width: 70%;
}

.active-dot {
  margin-top: 8px;
  background-color: rgb(44, 222, 44);
  border-radius: 50%;
  width: 5px;
  height: 5px;
}

/* 根据是否是自定义宽度添加额外的样式调整，这里可以根据实际需求扩展更多样式规则 */
.left-column.custom-width {}

.right-column.custom-width {}
</style>