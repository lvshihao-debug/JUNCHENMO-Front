//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //根据缓存名称获取缓存键名列表
  CACHE_LIST_REDIS_KEYS_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_CACHE_LIST}/getRedisKeys`,
  //根据缓存键名获取缓存数据
  CACHE_LIST_REDIS_KEY_DATA_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_CACHE_LIST}/getRedisKeyData`,
  //根据缓存名称删除所有缓存
  CACHE_DELETE_REDIS_KEYS_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_CACHE_LIST}/deleteCacheName`,
  //更具缓存键名删除当前缓存
  CACHE_DELETE_REDIS_KEY_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_CACHE_LIST}/deleteCacheKey`,
}


//获取Redis缓存key列表
export const reqRedisKeysList = (data: any) =>
  request<any>({
    method: 'get',
    url: API.CACHE_LIST_REDIS_KEYS_LIST_URL,
    params: {"cacheName":data}
})

//根据key键名获取Redis缓存数据
export const reqRedisKeyData = (data: any) =>
  request<any>({
    method: 'get',
    url: API.CACHE_LIST_REDIS_KEY_DATA_URL,
    params: {"keyName":data}
})

//根据缓存名称删除所有缓存
export const reqRedisDelKeys = (data: any) =>
  request<any>({
    method: 'delete',
    url: API.CACHE_DELETE_REDIS_KEYS_URL,
    params: {"cacheName":data}
})

//更具缓存键名删除当前缓存
export const reqRedisDelKey = (data: any) =>
  request<any>({
    method: 'delete',
    url: API.CACHE_DELETE_REDIS_KEY_URL,
    params: {"keyName":data}
})

