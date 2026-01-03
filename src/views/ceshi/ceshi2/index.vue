<template>
  <el-row id="terminal-view">
    <el-col :span="24">
      <!-- 搜索框 -->
      <div style="background-color: #323538">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 10px;
            height: 36px;
          "
        >
          <div class="ssh-header-left">127.0.0.1</div>
          <div class="ssh-header-right">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="开启滑动复制"
              placement="bottom"
            >
              <div class="tool-button" @click="autoCopy()">
                <svg-icon
                  name="jcm-放大镜"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="放大字体"
              placement="bottom"
            >
              <div class="tool-button" @click="fontSizeEdit(1)">
                <svg-icon
                  name="jcm-放大镜"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="缩小字体"
              placement="bottom"
            >
              <div class="tool-button" @click="fontSizeEdit(-1)">
                <svg-icon
                  name="jcm-放小镜"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="ctrl + c"
              placement="bottom"
            >
              <div class="tool-button" @click="ctrlC()">
                <svg-icon
                  name="jcm-公式"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="全选"
              placement="bottom"
            >
              <div class="tool-button" @click="selectAllText()">
                <svg-icon
                  name="jcm-全选"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制"
              placement="bottom"
            >
              <div class="tool-button" @click="copy()">
                <svg-icon
                  name="jcm-复制"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="粘贴"
              placement="bottom"
            >
              <div class="tool-button" @click="paste()">
                <svg-icon
                  name="jcm-粘贴"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="去顶部"
              placement="bottom"
            >
              <div class="tool-button" @click="jumpToTop()">
                <svg-icon
                  name="jcm-去顶部"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="去底部"
              placement="bottom"
            >
              <div class="tool-button" @click="jumpToBottom()">
                <svg-icon
                  name="jcm-去底部"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="全屏"
              placement="bottom"
            >
              <div class="tool-button" @click="fullScreen()">
                <svg-icon name="全屏" color="#C3C6C9" width="20" height="20" />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="清空内容"
              placement="bottom"
            >
              <div class="tool-button" @click="clear()">
                <svg-icon name="擦除" color="#C3C6C9" width="20" height="20" />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="命令编辑器"
              placement="bottom"
            >
              <div class="tool-button" @click="closeConnect()">
                <svg-icon
                  name="jcm-命令编辑器"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="打开SFTP"
              placement="bottom"
            >
              <div class="tool-button" @click="closeConnect()">
                <svg-icon
                  name="jcm-sftp"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="内容搜索"
              placement="bottom"
            >
              <div class="tool-button" @click="search()">
                <svg-icon
                  name="jcm-内容搜索"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="断开连接"
              placement="bottom"
            >
              <div class="tool-button" @click="closeConnect()">
                <svg-icon
                  name="jcm-断开连接"
                  color="#C3C6C9"
                  width="20"
                  height="20"
                />
              </div>
            </el-tooltip>
            <div class="fenge">
              <svg-icon
                name="jcm-分割"
                color="#C3C6C9"
                width="20"
                height="20"
              />
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <span
                class="status"
                :style="{ background: terminalStatus.color }"
              ></span>
              <div class="status-message">{{ terminalStatus.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: relative">
        <div
          ref="terminalContainer"
          id="terminal-container"
          style="width: 100%; height: 600px; scrollbar-width: 1px"
        ></div>
        <TerminalSearch
          ref="terminalSearch"
          @close="searchClose"
          @find="findWords"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { Terminal } from '@xterm/xterm'
import { SearchAddon } from '@xterm/addon-search'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { CanvasAddon } from '@xterm/addon-canvas'
import { WebglAddon } from '@xterm/addon-webgl'
import { copyToClipboard, getClipboardText } from '@/utils/common'
import {
  FONT_FAMILY,
  THEME,
  THEME_NAME,
  CLIENT_PROTOCOL,
  WS_PROTOCOL,
  TERMINAL_STATUS,
} from '@/enum/terminal'
import TerminalSearch from './TerminalSearch.vue'
//终端容器
const terminalContainer = ref(null)
//终端对象
const terminal = ref(null)
//是否全屏
const isFullscreen = ref(false)
//搜索
const terminalSearch = ref()

//状态信息颜色
const terminalStatus = reactive({
  value: null,
  color: '',
  label: '',
})
// 全屏按钮点击的回调
const fullScreen = () => {
  const terminalViewTarget = document.getElementById('terminal-view')
  if (!isFullscreen.value) {
    // 进入全屏模式
    if (terminalViewTarget.requestFullscreen) {
      terminalContainer.value.style.height = '98vh'
      terminalViewTarget.requestFullscreen()
    } else if (terminalViewTarget.webkitRequestFullscreen) {
      // Safari 浏览器
      terminalViewTarget.webkitRequestFullscreen()
    } else if (terminalViewTarget.msRequestFullscreen) {
      // IE 浏览器
      terminalViewTarget.msRequestFullscreen()
    }
    isFullscreen.value = true
  } else {
    // 退出全屏模式
    if (document.exitFullscreen) {
      terminalContainer.value.style.height = '70vh'
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      // Safari 浏览器
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      // IE 浏览器
      document.msExitFullscreen()
    }
    isFullscreen.value = false
  }
}

//去顶部
const jumpToTop = () => {
  terminal.value.scrollToTop()
  terminal.value.focus()
}

//去底部
const jumpToBottom = () => {
  terminal.value.scrollToBottom()
  terminal.value.focus()
}

//清空
const clear = () => {
  terminal.value.clear()
  terminal.value.clearSelection()
  terminal.value.focus()
}

//全选
const selectAllText = () => {
  terminal.value.selectAll()
  terminal.value.focus()
}

//字体大小变化
const fontSizeEdit = (size: number) => {
  console.log(terminal.value)
  const currentFontSize = terminal.value?.options.fontSize
  console.log('当前字体大小:', currentFontSize)
  terminal.value.options.fontSize = currentFontSize + size
  //更新终端大小
  fitTerminal()
}
//打开搜索
const search = () => {
  //打开搜索框
  terminalSearch.value.open()
}

const searchClose = () => {
  //关闭搜索框
  terminal.value?.focus()
}

// 查询关键字
const findWords = (word: string, next: boolean, options: any) => {
  let res
  if (next) {
    res = data.plugin.search?.findNext(word, options)
  } else {
    res = data.plugin.search?.findPrevious(word, options)
  }
  if (!res) {
    ElMessage.info({ message: '未查询到匹配项' })
  }
}

//复制选择的内容
const copy = () => {
  copyToClipboard(terminal.value.getSelection().trim())
  terminal.value.clearSelection()
  terminal.value.focus()
}

//粘贴
const paste = () => {
  getClipboardText().then((clipText) => {
    terminal.value.paste(clipText)
    terminal.value.focus()
  })
}

/**
 * 默认配置
 */
const options = {
  rendererType: 'canvas', //渲染类型
  convertEol: true, // 启用时，光标将设置为下一行的开头
  scrollback: 100, // 终端中的回滚量
  cols: 80, //终端的列数 为了同步后端的默认终端行数和列数
  rows: 24, //终端的行数
  disableStdin: false, // 是否应禁用输入。
  cursorBlink: true, // 光标闪烁
  cursorStyle: 'bar', //光标样式
  cursorBlink: true, //光标闪烁
  fastScrollModifier: 'shift',
  fontSize: 14, //字体大小
  lineHeight: 1.4, //字体行高
  fontFamily: 'Courier New',
}

//同步行数和列数
const fitTerminal = () => {
  const dimensions = data.plugin.fit && data.plugin.fit.proposeDimensions()
  if (!dimensions) {
    return
  }
  if (dimensions?.cols && dimensions?.rows) {
    //重置终端大小
    terminal.value.resize(dimensions.cols, dimensions.rows)

    // 获取焦点
    terminal.value.focus()
  }
}

const data = reactive({
  client: null,
  plugin: {
    fit: null,
    search: null,
    links: null,
    attachAddon: null,
    canvas: null,
    webgl: null,
  },
  pingThread: null,
  accessToken: null,
  enableWebLink: null,
  options: { ...options },
  visibleRightMenu: false,
})

onMounted(() => {
  //获取终端容器dom
  const container = terminalContainer.value
  //设置终端主题、字体
  options.theme = THEME[THEME_NAME.ATOM_DARK]
  options.fontFamily = FONT_FAMILY.COURIER_NEW
  //设置终端滚动条的颜色
  // 动态设置滚动条颜色
  container.style.scrollbarColor = `${options.theme.foreground} transparent`
  nextTick(() => {
    // 打开terminal
    terminal.value = new Terminal(options)
    terminal.value.open(container)

    // 注册自适应组件
    data.plugin.fit = new FitAddon()
    terminal.value.loadAddon(data.plugin.fit)

    // 注册 url link组件
    // if (data.enableWebLink === 1) {
    //   data.plugin.links = new WebLinksAddon()
    //   terminal.value.loadAddon(data.plugin.links)
    // }

    // 注册搜索组件
    data.plugin.search = new SearchAddon()
    terminal.value.loadAddon(data.plugin.search)

    // canvas 渲染插件
    data.plugin.canvas = new CanvasAddon()
    terminal.value.loadAddon(data.plugin.canvas)

    // WebGL 渲染插件
    // data.plugin.webgl = new WebglAddon(true);
    // terminal.value.loadAddon(data.plugin.webgl)

    fitTerminal()

    initSocket()
  })
})

const initSocket = () => {
  setTerminalStatus(TERMINAL_STATUS.NOT_CONNECT)
  // 打开websocket
  data.client = new WebSocket('ws://127.0.0.1:8080/system/websocket/message')
  data.client.onopen = (event) => {
    const body = `${CLIENT_PROTOCOL.CONNECT}|${terminal.value.cols}|${terminal.value.rows}|token`
    // 调用 WebSocket 实例的 onSend 方法发送数据
    data.client.send(body)
  }
  data.client.onerror = (event) => {
    setTerminalStatus(TERMINAL_STATUS.ERROR)
    ElMessage.error('当前会话无法连接')
    terminal.value.write(
      '\r\n\x1b[91mcurrent session cannot be connected\x1b[0m',
    )
  }
  data.client.onclose = (event) => {
    setTerminalStatus(TERMINAL_STATUS.DISCONNECTED)
    terminal.value.write('\r\n\x1b[91m' + e.reason + '\x1b[0m')
    terminal.value.setOption('cursorBlink', false)
  }
  data.client.onmessage = ({ data: msg }) => {
    // 解析协议
    if (!terminal.value) {
      return
    }
    const code = msg.substring(0, 1)
    const len = msg.length
    console.log('后端发送的内容:', msg)
    switch (code) {
      case WS_PROTOCOL.OK:
        terminal.value.write(msg.substring(2, len))
        break
      case WS_PROTOCOL.CONNECTED:
        onConnected()
        break
      default:
        break
    }
  }
}

const setTerminalStatus = (status) => {
  terminalStatus.value = status.value
  terminalStatus.color = status.color
  terminalStatus.label = status.label
}

const onConnected = () => {
  setTerminalStatus(TERMINAL_STATUS.CONNECTED)
  // 注册 terminal 事件
  terminal.value.onResize((event) => sendResize(event.cols, event.rows))
  terminal.value.onData((event) => sendKey(event))
  // 注册窗口大小监听器
  window.addEventListener('resize', debounce(fitTerminal, 100))
  // 获取焦点
  // terminal.value.focus()
}

//同步后端终端行数和列数
const sendResize = (cols, rows) => {
  const body = `${CLIENT_PROTOCOL.RESIZE}|${cols}|${rows}`
  // 调用 WebSocket 实例的 onSend 方法发送数据
  data.client.send(body)
  console.log('向后端发送cols和rows:', cols, rows)
}

const sendKey = (content) => {
  console.log('向后端发送的内容:', content)
  const body = `${CLIENT_PROTOCOL.KEY}|${content}`
  // 调用 WebSocket 实例的 onSend 方法发送数据
  data.client.send(body)
}

onBeforeUnmount(() => {
  if (terminal.value) {
    terminal.value.dispose()
  }
})
</script>

<style lang="scss" scoped>
.ssh-header-left::before {
  content: 'IP:';
  padding-right: 4px;
}
.ssh-header-left {
  color: aliceblue;
}
.ssh-header-right {
  display: flex;
}
.status {
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;
  width: 28px;
  height: 28px;
  border-radius: 6px;
}
.fenge {
  display: flex;
  align-items: center;
  margin: 0 2px;
  width: 28px;
  height: 28px;
}
.tool-button:hover {
  cursor: pointer;
  background-color: #3e4246;
}
</style>
