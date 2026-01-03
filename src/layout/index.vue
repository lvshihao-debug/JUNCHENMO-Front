<template>
  <el-watermark :content="useUserStore.user.username" :font="font">
    <div
      class="layout_container"
      :class="{
        suuny: LayoutSettingStore.getThemeStatus,
        moon: !LayoutSettingStore.getThemeStatus,
      }"
    >
      <!-- 偏好设置 -->
      <Drawer></Drawer>
      <transition name="float-setting-fade">
        <el-button
          v-show="!LayoutSettingStore.setting.navigationBar"
          class="floating_setting_btn iconBtn"
          title="设置"
          @click="openSettingDrawer"
        >
          <svg-icon name="设置" />
        </el-button>
      </transition>
      <!-- 左侧菜单 -->
      <div
        class="layout_slider animate__animated animate__bounceInLeft"
        :class="{
          suuny: LayoutSettingStore.getThemeStatus,
          moon: !LayoutSettingStore.getThemeStatus,
          fold: LayoutSettingStore.fold,
        }"
        v-show="LayoutSettingStore.setting.menu"
      >
        <!-- logo -->
        <Logo class="logo"></Logo>
        <!-- 展示菜单 -->
        <el-scrollbar class="scrollbar">
          <!-- 菜单组件 -->
          <el-menu
            :collapse="LayoutSettingStore.fold"
            :default-active="$route.path"
            :collapse-transition="false"
            router
          >
            <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
          </el-menu>
        </el-scrollbar>
        <el-button class="foldwithExpand iconBtn" @click="changeIcon">
          <svg-icon
            :name="LayoutSettingStore.fold ? '折叠-展开' : '折叠-收起'"
            :color="LayoutSettingStore.setting.theme == 0 ? 'black' : 'white'"
          />
        </el-button>
      </div>
      <!-- 顶部导航 -->
      <div
        class="layout_tabbar"
        :class="{
          showNavigationBar: LayoutSettingStore.setting.navigationBar,
          hidenNavigationBar: !LayoutSettingStore.setting.navigationBar,
          suuny: LayoutSettingStore.getThemeStatus,
          moon: !LayoutSettingStore.getThemeStatus,
          unfold: !LayoutSettingStore.fold,
          fold: LayoutSettingStore.fold,
          showMenu: LayoutSettingStore.setting.menu,
          hidenMenu: !LayoutSettingStore.setting.menu,
        }"
      >
        <Tabbar></Tabbar>
      </div>
      <!-- 顶部tabs -->
      <transition name="layout-slide-fade">
        <div
          class="layout_tabs"
          :class="{
            showNavigationBar: LayoutSettingStore.setting.navigationBar,
            hidenNavigationBar: !LayoutSettingStore.setting.navigationBar,
            suuny: LayoutSettingStore.getThemeStatus,
            moon: !LayoutSettingStore.getThemeStatus,
            fold: LayoutSettingStore.fold,
            showMenu: LayoutSettingStore.setting.menu,
            hidenMenu: !LayoutSettingStore.setting.menu,
          }"
          v-show="LayoutSettingStore.setting.tabs"
        >
          <Tabs></Tabs>
        </div>
      </transition>

      <!-- 内容展示区域 -->
      <div
        class="layout_main"
        :class="{
          showNavigationBar: LayoutSettingStore.setting.navigationBar,
          hidenNavigationBar: !LayoutSettingStore.setting.navigationBar,
          suuny: LayoutSettingStore.getThemeStatus,
          moon: !LayoutSettingStore.getThemeStatus,
          fold: LayoutSettingStore.fold,
          unfold: !LayoutSettingStore.fold,
          showTabs: LayoutSettingStore.setting.tabs,
          hidenTabs: !LayoutSettingStore.setting.tabs,
          showMenu: LayoutSettingStore.setting.menu,
          hidenMenu: !LayoutSettingStore.setting.menu,
        }"
      >
        <el-backtop :bottom="50" target=".layout_main">
          <div class="backtop">
            <svg-icon name="火箭" width="20px" height="20px" />
          </div>
        </el-backtop>
        <Main class="context"></Main>
        <copyright v-show="LayoutSettingStore.setting.copyright"></copyright>
      </div>
    </div>
  </el-watermark>
</template>

<script setup lang="ts">
//导入右侧抽屉
import Drawer from './tabbar/setting/drawer/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//引入内容组件
import Main from './main/index.vue'
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
//引入顶部tabs组件
import Tabs from './tabs/index.vue'
//引入当前路由
import { useRoute } from 'vue-router'
//获取用户相关的小仓库
import UserStore from '@/store/modules/user/user'
//获取用户相关的小仓库
import PermissionStore from '@/store/modules/acl/menu'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取layout配置相关的仓库
const LayoutSettingStore = useLayoutSettingStore()
const usePermissionStore = PermissionStore()
const useUserStore = UserStore()
const $route = useRoute()

const font = reactive({
  color: 'rgba(0, 0, 255, .35)',
})

// 监听水印开启的数据变更
watch(
  () => LayoutSettingStore.setting.watermark,
  (v) => {
    font.color = v ? 'rgba(100, 100, 100, .45)' : 'rgba(0, 0, 0, 0)'
  },
  {
    immediate: true,
  },
)

const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

const openSettingDrawer = () => {
  LayoutSettingStore.settingDrawer = true
}
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;

  //白天
  &.suuny {
    background-color: #fafafb;
  }

  //黑夜
  &.moon {
    background-color: #000000;
  }

  .floating_setting_btn {
    position: fixed;
    top: 50%;
    right: 16px;
    z-index: 2500;
    width: 42px;
    height: 42px;
    padding: 0;
    border-radius: 12px;
    line-height: 1;
    box-shadow: 0 10px 24px rgb(0 0 0 / 16%);
    transform: translateY(-50%);
    transition:
      transform 160ms ease,
      box-shadow 200ms ease,
      background-color 200ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .floating_setting_btn :deep(span) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .floating_setting_btn:hover {
    transform: translateY(calc(-50% - 2px));
    box-shadow: 0 18px 36px rgb(0 0 0 / 20%);
  }

  .floating_setting_btn:active {
    transform: translateY(-50%) scale(0.96);
    box-shadow: 0 12px 28px rgb(0 0 0 / 18%);
  }

  .float-setting-fade-enter-active,
  .float-setting-fade-leave-active {
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
  .float-setting-fade-enter-from,
  .float-setting-fade-leave-to {
    opacity: 0;
    transform: translateY(calc(-50% + 10px));
  }
  .float-setting-fade-enter-to,
  .float-setting-fade-leave-from {
    opacity: 1;
    transform: translateY(-50%);
  }
  .layout_slider {
    position: fixed;
    top: 0;
    width: variable.$base-menu-width;
    height: 100vh;
    box-shadow: var(--el-box-shadow-light);
    box-shadow: --el-box-shadow-light;
    transition: width 0.3s ease; // 添加过渡效果

    //白天
    &.suuny {
      background-color: #ffffff;
    }

    //黑夜
    &.moon {
      background-color: #161618;
    }
    // 导航栏折叠
    &.fold {
      width: variable.$base-menu-min-width;
      transition: width 0.3s ease; // 添加过渡效果
    }
    .scrollbar {
      height: calc(100vh - variable.$base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }

    // 导航栏展开
    .foldwithExpand {
      position: absolute;
      bottom: 0; // 距离底部 0 距离，使其贴靠在底部
      left: 50%; // 先将按钮左边框移动到父元素水平方向的中间位置
      transform: translateX(
        -50%
      ); // 通过平移，将按钮自身宽度的一半往左移，实现水平居中效果
    }
  }
  .layout_tabbar {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: variable.$base-menu-width;
    width: calc(100% - variable.$base-menu-width);
    transform: translateY(0);
    opacity: 1;
    transition:
      width 0.3s ease,
      left 0.3s ease,
      transform 0.22s ease,
      opacity 0.22s ease; // 添加过渡效果
    &.showNavigationBar {
      height: variable.$base-tabbar-height;
    }
    &.hidenNavigationBar {
      height: 0;
      overflow: hidden;
      transform: translateY(-10px);
      opacity: 0;
      pointer-events: none;
    }

    //白天
    &.suuny {
      background-color: #fafafb;
    }

    //黑夜
    &.moon {
      background-color: #000000;
    }
    &.hidenMenu {
      left: 0;
      width: 100%;
    }

    // 折叠中
    &.fold {
      &.showMenu {
        left: variable.$base-menu-min-width;
        width: calc(100% - variable.$base-menu-min-width);
      }
    }

    // 展开中
    &.unfold {
      &.showMenu {
        left: variable.$base-menu-width;
        width: calc(100% - variable.$base-menu-width);
      }
    }
  }
  .layout_main {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-gutter: stable;
    transition:
      width 0.3s ease,
      left 0.3s ease,
      padding-top 0.22s ease; // 添加过渡效果
    .backtop {
      width: 100%;
      height: 100%;
      text-align: center;
      background-color: transparent;
      line-height: 40px;
    }
    //白天
    &.suuny {
      background-color: #fafafb;
    }

    //黑夜
    &.moon {
      background-color: #000000;
    }
    .context {
      padding: 10px;
    }
    &.showTabs {
      &.showNavigationBar {
        padding-top: calc(variable.$base-tabbar-height + variable.$base-tabs-height);
      }
      &.hidenNavigationBar {
        padding-top: variable.$base-tabs-height;
      }
    }
    &.hidenTabs {
      &.showNavigationBar {
        padding-top: variable.$base-tabbar-height;
      }
      &.hidenNavigationBar {
        padding-top: 0;
      }
    }
    &.hidenMenu {
      left: 0;
      width: 100%;
    }

    // 折叠中
    &.fold {
      &.showMenu {
        left: variable.$base-menu-min-width;
        width: calc(100% - variable.$base-menu-min-width);
      }
    }

    // 展开中
    &.unfold {
      &.showMenu {
        left: variable.$base-menu-width;
        width: calc(100% - variable.$base-menu-width);
      }
    }
  }
  .layout_tabs {
    z-index: 1500;
    scrollbar-width: thin;
    position: fixed;
    height: variable.$base-tabs-height;
    transform: translateY(0);
    opacity: 1;
    will-change: transform, opacity;
    &.showNavigationBar {
      top: variable.$base-tabbar-height;
    }
    &.hidenNavigationBar {
      top: 0;
    }

    //白天
    &.suuny {
      background-color: #fafafb;
    }

    //黑夜
    &.moon {
      background-color: #000000;
    }
    &.showMenu {
      left: variable.$base-menu-width;
      width: calc(100% - variable.$base-menu-width);
    }
    &.fold {
      left: variable.$base-menu-min-width;
      width: calc(100% - variable.$base-menu-min-width);
    }
    &.hidenMenu {
      left: 0;
      width: 100%;
    }

    transition:
      width 0.3s ease,
      left 0.3s ease,
      transform 0.22s ease,
      opacity 0.22s ease; // 添加过渡效果
  }

  .layout-slide-fade-enter-active,
  .layout-slide-fade-leave-active {
    transition:
      transform 0.22s ease,
      opacity 0.22s ease;
  }
  .layout-slide-fade-enter-from,
  .layout-slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  .layout-slide-fade-enter-to,
  .layout-slide-fade-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
}
.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default {
  -ms-overflow-style: none; /* IE 10+ 和 Edge */
}
</style>
