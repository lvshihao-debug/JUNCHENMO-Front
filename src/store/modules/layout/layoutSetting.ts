//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { reqUserSettingInfo, reqUpUserSettinInfo } from '@/api/userSetting'
//创建用户小仓库
const useSettinggStore = defineStore('SettinggStore', {
  state: () => {
    return {
      refsh: false, //刷新按钮点击状态
      settingDrawer: false, //抽屉展开或收起状态
      fold: false, //menu展开或者收起状态
      setting: {
        size: '20', //数据默认条数设置
        theme: 0, //主题是否是暗黑模式还是白天模式
        themeColor: 'red', //主题颜色
        navigationBar: true, //顶部导航栏是否展示
        tabs: true, //tabs是否展示
        tabsIcon: true, //tabs图标是否展示
        breadcrumb: true, //面包屑是否展示
        menu: true, //菜单是否展示
        topMenu: false, //顶部菜单栏是否展示
        copyright: true, //版权内容是否展示
        watermark: true, //用户水印是否展示
        weakColor: false, //弱色模式
        grayscale: false, //黑白模式
        blur: false, //高斯模糊
        contrast: false, //对比度降低
        hueRotate: false, //色相旋转
        saturate: false, //饱和度
        dataLoading: true, //是否开数据加载动画
      },
    }
  },
  actions: {
    //获取用户设置信息
    async userSettingInfo() {
      const result: any = await reqUserSettingInfo()
      if (result.code == 200) {
        this.setting.theme = result.data.theme
        this.setting.themeColor = result.data.themeColor
        this.setting.navigationBar = result.data.navigationBar
        this.setting.tabs = result.data.tabs
        this.setting.tabsIcon = result.data.tabsIcon
        this.setting.breadcrumb = result.data.breadcrumb
        this.setting.menu = result.data.menu
        this.setting.topMenu = result.data.topMenu
        this.setting.copyright = result.data.copyright
        this.setting.watermark = result.data.watermark
        this.setting.weakColor = result.data.weakColor
        this.setting.grayscale = result.data.grayscale
        this.setting.blur = result.data.blur
        this.setting.contrast = result.data.contrast
        this.setting.hueRotate = result.data.hueRotate
        this.setting.saturate = result.data.saturate
        this.setting.dataLoading = result.data.dataLoading
        this.setting.size = result.data.size + ''
        nextTick(() => {
          this.setThemeColor(this.setting.themeColor)
          this.setWeakColor()
          this.setGrayscale()
          this.setBlur()
          this.setContrast()
          this.setHueRotate()
          this.setSaturate()
        })
        return Promise.resolve()
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
    async setThemeColor(color: string) {
      const body = document.querySelector('body')
      this.setting.themeColor = color
      body?.style.setProperty('--lvshihao-theme-color', color)
    },
    async getThemeColor() {
      const body = document.querySelector('body')
      return body?.style.getPropertyValue('--lvshihao-theme-color')
    },

    async setWeakColor() {
      const body = document.querySelector('body')
      if (this.setting.weakColor) {
        body?.style.setProperty('--lvshihao-theme-filter-invert', '100%')
      } else {
        body?.style.setProperty('--lvshihao-theme-filter-invert', '0%')
      }
    },
    async setGrayscale() {
      const body = document.querySelector('body')
      if (this.setting.grayscale) {
        body?.style.setProperty('--lvshihao-theme-filter-grayscale', '100%')
      } else {
        body?.style.setProperty('--lvshihao-theme-filter-grayscale', '0%')
      }
    },
    async setBlur() {
      const body = document.querySelector('body')
      if (this.setting.blur) {
        body?.style.setProperty('--lvshihao-theme-filter-blur', '2px')
      } else {
        body?.style.setProperty('--lvshihao-theme-filter-blur', '0px')
      }
    },
    async setContrast() {
      const body = document.querySelector('body')
      if (this.setting.contrast) {
        body?.style.setProperty('--lvshihao-theme-filter-contrast', '75%')
      } else {
        body?.style.setProperty('--lvshihao-theme-filter-contrast', '100%')
      }
    },
    async setHueRotate() {
      const body = document.querySelector('body')
      if (this.setting.hueRotate) {
        body?.style.setProperty('--lvshihao-theme-filter-hueRotate', '80deg')
      } else {
        body?.style.setProperty('--lvshihao-theme-filter-hueRotate', '0deg')
      }
    },
    async setSaturate() {
      const body = document.querySelector('body')
      if (this.setting.saturate) {
        body?.style.setProperty('--lvshihao-theme-filter-saturate', '180%')
      } else {
        body?.style.setProperty('--lvshihao-theme-filter-saturate', '100%')
      }
    },
  },
  getters: {
    getThemeStatus: (state) => {
      const html = document.documentElement
      if (state.setting.theme == 0) {
        html.className = ''
        return true
      } else if (state.setting.theme == 1) {
        html.className = 'dark'
        return false
      } else {
        const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
        if (themeMedia.matches) {
          html.className = ''
          return true
        } else {
          html.className = 'dark'
          return false
        }
      }
    },
    getThemeValue: (state) => {
      if (state.setting.theme == 0) {
        return true
      } else if (state.setting.theme == 1) {
        return false
      } else {
        const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
        if (themeMedia.matches) {
          return true
        } else {
          return false
        }
      }
    },
    getTheme: (state) => {
      return state.setting.theme == 0 ? 'white' : 'black'
    },
    getThemeInvert: (state) => {
      return state.setting.theme == 0 ? 'black' : 'white'
    },
  },
})

//对外暴露获取小仓库的方法
export default useSettinggStore
