//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
   reqDictDataList,reqAddDictData,reqDelDictData,reqDictDataInfoList,reqDictDataInfo,reqUpInfoDictData,reqDictDataRefreshCache
} from '@/api/acl/dictData'

//创建角色小仓库
const useDictDataStore = defineStore('dictData', {
  state: () => {
    return {
      dictTypeWithExtra:[],  //字典和额外参数全部列表
      selectDictTypeExtra:[],  //选择的字典的以及额外参数
      extra:{},  //存储额外参数的对象
      multipleSelection:[], //选的数据列表
      tableLoading: true, //表格数据加载loading
      dataList: { //表格数据
        list: [],
        total: 0,
        page: 1,
        size: 10,
      },
      searchForm:{
        name: undefined,
        description: undefined,
        value: undefined,
        extra: undefined
      },
      commonForm:{
        dictDataId:undefined,
        dictTypeId:undefined,
        name: undefined,
        description: undefined,
        value: undefined,
        sort: undefined,
        extra: undefined
      }
    }
  },
  actions: {
    //获取字典数据列表
    async dictDataList(query: any) {
      const result: any = await reqDictDataList(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //添加字典数据
    async addDictData(data: any) {
      const result: any = await reqAddDictData(data)
      if (result.code == 200) {
        ElMessage.success({ message: '添加成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除字典数据
    async deleteDictData(data: any) {
      const result: any = await reqDelDictData(data)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //修改字典项
    async upInfoDictData(data: any) {
      const result: any = await reqUpInfoDictData(data)
      if (result.code == 200) {
        ElMessage.success({ message: '信息修改成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })

      }
    },
    async dictDataInfoList(names:any) {
      const result: any = await reqDictDataInfoList(names)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    async dictDataInfo(name:string) {
      const result: any = await reqDictDataInfo(name)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //刷新字典数据列表
    async dictDataRefreshCache() {
      const result: any = await reqDictDataRefreshCache()
      if (result.code == 200) {
        ElMessage.success({ message: '数据刷新成功' })
      } else {
        return Promise.reject(result.msg)
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useDictDataStore
