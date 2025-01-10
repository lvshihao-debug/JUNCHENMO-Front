import { createApp } from 'vue'
import { download } from '@/utils/request'
import { copyText,resetObj,addDateRange,addPage,assign } from './utils/common.ts';
import downloadZip from './utils/downloadZip.ts';

import router from '@/router'
import App from '@/App.vue'
import pinia from '@/store'

import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
VxeUITable.use(VXETablePluginElement)
//配置ElementUIDark样式
import 'element-plus/theme-chalk/dark/css-vars.css'
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
// 全局注册自定义组件的插件
app.use(gloablComponent)
app.config.globalProperties.$copyText = copyText;
app.config.globalProperties.$resetObj = resetObj;
app.config.globalProperties.$download = download;
app.config.globalProperties.$downloadZip = downloadZip;
app.config.globalProperties.$addDateRange = addDateRange;
app.config.globalProperties.$addPage = addPage;
app.config.globalProperties.$assign = assign;
app.mount('#app')

