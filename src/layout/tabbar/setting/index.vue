<template>
  <div class="setting-actions">
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
        <div style="display: flex; justify-content: center">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="任务消息" name="first"></el-tab-pane>
            <el-tab-pane label="系统公告" name="second"></el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </el-popover>

    <el-button title="全屏" class="iconBtn" @click="fullScreen">
      <svg-icon name="全屏" />
    </el-button>

    <el-button title="切换主题" class="iconBtn" @click="toggleTheme">
      <svg-icon :name="isLight ? '夜晚' : '白天'" />
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
          <el-avatar
            :size="avatarSize"
            shape="square"
            :src="userStore.user.avatar"
          />
        </template>
        <!-- {{ userStore.user.username }} -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
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

const activeName = ref('first')
const handleClick = () => {}

const html = document.documentElement
const isLight = computed(() => layoutSettingStore.getThemeValue)

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

const toggleTheme = (e?: MouseEvent) => {
  const nextTheme = isLight.value ? 1 : 0
  const switchTheme = () => {
    layoutSettingStore.setting.theme = nextTheme
    html.className = nextTheme === 0 ? '' : 'dark'
  }

  if (!e || !(document as any).startViewTransition) {
    switchTheme()
    return
  }

  const transition = (document as any).startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    const x = e.clientX
    const y = e.clientY
    const radius = Math.sqrt(
      Math.max(x, window.innerWidth - x) ** 2 +
        Math.max(y, window.innerHeight - y) ** 2,
    )
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ]

    const isDark = html.classList.contains('dark')

    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        fill: 'both',
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
//退出登录按钮点击的回调
const userLogout = async () => {
  await userStore.userLogout()
  tabsStore.tabs = tabsStore.tabs.filter((tag: any) => tag.path == '/home')
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
.setting-actions {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 6px;
  height: 100%;
}

.el-button + .el-button {
  margin-left: 0;
}
.el-button {
  --el-border: 0;
}

.el-button.iconBtn {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 10px;
  line-height: 1;
  box-shadow: 0 1px 0 rgb(0 0 0 / 3%);
  transition:
    transform 160ms ease,
    background-color 200ms ease,
    box-shadow 200ms ease;
  -webkit-tap-highlight-color: transparent;
}

.el-button.iconBtn :deep(span) {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.el-button.iconBtn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgb(0 0 0 / 10%);
}

.el-button.iconBtn:active {
  transform: translateY(0) scale(0.96);
  box-shadow: 0 6px 14px rgb(0 0 0 / 12%);
}

.el-button.iconBtn:focus-visible {
  outline: 2px solid var(--el-color-primary);
  outline-offset: 2px;
}

.el-button.iconBtn :deep(svg) {
  transition: transform 160ms ease;
}

.el-button.iconBtn:hover :deep(svg) {
  transform: scale(1.06);
}

.test {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background-color 200ms ease,
    transform 160ms ease;
  -webkit-tap-highlight-color: transparent;
}
.test:hover {
  background-color: var(--el-color-primary-light-9);
  transform: translateY(-1px);
}
.test:active {
  transform: translateY(0) scale(0.98);
}

.demo-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 0;
}

.demo-tabs :deep(.el-tabs__header) {
  margin: 0 0 8px;
}

.el-dropdown-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
