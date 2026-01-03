//统一管理项目用户相关的接口
import request from '@/utils/request'
import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //生成表
  GEN_TABLE: `${API_ENUM.SERVER_MODE_NAME.GEN_TABLE}/genTable`,
  //生成表SQL
  GEN_TABLE_SQL: `${API_ENUM.SERVER_MODE_NAME.GEN_TABLE}/genSql`,
}

/**
 * 生成表
 */
export const genTable = (prompts: string) =>
  request<any>({
    method: 'get',
    url: API.GEN_TABLE,
    params: { prompts },
  })

/**
 * 生成表Sql
 */
export const genTableSql = (prompts: string) =>
  request<any>({
    method: 'post',
    url: API.GEN_TABLE_SQL,
    data: prompts,
  })
