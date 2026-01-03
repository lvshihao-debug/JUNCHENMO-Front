//创建操作日志相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import {
  reqOperationLogList,
  reqDelOperationLog,
  reqClearOperationLog,
  reqOperNameOptionSelect,
  reqTitleOptionSelect,
  reqBusinessNameOptionSelect,
} from '@/api/log/operationLog'

//创建操作日志小仓库
const useOperationLogStore = defineStore('operationLog', {
  state: () => {
    return {
      nameOptionSelect: [], //操作人可选项
      titleOptionSelect: [], //模块标题可选项
      businessNameOptionSelect: [], //业务名称可选项
      multipleSelection: [], //选的数据列表
      tableLoading: true, //表格数据加载loading
      dataList: {
        //表格数据
        list: [],
        total: 0,
        page: 1,
        size: 10,
      },
      //搜索表单
      searchForm: {
        operName: undefined,
        title: undefined,
        businessName: undefined,
        status: undefined,
        requestTime: undefined,
      },
    }
  },
  actions: {
    //获取操作日志列表
    async operationLogList(query: any) {
      const result: any = await reqOperationLogList(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除操作日志
    async deleteOperationLog(data: any) {
      const result: any = await reqDelOperationLog(data)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //清空操作日志
    async clearOperationLog() {
      const result: any = await reqClearOperationLog()
      if (result.code == 200) {
        ElMessage.success({ message: '日志清空成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取操作日志可选操作人员名称
    async getOperNameOptionSelect() {
      const result: any = await reqOperNameOptionSelect()
      if (result.code == 200) {
        this.nameOptionSelect = result.data
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取操作日志可选模块标题
    async getTitleOptionSelect() {
      const result: any = await reqTitleOptionSelect()
      if (result.code == 200) {
        this.titleOptionSelect = result.data
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取操作日志可选模块标题的业务名称
    async getBusinessNameOptionSelect(title: string) {
      const result: any = await reqBusinessNameOptionSelect(title)
      if (result.code == 200) {
        this.businessNameOptionSelect = result.data
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useOperationLogStore
