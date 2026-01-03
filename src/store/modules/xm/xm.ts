//创建Vip相关的小仓库
import { defineStore } from 'pinia'

//导入请求
import { getImageCode, sendSms, login } from '@/api/xm/login'

//创建用户小仓库
const useVipStore = defineStore('Xm', {
  state: () => {
    return {
      phone: '', //手机号码
      smsCode: '', //验证码
      uuid: '', //验证码uuid
      imageCode: '', //图形验证码
      token: '', //用户唯一标识token
    }
  },
  actions: {
    //获取图形验证码
    async getImageCode() {
      const result: any = await getImageCode()
      if (result.code == 200) {
        this.uuid = result.data?.uuid || ''
        return Promise.resolve(result.data)
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
        return Promise.reject(result.msg)
      }
    },
    //发送手机验证码
    async sendSms(data: any) {
      const result: any = await sendSms(data.uuid, data.imageCode, data.phone)
      if (result.code == 200) {
        return Promise.resolve(result.data)
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
        return Promise.reject(result.msg)
      }
    },
    //登陆XM获取token
    async login(vipId: any) {
      const result: any = await login(vipId.smsCode, vipId.phone)
      if (result.code == 200) {
        this.token = result.data?.access_token || result.data?.token || ''
        return Promise.resolve(result.data)
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取Vip小仓库的方法
export default useVipStore
