import SvgIcon from './svg-icon/index.vue'
import JcmIconSelect from './JcmIconSelect/index.vue'
import Copyright from './copyright/index.vue'
import GrantTable from './grant-table/index.vue'
import Editor from './editor/index.vue'
import JsonEditor from './json-editor/modal/index.vue'
import JcmsButton from './JcmButton/index.vue'
import JcmInfoCard from './JcmInfoCard/index.vue'
import Loading from './loading/index.vue'
import LayoutIcon from './layoutIcon/index.vue'
import JcmiFrame from './JcmiFrame/index.vue'
import JcmBarChat from './JcmBarChat/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon,JcmIconSelect,Copyright,GrantTable,Editor,JsonEditor,JcmsButton,Loading,LayoutIcon,JcmiFrame,JcmInfoCard,JcmBarChat}
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  //注册项目全部的全局组件
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
