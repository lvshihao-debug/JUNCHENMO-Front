<template>
  <vue-command :commands="commands" :style="themeStyles" hide-title="true" invert="true"  >
    <template #title>
    bash - 720x350
  </template>
  <template #prompt>
    @lvshihao127.0.0.1
  </template>
  <template #buttons>
    &times; &#95; &square;
  </template>
  </vue-command>
</template>

<script setup>
import VueCommand, { createStdout } from "vue-command";
import "vue-command/dist/vue-command.css";

// 定义命令对象
const commands = {
  "hello-world": () => createStdout("🔥<span color='red'>Hello world</span>"),
  "echo": (args) => createStdout(args.join(',')),
  "date": () => createStdout(new Date().toLocaleString())
};

const themeStyles = {
  backgroundColor: '#282c34',
  color: '#abb2bf',
  '--prompt-color': '#56b6c2',
  '--stdout-color': '#98c379',
  '--stderr-color': '#e06c75'
};
</script>
<style lang="scss" scoped>
/* 更改终端的背景颜色 */
.vue-command {
  background-color: #282c34;
}
/* 更改终端的文本颜色 */
.vue-command.vue-command__content {
  color: #abb2bf;
}
/* 更改提示符的颜色 */
.vue-command.vue-command__prompt {
  color: #56b6c2;
}
/* 更改命令输出的颜色 */
.vue-command.vue-command__stdout {
  color: #98c379;
}
/* 更改错误输出的颜色 */
.vue-command.vue-command__stderr {
  color: #e06c75;
}
</style>