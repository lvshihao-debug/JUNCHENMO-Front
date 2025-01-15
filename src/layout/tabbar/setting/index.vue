<template>
  <el-button title="刷新" class="iconBtn" @click="updateRefsh">
    <svg-icon name="刷新" />
  </el-button>
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #reference>
      <el-button title="消息" class="iconBtn">
        <el-badge :value="5" class="item">
          <svg-icon name="铃铛" />
        </el-badge>
      </el-button>
    </template>
    <template #default>
      <div style="display: flex;justify-content:center;">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="任务消息" name="first"></el-tab-pane>
          <el-tab-pane label="系统公告" name="second"></el-tab-pane>
        </el-tabs>
      </div>

    </template>
  </el-popover>

  <el-button title="全屏" class="iconBtn" @click="fullScreen">
    <svg-icon name="全屏" />
  </el-button>

  <el-button class="iconBtn" title="设置" @click="settingDrawer">
    <svg-icon name="设置" />
  </el-button>
  <!-- 下拉菜单 -->
  <el-dropdown trigger="hover" class="test">
    <span class="el-dropdown-link">
      <template v-if="setting.userHeadImageType == 'text'">
        <el-avatar :size="avatarSize" shape="square">
          {{ userStore.getUserNameTextFirst }}
        </el-avatar>
      </template>
      <template v-if="setting.userHeadImageType == 'img'">
        <el-avatar :size="avatarSize" shape="square" :src="userStore.user.avatar" />
      </template>
      <!-- {{ userStore.user.username }} -->
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//导入router路由
import { useRouter } from 'vue-router'
//导入全局设置模块
import setting from '@/setting'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user/user'
import useTabsStore from '@/store/modules/layout/tabs'
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const tabsStore = useTabsStore()

const $router = useRouter()

//设置头像的大小
let avatarSize = ref(30)

// 刷新按钮点击回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}

//全屏按钮点击的回调
const fullScreen = () => {
  // DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  //切换全屏模式
  if (!full) {
    //进入全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}
//设置按钮点击的回调
const settingDrawer = () => {
  layoutSettingStore.settingDrawer = true
}
//退出登录按钮点击的回调
const userLogout = async () => {
  await userStore.userLogout()
  tabsStore.tabs = tabsStore.tabs.filter((tag: any) => tag.path == "/home")
  //跳转到主页
  $router.push('/login')
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style lang="scss" scoped>
.el-button+.el-button {
  margin-left: 0px;
}

.el-button {
  height: 100%;
  --el-border: 0px;
}

.test {
  height: 100%;
  align-items: center;
  padding: 10px;
  margin-right: 5px;
}

.test:hover {
  background-color: var(--el-color-primary-light-9);
}
</style>
