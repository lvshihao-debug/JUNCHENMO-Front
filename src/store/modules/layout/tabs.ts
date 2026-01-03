//创建用户相关的小仓库
import { defineStore } from 'pinia'
//创建用户相关的小仓库
import type { Tag } from '../types/tabsType'
//创建用户小仓库
const useTabsStore = defineStore('Tabs', {
  state: () => {
    return {
      tabs: [
        {
          title: '首页',
          closable: false,
          path: '/home',
          checked: true,
          icon: 'home',
        },
      ] as any,
      actionName: undefined || '',
    }
  },
  actions: {
    //初始化Tabs刷新进去的Tab
    initTabs($router: any, route: any) {
      //如果大于一个tab
      if (this.tabs.length > 1) {
        //进入当前路由
        $router.push(route.path)
      } else {
        //进入首页
        $router.push(this.tabs[0].path)
      }
    },
    //添加Tag
    addTab(tag: Tag, $router: any, type: string) {
      //全部变为未选择灰色
      this.tabNotSelected()
      if (this.exitsTab(tag)) {
        this.tabSelected(tag)
      } else {
        this.tabs.push(tag)
      }
      if (type === 'add') {
        $router.push(tag.path)
      }
      this.actionName = tag.title
    },
    //关闭标签
    removeTab(menuTag: Tag, $router: any) {
      if (!menuTag.checked) {
        this.tabs = this.tabs.filter((tag: Tag) => tag.path != menuTag.path)
      } else {
        this.tabs = this.tabs.filter((tag: Tag) => tag.path != menuTag.path)
        //全部变为未选择灰色
        this.tabNotSelected()
        const tabLast = this.tabs[this.tabs.length - 1]
        this.tabSelected(tabLast)
        $router.push(tabLast.path)
        this.actionName = tabLast.title
      }
    },
    //关闭其他标签
    removeOutherTab(currentTagPath: string) {
      this.tabs = this.tabs.filter(
        (tag: Tag) => tag.path == currentTagPath || tag.closable == false,
      )
      //TODO：偷个懒直接定位到第一个首页，因为固定标签一般不会很多，默认只有一个
      this.actionName = this.tabs[0].title
    },
    //关闭所有标签
    removeAllTab($router: any) {
      this.tabs = this.tabs.filter((tag: Tag) => tag.closable == false)
      const tabLast = this.tabs[this.tabs.length - 1]
      this.tabSelected(tabLast)
      $router.push(tabLast.path)
      //TODO：偷个懒直接定位到第一个首页，因为固定标签一般不会很多，默认只有一个
      this.actionName = this.tabs[0].title
    },
    //关闭左侧所有标签
    removeAllLeftTab(currentTagPath: string) {
      const currentIndex = this.tabs.findIndex(
        (tag: Tag) => tag.path == currentTagPath,
      )
      console.log(this.tabs.slice(0, currentIndex))
      const leftTabs = this.tabs
        .slice(0, currentIndex)
        .filter((tag: Tag) => tag.closable == false)
      this.tabs = leftTabs.concat(this.tabs.slice(currentIndex))
      this.actionName = this.tabs[0].title
      this.actionName = this.tabs[leftTabs.length - 1].title
    },
    //关闭左侧所有标签
    removeAllRightTab(currentTagPath: string) {
      const currentIndex = this.tabs.findIndex(
        (tag: Tag) => tag.path == currentTagPath,
      )
      const rightTabs = this.tabs
        .slice(currentIndex)
        .filter((tag: Tag) => tag.closable == false)
      this.tabs = this.tabs.slice(0, currentIndex + 1).concat(rightTabs)
      // this.actionName =this.tabs[0].title
      this.actionName = this.tabs[currentIndex].title
    },
    //判断当前是否已经添加了Tag
    exitsTab(menuTag: Tag) {
      let include = false
      this.tabs.some((tab: any) => {
        if (menuTag.path == tab.path) {
          include = true
        }
      })
      return include
    },
    //点击Tag进行路由
    routerTab(menuTag: Tag, $router: any) {
      //全部变为未选择灰色
      this.tabNotSelected()
      this.tabSelected(menuTag)
      $router.push(menuTag.path)
      this.actionName = menuTag.title
    },
    //Tag全部设置为没有点击状态
    tabNotSelected() {
      this.tabs.some((tab: any) => {
        tab.checked = false
      })
    },
    //设置Tag为选择状态
    tabSelected(menuTag: Tag) {
      this.tabs.some((tab: any) => {
        if (menuTag.path === tab.path) {
          tab.checked = true
        }
      })
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useTabsStore
