//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqRedisKeysList,
  reqRedisKeyData,
  reqRedisDelKeys,
  reqRedisDelKey,
} from '@/api/montior/cacheList'

//创建角色小仓库
const useCacheListStore = defineStore('cacheList', {
  state: () => {
    return {
      dictData: [],
      cacheNameData: [],
      viewData: {
        cacheName: '',
        cachekeyName: '',
        context: '',
      },
    }
  },
  actions: {
    //根据Redis的缓存名称获取Redis所有key数据
    async getKeyCacheList(keyName: string) {
      //登录请求
      const result = await reqRedisKeysList(keyName)
      if (result.code == 200) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
    //根据Redis的key获取数据详细值
    async getKeyDataCache(keyName: string) {
      //登录请求
      const result = await reqRedisKeyData(keyName)
      if (result.code == 200) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
    //删除Redis名称的所有Keys
    async deleteRedisKeys(data: any) {
      const result: any = await reqRedisDelKeys(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //删除Redis键名的Key
    async deleteRedisDelKey(data: any) {
      const result: any = await reqRedisDelKey(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useCacheListStore
