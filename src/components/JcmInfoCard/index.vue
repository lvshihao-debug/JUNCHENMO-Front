<template>
  <el-row>
    <el-col :span="24">
      <div class="card-header-style">
        <div class="card-header">
          <svg-icon
            :name="iconName"
            :width="12"
            :height="12"
            :color="layoutSettingStore.getThemeInvert"
          />
          <span style="margin-left: 5px">{{ title }}</span>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-card class="card-table-style">
    <template v-for="(value, key) in infoData" :key="key">
      <div class="card-info-item">
        {{ key }}:
        <span class="card-info-item-value">{{ value }}</span>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()

// 定义组件接收的属性
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  infoData: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.card-info-item:not(:nth-child(1)) {
  margin-top: 5px;
}
.card-info-item {
  padding: 9px;
  width: 100%;
  height: 30px;
  font-size: 13px;
  border-radius: 5px;
}
.card-info-item-value {
  margin-left: 5px;
}
</style>
