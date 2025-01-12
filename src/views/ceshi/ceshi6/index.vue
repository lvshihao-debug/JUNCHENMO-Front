<template>
          <!-- 菜单组件 -->
      <el-menu mode="horizontal" :default-active="$route.path"  style="max-width: 300px;"
      router>
      <Menu :menuList="usePermissionStore.sidebarRouters"></Menu>
    </el-menu>

    <horizontalMenu></horizontalMenu>

    <el-menu
      mode="horizontal"
      style="max-width: 350px;"
      @select="handleSelect"
    >
      <el-menu-item >Processing Center</el-menu-item>
      <el-sub-menu >
        <template #title>Workspace</template>
        <el-menu-item>item one</el-menu-item>
        <el-menu-item>item two</el-menu-item>
        <el-menu-item>item three</el-menu-item>
        <el-sub-menu>
          <template #title>item four</template>
          <el-menu-item >item one</el-menu-item>
          <el-menu-item >item two</el-menu-item>
          <el-menu-item >item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item  disabled>Info</el-menu-item>
      <el-menu-item>Orders</el-menu-item>
    </el-menu>
    <div class="h-6" />
    <el-menu
    style="max-width: 350px;"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  //仓库
import PermissionStore from '@/store/modules/acl/menu'
import horizontalMenu from '@/layout/horizontal-menu/index.vue'

//引入菜单组件
import Menu from '@/layout/menu/index.vue'

const usePermissionStore = PermissionStore()

  const activeIndex = ref('1')
  const activeIndex2 = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>