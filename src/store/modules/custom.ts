//创建角色相关的小仓库
import { defineStore } from 'pinia'

//创建角色小仓库
const useCustomStore = defineStore('custom', {
  state: () => {
    return {
      commonform: {
        field101: undefined,
        field102: undefined,
        field103: undefined,
        field104: undefined,
        field105: undefined,
        field106: undefined,
        field107: undefined,
      },
    }
  },
  actions: {},
  getters: {},
})

//对外暴露获取小仓库的方法
export default useCustomStore
