<script lang="ts">
export default {
  name: 'ceshi3',
}
</script>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import { TerminalApi, TerminalFlash, Terminal, DragConfig, FailedFunc, SuccessFunc, TerminalMessageClass, Message, Command } from 'vue-web-terminal';
import { reactive } from "vue";

const layoutSettingStore = useLayoutSettingStore()
const textContainer = ref<HTMLElement | null>(null);
//初始化日志
// const initLog = reactive<Message>({
//   content: "import Terminal from 'vue-web-terminal'\n\nVue.use(Terminal)",
//   type: "json",
//   class: "success",
//   tag: "ccc",
// })

// 内置命令
const commandStore = reactive<Command>({
  key: "cat",
  title: "查看文件",
  group: "常用",
  usage: "cat json.txt",
  description: "查看文件"
});

const dragConf = reactive<DragConfig>({
  width: "100%",
  height: "100%",
  zIndex: 1,
  init: {
    x: 200,
    y: 200
  },
  pinned: false
})

const onExecCmd = (key: string, command: string, success: SuccessFunc, failed: FailedFunc) => {
  if (key === 'fail') {
    failed('Something wrong!!!')
  } else {
    let allClass = ['success', 'error', 'system', 'info', 'warning'];

    let clazz = allClass[Math.floor(Math.random() * allClass.length)];
    success({
      type: 'normal',
      class: clazz as TerminalMessageClass,
      tag: clazz,
      content: `Your command is '${command}'`
    })
  }

  // let flash = new TerminalFlash()
  // success(flash)

  // let count = 0
  // let flashInterval = setInterval(() => {
  //   flash.flush(`This is flash content: ${count}`)

  //   if (++count >= 20) {
  //     clearInterval(flashInterval)
  //     flash.finish()
  //   }
  // }, 200)

  // TerminalApi.textEditorOpen('my-terminal', {
  //       content: 'Please edit this file',
  //       onClose: (value, options) => {
  //           console.log("用户编辑完成，文本结果：", value, "options:", options)
  //       }
  //   })
}
const setting = reactive({
  logFold: false,
  logHighlight: false,
  shellHint: false,
  shellSampleHint: false,
  inputHint: false
})
//全屏按钮点击的回调
const fullScreen = () => {
  TerminalApi.fullscreen('my-terminal')
}
//日志折叠
const logFold = () => {
  setting.logFold = !setting.logFold
}
//命令样例提示
const shellSampleHint = () => {
  setting.shellSampleHint = !setting.shellSampleHint
}
//输入提示
const inputHint = () => {
  setting.inputHint = !setting.inputHint
}
//日志高亮
const logHighlight = () => {
  setting.logHighlight = !setting.logHighlight
}
//全选
const selectAllText = () => {
  const text = document.getElementsByClassName("t-window")[0]
  console.log(text)
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(text);
  selection.removeAllRanges();
  selection.addRange(range);
};

//复制选择的内容
const copy = () => {
  document.execCommand("Copy");	
}
//清空
const clear = () => {
  //  clear screen log
  TerminalApi.clearLog('my-terminal')
}

//去底部
const jumpToBottom = () => {
  // 强制跳转到底部
  TerminalApi.jumpToBottom('my-terminal', true)
}

//粘贴
const paste = async () => {
  try {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API 不受支持');
    }
    const text = await navigator.clipboard.readText();
    TerminalApi.setCommand('my-terminal', text)
  } catch (err) {
    console.error('无法读取剪切板内容:', err);
    alert('无法读取剪切板内容，请检查权限或浏览器支持。');
  }
};
//结束命令 
const ctrlC = () => {
  TerminalApi.execute('my-terminal', '^C')
}

//去顶部
//gundong
const jumpToTop = () => {
  document.getElementsByClassName("t-window")[0].scrollTop = 0;
}


//监听快捷键
const onKeydown = (event: Event) => {
    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault()
      //  设置结束命令
      TerminalApi.execute('my-terminal', '^C')
    }
}
</script>

<template>
  <div style="height: 75vh;">
    <terminal ref="textContainer" name="my-terminal" title="客户端-127.0.0.1" theme="light" :command-store="commandStore"
      :enable-fold="setting.logFold" :enable-hover-stripe="setting.logHighlight" cursor-style="bar"
      :enable-input-tips="setting.inputHint" :enable-help-box="setting.shellSampleHint"  @on-keydown="onKeydown" log-size-limit="5"
      context="junchenmo@127.0.0.1" @exec-cmd="onExecCmd">
      <template #header>
        <div style="background-color: #323538;">
          <div style="height: 36px;margin: 0px 10px;display: flex;justify-content: space-between; align-items: center;">
            <div class="ssh-header-left">
              127.0.0.1
            </div>
            <div class="ssh-header-right">
              <el-tooltip class="box-item" effect="dark" content="上传" placement="bottom">
                <div class="tool-button" @click="upload()">
                  <svg-icon name="jcm-上传" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="ctrl + c" placement="bottom">
                <div class="tool-button" @click="ctrlC()">
                  <svg-icon name="jcm-公式" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="全选" placement="bottom">
                <div class="tool-button" @click="selectAllText()">
                  <svg-icon name="jcm-全选" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="复制" placement="bottom">
                <div class="tool-button" @click="copy()">
                  <svg-icon name="jcm-复制" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="粘贴" placement="bottom">
                <div class="tool-button" @click="paste()">
                  <svg-icon name="jcm-粘贴" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="ctrl + c" placement="bottom">
                <div class="tool-button" @click="jumpToTop()">
                  <svg-icon name="jcm-去顶部" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="去底部" placement="bottom">
                <div class="tool-button" @click="jumpToBottom()">
                  <svg-icon name="jcm-去底部" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="输入提示" placement="bottom">
                <div class="tool-button" @click="inputHint()">
                  <svg-icon name="jcm-输入提示" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="命令样例提示" placement="bottom">
                <div class="tool-button" @click="shellSampleHint()">
                  <svg-icon name="jcm-命令样例提示" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="日志组高亮" placement="bottom">
                <div class="tool-button" @click="logHighlight()">
                  <svg-icon name="jcm-触摸高亮" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="日志折叠" placement="bottom">
                <div class="tool-button" @click="logFold()">
                  <svg-icon name="jcm-折叠" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
                <div class="tool-button" @click="fullScreen()">
                  <svg-icon name="全屏" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="清空内容" placement="bottom">
                <div class="tool-button" @click="clear()">
                  <svg-icon name="擦除" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="命令编辑器" placement="bottom">
                <div class="tool-button" @click="closeConnect()">
                  <svg-icon name="jcm-命令编辑器" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="打开SFTP" placement="bottom">
                <div class="tool-button" @click="closeConnect()">
                  <svg-icon name="jcm-sftp" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="断开连接" placement="bottom">
                <div class="tool-button" @click="closeConnect()">
                  <svg-icon name="jcm-断开连接" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <div class="fenge">
                <svg-icon name="jcm-分割" color="#C3C6C9" width="20" height="20" />
              </div>
              <div style="display: flex;align-items: center;justify-content: center;">
                <span class="status"></span>
                <div class="status-message">已断开</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </terminal>
  </div>
</template>

<style scoped>
.ssh-header-left::before {
  content: "IP:";
  padding-right: 4px;
}

.ssh-header-left {
  color: aliceblue;
}

.ssh-header-right {
  display: flex;
}

.status {
  background-color: red;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-message {
  margin-left: 8px;
  font-size: 11px;
  color: aliceblue;
}

.tool-button {
  margin: 0px 2px;
  display: flex;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
}

.fenge {
  margin: 0px 2px;
  display: flex;
  width: 28px;
  height: 28px;
  align-items: center;
}

.tool-button:hover {
  cursor: pointer;
  background-color: #3e4246;
}
</style>