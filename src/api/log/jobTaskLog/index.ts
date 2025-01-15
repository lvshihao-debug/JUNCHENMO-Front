//定时任务调度日志相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取定时任务调度日志列表
  LIST_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/list`,
  //删除定时任务调度日志
  DEL_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/`,
  //获取定时任务调度日志信息
  INFO_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/info`,
  //清空定时任务调度日志
  CLEAR_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/clear`,
}

/**
 * 获取定时任务调度日志列表
 * @param {Object} query - 查询条件
 */
// 查询定时任务调度日志列表
export const listTaskLog = (query:any) => {
  return request({
    url: API.LIST_SYS_JOB_LOG_URL,
    method: 'get',
    params: query
  })
}

/**
 * 获取定时任务调度日志信息
 * @param {number} jobLogId - 任务日志ID
 */
// 查询定时任务调度日志详细
export const getTaskLog = (jobLogId:any) => {
  return request({
    url: API.INFO_SYS_JOB_LOG_URL+jobLogId,
    method: 'get'
  })
}


/**
 * 删除定时任务调度日志
 * @param {number} jobLogId - 任务日志ID
 */
// 删除定时任务调度日志
export const delTaskLog = (jobLogId:any) => {
  return request({
    url: API.DEL_SYS_JOB_LOG_URL+jobLogId,
    method: 'delete'
  })
}

/**
 * 清空定时任务调度日志
 */
export const clearTaskLog = () =>
  request<any>({
    method: 'delete',
    url: API.CLEAR_URL,
  })
