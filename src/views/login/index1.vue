<template>
    <div>
        <div class="login-container">
            <!--logo位置-->
            <div class="logo-div-jcm selector-disabled animate__animated animate__flipInX">
                <div>
                    <svg-icon name="logo"  width="20px" height="20px" color="#0C9FA6"/>
                </div>
                <div>JUN CHEN MO</div>
            </div>
            <div class="login-card animate__animated animate__bounceInLeft">
                <div class="column animate__animated animate__fadeIn" style="width: 400px;" >
                    <el-row>
                        <el-col :span="24">
                            <div class="form-card">
                                <div class="title">
                                    RBAC管理系统
                                </div>
                                <div class="describe">
                                    The reverse determines the height, and the development determines the depth
                                </div>
                                <el-form ref="ruleLoginRef" :model="from" :rules="rules" label-width="auto" status-icon>
                                    <el-form-item prop="username" class="form-item">
                                        <el-input v-model="from.username" type="text" placeholder="用户名"
                                            :prefix-icon="User" autofocus />
                                    </el-form-item>
                                    <el-form-item prop="password" class="form-item">
                                        <el-input v-model="from.password" placeholder="密码" type="password"
                                            :prefix-icon="Lock" show-password />
                                    </el-form-item>
                                    <el-row>
                                        <el-col :span="14">
                                            <el-form-item prop="code" class="form-item">
                                                <el-input v-model="from.code" type="text" placeholder="验证码" autofocus />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1">
                                        </el-col>
                                        <el-col :span="5">
                                            <img :src="codeImg" alt="验证码" @click="getCode" class="code-img"
                                                style="border-radius: 4px;cursor: pointer;" />
                                        </el-col>
                                    </el-row>
                                    <el-button color="#0129F6" @click="submitForm(ruleLoginRef)" :loading-icon="Eleme"
                                        :loading="loadingBtn" style="width: 100%;">
                                        登录
                                    </el-button>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="column animate__animated animate__slideInRight"  style="width: 400px;">
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import type { loginFormData } from '@/api/user/user/type'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, Eleme } from '@element-plus/icons-vue'
import UserStore from '@/store/modules/user/user'
import { useRouter } from 'vue-router'
const $router = useRouter()
// 实例化容器
const useUserStore = UserStore()
//登录按钮加载状态
const loadingBtn = ref(false)
//获取表单DOM
const ruleLoginRef = ref<FormInstance>()
//验证码图片
const codeImg = ref('')
//配置表单验证规则
const rules = ref<FormRules<loginFormData>>({
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
    ],
    code: [
        {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
        },
    ],
})
//表单数据
let from = reactive<loginFormData>({
    username: '',
    password: '',
    code: '',
    uuid: '',
})

const getCode = async () => {
    const codeResult = await useUserStore.code()
    codeImg.value = 'data:image/jpeg;base64,' + codeResult.img
    from.uuid = codeResult.uuid
}

const init = async () => {
    try {
        await getCode()
    } catch (error) {
        //弹出登录失败的message
        ElMessage.error({ message: '验证码获取失败' })
    }
}

init()
//登录
const submitForm = async (formEl: FormInstance | undefined) => {
    loadingBtn.value = true
    if (!formEl) return
    //验证数据输入的规则是否正确
    await formEl.validate(async (valid) => {
        if (valid) {
            try {
                //请求登录接口
                await useUserStore.userLogin(from)
                $router.push('/')
                // //弹出登录成功提示
                ElMessage.success({ message: '登陆成功' })
            } catch (error) {
                //弹出登录失败的message
                from.code = ''
                getCode()
                ElMessage.error({ message: error })
            } finally {
                loadingBtn.value = false
            }
        } else {
            //弹出数据校验失败的message
            ElMessage.error({ message: '请将信息填写完整' })
            loadingBtn.value = false
        }
    })
}
</script>


<style lang="scss" scoped>
$theme-color: #010101;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.login-container {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1.5rem;

    &:after {
        content: "";
        position: fixed;
        inset: 0;
        background-color: $theme-color;
        width: 60%;
        height: 100vh;
        clip-path: polygon(0 100%, 0 0, 100% 0, 70% 100%);
    }
}

//固定颜色
::v-deep .el-input__inner{
    color:black !important;
}
/* 将样式统一设置在一个类中 */
.form-item {
    margin-bottom: 20px;
}

.logo-div-jcm {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
    color: #0C9FA6;
    font-size: 18px;
}

.form-card {
    .title {
        font-size: 25px;
        font-weight: 500;
        margin-bottom: 10px;
        color: black;
    }
    .describe {
        font-size: 13px;
        margin-bottom: 20px;
        color: #595959;
    }
}

.login-card {
    color: black;
    z-index: 1;
    background-color: white;
    box-shadow: 0 10px 50px -30px black;
    border-radius: 40px;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto auto;

    a {
        text-decoration: none;
        color: $theme-color;
    }

    .column {
        padding: 3rem;

        &:last-child {
            background: url(@/assets/bg3.jpg) center;
            background-size: cover;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 40px;

            &:after {
                content: "";
                position: absolute;
                background: linear-gradient(90deg, white, #ffffff22);
                inset: 0;
            }

            * {
                z-index: 1;
            }
        }

        &:last-child {
            text-align: center;
        }
    }


}


//响应式布局
@media(max-width:992px) {
    .login-card {
        display: block;
        width: 500px;
        text-align: center;

        .column {
            &:last-child {
                display: none;
            }
        }
    }

}
</style>