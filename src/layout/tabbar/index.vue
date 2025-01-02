<template>
  <div class="tabbar">
    <!-- <div class="tabbar_left">
        <div style="margin-left: 18px"  class="animate__animated animate__backInRight">
          逆向决定高度，开发决定深度
        </div>
      </div> -->
    <div class="tabbar_left">
      <div class="animate__animated animate__backInRight">
        <!-- 菜单组件 -->
        <el-menu  mode="horizontal" style="width: 1100px"   :default-active="$route.path" :collapse-transition="false"   router>
          <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
        </el-menu>
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
//引入菜单组件
import Menu from '../menu/index.vue'
//仓库
import PermissionStore from '@/store/modules/acl/menu'
const usePermissionStore = PermissionStore()
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
