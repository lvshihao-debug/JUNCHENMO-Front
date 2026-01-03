<template>
  <el-menu
    mode="horizontal"
    :default-active="$route.path"
    style="max-width: 900px"
    :class="{
      suuny: layoutSettingStore.getThemeValue,
      moon: !layoutSettingStore.getThemeValue,
    }"
    router
  >
    <template
      v-for="item in usePermissionStore.sidebarRouters"
      :key="item.path"
    >
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <template v-if="item.meta.frame">
          <el-menu-item v-if="item.meta.hidden" @click="toFream(item.path)">
            <div>
              <svg-icon :name="item.meta.icon" />
            </div>
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item
            v-if="item.meta.hidden"
            :index="item.path"
            @click="
              TabsStore.addTab(
                {
                  path: item.path,
                  closable: true,
                  title: item.meta.title,
                  checked: true,
                  icon: item.meta.icon,
                },
                $router,
                'add',
              )
            "
          >
            <div>
              <svg-icon :name="item.meta.icon" />
            </div>
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
      <!-- 有子路由但是只有一个子路由,并且不是外联 -->
      <template
        v-if="
          item.children &&
          item.children.length == 1 &&
          !item.children[0].meta.frame
        "
      >
        <el-menu-item
          v-if="item.children[0].meta.hidden"
          :index="item.children[0].path"
          @click="
            TabsStore.addTab(
              {
                path: item.children[0].path,
                closable: true,
                title: item.children[0].meta.title,
                checked: true,
                icon: item.children[0].meta.icon,
              },
              $router,
              'add',
            )
          "
        >
          <div>
            <svg-icon :name="item.children[0].meta.icon" />
          </div>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由但是只有一个子路由,并且是外联 -->
      <template
        v-if="
          item.children &&
          item.children.length == 1 &&
          item.children[0].meta.frame
        "
      >
        <el-menu-item
          v-if="item.children[0].meta.hidden"
          @click="toFream(item.children[0].path)"
        >
          <div>
            <svg-icon :name="item.children[0].meta.icon" />
          </div>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由且个数大于一个 -->
      <template v-if="item.children && item.children.length > 1">
        <el-sub-menu v-if="item.meta && item.meta.hidden" :index="item.path">
          <template #title>
            <div>
              <svg-icon :name="item.meta.icon" />
            </div>
            <span>{{ item.meta.title }}</span>
          </template>
          <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
//引入菜单组件
import Menu from '../menu/index.vue'
//仓库
import PermissionStore from '@/store/modules/acl/menu'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//导入Router
import { useRouter } from 'vue-router'
import useTabsStore from '@/store/modules/layout/tabs'

const usePermissionStore = PermissionStore()
const layoutSettingStore = useLayoutSettingStore()

const $router = useRouter()
const TabsStore = useTabsStore()

//外联点击跳转
const toFream = (path: any) => {
  window.open(path + '')
}
</script>
