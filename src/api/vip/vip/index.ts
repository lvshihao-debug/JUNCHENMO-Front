//vip相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取vip列表
  LIST_TX_VIP_URL: `${API_ENUM.SERVER_MODE_NAME.TX_VIP}/list`,
  //添加vip
  ADD_TX_VIP_URL: `${API_ENUM.SERVER_MODE_NAME.TX_VIP}/`,
  //删除vip
  DEL_TX_VIP_URL: `${API_ENUM.SERVER_MODE_NAME.TX_VIP}/`,
  //修改vip
  UPDATE_TX_VIP_URL: `${API_ENUM.SERVER_MODE_NAME.TX_VIP}/`,
  //获取vip信息
  INFO_TX_VIP_URL: `${API_ENUM.SERVER_MODE_NAME.TX_VIP}/info`,
}

/**
 * 获取vip列表
 * @param {Object} query - 查询条件
 */
// 查询vip列表
export const listVip = (query: any) => {
  return request({
    url: API.LIST_TX_VIP_URL,
    method: 'get',
    params: query,
  })
}

/**
 * 获取vip信息
 * @param {number} vipId - 会员id
 */
// 查询vip详细
export const getVip = (vipId: any) => {
  return request({
    url: API.INFO_TX_VIP_URL + vipId,
    method: 'get',
  })
}

/**
 * 新增vip
 * @param {Object} data - vip信息
 */
// 新增vip
export const addVip = (data: any) => {
  return request({
    url: API.ADD_TX_VIP_URL,
    method: 'post',
    data: data,
  })
}

/**
 * 修改vip
 * @param {Object} data - vip信息
 */
// 修改vip
export const updateVip = (data: any) => {
  return request({
    url: API.UPDATE_TX_VIP_URL,
    method: 'put',
    data: data,
  })
}

/**
 * 删除vip
 * @param {number} vipId - 会员id
 */
// 删除vip
export const delVip = (vipId: any) => {
  return request({
    url: API.DEL_TX_VIP_URL + vipId,
    method: 'delete',
  })
}
