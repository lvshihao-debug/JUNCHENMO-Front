//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {reqRedisKeysList
} from '@/api/montior/cacheList'

//创建角色小仓库
const useCacheListStore = defineStore('cacheList', {
  state: () => {
    return {
        dictData:[],
        KeysData:[]
    }
  },
  actions: {
     //根据Redis的key获取数据
     async getKeyCacheList(keyName: String) {
      //登录请求
      const result = await reqRedisKeysList(keyName)
      if (result.code == 200) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useCacheListStore
