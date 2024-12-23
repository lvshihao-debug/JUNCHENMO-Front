<template>
  <el-card>
    <div
      class="block"
      style="display: flex; justify-content: flex-start; align-items: center"
    >
      <el-avatar :size="50" shape="square">
          {{ userStore.getUserNameTextFirst }}
        </el-avatar>

      <div>
        <div style="font-size: 23px; font-weight: 600; margin-left: 20px">
          欢迎回来! {{ userStore.user.username }}
        </div>
        <div
          style="
            font-size: 12px;
            font-weight: 600;
            margin-left: 20px;
            margin-top: 5px;
            color: #767676;
          "
        >
        五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
// 实例化容器
const userStore = useUserStore()
</script>

<style scoped></style>
