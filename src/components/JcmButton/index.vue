<template>
  <button
    type="button"
    class="custom-button"
    :class="buttonClasses"
    :style="buttonStyles"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot name="icon"></slot>
    <template v-if="title != ''">
      <span class="button-text">
        <span>
          {{ title }}
        </span>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
// 定义props接收外部传入的属性
const props = defineProps({
  buttonVariant: {
    type: String,
    default: 'default',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  buttonBgColor: {
    type: String,
    default: '#488aec', // 设置默认背景颜色，与原来的$default-bg-color一致，可根据需要调整
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 响应式的按钮类名列表
const buttonClasses = ref([])
// 响应式的按钮样式对象
const buttonStyles = ref({})

// 处理按钮点击事件，如果按钮未禁用且传入了点击处理函数，则执行
const handleClick = (event: MouseEvent) => {
  if (props.isDisabled) return
  emit('click', event)
}

// 根据传入属性动态设置按钮类名和样式
watchEffect(() => {
  buttonClasses.value = [
    `btn-${props.buttonVariant}`,
    props.isDisabled ? 'disabled' : '',
  ].filter(Boolean)
  //只有默认的不设置背景颜色
  if (props.buttonVariant === 'default') {
    buttonStyles.value = {
      backgroundColor: props.buttonBgColor,
    }
  }
})
</script>

<style lang="scss" scoped>
// 定义Sass变量，用于基础样式配置，可根据项目需求扩展修改
$text-color: #ffffff;
$font-size: 0.8rem;
$line-height: 1rem;
$font-weight: 700;
$border-radius: 0.5rem;
$box-shadow-base:
  0 4px 6px -1px rgb(72 138 236 / 19%),
  0 2px 4px -1px rgb(72 138 236 / 9%);
$box-shadow-hover:
  0 10px 15px -3px rgb(72 138 236 / 31%),
  0 4px 6px -2px rgb(72 138 236 / 9%);
$svg-size: 1.4rem;
$gap: 0.35rem;

// 基础按钮样式，提取公共部分
.button-base {
  display: flex;
  align-items: center;
  margin-left: 5px;
  padding: 0.55rem 1rem;
  border: none;
  transition: all 0.6s ease;
  cursor: pointer;
  text-transform: uppercase;
  vertical-align: middle;
  user-select: none;
  gap: $gap;
}

// 不同按钮变体对应的样式
.btn-default {
  @extend.button-base;

  font-size: $font-size;
  font-weight: $font-weight;
  border-radius: $border-radius;
  color: $text-color;
  box-shadow: $box-shadow-base;
  line-height: $line-height;
}
.btn-info {
  @extend.button-base;

  font-size: $font-size;
  font-weight: $font-weight;
  border-radius: $border-radius;
  color: $text-color;
  background-color: #909399;
  box-shadow: $box-shadow-base;
  line-height: $line-height;
}
.btn-default:hover {
  box-shadow: $box-shadow-hover;
}
.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.custom-button svg {
  width: $svg-size;
  height: $svg-size;
}
.custom-button.button-text {
  margin-left: $gap;
}
</style>
