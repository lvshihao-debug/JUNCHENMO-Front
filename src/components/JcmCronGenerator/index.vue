<template>
  <div class="jcm-cron-generator">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="秒" name="second">
        <CronTab v-model="second" :type="'second'" />
      </el-tab-pane>
      <el-tab-pane label="分" name="minute">
        <CronTab v-model="minute" :type="'minute'" />
      </el-tab-pane>
      <el-tab-pane label="时" name="hour">
        <CronTab v-model="hour" :type="'hour'" />
      </el-tab-pane>
      <el-tab-pane label="日" name="day">
        <CronTab v-model="day" :type="'day'" />
      </el-tab-pane>
      <el-tab-pane label="月" name="month">
        <CronTab v-model="month" :type="'month'" />
      </el-tab-pane>
      <el-tab-pane label="周" name="week">
        <CronTab v-model="week" :type="'week'" />
      </el-tab-pane>
      <el-tab-pane label="年" name="year">
        <CronTab v-model="year" :type="'year'" />
      </el-tab-pane>
    </el-tabs>

    <div class="cron-result">
      <div class="cron-expression">
        <span>生成的表达式：</span>
        <el-tag size="large">{{ cronExpression }}</el-tag>
      </div>
      <div class="cron-actions">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CronTab from './CronTab.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '* * * * * ?',
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const activeTab = ref('second')

const second = ref('*')
const minute = ref('*')
const hour = ref('*')
const day = ref('*')
const month = ref('*')
const week = ref('?')
const year = ref('')

// 解析传入的 cron 表达式
const parseCron = (cron: string) => {
  if (!cron) return
  const parts = cron.split(' ')
  second.value = parts[0] || '*'
  minute.value = parts[1] || '*'
  hour.value = parts[2] || '*'
  day.value = parts[3] || '*'
  month.value = parts[4] || '*'
  week.value = parts[5] || '?'
  year.value = parts[6] || ''
}

const cronExpression = computed(() => {
  const parts = [
    second.value,
    minute.value,
    hour.value,
    day.value,
    month.value,
    week.value,
  ]
  if (year.value) {
    parts.push(year.value)
  }
  return parts.join(' ')
})

watch(
  () => props.modelValue,
  (val) => {
    if (val !== cronExpression.value) {
      parseCron(val)
    }
  },
  { immediate: true },
)

const reset = () => {
  second.value = '*'
  minute.value = '*'
  hour.value = '*'
  day.value = '*'
  month.value = '*'
  week.value = '?'
  year.value = ''
}

const submit = () => {
  emit('update:modelValue', cronExpression.value)
  emit('close')
}
</script>

<style scoped>
.jcm-cron-generator {
  width: 100%;
}
.cron-result {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
}
.cron-expression {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.cron-expression span {
  font-weight: bold;
}
.cron-actions {
  display: flex;
  gap: 10px;
}
</style>
