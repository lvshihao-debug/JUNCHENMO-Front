//创建用户相关的小仓库
import { defineStore } from 'pinia'
//导入类型
import type {
  User,
  loginFormData,
  loginResponseData,
  logoutResponseData,
  userInfoReponseData,
} from '@/api/user/user/type'
//导入Token工具类
import { SET_TOKEN, GET_TOKEN, RENOVE_TOKEN } from '@/utils/token'
//导入请求
import {
  reqCode,
  reqLogin,
  reqLogout,
  reqUserInfo,
  reqUpStatusUser,
  reqUpPasswordUser,
  reqAuthRole,
  addUser,
  delUser,
  updateUser,
  userList,
  optionSelect,
} from '@/api/user/user'

//创建用户小仓库
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      user: <User>{}, //用户信息
      permissions: [], //用户拥有的权限信息
      roles: [], //用户拥有的角色
      tableLoading: true, //表格数据加载loading
      dataList: {
        //表格数据
        list: [],
        total: 0,
        page: 1,
        size: 10,
      },
      commonForm: {
        //表单数据
        userId: undefined,
        username: undefined,
        nickname: undefined,
        password: undefined,
        mobile: undefined,
        email: undefined,
      },
      searchForm: <User>{}, //搜索表单数据
    }
  },
  actions: {
    //获取验证码
    async code() {
      //登录请求
      const result: any = await reqCode()
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(result.msg)
      }
    },
    //用户登录
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        const resToken: string = result.data?.access_token as string
        SET_TOKEN(resToken)
        this.token = resToken
        return Promise.resolve()
      } else {
        return Promise.reject(result.msg)
      }
    },
    //退出登录
    async userLogout() {
      const result: logoutResponseData = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        RENOVE_TOKEN()
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取登录用户信息方法
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.user = result.user
        this.roles = result.roles
        this.permissions = result.permissions
        return Promise.resolve()
      } else {
        return Promise.reject(result.msg)
      }
    },
    //获取用户列表
    async userList(query: any) {
      const result: any = await userList(query)
      if (result.code == 200) {
        this.dataList.list = result.rows
        this.dataList.total = result.total
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //获取所有启用的用户
    async optionSelect() {
      const result: any = await optionSelect()
      if (result.code == 200) {
        return result
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //添加用户
    async addUser(data: any) {
      const result: any = await addUser(data)
      if (result.code == 200) {
        ElMessage.success({ message: '添加成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //删除用户
    async delUser(userId: any) {
      const result: any = await delUser(userId)
      if (result.code == 200) {
        ElMessage.success({ message: '删除成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //修改用户状态
    async upStatusUser(data: any) {
      const result: any = await reqUpStatusUser(data)
      if (result.code == 200) {
        ElMessage.success({ message: '停用成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //修改用户密码
    async upPasswordUser(data: any) {
      const result: any = await reqUpPasswordUser(data)
      if (result.code == 200) {
        ElMessage.success({ message: '密码重置成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //修改用户信息
    async upUser(data: any) {
      const result: any = await updateUser(data)
      if (result.code == 200) {
        ElMessage.success({ message: '信息修改成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
    //分配选择的角色
    async authRoleUser(userId: any, rolesId: any) {
      const rIds = rolesId.join(',')
      const result: any = await reqAuthRole({ userId: userId, roleIds: rIds })
      if (result.code == 200) {
        ElMessage.success({ message: '分配成功' })
        return Promise.resolve()
      } else {
        ElMessage.error({ message: '失败信息: ' + result.msg })
      }
    },
  },
  getters: {
    //获取名称的第一个字符
    getUserNameTextFirst(): string {
      return this.user.username?.charAt(0) as string
    },
  },
})

//对外暴露获取小仓库的方法
export default useUserStore
