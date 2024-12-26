import axios from 'axios'
import useUserStore from '@/store/modules/user'
import type { AxiosRequestConfig } from 'axios'
import {  ElMessageBox, ElMessage} from 'element-plus'

import type { Action } from 'element-plus'
import { set } from 'nprogress'
//创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
service.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = 'Bearer ' + userStore.token
  }
  return config
})
//响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    if (code === 401) {
      ElMessage.error({message:'系统提示:登录状态已过期', type: 'error', duration: 3 * 1000})
      setTimeout(() => {
        useUserStore().userLogout().then(() => {
          location.href = '/home';
        })
      },3000)
      return Promise.reject('请您重新登录')
    } else{
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
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
