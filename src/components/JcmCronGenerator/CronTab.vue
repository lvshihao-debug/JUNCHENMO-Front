<template>
  <div class="cron-tab">
    <el-radio-group v-model="typeVal">
      <div class="cron-row">
        <el-radio label="every">每{{ text }}</el-radio>
      </div>

      <div class="cron-row" v-if="type !== 'week' && type !== 'year'">
        <el-radio label="cycle">周期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px">从</span>
        <el-input-number
          v-model="cycle.start"
          :min="min"
          :max="max"
          size="small"
          controls-position="right"
        />
        <span style="margin-left: 5px; margin-right: 5px">-</span>
        <el-input-number
          v-model="cycle.end"
          :min="min"
          :max="max"
          size="small"
          controls-position="right"
        />
        <span style="margin-left: 5px">{{ text }}</span>
      </div>

      <div class="cron-row">
        <el-radio label="interval">循环</el-radio>
        <span style="margin-left: 10px; margin-right: 5px">从</span>
        <el-input-number
          v-model="interval.start"
          :min="min"
          :max="max"
          size="small"
          controls-position="right"
        />
        <span style="margin-left: 5px; margin-right: 5px">{{ text }}开始，每</span>
        <el-input-number
          v-model="interval.step"
          :min="1"
          :max="max"
          size="small"
          controls-position="right"
        />
        <span style="margin-left: 5px">{{ text }}执行一次</span>
      </div>

      <div class="cron-row" v-if="type === 'day'">
        <el-radio label="workDay">工作日</el-radio>
        <span style="margin-left: 10px; margin-right: 5px">每月</span>
        <el-input-number
          v-model="workDay"
          :min="1"
          :max="31"
          size="small"
          controls-position="right"
        />
        <span style="margin-left: 5px">号最近的那个工作日</span>
      </div>

      <div class="cron-row" v-if="type === 'day'">
        <el-radio label="lastDay">本月最后一天</el-radio>
      </div>

      <div class="cron-row" v-if="type === 'week'">
        <el-radio label="cycle">周期</el-radio>
        <span style="margin-left: 10px; margin-right: 5px">从</span>
        <el-select v-model="cycle.start" size="small" style="width: 100px">
          <el-option
            v-for="(label, val) in weekMap"
            :key="val"
            :label="label"
            :value="parseInt(val)"
          />
        </el-select>
        <span style="margin-left: 5px; margin-right: 5px">-</span>
        <el-select v-model="cycle.end" size="small" style="width: 100px">
          <el-option
            v-for="(label, val) in weekMap"
            :key="val"
            :label="label"
            :value="parseInt(val)"
          />
        </el-select>
      </div>

      <div class="cron-row" v-if="type === 'week'">
        <el-radio label="weekDay">指定周</el-radio>
        <span style="margin-left: 10px; margin-right: 5px">第</span>
        <el-input-number
          v-model="weekDay.week"
          :min="1"
          :max="4"
          size="small"
          controls-position="right"
        />
        <span style="margin-left: 5px; margin-right: 5px">周的</span>
        <el-select v-model="weekDay.day" size="small" style="width: 100px">
          <el-option
            v-for="(label, val) in weekMap"
            :key="val"
            :label="label"
            :value="parseInt(val)"
          />
        </el-select>
      </div>
      
      <div class="cron-row" v-if="type === 'week'">
        <el-radio label="lastWeek">本月最后一个</el-radio>
        <el-select v-model="lastWeek" size="small" style="width: 100px; margin-left: 10px">
          <el-option
            v-for="(label, val) in weekMap"
            :key="val"
            :label="label"
            :value="parseInt(val)"
          />
        </el-select>
      </div>

      <div class="cron-row" v-if="type !== 'year'">
        <el-radio label="specify">指定</el-radio>
        <div class="specify-box" v-if="typeVal === 'specify'">
           <el-checkbox-group v-model="specify">
              <el-checkbox
                v-for="i in specifyOptions"
                :key="i"
                :label="i"
                class="specify-item"
              >
              {{ type === 'week' ? weekMap[i] : i }}
              </el-checkbox>
            </el-checkbox-group>
        </div>
      </div>

      <div class="cron-row" v-if="type === 'day' || type === 'week'">
        <el-radio label="none">不指定(?)</el-radio>
      </div>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '*',
  },
  type: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const typeVal = ref('every')
const cycle = reactive({ start: 1, end: 2 })
const interval = reactive({ start: 0, step: 1 })
const workDay = ref(1)
const lastWeek = ref(1)
const weekDay = reactive({ week: 1, day: 1 })
const specify = ref<number[]>([])

const textMap: Record<string, string> = {
  second: '秒',
  minute: '分',
  hour: '时',
  day: '日',
  month: '月',
  week: '周',
  year: '年',
}

const minMap: Record<string, number> = {
  second: 0,
  minute: 0,
  hour: 0,
  day: 1,
  month: 1,
  week: 1,
  year: new Date().getFullYear(),
}

const maxMap: Record<string, number> = {
  second: 59,
  minute: 59,
  hour: 23,
  day: 31,
  month: 12,
  week: 7,
  year: 2099,
}

const weekMap = {
  1: '周日',
  2: '周一',
  3: '周二',
  4: '周三',
  5: '周四',
  6: '周五',
  7: '周六',
}

const text = computed(() => textMap[props.type])
const min = computed(() => minMap[props.type])
const max = computed(() => maxMap[props.type])

const specifyOptions = computed(() => {
  const opts = []
  if (props.type === 'week') {
      for (let i = 1; i <= 7; i++) {
        opts.push(i) // Modified: Just push the value for consistency
      }
      return opts
  }
  for (let i = min.value; i <= max.value; i++) {
    opts.push(i)
  }
  return opts
})

// 解析值反推 UI 状态
const parseValue = (val: string) => {
  if (val === '*') {
    typeVal.value = 'every'
  } else if (val === '?') {
    typeVal.value = 'none'
  } else if (val.includes('-')) {
    typeVal.value = 'cycle'
    const [start, end] = val.split('-')
    cycle.start = parseInt(start)
    cycle.end = parseInt(end)
  } else if (val.includes('/')) {
    typeVal.value = 'interval'
    const [start, step] = val.split('/')
    interval.start = parseInt(start)
    interval.step = parseInt(step)
  } else if (val.includes('W')) {
    typeVal.value = 'workDay'
    workDay.value = parseInt(val.replace('W', ''))
  } else if (val === 'L') {
    typeVal.value = 'lastDay'
  } else if (val.includes('L') && props.type === 'week') {
    typeVal.value = 'lastWeek'
    lastWeek.value = parseInt(val.replace('L', ''))
  } else if (val.includes('#')) {
    typeVal.value = 'weekDay'
    const [day, week] = val.split('#')
    weekDay.day = parseInt(day)
    weekDay.week = parseInt(week)
  } else {
    typeVal.value = 'specify'
    specify.value = val.split(',').map((v) => parseInt(v))
  }
}

watch(
  () => props.modelValue,
  (val) => parseValue(val),
  { immediate: true },
)

// 生成 Cron 字符串
const generateValue = () => {
  switch (typeVal.value) {
    case 'every':
      return '*'
    case 'none':
      return '?'
    case 'cycle':
      return `${cycle.start}-${cycle.end}`
    case 'interval':
      return `${interval.start}/${interval.step}`
    case 'workDay':
      return `${workDay.value}W`
    case 'lastDay':
      return 'L'
    case 'lastWeek':
      return `${lastWeek.value}L`
    case 'weekDay':
      return `${weekDay.day}#${weekDay.week}`
    case 'specify':
      return specify.value.length ? specify.value.sort((a, b) => a - b).join(',') : '*'
    default:
      return '*'
  }
}

watch(
  [typeVal, cycle, interval, workDay, lastWeek, weekDay, specify],
  () => {
    emit('update:modelValue', generateValue())
  },
  { deep: true },
)
</script>

<style scoped>
.cron-tab {
  padding: 15px;
}
.cron-row {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  line-height: 32px;
}
.cron-row :deep(.el-radio) {
  margin-right: 15px;
}
.cron-row :deep(.el-input-number) {
  width: 120px;
}
.cron-row :deep(.el-select) {
  width: 120px;
}
.specify-box {
  width: 100%;
  margin-top: 5px;
  margin-left: 30px;
  max-height: 120px;
  overflow-y: auto;
}
.specify-item {
  margin-right: 5px !important;
  margin-bottom: 5px;
  width: 45px;
}
</style>
