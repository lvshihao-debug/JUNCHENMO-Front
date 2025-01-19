// 根据字典的名获取字典的工具方法
export const loadDictDataByName=(store:any,name:any)=> {
    return store.dictData.filter((item: any) => item.name === name)
  }
  