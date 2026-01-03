//创建Task相关的小仓库
import { defineStore } from 'pinia'

//导入请求
import { listTask, addTask, updateTask, delTask } from '@/api/acl/task'

//创建用户小仓库
const useTaskStore = defineStore('Task', {
  state: () => {
    return {
      userOptions: [], //用户选项值
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
        taskId: undefined,
        title: undefined,
        description: undefined,
        startDate: undefined,
        endDate: undefined,
        priority: undefined,
        status: undefined,
        type: undefined,
        userId: undefined,
      }, //表单数据
      searchForm: {
        title: undefined,
        description: undefined,
        startDate: undefined,
        endDate: undefined,
        priority: undefined,
        status: undefined,
        type: undefined,
        userId: undefined,
      }, //搜索表单数据
    }
  },
  actions: {
    //获取Task列表
    async list(query: any) {
      const result: any = await listTask(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //添加Task
    async add(data: any) {
      const result: any = await addTask(data)
      if (result.code == 200) {
        ElMessage.success({ message: '添加成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除Task
    async del(taskId: any) {
      const result: any = await delTask(taskId)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //修改Task
    async update(data: any) {
      const result: any = await updateTask(data)
      if (result.code == 200) {
        ElMessage.success({ message: '信息修改成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
  },
  getters: {},
})

//对外暴露获取Task小仓库的方法
export default useTaskStore
