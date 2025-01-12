<template>
    <el-menu mode="horizontal" ellipsis="false" 
       >
        <template v-for="item in usePermissionStore.sidebarRouters" >
            <!-- 没有子路由 -->
            <template v-if="!item.children">
                <template v-if="item.meta.frame">
                    <el-menu-item v-if="item.meta.hidden" @click="toFream(item.path)">
                   
                        <template #title>
                            <span>{{ item.meta.title }}</span>
                        </template>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-menu-item v-if="item.meta.hidden" :index="item.path" @click="
                        TabsStore.addTab(
                            {
                                path: item.path,
                                closable: true,
                                title: item.meta.title,
                                checked: true,
                                icon: item.meta.icon,
                            },
                            $router,
                        )
                        ">
                      
                        <template #title>

                            <span>{{ item.meta.title }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
            <!-- 有子路由但是只有一个子路由,并且不是外联 -->
            <template v-if="item.children && item.children.length == 1 && (!item.children[0].meta.frame)">
                <el-menu-item v-if="item.children[0].meta.hidden" :index="item.children[0].path" @click="
                    TabsStore.addTab(
                        {
                            path: item.children[0].path,
                            closable: true,
                            title: item.children[0].meta.title,
                            checked: true,
                            icon: item.children[0].meta.icon,
                        },
                        $router,
                    )
                    ">
                  
                    <template #title>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <!-- 有子路由但是只有一个子路由,并且是外联 -->
            <template v-if="item.children && item.children.length == 1 && item.children[0].meta.frame">
                <el-menu-item v-if="item.children[0].meta.hidden" @click="toFream(item.children[0].path)">
                  
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
                </el-sub-menu>
            </template>
        </template>
  
    </el-menu>
</template>

<script setup lang="ts">
//仓库
import PermissionStore from '@/store/modules/acl/menu'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//导入Router
import { useRouter } from 'vue-router'
import useTabsStore from '@/store/modules/layout/tabs'

const usePermissionStore = PermissionStore()
let layoutSettingStore = useLayoutSettingStore()

const $router = useRouter()
const TabsStore = useTabsStore()
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
//外联点击跳转
const toFream = (path: any) => {
  window.open(path + '')
}
</script>
