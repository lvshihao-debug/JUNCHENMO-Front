import axios from 'axios'
import { saveAs } from 'file-saver'
import { GET_TOKEN } from '@/utils/token'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/common'

const baseURL = import.meta.env.VITE_APP_BASE_API;

export default {
  zip(url:string, name:string) {
    var url = baseURL + url
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + GET_TOKEN() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      } else {
        this.printErrMsg(res.data);
      }
    }).catch((r) => {
      console.error(r)
      ElMessage.error('下载文件出现错误，请联系管理员！')
    })
  },
  saveAs(text:any, name:string, opts?: any) {
    saveAs(text, name, opts);
  },
  async printErrMsg(data:any) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
    ElMessage.error(errMsg);
  }
}

