<template>
  <div
    class="tabbar"
    :class="{
      suuny: layoutSettingStore.getThemeStatus,
      moon: !layoutSettingStore.getThemeStatus,
    }"
  >
    <div class="tabbar_row">
      <div
        class="menu-title animate__animated animate__backInRight"
        v-if="layoutSettingStore.setting.menu"
      >
        <Breadcrumb
          class="breadcurmb"
          v-show="layoutSettingStore.setting.breadcrumb"
        ></Breadcrumb>
      </div>
      <div class="tabbar_left">
        <div
          class="topMenu-logo"
          v-if="
            layoutSettingStore.setting.topMenu ||
            (!layoutSettingStore.setting.menu &&
              !layoutSettingStore.setting.topMenu)
          "
        >
          <svg-icon
            name="logo"
            width="20px"
            height="20px"
            :color="layoutSettingStore.getThemeInvert"
          />
          <span class="logo-title">{{ setting.title }}</span>
        </div>
        <div
          class="topMenu animate__animated animate__bounceInRight"
          v-if="layoutSettingStore.setting.topMenu"
        >
          <horizontalMenu></horizontalMenu>
        </div>
      </div>
      <div class="tabbar_right">
        <Setting></Setting>
      </div>
    </div>

    <div
      class="tabbar_marquee"
      v-show="layoutSettingStore.setting.navigationBar"
      ref="marqueeRootRef"
    >
      <div class="marquee_mask" ref="marqueeMaskRef">
        <div class="marquee_track" :style="{ animationDuration: marqueeDuration }">
          <div class="marquee_group" ref="marqueeGroupRef">
            <span v-for="(item, idx) in marqueeItems" :key="`a-${idx}`" class="marquee_tab">
              {{ item }}
            </span>
          </div>
          <div class="marquee_group" aria-hidden="true">
            <span v-for="(item, idx) in marqueeItems" :key="`b-${idx}`" class="marquee_tab">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入菜单组件
import Setting from './setting/index.vue'
//引入顶部面包屑组件
import Breadcrumb from './breadcrumb/index.vue'
//引入菜单组件
import horizontalMenu from '@/layout/horizontal-menu/index.vue'
//引入设置标题与logog配置文件
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
let layoutSettingStore = useLayoutSettingStore()

const marqueeRootRef = ref<HTMLElement | null>(null)
const marqueeMaskRef = ref<HTMLElement | null>(null)
const marqueeGroupRef = ref<HTMLElement | null>(null)
const marqueeDistance = ref(0)
const marqueeGap = ref(0)

const marqueeItems = computed(() => {
  const themeText = layoutSettingStore.getThemeStatus ? '白天模式' : '夜晚模式'
  const appName = setting.title ? `${setting.title}` : '系统'
  return [
    `欢迎使用 ${appName}`,
    `当前主题：${themeText}`,
    `没有标准答案，符合题意者满分`,
    `此身天地一虚舟，何处江山不自由`,
    `酷的像风，野的像狗，不招人喜欢，倒也自由`,
  ]
})

const marqueeDuration = computed(() => {
  const seconds = marqueeDistance.value > 0 ? marqueeDistance.value / 60 : 18
  return `${Math.max(14, Math.min(40, seconds))}s`
})

const updateMarqueeDistance = async () => {
  await nextTick()
  const groupWidth = marqueeGroupRef.value?.offsetWidth ?? 0
  const gapWidth = marqueeMaskRef.value?.offsetWidth ?? 0
  const distance = groupWidth + gapWidth

  if (!distance) return

  marqueeGap.value = gapWidth
  marqueeDistance.value = distance

  if (marqueeRootRef.value) {
    marqueeRootRef.value.style.setProperty('--marquee-gap', `${gapWidth}px`)
    marqueeRootRef.value.style.setProperty('--marquee-distance', `${distance}px`)
  }
}

watch(
  () => marqueeItems.value,
  () => {
    if (layoutSettingStore.setting.navigationBar) updateMarqueeDistance()
  },
  { immediate: true },
)

watch(
  () => layoutSettingStore.setting.navigationBar,
  (v) => {
    if (v) updateMarqueeDistance()
  },
)

onMounted(() => {
  updateMarqueeDistance()
  window.addEventListener('resize', updateMarqueeDistance, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMarqueeDistance)
})
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style lang="scss" scoped>
.menu-title {
  display: flex;
  align-items: center;
  margin-left: 18px;
}
.topMenu-logo {
  display: flex;
  align-items: center;
  margin-left: 35px;
  width: 165px;
  height: 40px;
}
.topMenu {
  .el-menu {
    &.suuny {
      background-color: #fafafa !important;
    }
    &.moon {
      background-color: #000000 !important;
    }
  }
}
.tabbar {
  position: relative;
  width: 100%;
  height: 100%;
  .tabbar_left {
    display: flex;
  }
}

.tabbar_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.tabbar_right {
  display: flex;
  align-items: center;
  padding-right: 8px;
  height: 100%;
}

.tabbar_marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -12px;
  z-index: 2;
  height: 18px;
  padding: 0 12px;
  pointer-events: none;
}

.marquee_mask {
  position: relative;
  overflow: hidden;
  height: 100%;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12px,
    #000 calc(100% - 12px),
    transparent
  );
}

.marquee_track {
  display: flex;
  align-items: center;
  width: max-content;
  height: 100%;
  animation: marqueeMove linear infinite;
  will-change: transform;
}

.marquee_group {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding-right: 10px;
}

.marquee_group[aria-hidden='true'] {
  margin-left: var(--marquee-gap, 0px);
}

.marquee_tab {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 10px;
  border-radius: 9px;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  color: v-bind('layoutSettingStore.getThemeInvert');
  border: 1px solid rgb(0 0 0 / 6%);
  background: rgb(255 255 255 / 45%);
  backdrop-filter: blur(8px);
}

.moon .marquee_tab {
  border: 1px solid rgb(255 255 255 / 10%);
  background: rgb(0 0 0 / 28%);
}

@keyframes marqueeMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-1 * var(--marquee-distance, 0px)));
  }
}
// 文字流光效果
.logo-title {
  font-size: 20px;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(
    120deg,
    v-bind('layoutSettingStore.getThemeInvert') 30%,
    var(--lvshihao-theme-color) 50%,
    v-bind('layoutSettingStore.getThemeInvert') 70%
  );
  background-size: 200% 100%;
  background-clip: text;
  background-clip: text;
  animation: shine 3s infinite linear;
}

@keyframes shine {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
