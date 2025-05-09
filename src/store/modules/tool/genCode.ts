//创建角色相关的小仓库
import { defineStore } from 'pinia'
//导入请求
import { DBList,importTable,genList,previewCode,delTable,InfoTableColumns,updateTableColumns,synchDB,genCode } from '@/api/tool/genCode'
import { number } from 'echarts'

//创建角色小仓库
const useGenCodeStore = defineStore('genCode', {
  state: () => {
    return {
      tableLoading: false, //数据加载loading
      multipleSelection: [], //选的数据列表
      dictData:[],//字典数据
      dictTypeOptions:[],//字典选项
      tableMultipleSelection: [], //选的数据列表
      codeArrays: [], //预览的生成的代码
      editTableData:{
        table:{
          tableName: undefined,
          tableComment: undefined,
          className: undefined,
          functionAuthor: undefined,
          remark: undefined,
          tplCategory: undefined,
          packageName: undefined,
          moduleName: undefined,
          businessName: undefined,
          functionName: undefined,
          genType: undefined,
          genPath: undefined,
          columns:[]
        },
        columns:[]
      },//表单数据
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
        this.codeArrays = result.data;
        ElMessage.success("预览成功");
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除已经生成的表
    async deleteGenCode(data: any) {
      const result: any = await delTable(data)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取编辑表的详细信息
    async tableColumnsInfo(tableId: any) {
      const result: any = await InfoTableColumns(tableId)
      if (result.code == 200) {
        this.editTableData.table = result.data.info
        this.editTableData.columns = result.data.rows
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取编辑表的详细信息
    async updateTableColumns() {
      this.editTableData.table.columns=this.editTableData.columns
      const result: any = await updateTableColumns(this.editTableData.table)
      if (result.code == 200) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    },
    //同步数据库
    async synchDB(tableName: any) {
      const result: any = await synchDB(tableName)
      if (result.code == 200) {
        ElMessage.success("同步成功");
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //生成代码（自定义路径）
    async genCode(tableNames: any) {
      const result: any = await genCode(tableNames)
      if (result.code == 200) {
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
