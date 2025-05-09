//用户任务相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取用户任务列表
  LIST_SYS_USER_TASK_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_USER_TASK}/list`,
  //添加用户任务
  ADD_SYS_USER_TASK_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_USER_TASK}/`,
  //删除用户任务
  DEL_SYS_USER_TASK_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_USER_TASK}/`,
  //修改用户任务
  UPDATE_SYS_USER_TASK_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_USER_TASK}/`,
  //获取用户任务信息
  INFO_SYS_USER_TASK_URL: `${API_ENUM.SERVER_MODE_NAME.SYS_USER_TASK}/info`,
}

/**
 * 获取用户任务列表
 * @param {Object} query - 查询条件
 */
// 查询用户任务列表
export const listTask = (query:any) => {
  return request({
    url: API.LIST_SYS_USER_TASK_URL,
    method: 'get',
    params: query
  })
}

/**
 * 获取用户任务信息
 * @param {number} taskId - 任务ID，主键
 */
// 查询用户任务详细
export const getTask = (taskId:any) => {
  return request({
    url: API.INFO_SYS_USER_TASK_URL+taskId,
    method: 'get'
  })
}

/**
 * 新增用户任务
 * @param {Object} data - 用户任务信息
 */
// 新增用户任务
export const addTask = (data:any) => {
  return request({
    url: API.ADD_SYS_USER_TASK_URL,
    method: 'post',
    data: data
  })
}

/**
 * 修改用户任务
 * @param {Object} data - 用户任务信息
 */
// 修改用户任务
export const updateTask = (data:any) => {
  return request({
    url: API.UPDATE_SYS_USER_TASK_URL,
    method: 'put',
    data: data
  })
}

/**
 * 删除用户任务
 * @param {number} taskId - 任务ID，主键
 */
// 删除用户任务
export const delTask = (taskId:any) => {
  return request({
    url: API.DEL_SYS_USER_TASK_URL+taskId,
    method: 'delete'
  })
}
