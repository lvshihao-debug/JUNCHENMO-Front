//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { DBList,importTable,genList,previewCode,delGenCode } from '@/api/tool/genCode'

//创建角色小仓库
const useGenCodeStore = defineStore('genCode', {
  state: () => {
    return {
      loading: false, //生成数据加载loading
      multipleSelection: [], //选的数据列表
      tableMultipleSelection: [], //选的数据列表
      code: '', //生成的代码
      searchForm: {
        tableName:undefined,
        tableComment:undefined,
      }, //搜索表单数据
      dataList: { //数据表表格数据
        list: [],
        total: 0,
        page: 1,
        size: 10,
      },
      tableSearchForm: {
        tableName:undefined,
        tableComment:undefined,
      }, //数据表搜索表单数据
      tableDataList: { //数据表表格数据
        list: [],
        total: 0,
        page: 1,
        size: 10,
      },
    }
  },
  actions: {
    //获取已生成数据表的列表
    async genList(query: any) {
      const result: any = await genList(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取数据表列表
    async DBList(query: any) {
      const result: any = await DBList(query)
      if (result.code == 200) {
        this.tableDataList.list = result.rows
        this.tableDataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //导入数据表
    async importTable(tables: any) {
      const result: any = await importTable(tables)
      if (result.code == 200) {
        ElMessage.success("导入成功");
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //预览表生成的代码
    async previewTableCode(tableId: any) {
      const result: any = await previewCode(tableId)
      if (result.code == 200) {
        console.log(result.data["vm/java/controller.java.vm"]);
        this.code = result.data["vm/java/controller.java.vm"]
        ElMessage.success("预览成功");
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除已经生成的表
    async deleteGenCode(data: any) {
      const result: any = await delGenCode(data)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
  },
  getters: {},
})

//对外暴露获取小仓库的方法
export default useGenCodeStore
