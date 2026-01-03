//创建JobLog相关的小仓库
import { defineStore } from 'pinia'

//导入请求
import { listTaskLog, delTaskLog, clearTaskLog } from '@/api/log/jobTaskLog'

//创建用户小仓库
const useJobLogStore = defineStore('JobLog', {
  state: () => {
    return {
      dictData: [], //字典数据数组
      multipleSelection: [], //选的数据列表
      tableLoading: true, //表格数据加载loading
      dataList: {
        //表格数据
        list: [],
        total: 0,
        page: 1,
        size: 10,
      },
      commonForm: {
        jobLogId: undefined,
        jobName: undefined,
        jobGroup: undefined,
        invokeTarget: undefined,
        jobMessage: undefined,
        status: undefined,
        exceptionInfo: undefined,
      }, //表单数据
      searchForm: {
        jobName: undefined,
        jobGroup: undefined,
        invokeTarget: undefined,
        jobMessage: undefined,
        status: undefined,
        exceptionInfo: undefined,
      }, //搜索表单数据
    }
  },
  actions: {
    //获取Log列表
    async list(query: any) {
      const result: any = await listTaskLog(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除Log
    async del(jobLogId: any) {
      const result: any = await delTaskLog(jobLogId)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //清空日志
    async clear() {
      const result: any = await clearTaskLog()
      if (result.code == 200) {
        ElMessage.success({ message: '日志清空成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
  },
  getters: {},
})

//对外暴露获取JobLog小仓库的方法
export default useJobLogStore
