//定时任务调度日志相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取定时任务调度日志列表
  LIST_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/list`,
  //添加定时任务调度日志
  ADD_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/`,
  //删除定时任务调度日志
  DEL_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/`,
  //修改定时任务调度日志
  UPDATE_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/`,
  //获取定时任务调度日志信息
  INFO_SYS_JOB_LOG_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB_LOG}/info`,
}

/**
 * 获取定时任务调度日志列表
 * @param {Object} query - 查询条件
 */
// 查询定时任务调度日志列表
export const listLog = (query:any) => {
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
export const getLog = (jobLogId:any) => {
  return request({
    url: API.INFO_SYS_JOB_LOG_URL+jobLogId,
    method: 'get'
  })
}

/**
 * 新增定时任务调度日志
 * @param {Object} data - 定时任务调度日志信息
 */
// 新增定时任务调度日志
export const addLog = (data:any) => {
  return request({
    url: API.ADD_SYS_JOB_LOG_URL,
    method: 'post',
    data: data
  })
}

/**
 * 修改定时任务调度日志
 * @param {Object} data - 定时任务调度日志信息
 */
// 修改定时任务调度日志
export const updateLog = (data:any) => {
  return request({
    url: API.UPDATE_SYS_JOB_LOG_URL,
    method: 'put',
    data: data
  })
}

/**
 * 删除定时任务调度日志
 * @param {number} jobLogId - 任务日志ID
 */
// 删除定时任务调度日志
export const delLog = (jobLogId:any) => {
  return request({
    url: API.DEL_SYS_JOB_LOG_URL+jobLogId,
    method: 'delete'
  })
}
