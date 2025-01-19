//创建Job相关的小仓库
import { defineStore } from 'pinia'

//导入请求
import {
  listJob,
  getJob,
  addJob,
  updateJob,
  delJob,
  changeJobStatus,
  runJob,
} from '@/api/acl/jobTask'

//创建用户小仓库
const useJobStore = defineStore('Job', {
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
        jobId: undefined,
        jobName: undefined,
        jobGroup: undefined,
        invokeTarget: undefined,
        cronExpression: undefined,
        misfirePolicy: undefined,
        concurrent: undefined,
        status: undefined,
      }, //表单数据
      searchForm: {
        jobName: undefined,
        jobGroup: undefined,
        status: undefined,
      }, //搜索表单数据
    }
  },
  actions: {
    //获取Job列表
    async list(query: any) {
      const result: any = await listJob(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //添加Job
    async add(data: any) {
      const result: any = await addJob(data)
      if (result.code == 200) {
        ElMessage.success({ message: '添加成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除Job
    async del(jobId: any) {
      const result: any = await delJob(jobId)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //修改Job
    async update(data: any) {
      const result: any = await updateJob(data)
      if (result.code == 200) {
        ElMessage.success({ message: '信息修改成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //立即执行Job
    async run(data: any) {
      const result: any = await runJob(data)
      if (result.code == 200) {
        ElMessage.success({ message: '任务立即执行成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //立即执行Job
    async changeStatus(data: any) {
      const result: any = await changeJobStatus(data)
      if (result.code == 200) {
        ElMessage.success({ message: '状态更新成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
  },
  getters: {},
})

//对外暴露获取Job小仓库的方法
export default useJobStore
