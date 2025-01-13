//创建Logininfor相关的小仓库
import { defineStore } from 'pinia'

//导入请求
import { listLogininfor,delLogininfor,clearLogininfor} from '@/api/user/logininfor'

//创建用户小仓库
const useLogininforStore = defineStore('Logininfor', {
    state: () => {
        return {
            dictData: [], //字典数据数组
            multipleSelection:[], //选的数据列表
            tableLoading: true, //表格数据加载loading
            dataList: { //表格数据
                list: [],
                total: 0,
                page: 1,
                size: 10,
            },
            commonForm: {
            }, //表单数据
            searchForm: {
                 userName : undefined,
                 ipaddr : undefined,
                 status : undefined,
                 loginTime : undefined,
                 os:undefined,
            }, //搜索表单数据
        }
    },
    actions: {
        //获取Logininfor列表
        async list(query: any) {
            const result: any = await listLogininfor(query)
            if (result.code == 200) {
                this.dataList.list = result.rows
                this.dataList.total = result.total
            } else {
                ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
        //删除Logininfor
        async del(infoId: any) {
            const result: any = await delLogininfor(infoId)
            if (result.code == 200) {
                ElMessage.success({ message: '删除成功' })
                return Promise.resolve()
            } else {
                ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
        //清空操作日志
        async clear() {
            const result: any = await clearLogininfor()
            if (result.code == 200) {
            ElMessage.success({ message: '日志清空成功' })
            return Promise.resolve()
            } else {
            ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
    },
    getters: {

    },
})

//对外暴露获取Logininfor小仓库的方法
export default useLogininforStore
