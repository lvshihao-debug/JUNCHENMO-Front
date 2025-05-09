<script lang="ts">
export default {
  name: 'ceshi6',
}
</script>
<script setup lang="ts">
import { TerminalApi, TerminalFlash, Terminal, DragConfig, FailedFunc, SuccessFunc, TerminalMessageClass, Message, Command } from 'vue-web-terminal';
import { reactive } from "vue";

const textContainer = ref<HTMLElement | null>(null);
const username = ref('lvshihao:')
const pwd = ref("~")
const currentPwd = ref(username.value+pwd.value+'#');

// 定义响应式数据
const url = ref("ws://127.0.0.1:8080/system/websocket/message");
let ws = null;

// 连接函数
const join = () => {
  const wsuri = url.value;
  ws = new WebSocket(wsuri);
  ws.onopen = (event) => {
    console.log("已经打开连接!");
  };
 
  ws.onclose = (event) => {
    console.log("已经关闭连接!");
  };
};
join()

onMounted(() => {
  join()
})

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
  //发送消息  
  send(pwd.value+"jcm"+command);
  ws.onmessage = (event) => {
    const data = event.data.split("||")
    pwd.value= data[0].trim()
    currentPwd.value =username.value+ pwd.value+'#'
    console.log("路径以及改变");
    console.log(data[0]);
    success({
      type: 'normal',
      class: "success",
      tag: 'success',
      content: data[1]
    })
  };
}
const setting = reactive({
  logFold: false,
  logHighlight: false,
  shellHint: false,
  shellSampleHint: false,
  inputHint: false,
  lineSpace: 15,
  fontSize: 14
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
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(text);
  if(selection){
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

//复制选择的内容
const copy = async () => {
  const divElement = document.getElementsByClassName("t-window")[0]
  const textContent = divElement.textContent;
  navigator.clipboard.writeText(textContent);
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
  navigator.clipboard.readText().then(data=>{
      TerminalApi.setCommand('my-terminal',  TerminalApi.getCommand('my-terminal')+data)
  });
};
//字体行间距

//结束命令 
const ctrlC = () => {
  TerminalApi.execute('my-terminal', '^C')
}

//去顶部
//gundong
const jumpToTop = () => {
  document.getElementsByClassName("t-window")[0].scrollTop = 0;
}


//禁用双击放大事件
const disableDoubleClick = () => {
  console.log('禁用双击放大事件');
}

//字体大小变化
const fontSizeEdit = (size) =>{
  const divs = document.querySelectorAll('.t-window')
  setting.fontSize = setting.fontSize + size;
    divs.forEach(div => {
      div?.style.setProperty('--t-font-size', setting.fontSize  + 'px')
  });
}


const autoCopy = () => {
  // 创建一个用于存储选中文本的变量
  let selectedText = '';
  // 获取要监听的元素
  const textArea = document.getElementsByClassName("t-window")[0];
  // 添加鼠标释放事件监听器
  textArea.addEventListener('mouseup', function() {
    // 获取选中的文本
    selectedText = window.getSelection().toString();
    navigator.clipboard.writeText(selectedText);
  });
}


//监听快捷键
const onKeydown = (event: Event) => {
  if (event.key === 'c' && event.ctrlKey) {
    event.preventDefault()
    //  设置结束命令
    TerminalApi.execute('my-terminal', '^C')
  }
}




// 发送消息函数
const send = (message:string) => {
  if (ws) {
    ws.send(message);
  } else {
    alert("未连接到服务器");
  }
};

</script>

<template>
  <div style="height: 75vh;">
    <terminal ref="textContainer" name="my-terminal" title="客户端-127.0.0.1" :command-store="commandStore"
      :enable-fold="setting.logFold" :enable-hover-stripe="setting.logHighlight" cursor-style="bar"
      :enable-input-tips="setting.inputHint" :enable-help-box="setting.shellSampleHint" @on-keydown="onKeydown"
      log-size-limit="5" :line-space="setting.lineSpace" :context="currentPwd" @exec-cmd="onExecCmd" theme='ceshi1'>
         <!--  自定义json格式样式  -->
    <template #normal="data">
      <pre>{{ data.message.content }}</pre>
    </template>
      <template #header>
        <div style="background-color: #323538;" @dblclick.stop="disableDoubleClick()">
          <div style="height: 36px;margin: 0px 10px;display: flex;justify-content: space-between; align-items: center;">
            <div class="ssh-header-left">
              127.0.0.1
            </div>
            <div class="ssh-header-right">
              <el-tooltip class="box-item" effect="dark" content="开启滑动复制" placement="bottom">
                <div class="tool-button" @click="autoCopy()">
                  <svg-icon name="jcm-放大镜" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="放大字体" placement="bottom">
                <div class="tool-button" @click="fontSizeEdit(1)">
                  <svg-icon name="jcm-放大镜" color="#C3C6C9" width="20" height="20" />
                </div>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="缩小字体" placement="bottom">
                <div class="tool-button" @click="fontSizeEdit(-1)">
                  <svg-icon name="jcm-放小镜" color="#C3C6C9" width="20" height="20" />
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
              <el-tooltip class="box-item" effect="dark" content="复制" placement="bottom">
                <div class="tool-button" @click="copy()">
                  <svg-icon name="jcm-复制" color="#C3C6C9" width="20" height="20" />
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