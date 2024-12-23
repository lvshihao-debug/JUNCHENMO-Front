<template>
  <el-watermark :content="useUserStore.user.username" :font="font">
    <div class="layout_container" :class="{
      suuny: LayoutSettingStore.theme,
      moon: !LayoutSettingStore.theme,
    }">

      <!-- 偏好设置 -->
      <Drawer></Drawer>
      <!-- 左侧菜单 -->
      <div class="layout_slider" :class="{
        suuny: LayoutSettingStore.theme,
        moon: !LayoutSettingStore.theme,
        fold: LayoutSettingStore.fold
      }" v-show="LayoutSettingStore.menu">
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
            :color="LayoutSettingStore.theme ? 'black' : 'white'" />
        </el-button>
      </div>
      <!-- 顶部导航 -->
      <div class="layout_tabbar" :class="{
        showNavigationBar: LayoutSettingStore.navigationBar,
        hidenNavigationBar: !LayoutSettingStore.navigationBar,
        suuny: LayoutSettingStore.theme,
        moon: !LayoutSettingStore.theme,
        unfold: !LayoutSettingStore.fold,
        fold: LayoutSettingStore.fold,
        showMenu: LayoutSettingStore.menu,
        hidenMenu: !LayoutSettingStore.menu,
      }">
        <Tabbar></Tabbar>
      </div>
      <!-- 顶部tabs -->
      <div class="layout_tabs" :class="{
        showNavigationBar: LayoutSettingStore.navigationBar,
        hidenNavigationBar: !LayoutSettingStore.navigationBar,
        suuny: LayoutSettingStore.theme,
        moon: !LayoutSettingStore.theme,
        fold: LayoutSettingStore.fold,
        showMenu: LayoutSettingStore.menu,
        hidenMenu: !LayoutSettingStore.menu,
      }" v-show="LayoutSettingStore.tabs">
        <Tabs></Tabs>
      </div>

      <!-- 内容展示区域 -->
      <div class="layout_main" :class="{
        showNavigationBar: LayoutSettingStore.navigationBar,
        hidenNavigationBar: !LayoutSettingStore.navigationBar,
        suuny: LayoutSettingStore.theme,
        moon: !LayoutSettingStore.theme,
        fold: LayoutSettingStore.fold,
        unfold: !LayoutSettingStore.fold,
        showTabs: LayoutSettingStore.tabs,
        hidenTabs: !LayoutSettingStore.tabs,
        showMenu: LayoutSettingStore.menu,
        hidenMenu: !LayoutSettingStore.menu,
      }">

        <Breadcrumb class="breadcurmb" v-show="LayoutSettingStore.breadcrumb"></Breadcrumb>
        <Main class="context" >
        </Main>
        <copyright v-show="LayoutSettingStore.copyright"></copyright>
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
import UserStore from '@/store/modules/user'
//获取用户相关的小仓库
import PermissionStore from '@/store/modules/menu'
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
watch(() => LayoutSettingStore.watermark, (v) => {
  font.color = v
      ? 'rgba(100, 100, 100, .45)'
      : 'rgba(0, 0, 0, 0)'
},{
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
* {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}

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

    //白天
    &.suuny {
      background-color: #ffffff;
    }

    //黑夜
    &.moon {
      background-color: #161618;
    }

    position: fixed;
    width: $base-menu-width;
    box-shadow: --el-box-shadow-light;
    height: 100vh;
    top: 0px;

    // 导航栏折叠
    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);

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
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);

    &.showNavigationBar {
      height: $base-tabbar-height;
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
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }

    // 展开中
    &.unfold {
      &.showMenu {
        width: calc(100% - $base-menu-width);
        left: $base-menu-width;
      }
    }

  }

  .layout_main {
    overflow-y: auto;
    position: absolute;
    right: 0px;

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
        top: calc($base-tabbar-height + $base-tabs-height);
        height: calc(100vh - $base-tabs-height - $base-tabs-height);
      }

      &.hidenNavigationBar {
        top: calc($base-tabbar-height);
        height: calc(100vh - $base-tabs-height);
      }
    }

    &.hidenTabs {
      &.showNavigationBar {
        top: $base-tabbar-height;
        height: calc(100vh - $base-tabs-height);
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
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }

    // 展开中
    &.unfold {
      &.showMenu {
        width: calc(100% - $base-menu-width);
        left: $base-menu-width;
      }
    }



  }


  .layout_tabs {
    scrollbar-width: thin;
    position: fixed;
    height: $base-tabs-height;

    &.showNavigationBar {
      top: $base-tabbar-height;
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
      width: calc(100% - $base-menu-width);
      left: $base-menu-width;
    }

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }

    &.hidenMenu {
      left: 0;
      width: 100%;
    }
  }


}
</style>
