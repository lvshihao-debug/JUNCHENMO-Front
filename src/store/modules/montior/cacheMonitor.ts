//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { reqRedisBaseInfo, reqRedisInfo } from '@/api/montior/cacheMonitor'

//创建角色小仓库
const useCacheMonitorStore = defineStore('cacheMonitor', {
  state: () => {
    return {
      loading: true, //数据加载loading
      baseInfo: undefined,
      info: undefined,
    }
  },
  actions: {
    async getCacheBaseInfo() {
      //登录请求
      const result = await reqRedisBaseInfo()
      if (result.code == 200) {
        this.baseInfo = result.data
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
    async getCacheInfo() {
      //登录请求
      const result = await reqRedisInfo()
      if (result.code == 200) {
        this.info = result.data
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useCacheMonitorStore
