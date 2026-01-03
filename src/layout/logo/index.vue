<template>
  <div class="logo logo-fold" v-show="!layoutSettingStore.fold">
    <div class="animate__animated animate__bounceIn">
      <svg-icon
        name="logo"
        width="20px"
        height="20px"
        :color="layoutSettingStore.getThemeInvert"
      />
      <span class="logo-title">{{ setting.title }}</span>
    </div>
  </div>
  <div class="logo logo-unfold" v-show="layoutSettingStore.fold">
    <div>
      <svg-icon
        name="logo"
        width="20px"
        height="20px"
        :color="layoutSettingStore.getThemeInvert"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
let layoutSettingStore = useLayoutSettingStore()
//引入设置标题与logog配置文件
import setting from '@/setting'
</script>

<style scoped>
.logo {
  height: 40px;
  font-size: 20px;
}
.logo-fold {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  gap: 5px;
  div {
    display: flex;
    align-items: center;
  }
}
.logo-unfold {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 65px;
  gap: 5px;
}

/* 文字流光效果 */
.logo-title {
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
