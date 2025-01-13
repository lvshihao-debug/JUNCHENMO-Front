import axios from 'axios'
import useUserStore from '@/store/modules/user/user'
import type { AxiosRequestConfig } from 'axios'
import { saveAs } from 'file-saver'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/common'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 80000,
})
//请求拦截器
service.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = 'Bearer ' + userStore.token
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
})
//响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 二进制数据则直接返回
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data
    }
    if (code === 401) {
      ElMessage.error({
        message: '系统提示:登录状态已过期',
        type: 'error',
        duration: 3 * 1000,
      })
      return Promise.reject('请您重新登录')
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)
/* 封装实例的请求方法 */
export default async function request<T>(config: AxiosRequestConfig) {
  // axios实例的 request 接受的第一个泛型参数，就是返回数据data的类型
  return service.request<T>(config).then((res) => res as T) // 返回axios的里data数据
}


/**
* 参数处理
* @param {*} params  参数
*/
export const tansParams=(params:any) =>{
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}
// 通用下载 Excel 方法
export const download=(url:any, params:any, filename = 'export.xlsx', config = {})=> {
  ElMessage.info('正在下载数据，请稍候！');

  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    ...config
  }).then((data:any) => {
    const isBlob = blobValidate(data);
    if (isBlob) {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, filename);
    } else {
      const resText = data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
      ElMessage.error(errMsg);
    }
  }).catch((r) => {
    console.error(r);
    ElMessage.error('下载文件出现错误，请联系管理员！');
  });
}

