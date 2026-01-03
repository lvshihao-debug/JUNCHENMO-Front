<template>
  <el-row class="row-tabs" :class="themeClass">
    <el-col :span="23">
      <el-scrollbar
        ref="scrollbarRef"
        @wheel.prevent="handleScroll"
        height="100%"
      >
        <!-- 面包屑动态的展示路由名字与标题 -->
        <div class="tabs-jcm">
          <transition-group name="tab">
            <div
              class="scrollbar-demo-item"
              v-for="tag in TabsStore.tabs"
              :key="tag"
            >
              <template v-if="tag.closable === true">
                <el-check-tag
                  :closable="tag.closable"
                  :disable-transitions="false"
                  :checked="tag.checked"
                  class="el-check-tag-jcm"
                  @click="TabsStore.routerTab(tag, $router)"
                >
                  <div style="display: flex; align-items: center">
                    <!-- 隐藏图标-->
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
                      <svg-icon
                        class="jcm-tabs-icon"
                        name="叉"
                        :width="12"
                        :height="12"
                        @click.stop="TabsStore.removeTab(tag, $router)"
                      />
                    </div>
                  </div>
                </el-check-tag>
              </template>
              <template v-else>
                <el-check-tag
                  :closable="tag.closable"
                  :disable-transitions="false"
                  :checked="tag.checked"
                  class="el-check-tag-jcm"
                  @click="TabsStore.routerTab(tag, $router)"
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
                    </div>
                  </div>
                </el-check-tag>
              </template>
            </div>
          </transition-group>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="1">
      <el-dropdown class="el-dropdown-jcm">
        <svg-icon
          class="tabs-dropdown-icon-jcm"
          name="下选"
          width="20px"
          height="20px"
          :color="layoutSettingStore.getThemeInvert"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="CircleCloseFilled"
              @click="TabsStore.removeOutherTab(route.path)"
            >
              关闭其他标签
            </el-dropdown-item>
            <el-dropdown-item
              icon="CircleCloseFilled"
              @click="TabsStore.removeAllTab($router)"
            >
              关闭所有标签
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
//导入Router
import { useRouter, useRoute } from 'vue-router'
import { ElScrollbar } from 'element-plus'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
const layoutSettingStore = useLayoutSettingStore()
const TabsStore = useTabsStore()

const $router = useRouter()
const route = useRoute()

//每次滚动左右移动20px
const scrollbarRef = ref()
let currentPosition = 0

TabsStore.initTabs($router, route)

//获取主题样式
const themeClass = computed(() => {
  return layoutSettingStore.getThemeStatus ? 'sunny' : 'moon'
})
//图标根据主题模式动态切换颜色
const iconColor = computed(() =>
  layoutSettingStore.getThemeStatus ? 'black' : 'white',
)

const handleScroll = (e: WheelEvent) => {
  const delta = Math.sign(e.deltaY) // get the direction of the scroll (1 for down, -1 for up)
  const newPosition = currentPosition + 20 * delta // calculate the new position based on the direction and step size
  if (
    newPosition >= 0 &&
    newPosition <=
      scrollbarRef.value.wrapRef.scrollWidth -
        scrollbarRef.value.wrapRef.clientWidth
  ) {
    // only update the scroll position if it's within bounds
    currentPosition = newPosition
    scrollbarRef.value.setScrollLeft(currentPosition)
  }
}
</script>

<style scoped lang="scss">
.row-tabs {
  margin-left: 7px;
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
.tabs-jcm {
  display: flex;
  align-items: center;
  padding: 5px;
  height: 100%;
  -ms-overflow-style: none; /* 隐藏 IE 和 Edge 的滚动条 */
  scrollbar-width: none; /* 隐藏 Firefox 的滚动条 */
}
.el-dropdown-jcm {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
.el-check-tag-jcm {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.tabs-dropdown-icon-jcm {
  cursor: pointer;
  border: 0;
}
.scrollbar-demo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  text-align: center;
  flex-shrink: 0;
}
</style>
