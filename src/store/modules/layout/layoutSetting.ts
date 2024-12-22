//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqUserSettingInfo,
  reqUpUserSettinInfo
} from '@/api/userSetting'
//创建用户小仓库
const useSettinggStore = defineStore('SettinggStore', {
  state: () => {
    return {
      refsh: false, //刷新按钮点击状态
      settingDrawer: false, //抽屉展开或收起状态
      fold: false, //menu展开或者收起状态
      theme: true, //主题是否是暗黑模式还是白天模式
      themeColor: "red", //主题颜色
      size: "20", //数据默认条数设置
      tabs: true, //tabs是否展示
      navigationBar: true, //顶部导航栏是否展示
      menu: true, //菜单是否展示
      weakColor:false, //弱色模式
      grayscale:false, //黑白模式
      breadcrumb: true, //面包屑是否展示
      copyright: true, //版权内容是否展示 
    }
  },
  actions: {
   //获取用户设置信息
   async userSettingInfo() {
    const result:any = await reqUserSettingInfo()
    if (result.code == 200) {
      console.log(result)
      nextTick(() => {
        this.theme = result.data.theme
        this.themeColor = result.data.themeColor
        this.size = result.data.size + ""
        this.tabs = result.data.tabs
        this.menu = result.data.menu
        this.breadcrumb = result.data.breadcrumb
        this.navigationBar = result.data.navigationBar
        this.copyright = result.data.copyright
      })
      return Promise.resolve('ok')
    } else {
      return Promise.reject(result.msg)
    }
  },
  //修改用户设置信息
  async upUserSettinInfo(data: any) {
    const result: any = await reqUpUserSettinInfo(data)
    if (result.code == 200) {
      return result
    } else {
      return Promise.reject(result.msg)
    }
  },

  },
  getters: {
    getTheme: (state) => {
      return state.theme?"white":"black"
    },
    getThemeInvert: (state) => {
      return state.theme?"black":"white"
    }
  },
})

//对外暴露获取小仓库的方法
export default useSettinggStore
