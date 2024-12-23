<template>
    <div class="tabbar">
      <div class="tabbar_left">
        <div style="margin-left: 18px"  class="animate__animated animate__backInRight">
          逆向决定高度，开发决定深度
        </div>
      </div>
      <div class="tabbar_right">
        <Setting></Setting>
      </div>
    </div>
</template>

<script setup lang="ts">
//引入菜单组件
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabbar_left {
    display: flex;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
