<template>
  <div>
    <el-input v-model="url" type="text" style="width: 20%" /> &nbsp; &nbsp;
    <el-button @click="join" type="primary">连接</el-button>
    <el-button @click="exit" type="danger">断开</el-button>

    <br />
    <el-input type="textarea" v-model="message" :rows="9" />
    <el-button type="info" @click="send">发送消息</el-button>
    <br />
    <br />
    <el-input type="textarea" v-model="textContent" :rows="9" /> 返回内容
    <br />
    <br />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义响应式数据
const url = ref("ws://127.0.0.1:8080/system/websocket/message");
const message = ref("");
const textContent = ref("");
let ws = null;

// 连接函数
const join = () => {
  const wsuri = url.value;
  ws = new WebSocket(wsuri);
  ws.onopen = (event) => {
    textContent.value = textContent.value + "已经打开连接!" + "\n";
  };
  ws.onmessage = (event) => {
    textContent.value = event.data + "\n";
  };
  ws.onclose = (event) => {
    textContent.value = textContent.value + "已经关闭连接!" + "\n";
  };
};

// 断开连接函数
const exit = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};

// 发送消息函数
const send = () => {
  if (ws) {
    ws.send(message.value);
  } else {
    alert("未连接到服务器");
  }
};

onMounted(() => {
  // 可以在这里进行一些初始化操作，例如自动连接等
});
</script>