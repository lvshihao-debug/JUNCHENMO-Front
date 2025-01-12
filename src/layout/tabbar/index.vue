<template>
  <div class="tabbar">
    <!--左侧菜单显示时显示名言-->
    <div class="menu-title animate__animated animate__backInRight" v-if="layoutSettingStore.setting.menu">
      逆向决定高度，开发决定深度
    </div>
    <div class="tabbar_left">
      <!--顶部菜单显示时显示Logo-->
      <div class="topMenu-logo" v-if="layoutSettingStore.setting.topMenu||(!layoutSettingStore.setting.menu&&!layoutSettingStore.setting.topMenu)">
        <svg-icon name="logo" width="20px" height="20px" :color="layoutSettingStore.getThemeInvert" />
        <span style="font-size: 20px;">{{ setting.title }}</span>
      </div>
      <!--顶部菜单-->
      <div class="topMenu animate__animated animate__bounceInRight" v-if="layoutSettingStore.setting.topMenu">
        <!-- 菜单组件 -->
        <el-menu mode="horizontal" :default-active="$route.path"  style="max-width: 300px;"
          :class="{ 'suuny': layoutSettingStore.getThemeValue, 'moon': !layoutSettingStore.getThemeValue }" router>
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
//引入设置标题与logog配置文件
import setting from '@/setting'
//仓库
import PermissionStore from '@/store/modules/acl/menu'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'


const usePermissionStore = PermissionStore()
let layoutSettingStore = useLayoutSettingStore()

</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style lang="scss" scoped>
.menu-title {
  display: flex;
  margin-left: 18px;
  align-items: center;
}

.topMenu-logo {
  margin-left: 35px;
  display: flex;
  align-items: center;
  height: 40px;
  width: 165px;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .tabbar_left {
    display: flex;
  }

}
</style>
