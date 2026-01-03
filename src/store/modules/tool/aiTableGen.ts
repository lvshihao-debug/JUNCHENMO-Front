//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { genTable, genTableSql } from '@/api/tool/aiTableGen'

//创建角色小仓库
const useAiTableGenStore = defineStore('aiTableGen', {
  state: () => {
    return {
      loading: false, //生成数据加载loading
      dictData: [], //字典数据
    }
  },
  actions: {
    async genTable(prompts: string) {
      //生成表
      const result = await genTable(prompts)
      if (result.code == 200) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
    async genTableSql(prompts: string) {
      //生成表Sql
      const result = await genTableSql(prompts)
      if (result.code == 200) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useAiTableGenStore
