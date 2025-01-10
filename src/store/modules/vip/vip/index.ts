//创建Vip相关的小仓库
import { defineStore } from 'pinia'

//导入请求
import { listVip,getVip,addVip,updateVip,delVip} from '@/api/vip/vip'

//创建用户小仓库
const useVipStore = defineStore('Vip', {
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
                vipId : undefined,
                xyName : undefined,
                startingTime : undefined,
                stopingTime : undefined,
                purchaseDays : undefined,
                unitType : undefined,
                loginMethod : undefined,
            }, //表单数据
            searchForm: {
                 xyName : undefined,
                 startingTime : undefined,
                 stopingTime : undefined,
                 purchaseDays : undefined,
                 unitType : undefined,
                 loginMethod : undefined,
            }, //搜索表单数据
        }
    },
    actions: {
        //获取Vip列表
        async list(query: any) {
            const result: any = await listVip(query)
            if (result.code == 200) {
                this.dataList.list = result.rows
                this.dataList.total = result.total
            } else {
                ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
        //添加Vip
        async add(data: any) {
            const result: any = await addVip(data)
            if (result.code == 200) {
                ElMessage.success({ message: '添加成功' })
                return Promise.resolve()
            } else {
                ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
        //删除Vip
        async del(vipId: any) {
            const result: any = await delVip(vipId)
            if (result.code == 200) {
                ElMessage.success({ message: '删除成功' })
                return Promise.resolve()
            } else {
                ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
        //修改Vip
        async update(data: any) {
            const result: any = await updateVip(data)
            if (result.code == 200) {
                ElMessage.success({ message: '信息修改成功' })
                return Promise.resolve()
            } else {
                ElMessage.error({ message: '失败信息: ' + result.msg })
            }
        },
    },
    getters: {

    },
})

//对外暴露获取Vip小仓库的方法
export default useVipStore
