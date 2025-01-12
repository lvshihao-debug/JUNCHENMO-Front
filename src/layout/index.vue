<template>
  <el-watermark :content="useUserStore.user.username" :font="font">
    <div class="layout_container" :class="{
      suuny: LayoutSettingStore.getThemeStatus,
      moon: !LayoutSettingStore.getThemeStatus,
    }">
      <!-- 偏好设置 -->
      <Drawer></Drawer>
      <!-- 左侧菜单 -->
      <div class="layout_slider animate__animated animate__bounceInLeft" :class="{
        suuny: LayoutSettingStore.getThemeStatus,
        moon: !LayoutSettingStore.getThemeStatus,
        fold: LayoutSettingStore.fold
      }" v-show="LayoutSettingStore.setting.menu">
        <!-- logo -->
        <Logo class="logo"></Logo>
        <!-- 展示菜单 -->
        <el-scrollbar class="scrollbar">
          <!-- 菜单组件 -->
          <el-menu :collapse="LayoutSettingStore.fold" :default-active="$route.path" :collapse-transition="false"
            router>
            <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
          </el-menu>
        </el-scrollbar>
        <el-button class="foldwithExpand iconBtn" @click="changeIcon">
          <svg-icon :name="LayoutSettingStore.fold ? '折叠-展开' : '折叠-收起'"
            :color="LayoutSettingStore.setting.theme == 0 ? 'black' : 'white'" />
        </el-button>
      </div>
      <!-- 顶部导航 -->
      <div class="layout_tabbar" :class="{
        showNavigationBar: LayoutSettingStore.setting.navigationBar,
        hidenNavigationBar: !LayoutSettingStore.setting.navigationBar,
        suuny: LayoutSettingStore.getThemeStatus,
        moon: !LayoutSettingStore.getThemeStatus,
        unfold: !LayoutSettingStore.fold,
        fold: LayoutSettingStore.fold,
        showMenu: LayoutSettingStore.setting.menu,
        hidenMenu: !LayoutSettingStore.setting.menu,
      }">
        <Tabbar></Tabbar>
      </div>
      <!-- 顶部tabs -->
      <div class="layout_tabs" :class="{
        showNavigationBar: LayoutSettingStore.setting.navigationBar,
        hidenNavigationBar: !LayoutSettingStore.setting.navigationBar,
        suuny: LayoutSettingStore.getThemeStatus,
        moon: !LayoutSettingStore.getThemeStatus,
        fold: LayoutSettingStore.fold,
        showMenu: LayoutSettingStore.setting.menu,
        hidenMenu: !LayoutSettingStore.setting.menu,
      }" v-show="LayoutSettingStore.setting.tabs">
        <Tabs></Tabs>
      </div>

      <!-- 内容展示区域 -->
      <div class="layout_main" :class="{
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
      }">

        <el-backtop :bottom="50" target=".layout_main">
          <div class="backtop">
            <svg-icon name="火箭" width="20px" height="20px" />
          </div>
        </el-backtop>
        <Breadcrumb class="breadcurmb" v-show="LayoutSettingStore.setting.breadcrumb"></Breadcrumb>
        <Main class="context">
        </Main>
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
//引入顶部面包屑组件
import Breadcrumb from './tabbar/breadcrumb/index.vue'
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
const useUserStore = UserStore();
const $route = useRoute()


const font = reactive({
  color: 'rgba(0, 0, 255, .35)',
})

// 监听水印开启的数据变更
watch(() => LayoutSettingStore.setting.watermark, (v) => {
  font.color = v
    ? 'rgba(100, 100, 100, .45)'
    : 'rgba(0, 0, 0, 0)'
}, {
  immediate: true,
});



const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
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

  //白天
  &.suuny {
    background-color: #fafafb;
  }

  //黑夜
  &.moon {
    background-color: #000000;
  }

  .layout_slider {
    box-shadow: var(--el-box-shadow-light);

    //白天
    &.suuny {
      background-color: #ffffff;
    }

    //黑夜
    &.moon {
      background-color: #161618;
    }

    position: fixed;
    width: variable.$base-menu-width;
    box-shadow: --el-box-shadow-light;
    height: 100vh;
    top: 0px;

    // 导航栏折叠
    &.fold {
      width: variable.$base-menu-min-width;
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
      transform: translateX(-50%); // 通过平移，将按钮自身宽度的一半往左移，实现水平居中效果
    }
  }

  .layout_tabbar {
    top: 0px;
    position: fixed;
    left: variable.$base-menu-width;
    width: calc(100% - variable.$base-menu-width);

    &.showNavigationBar {
      height: variable.$base-tabbar-height;
    }

    &.hidenNavigationBar {
      height: 0px;
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
      width: 100%;
      left: 0;
    }

    // 折叠中
    &.fold {
      &.showMenu {
        width: calc(100% - variable.$base-menu-min-width);
        left: variable.$base-menu-min-width;
      }
    }

    // 展开中
    &.unfold {
      &.showMenu {
        width: calc(100% - variable.$base-menu-width);
        left: variable.$base-menu-width;
      }
    }

  }

  .layout_main {
    overflow-y: auto;
    position: absolute;
    right: 0px;
    .backtop{
        height: 100%;
        width: 100%;
        background-color: transparent;
        text-align: center;
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

    .breadcurmb {
      padding: 5px 15px;
    }

    .context {
      padding: 10px;
    }

    &.showTabs {
      &.showNavigationBar {
        top: calc(variable.$base-tabbar-height + variable.$base-tabs-height);
        height: calc(100vh - variable.$base-tabs-height - variable.$base-tabs-height);
      }

      &.hidenNavigationBar {
        top: calc(variable.$base-tabbar-height);
        height: calc(100vh - variable.$base-tabs-height);
      }
    }

    &.hidenTabs {
      &.showNavigationBar {
        top: variable.$base-tabbar-height;
        height: calc(100vh - variable.$base-tabs-height);
      }

      &.hidenNavigationBar {
        top: 0px;
        height: 100vh
      }
    }


    &.hidenMenu {
      width: 100%;
      left: 0;
    }

    // 折叠中
    &.fold {
      &.showMenu {
        width: calc(100% - variable.$base-menu-min-width);
        left: variable.$base-menu-min-width;
      }
    }

    // 展开中
    &.unfold {
      &.showMenu {
        width: calc(100% - variable.$base-menu-width);
        left: variable.$base-menu-width;
      }
    }



  }


  .layout_tabs {
    scrollbar-width: thin;
    position: fixed;
    height: variable.$base-tabs-height;

    &.showNavigationBar {
      top: variable.$base-tabbar-height;
    }

    &.hidenNavigationBar {
      top: 0px;
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
      width: calc(100% - variable.$base-menu-width);
      left: variable.$base-menu-width;
    }

    &.fold {
      width: calc(100% - variable.$base-menu-min-width);
      left: variable.$base-menu-min-width;
    }

    &.hidenMenu {
      left: 0;
      width: 100%;
    }
  }


}

</style>
