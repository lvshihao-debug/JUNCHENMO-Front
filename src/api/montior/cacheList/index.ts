//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //根据RedisKey获取Rediss缓存数据列表
  CACHE_LIST_REDIS_KEYS_LIST_URL : `${API_ENUM.SERVER_MODE_NAME.SYSTEM_CACHE_LIST}/getRedisKeys`,
}


//获取Redis缓存数据列表
export const reqRedisKeysList = (data: any) =>
  request<any>({
    method: 'get',
    url: API.CACHE_LIST_REDIS_KEYS_LIST_URL,
    params: {"keyName":data}
})

