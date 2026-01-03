<template>
  <el-row
    class="row-tabs"
    :class="themeClass"
    style="display: flex; align-items: center"
  >
    <el-col :span="23">
      <div class="main-box">
        <div class="main-box-tab">
          <i @click="previous">
            <div class="jcm-tabs-icon-tool">
              <svg-icon
                class="tabs-dropdown-icon-jcm"
                name="左滑"
                width="20px"
                height="25px"
                :color="layoutSettingStore.getThemeInvert"
              />
            </div>
          </i>
          <i @click="next">
            <div class="jcm-tabs-icon-tool">
              <svg-icon
                class="tabs-dropdown-icon-jcm"
                name="右滑"
                width="20px"
                height="25px"
                :color="layoutSettingStore.getThemeInvert"
              />
            </div>
          </i>
          <div class="main-box-tab-content" ref="tabsRef">
            <div class="main-box-tab-roll">
              <transition-group name="tab">
                <el-check-tag
                  v-for="tag in tabsStore.tabs"
                  :key="tag"
                  :disable-transitions="false"
                  :checked="tag.checked"
                  class="el-check-tag-jcm"
                  @click="tabsStore.routerTab(tag, $router)"
                >
                  <div style="display: flex; align-items: center">
                    <!--隐藏图标-->
                    <div v-show="layoutSettingStore.setting.tabsIcon">
                      <svg-icon
                        :name="tag.icon"
                        :color="iconColor"
                        :width="12"
                        :height="12"
                      />
                    </div>
                    <div class="jcm-tabs-titleWithIcon">
                      <!-- 新增的分隔符 -->
                      <span>{{ tag.title }}</span>
                      <template v-if="tag.closable === true">
                        <svg-icon
                          class="jcm-tabs-icon"
                          name="叉"
                          :width="12"
                          :height="12"
                          @click.stop="tabsStore.removeTab(tag, $router)"
                          :color="iconColor"
                        />
                      </template>
                    </div>
                  </div>
                </el-check-tag>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="1" style="display: flex; justify-content: center">
      <el-dropdown class="el-dropdown-jcm" popper-class="jcm-tabs-dropdown">
        <div class="jcm-tabs-icon-tool">
          <svg-icon
            class="tabs-dropdown-icon-jcm"
            name="下选"
            width="20px"
            height="20px"
            :color="layoutSettingStore.getThemeInvert"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="tabsStore.removeOutherTab(route.path)">
              <template #default>
                <svg-icon
                  name="关闭其他"
                  :width="14"
                  :height="14"
                  :color="iconColor"
                />
                关闭其他标签
              </template>
            </el-dropdown-item>
            <el-dropdown-item @click="tabsStore.removeAllTab($router)">
              <template #default>
                <svg-icon
                  name="全部关闭"
                  :width="14"
                  :height="14"
                  :color="iconColor"
                />
                关闭所有
              </template>
            </el-dropdown-item>
            <el-dropdown-item @click="tabsStore.removeAllLeftTab(route.path)">
              <template #default>
                <svg-icon
                  name="关闭左侧"
                  :width="14"
                  :height="14"
                  :color="iconColor"
                />
                关闭左侧
              </template>
            </el-dropdown-item>
            <el-dropdown-item @click="tabsStore.removeAllRightTab(route.path)">
              <template #default>
                <svg-icon
                  name="关闭右侧"
                  :width="14"
                  :height="14"
                  :color="iconColor"
                />
                关闭右侧标签
              </template>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
//导入Router
import { useRouter, useRoute } from 'vue-router'
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const layoutSettingStore = useLayoutSettingStore()
const tabsStore = useTabsStore()

const $router = useRouter()
const route = useRoute()
// 定义响应式数据
const moveX = ref(0)
// 获取 tabs 的引用
const tabsRef = ref<HTMLElement | null>(null)

//获取主题样式
const themeClass = computed(() => {
  return layoutSettingStore.getThemeStatus ? 'sunny' : 'moon'
})
//图标根据主题模式动态切换颜色
const iconColor = computed(() =>
  layoutSettingStore.getThemeStatus ? 'black' : 'white',
)

// 往左偏移
const previous = () => {
  previousOrNext(false)
}
// 往右偏移
const next = () => {
  previousOrNext(true)
}

const previousOrNext = (direction: boolean) => {
  const tabbox = document.getElementsByClassName('main-box-tab-roll')
  if (tabbox.length > 0) {
    const transform = tabbox[0].style.transform
    if (transform) {
      const match = transform.match(/translateX\((-?\d+)px\)/)
      if (match) {
        const translateXValue = parseInt(match[1], 10)
        console.log(translateXValue)
        const positiveTranslateXValue = Math.abs(translateXValue)
        let moveWidth = 0
        const moveBase = 120
        if (direction) {
          moveWidth = positiveTranslateXValue + moveBase
        } else {
          moveWidth = positiveTranslateXValue - moveBase
        }
        if (tabsRef.value) {
          //获取可视化的tabsdiv的宽度
          let tabsWidth = tabsRef.value.offsetWidth
          //获取总tabs的宽度
          let tabTotalWidth = 0
          for (let i = 0; i < tabsStore.tabs.length; i++) {
            const getStyle = getComputedStyle(
              tabsRef.value.children[0].children[i],
              null,
            )
            const marginLeft = parseFloat(
              getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2),
            )
            const marginRight = parseFloat(
              getStyle.marginRight.substr(0, getStyle.marginRight.length - 2),
            )
            // tag元素实际宽度 = 元素的宽度 + 外边距
            tabTotalWidth +=
              marginLeft +
              marginRight +
              tabsRef.value.children[0].children[i].offsetWidth
          }
          const remainWidth =
            tabTotalWidth - (tabsWidth + positiveTranslateXValue)
          //如果（可视区域的宽度 + （当前偏移的宽度和固定偏移的80））小于当前的总tabs宽度，则继续偏移，否则偏移到剩余宽度
          if (tabsWidth + moveWidth < tabTotalWidth) {
            translateX(moveWidth)
          } else if (remainWidth != 0) {
            translateX(positiveTranslateXValue + remainWidth)
          }
        }
      } else {
        return
      }
    } else {
      return
    }
  } else {
    return
  }
}
// 开始移动 dom
const translateX = (x: number) => {
  moveX.value = x < 0 ? 0 : x
  if (tabsRef.value?.children[0]) {
    ;(tabsRef.value.children[0] as HTMLElement).style.transform =
      `translateX(-${moveX.value}px)`
  }
}

// 观察 actionName 的变化
watch(
  () => tabsStore.actionName,
  (val) => {
    const len = tabsStore.tabs.length
    // 如有重复数据退出后续函数执行
    for (let i = 0; i < len; i++) {
      if (tabsStore.tabs[i].title === val) {
        nextTick(() => {
          move(tabsStore.tabs[i].path)
        })
        return
      }
    }
  },
)

onMounted(() => {
  //添加当前刚进入页面的tab
  const exist = tabsStore.tabs.find((tag: any) => tag.path === route.path)
  if (!exist) {
    tabsStore.addTab(
      {
        path: route.path,
        closable: true,
        title: route.meta.title as string,
        checked: true,
        icon: route.meta.icon as string,
      },
      $router,
      'add',
    )
  }
  // 初始
  nextTick(() => {
    if (tabsStore.tabs.length > 1) {
      const currenttagItem = tabsStore.tabs.find((tag: any) => tag.checked)
      move(currenttagItem.path)
    } else if (tabsStore.tabs.length == 1) {
      move(tabsStore.tabs[0].path)
    }
  })
})

const move = (path: string) => {
  if (tabsRef.value) {
    const lastTab = tabsStore.tabs[tabsStore.tabs.length - 1]
    let tabsWidth = tabsRef.value.offsetWidth
    let tabTotalWidth = 0
    for (let i = 0; i < tabsStore.tabs.length; i++) {
      const getStyle = getComputedStyle(
        tabsRef.value.children[0].children[i],
        null,
      )
      const marginLeft = parseFloat(
        getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2),
      )
      const marginRight = parseFloat(
        getStyle.marginRight.substr(0, getStyle.marginRight.length - 2),
      )
      // tag元素实际宽度 = 元素的宽度 + 外边距
      tabTotalWidth +=
        marginLeft +
        marginRight +
        tabsRef.value.children[0].children[i].offsetWidth
      if (tabsStore.tabs[i].path == path) {
        break
      }
    }
    const pianyi = tabTotalWidth - tabsWidth
    nextTick(() => {
      if (lastTab.path == path) {
        translateX(pianyi)
      } else {
        translateX(pianyi + 20)
      }
    })
  }
}
</script>
<script lang="ts">
export default {
  name: 'tabs',
}
</script>
<style lang="scss" scoped>
.el-dropdown-jcm {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
.el-check-tag-jcm {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden; // 隐藏溢出的线条
  margin-right: 10px;
  padding: 0;
  border-radius: 4px; // 保持圆角

  // 跑马灯动画线条
  &::before {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%; // 宽度足够覆盖周长
    height: 200%;
    opacity: 0; // 默认隐藏
    transition: opacity 0.3s ease;
    content: '';
    background-image: conic-gradient(
      transparent,
      transparent,
      transparent,
      var(--lvshihao-theme-color)
    );
    animation: border-rotate 4s linear infinite; // 旋转动画
  }

  // 内部遮罩，形成线条效果
  &::after {
    position: absolute;
    top: 2px; // 线条宽度
    right: 2px;
    bottom: 2px;
    left: 2px;
    z-index: 0;
    border-radius: 2px; // 内部圆角
    background-color: var(--lvshihao-suuny-bg); // 适配暗黑模式
    content: '';
  }

  // 内容层级提升
  > div {
    position: relative;
    z-index: 1;
  }
  &:hover::before,
  &.is-checked::before {
    opacity: 1; // 悬停或选中时显示动画
  }
}

// 动画定义
@keyframes border-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.jcm-tabs-titleWithIcon {
  display: flex;
  align-items: center;
  margin-left: 3px;
  .jcm-tabs-icon {
    margin-left: 3px;
    padding: 1px;
    border-radius: 50%;
  }
  .jcm-tabs-icon:hover {
    background-color: #e7e7f5;
  }
}
.jcm-tabs-icon-tool {
  display: flex;
  justify-content: center;
  width: 30px;
  height: 25px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px #00000010;
  cursor: pointer;
}
.dark {
  .jcm-tabs-icon-tool {
    background-color: var(--lvshihao-moon-bg);
    box-shadow: 0 4px 20px #ffffff10;
  }
  .el-check-tag-jcm {
    color: var(--lvshihao-suuny-bg);
    &::after {
      background-color: var(--lvshihao-moon-bg);
    }
  }
}
.main-box {
  padding: 0 0 0 10px;
  .main-box-tab {
    position: relative;
    overflow: hidden;
    padding: 10px 20px;
    & > i {
      position: absolute;
      cursor: pointer;
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        right: 0;
      }
    }
    .main-box-tab-content {
      overflow: hidden;
      margin: 0 15px;
      padding-top: 2px; // 增加上下内边距
      padding-bottom: 2px;
      // 修复超出内容隐藏问题，确保子元素宽度不被压缩
      .main-box-tab-roll {
        display: flex;
        align-items: center;
        width: max-content; // 确保宽度能够容纳所有标签
        transition: transform 0.5s;
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 5px;
          width: auto;

          /* width: 140px; */
          height: 25px;
          flex-shrink: 0;
          cursor: pointer;
          span,
          i {
            font-size: 12px;
          }
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          i {
            margin-right: 10px;
          }
        }
      }
    }
    .tab-item {
      border: 1px solid #052141;
      border-radius: 0 1px;
      color: #cccccc;
      background-color: rgb(255 255 255 / 50%);
    }
    .tab-item-action {
      border: 1px solid #1e2088;
      border-radius: 0 1px;
      color: #ffffff;
      background: rgb(0 180 255 / 80%);
    }
  }
}
</style>

<style lang="scss">
// 放在非 scoped 中，以确保能作用于 teleported 的 dropdown
.jcm-tabs-dropdown {
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    gap: 5px; // 图标和文字之间的间距
  }
}
html.dark .jcm-tabs-dropdown {
  .el-dropdown-menu__item {
    color: var(--lvshihao-suuny-bg);
    &:hover {
      color: var(--lvshihao-theme-color);
      background-color: var(--lvshihao-moon-bg);
    }
  }
}
</style>
