<template>
  <div>
    <el-alert type="info" center show-icon >
      <template #title>
        <div id="typing-animation"> 大家好，我是{{ userStore.user.username }}</div>
      </template>
    </el-alert>
    <el-card class="animate__animated animate__bounceInRight">
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
    <el-row style="margin-top: 10px;" :gutter="10">
      <el-col :span="4" class="animate__animated animate__flipInX">
        <JcmHomeCard icon="user" title="用户" data="3,208人" rate="8%"></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInY">
        <JcmHomeCard icon="role" title="角色" data="5种" rate="1%"></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInX">
        <JcmHomeCard icon="dictType" title="字典项" data="108条" rate="4%"></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInY">
        <JcmHomeCard icon="AI" title="TOKEN消耗" data="10,887" rate="2%"></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInX">
        <JcmHomeCard icon="登录log" title="登录日志" data="415条" rate="2%"></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInY">
        <JcmHomeCard icon="log" title="操作日志" data="3,208条" rate="8%"></JcmHomeCard>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;" :gutter="10">
      <el-col :span="13">
        <el-card class="card-chat animate__animated animate__slideInUp">
          <JcmBarChat />
        </el-card>
      </el-col>
      <el-col :span="11">
        <div class="cards  animate__animated animate__slideInUp">
          <div class="card blue" >
            <p class="tip">当前版本：1.0.0</p><br/>
            <p class="second-text"></p><br/>
            <p class="second-text">用户管理</p><br/>
            <p class="second-text">角色管理</p><br/>
            <p class="second-text">操作日志管理</p><br/>
            <p class="second-text">登录日志管理</p><br/>
            <p class="second-text">菜单管理</p><br/>
            <p class="second-text">字典项管理</p><br/>
            <p class="second-text">字典值管理</p><br/>
            <p class="second-text">AI表结构生成</p><br/>
            <p class="second-text">代码生成</p><br/>
            <p class="second-text">缓存监控</p><br/>
            <p class="second-text">服务监控</p><br/>
            <p class="second-text">.....</p><br/>
          </div>
          <div class="card red">
            <p class="tip">前端技术栈</p><br/>
            <p class="second-text">Vue3：3.4.21</p><br/>
            <p class="second-text">element-plus：2.9.3</p><br/>
            <p class="second-text">pinia：2.1.7</p><br/>
            <p class="second-text">vite：5.2.0</p><br/>
            <p class="second-text">sass：1.79.0</p><br/>
            <p class="second-text">typescript：5.2.2</p><br/>
            <p class="second-text">animate.css：4.1.1</p><br/>
            <p class="second-text">echarts：5.6.0</p><br/>
            <p class="second-text">eslint：8.57.0</p><br/>
            <p class="second-text">stylelint：14.6.0</p><br/>
            <p class="second-text">axios：1.6.8</p><br/>
            <p class="second-text">.....</p><br/>
          </div>
          <div class="card green">
            <p class="tip">后端技术栈</p><br/>
            <p class="second-text">JDK 11</p><br/>
            <p class="second-text">Spring Cloud：2021.0.8</p><br/>
            <p class="second-text">Spring Cloud Alibaba：2021.0.5.0</p><br/>
            <p class="second-text">Spring Boot：2.7.18</p><br/>
            <p class="second-text">Mybatis Plus：3.5.5</p><br/>
            <p class="second-text">pagehelper：2.0.0</p><br/>
            <p class="second-text">easyexcel：4.0.2</p><br/>
            <p class="second-text">lombok：1.18.36</p><br/>
            <p class="second-text">hutool：5.8.27</p><br/>
            <p class="second-text">velocity：2.3</p><br/>
            <p class="second-text">jjwt：0.9.1</p><br/>
            <p class="second-text">.....</p><br/>
          </div>
        </div>
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
<style lang="scss" scoped>

.cards {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.cards .red {
  background-color: #d71919;
}

.cards .blue {
  background-color: #0062ff;
}

.cards .green {
  background-color: #ff165d;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 420px;
  width: 33%;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: 400ms;
}

.cards .card p.tip {
  font-size: 1em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: .7em;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}

</style>
