//统一管理项目用户相关的接口
import request from '@/utils/request'
import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //生成的表的列表
  LIST_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/list`,
  //获取修改表的表信息和列信息
  INFO_TABLE_COLUMNS_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/`,
  //修改表的信息和列信息
  UPDATE_TABLE_COLUMNS_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/`,
  //删除生成的表
  DEL_TABLE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/`,
  //导入表
  IMPORT_TABLE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/importTable`,
  //预览
  PREVIEW_CODE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/preview/`,
  //数据表列表
  DB_LIST_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/db/list`,
  //同步数据库
  SYNCH_DB_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/synchDb/`,
  //生成代码（下载方式）
  // DOWNLOAD_ZIP_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/download/`,
  //生成代码（自定义路径）
  GEN_CODE_URL: `${API_ENUM.SERVER_MODE_NAME.GEN_CODE}/genCode/`,
}

/**
 * 获取生成表列表
 * @param {Object} query - 查询条件
 */
export const genList = (query: any) =>
  request({
    method: 'get',
    url: API.LIST_URL,
    params: query,
  })

/**
 * 获取没有导入的表
 */
export const DBList = (genTable: any) =>
  request<any>({
    method: 'get',
    url: API.DB_LIST_URL,
    params: genTable,
  })
/**
 * 导入表
 */
export const importTable = (tables: any) =>
  request<any>({
    method: 'post',
    url: API.IMPORT_TABLE_URL,
    params: tables,
  })

/**
 * 预览表生成的代码
 */
export const previewCode = (tableId: any) =>
  request<any>({
    method: 'get',
    url: API.PREVIEW_CODE_URL + tableId,
  })

/**
 * 删除已生成的表
 * @param userId 用户Id
 */
export const delTable = (userIds: any) =>
  request<any>({
    method: 'delete',
    url: API.DEL_TABLE_URL,
    data: userIds,
  })

/**
 * 获取编辑表的详细信息
 * @param {Object} tableId - 表id
 */
export const InfoTableColumns = (tableId: any) =>
  request({
    method: 'get',
    url: API.INFO_TABLE_COLUMNS_URL + tableId,
  })

/**
 * 编辑表和列的详细信息
 * @param {Object} data - 表和列数据
 */
export const updateTableColumns = (data: any) =>
  request({
    method: 'put',
    url: API.UPDATE_TABLE_COLUMNS_URL,
    data: data,
  })

/**
 * 同步数据库
 */
export const synchDB = (tableName: any) =>
  request<any>({
    method: 'get',
    url: API.SYNCH_DB_URL + tableName,
  })

/**
 * 生成代码（自定义路径）
 */
export const genCode = (tableNames: any) =>
  request<any>({
    method: 'get',
    url: API.GEN_CODE_URL + tableNames,
  })
