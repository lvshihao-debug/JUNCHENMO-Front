//定时任务调度相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取定时任务调度列表
  LIST_SYS_JOB_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB}/list`,
  //添加定时任务调度
  ADD_SYS_JOB_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB}/`,
  //删除定时任务调度
  DEL_SYS_JOB_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB}/`,
  //修改定时任务调度
  UPDATE_SYS_JOB_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB}/`,
  //获取定时任务调度信息
  INFO_SYS_JOB_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_JOB}/info`,
}

/**
 * 获取定时任务调度列表
 * @param {Object} query - 查询条件
 */
// 查询定时任务调度列表
export const listJob = (query:any) => {
  return request({
    url: API.LIST_SYS_JOB_URL,
    method: 'get',
    params: query
  })
}

/**
 * 获取定时任务调度信息
 * @param {number} jobId - 任务ID
 */
// 查询定时任务调度详细
export const getJob = (jobId:any) => {
  return request({
    url: API.INFO_SYS_JOB_URL+jobId,
    method: 'get'
  })
}

/**
 * 新增定时任务调度
 * @param {Object} data - 定时任务调度信息
 */
// 新增定时任务调度
export const addJob = (data:any) => {
  return request({
    url: API.ADD_SYS_JOB_URL,
    method: 'post',
    data: data
  })
}

/**
 * 修改定时任务调度
 * @param {Object} data - 定时任务调度信息
 */
// 修改定时任务调度
export const updateJob = (data:any) => {
  return request({
    url: API.UPDATE_SYS_JOB_URL,
    method: 'put',
    data: data
  })
}

/**
 * 删除定时任务调度
 * @param {number} jobId - 任务ID
 */
// 删除定时任务调度
export const delJob = (jobId:any) => {
  return request({
    url: API.DEL_SYS_JOB_URL+jobId,
    method: 'delete'
  })
}
