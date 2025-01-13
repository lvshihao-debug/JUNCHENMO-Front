//统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  logoutResponseData,
  userInfoReponseData,
  userListRep,
} from './type'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取图像验证码
  CODE_URL: '/code',
  //登录
  LOGIN_URL: `${API_ENUM.SERVER_NAME.AUTH}/login`,
  //登出
  LOGOUT_URL: `${API_ENUM.SERVER_NAME.AUTH}/logout`,
  //添加用户
  ADD_USER_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //删除用户
  DEL_USER_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //修改用户
  UPDATE_USER_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/`,
  //获取用户列表
  LIST_USER_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/list`,
  //获取用户信息
  INFO_USER_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/getInfo`,
  //修改用户状态
  UPDATE_USER_STATUS_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/changeStatus`,
  //修改用户密码
  UPDATE_USER_PASSWORD_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/changePassword`,
  //用户授权角色
  UPDATE_AUTH_ROLE_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/authRole`,
  //获取用户选择框列表
  USER_OPTION_SELECT_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_USER}/optionSelect`,
}

/**
 * 获取验证码
 */
export const reqCode = () =>
  request<any>({
    method: 'get',
    url: API.CODE_URL,
  })

/**
 * 登录接口
 * @param data 登录数据
 */
export const reqLogin = (data: loginFormData) =>
  request<any>({
    method: 'post',
    url: API.LOGIN_URL,
    data,
  })

/**
 * 退出登录
 */
export const reqLogout = () =>
  request<logoutResponseData>({
    method: 'delete',
    url: API.LOGOUT_URL,
  })

/**
 * 添加用户
 * @param data 用户数据
 */
export const addUser = (data: any) =>
  request<any>({
    method: 'post',
    url: API.ADD_USER_URL,
    data,
  })

/**
 * 删除用户
 * @param userId 用户Id
 */
export const delUser = (userId: any) =>
  request<any>({
    method: 'delete',
    url: API.DEL_USER_URL + '/' + userId,
  })

/**
 * 修改用户
 * @param data 用户数据
 */
export const updateUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.UPDATE_USER_URL,
    data,
  })

/**
 * 获取用户列表
 * @param {Object} query - 查询条件
 * @param {number} pageNum - 当前页码
 * @param {number} pageSize - 每页数量
 */
export const userList = (query: any) =>
  request<userListRep>({
    method: 'get',
    url: API.LIST_USER_URL,
    params: query,
  })

/**
 * 获取用户信息
 */
export const reqUserInfo = () =>
  request<userInfoReponseData>({
    method: 'get',
    url: API.INFO_USER_URL,
  })

/**
 * 修改用户的状态
 * @param data 用户数据
 */
export const reqUpStatusUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.UPDATE_USER_STATUS_URL,
    data,
  })

/**
 * 修改用户的密码
 * @param data 用户数据
 */
export const reqUpPasswordUser = (data: any) =>
  request<any>({
    method: 'put',
    url: API.UPDATE_USER_PASSWORD_URL,
    data,
  })

/**
 * 分配用户选择的角色
 * @param {any} data - 用户id和角色id集合
 */
export const reqAuthRole = (data: any) =>
  request<any>({
    method: 'put',
    url: API.UPDATE_AUTH_ROLE_URL,
    params: data,
  })

/**
 * 获取没有被禁用的全部用户列表的接口
 */
export const optionSelect = () =>
  request<any>({
    method: 'get',
    url: API.USER_OPTION_SELECT_URL,
  })
