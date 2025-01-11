<template>
  <div>
    <el-card>
      <div class="block" style="display: flex; justify-content: flex-start; align-items: center">
        <el-avatar :size="50" shape="square">
          {{ userStore.getUserNameTextFirst }}
        </el-avatar>

        <div>
          <div style="font-size: 23px; font-weight: 600; margin-left: 20px">
            欢迎回来! {{ userStore.user.username }}
          </div>
          <div style="
            font-size: 12px;
            font-weight: 600;
            margin-left: 20px;
            margin-top: 5px;
            color: #767676;
          ">
            五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。
          </div>
        </div>
      </div>
    </el-card>
    <el-row style="margin-top: 10px;">
      <el-col :span="4" style="margin-right: 10px;">
        <JcmHomeCard icon="user" title="用户" data="20人" rate="1%" ></JcmHomeCard>
      </el-col>
      <el-col :span="4" style="margin-right: 10px;">
        <JcmHomeCard icon="dictType" title="字典项" data="23条" rate="12%" ></JcmHomeCard>
      </el-col>
      <el-col :span="4" style="margin-right: 10px;">
        <JcmHomeCard icon="登录log" title="登录日志" data="415条" rate="2%" ></JcmHomeCard>
      </el-col>
      <el-col :span="4" style="margin-right: 10px;">
        <JcmHomeCard icon="log" title="操作日志" data="3,208条" rate="8%" ></JcmHomeCard>
      </el-col>
      <el-col :span="4" style="margin-right: 10px;">
        <JcmHomeCard icon="log" title="操作日志" data="3,208条" rate="8%" ></JcmHomeCard>
      </el-col>
    
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="11">
        <el-card>
          <JcmBarChat />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user/user'
// 实例化容器
const userStore = useUserStore()
</script>
<script lang="ts">
export default {
  name: 'home',
}
</script>
<style scoped></style>
