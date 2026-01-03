//判断不是http || https开头的字符串
export const isNotHttp = (url: any) => {
  return !(url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
}
//判断是http || https开头的字符串
export const isHttp = (url: any) => {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

//获取当前是早上||中文||下午||晚上的方法
export enum TimePeriodEnum {
  Morning = '早上',
  Midday = '中午',
  Afternoon = '下午',
  Evening = '晚上',
}
export const getTime = (): TimePeriodEnum => {
  const now = new Date()
  const currentHour = now.getHours()
  switch (true) {
    case currentHour >= 0 && currentHour < 9:
      return TimePeriodEnum.Morning
    case currentHour >= 9 && currentHour < 12:
      return TimePeriodEnum.Midday
    case currentHour >= 12 && currentHour < 18:
      return TimePeriodEnum.Afternoon
    default:
      return TimePeriodEnum.Evening
  }
}

//重置对象的所有属性值为空
export const resetObj = (obj: any) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      obj[key] = undefined
    }
  }
}

// 复制内容
export const copyText = (text: string) => {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      ElMessage.success({ message: text + ' 已复制' })
    })
    .catch((err) => {
      console.error('复制失败：', err)
    })
}

/**
 * 复制到剪切板（兼容旧版浏览器）
 */
export function copyToClipboard(content: string): boolean {
  try {
    if (navigator.clipboard && document.hasFocus()) {
      // 使用现代浏览器的 Clipboard API
      navigator.clipboard.writeText(content)
      return true
    } else if (document.execCommand) {
      // 兼容旧版浏览器
      const el = document.createElement('textarea')
      el.value = content
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      return true
    }
  } catch (err) {
    console.error('复制失败：', err)
  }
  return false
}

/**
 * 获取剪切板内容 返回promise
 */
export function getClipboardText() {
  return navigator.clipboard.readText()
}

// 添加日期范围
export const addDateRange = (params: any, dateRange: any, propName: any) => {
  const search = params
  search.params =
    typeof search.params === 'object' &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0]
    search.params['endTime'] = dateRange[1]
  } else {
    search.params['begin' + propName] = dateRange[0]
    search.params['end' + propName] = dateRange[1]
  }
  return search
}

// 添加页数页大小
export const addPage = (params: any, pageNum: any, pageSize: any) => {
  const search = params
  search.pageNum = pageNum
  search.pageSize = pageSize
  return search
}

//给表单复制
export const assign = (commonFrom: any, data: any) => {
  Object.keys(commonFrom).forEach((key) => {
    commonFrom[key] = data[key]
  })
}

// 通用下载方法
// 辅助函数：验证是否为 Blob 对象
export const blobValidate = (data: any) => {
  return data instanceof Blob
}
