//vip相关的接口}
import request from '@/utils/request'

import API_ENUM from '@/enum/api-enum'

//项目用户相关的请求地址
export const API = {
  //获取图形验证码
  XM_IMAGE_CODE_URL: `${API_ENUM.SERVER_MODE_NAME.XM_LOGIN}/getImageCode`,
  //发送手机验证码
  XM_SEND_SMS_URL: `${API_ENUM.SERVER_MODE_NAME.XM_LOGIN}/sendSms`,
  //登陆XM获取token
  XM_LOGIN_URL: `${API_ENUM.SERVER_MODE_NAME.XM_LOGIN}/login`,
}

/**
 * 获取图形验证码
 */
export const getImageCode = () => {
  return request({
    url: API.XM_IMAGE_CODE_URL,
    method: 'get',
  })
}

/**
 * 发送手机验证码
 */
export const sendSms = (uuid: string, imageCode: string, phone: string) => {
  return request({
    url: API.XM_SEND_SMS_URL,
    method: 'get',
    params: {
      uuid,
      imageCode,
      phone,
    },
  })
}

/**
 * 登陆XM获取token
 */
export const login = (smsCode: string, phone: string) => {
  return request({
    url: API.XM_LOGIN_URL,
    method: 'get',
    params: {
      smsCode,
      phone,
    },
  })
}
