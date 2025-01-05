//统一管理项目用户相关的接口
import request from '@/utils/request'
import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //生成的表的列表
  LIST_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/list`,
  //预览
  PREVIEW_CODE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/preview/`,
  //删除生成的表
  DEL_GEN_TABLE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/`,
  //生成表
  DB_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/db/list`,
  IMPORT_TABLE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/importTable`,
}



/**
 * 获取生成表列表
 * @param {Object} query - 查询条件
 * @param {number} pageNum - 当前页码
 * @param {number} pageSize - 每页数量
 */
export const genList = (
  query: any
) =>
  request({
    method: 'get',
    url: API.LIST_URL,
    params: query
  })

/**
 * 获取没有导入的表
 */
export const DBList = (genTable:any) =>
    request<any>({
      method: 'get',
      url: API.DB_LIST_URL,
      params: genTable,
})
/**
 * 导入表
 */
export const importTable = (tables:any) =>
  request<any>({
    method: 'post',
    url: API.IMPORT_TABLE_URL,
    params: tables,
})

/**
 * 预览表生成的代码
 */
export const previewCode = (tableId:any) =>
  request<any>({
    method: 'get',
    url: API.PREVIEW_CODE_URL+ tableId,
})

/**
 * 删除用户
 * @param userId 用户Id
 */
export const delGenCode = (userIds: any) =>
  request<any>({
    method: 'delete',
    url: API.DEL_GEN_TABLE_URL,
    data: userIds
})


