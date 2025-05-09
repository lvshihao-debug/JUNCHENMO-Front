//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { reqSystemBaseInfo } from '@/api/montior/systemMonitor'

//创建角色小仓库
const useSystemMonitorStore = defineStore('systemMonitor', {
  state: () => {
    return {
        loading: true, //数据加载loading
        baseInfo:undefined,
    }
  },
  actions: {
    async getSystemBaseInfo() {
      //登录请求
      const result = await reqSystemBaseInfo()
      if (result.code == 200) {
        this.baseInfo=result.data
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    }
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useSystemMonitorStore
