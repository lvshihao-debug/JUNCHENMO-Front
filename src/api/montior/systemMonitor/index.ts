//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import API_ENUM from '@/enum/api-enum'

//菜单模块相关的请求接口
export const API = {
  //获取系统监控参数
  SYSTEM_MONITOR_BASE_INFO_URL: `${API_ENUM.SERVER_MODE_NAME.SYSTEM_MONITOR}/getSystemBaseInfo`,
}

//获取Redis基本信息
export const reqSystemBaseInfo = () =>
  request<any>({
    method: 'get',
    url: API.SYSTEM_MONITOR_BASE_INFO_URL,
  })
