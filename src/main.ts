import { createApp } from 'vue'
//工具类
import { download } from '@/utils/request'
import { copyText,resetObj,addDateRange,addPage,assign } from './utils/common.ts';
import { loadDictDataByName } from './utils/dict.ts';
import downloadZip from './utils/downloadZip.ts';

//路由、应用、pinia
import router from '@/router'
import App from '@/App.vue'
import pinia from '@/store'

//vxe-table
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
VxeUITable.use(VXETablePluginElement)

//Element plus
//配置ElementUIDark样式
import 'element-plus/theme-chalk/dark/css-vars.css'

//terminal
import { createTerminal } from 'vue-web-terminal';
import type { VueWebTerminal } from 'vue-web-terminal'
//  导出css文件内容
import ceshi1 from '@/styles/terminals/ceshi.css?inline';
const terminal:VueWebTerminal = createTerminal()
terminal.configTheme('ceshi1', ceshi1);



//配置路由守卫（鉴权+进度条）
import '@/router/permission'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//配置全局自定义组件
import gloablComponent from '@/components/index'
//配置全局scss样式
import '@/styles/index.scss'
import 'animate.css';
// main.ts
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VxeUITable)
app.use(terminal)
// 全局注册自定义组件的插件
app.use(gloablComponent)
app.config.globalProperties.$copyText = copyText;
app.config.globalProperties.$resetObj = resetObj;
app.config.globalProperties.$download = download;
app.config.globalProperties.$downloadZip = downloadZip;
app.config.globalProperties.$addDateRange = addDateRange;
app.config.globalProperties.$addPage = addPage;
app.config.globalProperties.$assign = assign;
app.config.globalProperties.$loadDictDataByName = loadDictDataByName;
app.mount('#app')

