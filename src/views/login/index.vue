<template>
  <div>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <el-form
            action="#"
            class="sign-in-form"
            ref="ruleLoginRef"
            :model="from"
            :rules="rules"
            label-width="auto"
            status-icon
          >
            <svg-icon
              name="logo"
              width="45px"
              height="45px"
              color="blue"
              style="margin-bottom: 20px"
            />
            <h4 class="title" id="typing-animation">JUN CHEN MO</h4>
            <el-row class="animate__animated animate__pulse">
              <el-form-item
                prop="username"
                class="input-field"
                style="width: 300px"
              >
                <el-input
                  v-model="from.username"
                  type="text"
                  placeholder="用户名"
                  :prefix-icon="User"
                  autofocus
                />
              </el-form-item>
            </el-row>
            <el-row class="animate__animated animate__pulse">
              <el-form-item
                prop="password"
                class="input-field"
                style="width: 300px"
              >
                <el-input
                  v-model="from.password"
                  placeholder="密码"
                  type="password"
                  :prefix-icon="Lock"
                  autofocus
                  show-password
                />
              </el-form-item>
            </el-row>
            <el-row
              style="display: flex; align-items: center"
              class="animate__animated animate__pulse"
              :gutter="30"
            >
              <el-col :span="12">
                <el-form-item
                  prop="code"
                  class="input-field"
                  style="width: 150px"
                >
                  <el-input
                    v-model="from.code"
                    type="text"
                    placeholder="验证码"
                    autofocus
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div>
                  <img
                    :src="codeImg"
                    alt="验证码"
                    @click="getCode"
                    class="code-img"
                    style="border-radius: 4px; cursor: pointer"
                  />
                </div>
              </el-col>
            </el-row>
            <el-button
              class="animate__animated animate__pulse"
              color="#0129F6"
              @click="submitForm(ruleLoginRef)"
              :loading-icon="Eleme"
              :loading="loadingBtn"
              style=" margin-top: 10px;width: 290px"
            >
              登录
            </el-button>
            <el-divider
              class="animate__animated animate__pulse"
              style=" margin-top: 20px;width: 270px; height: 10px"
            >
              第三方登录
            </el-divider>
            <el-row
              class="animate__animated animate__pulse"
              style=" margin-top: 5px;width: 270px; height: 54px"
            >
              <JcmLinkIcon></JcmLinkIcon>
            </el-row>
          </el-form>
          <el-form
            action="#"
            class="sign-up-form"
            ref="ruleRegisterRef"
            :model="from"
            :rules="rules"
            label-width="auto"
            status-icon
          >
            <svg-icon
              name="logo"
              width="45px"
              height="45px"
              color="blue"
              style="margin-bottom: 20px"
            />
            <h4 class="title">JUN CHEN MO</h4>
            <el-row>
              <el-form-item
                prop="username"
                class="input-field"
                style="width: 300px"
              >
                <el-input
                  v-model="from.username"
                  type="text"
                  placeholder="用户名"
                  :prefix-icon="User"
                  autofocus
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                prop="password"
                class="input-field"
                style="width: 300px"
              >
                <el-input
                  v-model="from.password"
                  placeholder="密码"
                  type="password"
                  :prefix-icon="Lock"
                  autofocus
                  show-password
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                prop="password"
                class="input-field"
                style="width: 300px"
              >
                <el-input
                  v-model="from.password"
                  placeholder="确认密码"
                  type="password"
                  :prefix-icon="Lock"
                  autofocus
                  show-password
                />
              </el-form-item>
            </el-row>
            <el-button
              color="#0129F6"
              @click="submitForm(ruleLoginRef)"
              :loading-icon="Eleme"
              :loading="loadingBtn"
              style=" margin-top: 10px;width: 290px"
            >
              注册
            </el-button>
          </el-form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>加入我们</h3>
            <p>加入我们，成为本站的一份子。</p>
            <button class="btn transparent" id="sign-up-btn" @click="upBtn">
              去注册
            </button>
          </div>
          <img src="@/assets/img/login.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>已有帐号？</h3>
            <p>立即登录已有帐号，体验简约管理系统。</p>
            <button class="btn transparent" id="sign-in-btn" @click="inBtn">
              去登录
            </button>
          </div>
          <img src="@/assets/img/register.svg" class="image" alt="" />
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
const upBtn = () => {
  console.log('up被点击')
  const container = document.querySelector('.container')
  container?.classList.add('sign-up-mode')
}
const inBtn = () => {
  console.log('in被点击')

  const container = document.querySelector('.container')
  container?.classList.remove('sign-up-mode')
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
input {
  font-family: Poppins, sans-serif;
}
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}
.code-img {
  border-radius: 3px;
  box-shadow: var(--el-box-shadow-light);
  cursor: pointer;
}
.forms-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  z-index: 5;
  display: grid;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  transform: translate(-50%, -50%);
  grid-template-columns: 1fr;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 5rem;
  transition: all 0.2s 0.7s;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
form.sign-up-form {
  z-index: 1;
  opacity: 0;
}
form.sign-in-form {
  z-index: 2;
}
.title {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #444444;
}
.input-field {
  position: relative;
  margin: 10px 0;
  padding: 0 0.4rem;
  width: 100%;
  max-width: 380px;
  border-radius: 55px;
}
.social-icon:hover {
  border-color: #4481eb;
  color: #4481eb;
}
.btn {
  margin: 10px 0;
  width: 150px;
  height: 49px;
  font-weight: 600;
  border: none;
  border-radius: 49px;
  color: #ffffff;
  background-color: #5995fd;
  outline: none;
  transition: 0.5s;
  text-transform: uppercase;
  cursor: pointer;
}
.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
}
.container::before {
  position: absolute;
  top: -10%;
  right: 48%;
  z-index: 6;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  transition: 1.8s ease-in-out;
  content: '';
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #0129f6 0%, #04befe 100%);
}
.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}
.panel {
  z-index: 6;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  text-align: center;
  flex-direction: column;
}
.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}
.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}
.panel .content {
  color: #ffffff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}
.panel h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
}
.panel p {
  padding: 0.7rem 0;
  font-size: 0.95rem;
}
.btn.transparent {
  margin: 0;
  width: 130px;
  height: 41px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 2px solid #ffffff;
  background: none;
}
.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */
.container.sign-up-mode::before {
  transform: translate(100%, -50%);
  right: 52%;
}
.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}
.container.sign-up-mode .signin-signup {
  left: 25%;
}
.container.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}
.container.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

//打字机动画
#typing-animation {
  /* 防止文本换行 */
  overflow: hidden;
  white-space: nowrap;

  /* 模拟光标效果 */
  animation:
    typing 3s steps(20, end),
    blink-caret 0.5s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 190px;
  }
}
.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}
.container.sign-up-mode .left-panel {
  pointer-events: none;
}
.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    height: 100vh;
    min-height: 800px;
  }
  .signin-signup {
    top: 95%;
    width: 100%;
    transition: 1s 0.8s ease-in-out;
    transform: translate(-50%, -100%);
  }
  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }
  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }
  .right-panel {
    grid-row: 3 / 4;
  }
  .left-panel {
    grid-row: 1 / 2;
  }
  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }
  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }
  .panel h3 {
    font-size: 1.2rem;
  }
  .panel p {
    padding: 0.5rem 0;
    font-size: 0.7rem;
  }
  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }
  .container::before {
    top: initial;
    right: initial;
    bottom: 68%;
    left: 30%;
    width: 1500px;
    height: 1500px;
    transition: 2s ease-in-out;
    transform: translateX(-50%);
  }
  .container.sign-up-mode::before {
    right: initial;
    bottom: 32%;
    transform: translate(-50%, 100%);
  }
  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }
  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0);
  }
  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }
  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }
  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }
  .container::before {
    bottom: 72%;
    left: 50%;
  }
  .container.sign-up-mode::before {
    bottom: 28%;
    left: 50%;
  }
}
</style>
