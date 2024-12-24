<template>
  <div class="logo logo-fold noselect" v-show="!layoutSettingStore.fold">
    <div class="animate__animated animate__bounceIn">
      <svg-icon name="logo"  width="20px" height="20px" :color="layoutSettingStore.getThemeInvert"/>
      <span >{{ setting.title }}</span>
    </div>
  </div>
  <div class="logo logo-unfold noselect"  v-show="layoutSettingStore.fold" >
    <div>
      <svg-icon name="logo"  width="20px" height="20px" :color="layoutSettingStore.getThemeInvert"/>
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
.logo{
  font-size: 20px;
  height: 40px;
}
.logo-fold {
  width: 220px;
  div{
    display: flex;
    align-items: center;
  }
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.logo-unfold{
  width: 65px;
  display: flex;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
