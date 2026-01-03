//系统访问记录相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取系统访问记录列表
  LIST_SYS_LOGININFOR_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_LOGININFOR}/list`,
  //删除系统访问记录
  DEL_SYS_LOGININFOR_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_LOGININFOR}/`,
  //清空系统访问记录
  CLEAR_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_LOGININFOR}/clear`,
}

/**
 * 获取系统访问记录列表
 * @param {Object} query - 查询条件
 */
// 查询系统访问记录列表
export const listLogininfor = (query: any) => {
  return request({
    url: API.LIST_SYS_LOGININFOR_URL,
    method: 'get',
    params: query,
  })
}

/**
 * 删除系统访问记录
 * @param {number} infoId - 访问ID
 */
// 删除系统访问记录
export const delLogininfor = (infoId: any) => {
  return request({
    url: API.DEL_SYS_LOGININFOR_URL + infoId,
    method: 'delete',
  })
}

/**
 * 清空操作日志的接口
 */
export const clearLogininfor = () =>
  request<any>({
    method: 'delete',
    url: API.CLEAR_URL,
  })
