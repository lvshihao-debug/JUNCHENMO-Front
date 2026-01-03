<template>
  <div>
    <el-card class="home_welcome_card animate__animated animate__bounceInRight" @click="onWelcomeCardClick">
      <canvas ref="fabricCanvasRef" class="fabric_canvas" aria-hidden="true"></canvas>
      <div class="home_welcome">
        <div class="avatar_wrap">
          <el-avatar :size="50" shape="square">
            {{ userStore.getUserNameTextFirst }}
          </el-avatar>
          <span class="online_dot"></span>
        </div>

        <div class="welcome_text">
          <div class="welcome_title">
            <span class="greeting">{{ greeting }}</span>
            <span class="username">{{ userStore.user.username }}</span>
          </div>

          <div class="welcome_sub">
            <span
              :key="quoteKey"
              class="typing"
              :style="{
                '--typing-steps': typingSteps,
              }"
            >
              {{ quote }}
            </span>
            <el-button link class="quote_btn" @click="nextQuote">换一句</el-button>
          </div>

          <div class="welcome_meta">
            <el-tag size="small" effect="plain" class="meta_tag">
              {{ weekdayText }}
            </el-tag>
            <el-tag size="small" effect="plain" class="meta_tag">
              今日小目标：{{ todayGoal }}
            </el-tag>
          </div>
        </div>

        <div class="welcome_stats">
          <div class="stat_item">
            <div class="stat_icon_wrap">
              <svg-icon name="任务" />
            </div>
            <div class="stat_text">
              <div class="stat_value">{{ jobTotal }}</div>
              <div class="stat_label">定时任务</div>
            </div>
          </div>
          <div class="stat_item">
            <div class="stat_icon_wrap">
              <svg-icon name="管理" />
            </div>
            <div class="stat_text">
              <div class="stat_value">{{ taskTotal }}</div>
              <div class="stat_label">系统任务</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-row style="margin-top: 10px" :gutter="10">
      <el-col :span="4" class="animate__animated animate__flipInX">
        <JcmHomeCard
          icon="user"
          title="用户"
          data="3,208人"
          rate="8%"
        ></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInY">
        <JcmHomeCard
          icon="role"
          title="角色"
          data="5种"
          rate="1%"
        ></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInX">
        <JcmHomeCard
          icon="dictType"
          title="字典项"
          data="108条"
          rate="4%"
        ></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInY">
        <JcmHomeCard
          icon="AI"
          title="TOKEN消耗"
          data="10,887"
          rate="2%"
        ></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInX">
        <JcmHomeCard
          icon="登录log"
          title="登录日志"
          data="415条"
          rate="2%"
        ></JcmHomeCard>
      </el-col>
      <el-col :span="4" class="animate__animated animate__flipInY">
        <JcmHomeCard
          icon="log"
          title="操作日志"
          data="3,208条"
          rate="8%"
        ></JcmHomeCard>
      </el-col>
    </el-row>
    <el-row class="home_mid_row" :gutter="10">
      <el-col :span="13">
        <el-card class="card-chat home_panel animate__animated animate__slideInUp" shadow="hover">
          <JcmBarChat />
        </el-card>
      </el-col>
      <el-col :span="11">
        <div class="home_panels animate__animated animate__slideInUp">
          <el-card class="home_panel panel--version" shadow="hover">
            <div class="panel_head">
              <div class="panel_title">当前版本</div>
              <el-tag size="small" type="success" effect="light">{{ homeVersion }}</el-tag>
            </div>
            <div class="panel_sub">功能概览</div>
            <div class="pill_list">
              <el-tag v-for="item in featureItems" :key="item" size="small" effect="plain" class="pill_tag">
                {{ item }}
              </el-tag>
            </div>
          </el-card>

          <div class="home_panels_row">
            <el-card class="home_panel panel--frontend" shadow="hover">
              <div class="panel_head">
                <div class="panel_title">前端技术栈</div>
              </div>
              <div class="kv_list">
                <div v-for="row in frontendStack" :key="row.label" class="kv_row">
                  <span class="kv_key">{{ row.label }}</span>
                  <span class="kv_val">{{ row.value }}</span>
                </div>
              </div>
            </el-card>

            <el-card class="home_panel panel--backend" shadow="hover">
              <div class="panel_head">
                <div class="panel_title">后端技术栈</div>
              </div>
              <div class="kv_list">
                <div v-for="row in backendStack" :key="row.label" class="kv_row">
                  <span class="kv_key">{{ row.label }}</span>
                  <span class="kv_val">{{ row.value }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px" :gutter="10">
      <el-col :span="12" class="animate__animated animate__fadeInUp">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">
                <el-icon style="margin-right: 5px; vertical-align: -2px"><Bell /></el-icon>
                系统公告
              </span>
              <el-button type="primary" link>查看更多</el-button>
            </div>
          </template>
          <div class="notice-list">
            <div
              v-for="(notice, index) in notices"
              :key="index"
              class="notice-item"
            >
              <el-tag :type="notice.type" size="small" effect="plain" class="notice-tag">
                {{ notice.tag }}
              </el-tag>
              <span class="notice-content">{{ notice.content }}</span>
              <span class="notice-time">{{ notice.time }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="animate__animated animate__fadeInUp">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">
                <el-icon style="margin-right: 5px; vertical-align: -2px"><Notebook /></el-icon>
                更新日志
              </span>
              <el-tag type="success" size="small">Latest: v1.0.0</el-tag>
            </div>
          </template>
          <div style=" overflow-y: auto;height: 300px">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in updates"
                :key="index"
                :timestamp="activity.timestamp"
                :type="activity.type"
                :color="activity.color"
                placement="top"
              >
                <el-card shadow="never" class="timeline-card">
                  <h4>{{ activity.title }}</h4>
                  <p>{{ activity.content }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user/user'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Bell, Notebook } from '@element-plus/icons-vue'

// 实例化容器
import { listJob } from '@/api/acl/jobTask'
import { listTask } from '@/api/acl/task'

const userStore = useUserStore()

const fabricCanvasRef = ref<HTMLCanvasElement | null>(null)

type FabricPoint = [number, number]

const useFabricEffect = () => {
  const SPEED_ANIM = 5

  let canv: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let maxx = 0
  let maxy = 0
  let dpr = 1

  let rafId = 0
  let resizeObserver: ResizeObserver | null = null

  const mrandom = Math.random
  const mfloor = Math.floor
  const mround = Math.round
  const m2PI = Math.PI * 2
  const msin = Math.sin
  const mcos = Math.cos
  const mhypot = Math.hypot

  const alea = (mini: number, maxi?: number) => {
    if (typeof maxi === 'undefined') return mini * mrandom()
    return mini + mrandom() * (maxi - mini)
  }

  const intAlea = (mini: number, maxi?: number) => {
    if (typeof maxi === 'undefined') return mfloor(mini * mrandom())
    return mini + mfloor(mrandom() * (maxi - mini))
  }

  const Noise1DOneShot = (period: number, min = 0, max = 1, random?: () => number) => {
    const rnd = random || Math.random
    let currx = rnd()
    let y0 = min + (max - min) * rnd()
    let y1 = min + (max - min) * rnd()
    const dx = 1 / period

    return () => {
      currx += dx
      if (currx > 1) {
        currx -= 1
        y0 = y1
        y1 = min + (max - min) * rnd()
      }
      const z = (3 - 2 * currx) * currx * currx
      return z * y1 + (1 - z) * y0
    }
  }

  const drawBezierArc = (
    p0: FabricPoint,
    p1: FabricPoint,
    p2: FabricPoint,
    p3: FabricPoint,
    targetCtx: CanvasRenderingContext2D,
  ) => {
    const coeffDir = 0.3
    const lngth = mhypot(p2[0] - p1[0], p2[1] - p1[1])
    const lctrl = lngth * coeffDir

    let dx = p2[0] - p0[0]
    let dy = p2[1] - p0[1]
    let ltg = mhypot(dx, dy)
    const x1c = p1[0] + (lctrl * dx) / ltg
    const y1c = p1[1] + (lctrl * dy) / ltg

    dx = p1[0] - p3[0]
    dy = p1[1] - p3[1]
    ltg = mhypot(dx, dy)
    const x2c = p2[0] + (lctrl * dx) / ltg
    const y2c = p2[1] + (lctrl * dy) / ltg

    targetCtx.bezierCurveTo(x1c, y1c, x2c, y2c, p2[0], p2[1])
  }

  class Blob {
    xc: number
    yc: number
    radiusMax: number
    nbSteps: number
    lineWidth: number
    nbPts: number
    th0: number
    huef: () => number
    points: FabricPoint[]
    pointFunctions: Array<{ angle: () => number; radius: () => number }>

    constructor(xc: number, yc: number, radiusMax: number, nbSteps: number, lineWidth: number, hue: number) {
      this.xc = xc
      this.yc = yc
      this.radiusMax = radiusMax
      this.nbSteps = nbSteps
      this.lineWidth = lineWidth
      this.nbPts = intAlea(4, 10)
      this.th0 = alea(m2PI)

      const deltadir = m2PI / this.nbPts
      const periodAngle = nbSteps / alea(1, 5)
      const periodRadius = nbSteps / alea(2, 5)
      const periodHue = nbSteps / alea(2, 5)
      this.huef = Noise1DOneShot(periodHue, hue, hue + intAlea(90))

      this.points = []
      this.pointFunctions = []

      for (let k = 0; k < this.nbPts; ++k) {
        this.pointFunctions[k] = {
          angle: Noise1DOneShot(periodAngle, deltadir * (k - 0.4), deltadir * (k + 0.4)),
          radius: Noise1DOneShot(periodRadius, 0.4, 1),
        }
      }
    }

    actualPoints(kStep: number) {
      for (let k = 0; k < this.nbPts; ++k) {
        const pf = this.pointFunctions[k]
        const angle = this.th0 + pf.angle()
        const radius = (this.radiusMax * pf.radius() * kStep) / this.nbSteps
        this.points[k] = [this.xc + radius * mcos(angle), this.yc + radius * msin(angle)]
      }
    }

    draw(targetCtx: CanvasRenderingContext2D) {
      targetCtx.beginPath()
      targetCtx.moveTo(this.points[1][0], this.points[1][1])
      let k1 = 1
      let k2 = 2
      let k3 = 3
      if (k3 >= this.nbPts) k3 -= this.nbPts

      for (let k = 0; k < this.nbPts; ++k) {
        drawBezierArc(this.points[k], this.points[k1], this.points[k2], this.points[k3], targetCtx)
        k1++
        if (k1 >= this.nbPts) k1 -= this.nbPts
        k2++
        if (k2 >= this.nbPts) k2 -= this.nbPts
        k3++
        if (k3 >= this.nbPts) k3 -= this.nbPts
      }

      targetCtx.lineWidth = this.lineWidth
      targetCtx.strokeStyle = `hsl(${this.huef() % 360}, 100%, 50%)`
      targetCtx.stroke()
    }
  }

  let animState = 0
  let blob: Blob | null = null
  let kStep = 0
  let events: Array<{ event: 'reset' | 'click' }> = []

  const startOver = () => {
    if (!canv || !ctx) return false

    const rect = canv.getBoundingClientRect()
    maxx = Math.max(1, rect.width)
    maxy = Math.max(1, rect.height)
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    canv.width = Math.floor(maxx * dpr)
    canv.height = Math.floor(maxy * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, maxx, maxy)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, maxx, maxy)
    return true
  }

  const animate = () => {
    rafId = window.requestAnimationFrame(animate)
    if (!ctx) return

    const event = events.pop()
    if (event && (event.event === 'reset' || event.event === 'click')) animState = 0

    const tinit = performance.now()

    do {
      switch (animState) {
        case 0: {
          if (startOver()) {
            const radMax = mhypot(maxx / 2, maxy / 2) * 3
            kStep = mround(radMax * 5)
            blob = new Blob(maxx / 2, maxy / 2, radMax, kStep, 0.1, intAlea(360))
            animState = 1
          }
          break
        }
        case 1: {
          if (!blob) {
            animState = 0
            break
          }
          blob.actualPoints(kStep)
          blob.draw(ctx)
          if (--kStep <= 0) animState = 2
          break
        }
        default:
          break
      }
    } while (animState === 1 && performance.now() - tinit < SPEED_ANIM)
  }

  const start = () => {
    canv = fabricCanvasRef.value
    if (!canv) return
    ctx = canv.getContext('2d')
    if (!ctx) return

    resizeObserver?.disconnect()
    resizeObserver = new ResizeObserver(() => {
      events.push({ event: 'reset' })
    })
    resizeObserver.observe(canv)

    events = [{ event: 'reset' }]
    rafId = window.requestAnimationFrame(animate)
  }

  const stop = () => {
    if (rafId) window.cancelAnimationFrame(rafId)
    rafId = 0
    resizeObserver?.disconnect()
    resizeObserver = null
    ctx = null
    canv = null
    events = []
  }

  const click = () => {
    events.push({ event: 'click' })
  }

  return { start, stop, click }
}

const fabricEffect = useFabricEffect()

const homeVersion = 'v1.0.0'

const featureItems = [
  '用户管理',
  '角色管理',
  '操作日志',
  '登录日志',
  '定时任务日志',
  '菜单管理',
  '定时任务',
  '系统任务',
  '字典项/字典值',
  '接口文档',
  'AI 表结构生成',
  '代码生成',
  '缓存监控',
  '数据监控',
  '服务监控',
  '缓存监控',
  '缓存列表',
  'Admin监控',
]

const frontendStack = [
  { label: 'Vue', value: '^3.5.13' },
  { label: 'Vue Router', value: '^4.5.0' },
  { label: 'Element Plus', value: '^2.9.3' },
  { label: 'Pinia', value: '^2.1.7' },
  { label: 'Vite', value: '^5.2.0' },
  { label: 'TypeScript', value: '^5.2.2' },
  { label: 'Sass', value: '^1.79.0' },
  { label: 'Axios', value: '^1.7.9' },
  { label: 'ECharts', value: '^5.6.0' },
  { label: 'VXE-Table', value: '4.9.26' },
  { label: 'Lodash', value: '^4.17.21' },
  { label: 'Animate.css', value: '^4.1.1' },
]

const backendStack = [
  { label: 'JDK', value: '11' },
  { label: 'Spring Boot', value: '2.7.18' },
  { label: 'Spring Cloud', value: '2021.0.8' },
  { label: 'Spring Cloud Alibaba', value: '2021.0.5.0' },
  { label: 'Mybatis Plus', value: '3.5.5' },
  { label: 'PageHelper', value: '2.0.0' },
  { label: 'Druid', value: '1.1.21' },
  { label: 'Knife4j', value: '3.0.3' },
  { label: 'easyexcel', value: '4.0.2' },
  { label: 'hutool', value: '5.8.27' },
  { label: 'JWT', value: '0.9.1' },
  { label: 'Oshi', value: '6.4.2' },
]

const quotes = [
  '五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。',
  '写代码像练武：先立规矩，再求速度。',
  '今天也要把一个小问题解决掉。',
  'Bug 不会消失，只会转移到更晚的时间。',
  '把复杂交给系统，把简单留给自己。',
  '少写 if，先想清楚数据结构。',
]

const goals = [
  '修一个小 Bug',
  '补一个小功能',
  '删一段无用代码',
  '优化一次交互',
  '跑一遍 lint',
  '写一个可复用组件',
]

const quoteIndex = ref(0)
const quoteKey = ref(0)

const quote = computed(() => quotes[quoteIndex.value] ?? quotes[0])
const typingSteps = computed(() => {
  const len = quote.value.length || 16
  return `${Math.max(14, Math.min(42, len))}`
})

const nextQuote = () => {
  quoteIndex.value = (quoteIndex.value + 1) % quotes.length
  quoteKey.value += 1
}

const now = ref(new Date())
const greeting = computed(() => {
  const hour = now.value.getHours()
  if (hour < 6) return '夜深了，辛苦啦，'
  if (hour < 12) return '早上好，'
  if (hour < 18) return '下午好，'
  return '晚上好，'
})

const weekdayText = computed(() => {
  const map = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const day = map[now.value.getDay()] ?? ''
  return `${day} · ${now.value.getFullYear()}-${String(now.value.getMonth() + 1).padStart(2, '0')}-${String(
    now.value.getDate(),
  ).padStart(2, '0')}`
})

const todayGoal = computed(() => {
  const idx = (now.value.getFullYear() + now.value.getMonth() + now.value.getDate()) % goals.length
  return goals[idx] ?? goals[0]
})

const jobTotal = ref(0)
const taskTotal = ref(0)

const getCounts = async () => {
  try {
    const jobRes: any = await listJob({ page: 1, size: 1 })
    if (jobRes.code == 200) {
      jobTotal.value = jobRes.total
    }
    const taskRes: any = await listTask({ page: 1, size: 1 })
    if (taskRes.code == 200) {
      taskTotal.value = taskRes.total
    }
  } catch (error) {
    console.error('Failed to fetch counts:', error)
  }
}

onMounted(() => {
  getCounts()
  quoteIndex.value = Math.floor(Math.random() * quotes.length)
  quoteKey.value += 1
  now.value = new Date()
  fabricEffect.start()
})

onBeforeUnmount(() => {
  fabricEffect.stop()
})

const onWelcomeCardClick = (evt: MouseEvent) => {
  const target = evt.target as HTMLElement | null
  if (!target) return
  if (target.closest('button, a, input, textarea, [role="button"], .el-button')) return
  fabricEffect.click()
}

const notices = ref([
  {
    content: '关于系统将于本周六凌晨进行停机维护的通知',
    time: '2023-12-05',
    tag: '维护',
    type: 'danger',
  },
  {
    content: '祝贺本系统注册用户突破 3000 人！',
    time: '2023-12-03',
    tag: '喜报',
    type: 'success',
  },
  {
    content: '新版本 v1.0.0 功能特性详细介绍',
    time: '2023-12-01',
    tag: '功能',
    type: 'primary',
  },
  {
    content: '常见问题解答 (FAQ) 更新',
    time: '2023-11-28',
    tag: '帮助',
    type: 'warning',
  },
  {
    content: '关于加强账号安全防护的建议',
    time: '2023-11-25',
    tag: '安全',
    type: 'info',
  },
])

const updates = ref([
  {
    title: '系统 v1.0.0 正式发布',
    content: '基础功能上线，包含用户、角色、菜单权限管理，以及代码生成器等功能。',
    timestamp: '2023-12-01',
    type: 'primary',
    color: '#0bbd87',
  },
  {
    title: '新增 AI 表结构生成',
    content: '支持通过自然语言描述生成数据库表结构，极大提高开发效率。',
    timestamp: '2023-11-20',
    type: 'success',
  },
  {
    title: '优化系统性能',
    content: '修复了部分已知 Bug，优化了首屏加载速度。',
    timestamp: '2023-11-15',
    type: 'info',
  },
  {
    title: '集成 ECharts 图表',
    content: '首页新增数据可视化图表，支持实时数据监控。',
    timestamp: '2023-11-10',
    type: 'warning',
  },
])
</script>
<script lang="ts">
export default {
  name: 'home',
}
</script>
<style lang="scss" scoped>
.home_welcome_card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--lvshihao-theme-color);
  border-radius: 12px;
  isolation: isolate;
  cursor: pointer;
  box-shadow: 0 0 8px -2px var(--lvshihao-theme-color);
  transition: all 0.3s ease;
}

.home_welcome_card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgb(255 255 255 / 40%) 50%,
    transparent 100%
  );
  transform: skewX(-25deg);
  pointer-events: none;
  z-index: 3;
  animation: shineScan 6s infinite;
}

.home_welcome_card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgb(0 0 0 / 12%), 0 0 16px -4px var(--lvshihao-theme-color);
}

.home_welcome_card:hover::after {
  animation: shineScan 3s infinite;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgb(255 255 255 / 50%) 50%,
    transparent 100%
  );
}

.fabric_canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.home_welcome {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgb(255 255 255 / 78%);
  backdrop-filter: blur(6px);
}

.avatar_wrap {
  position: relative;
  flex: 0 0 auto;
  border-radius: 12px;
}

.avatar_wrap::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 16px;
  background: radial-gradient(
    circle at 30% 30%,
    rgb(111 104 246 / 26%),
    transparent 60%
  );
  opacity: 0.9;
  animation: avatarPulse 2.4s ease-in-out infinite;
  pointer-events: none;
}

.online_dot {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0bbd87;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 90%);
  animation: dotBreath 1.6s ease-in-out infinite;
}

.welcome_text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.welcome_title {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-left: 4px;
}

.greeting {
  font-size: 18px;
  font-weight: 700;
  color: black;
}

.username {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.2px;
  background: linear-gradient(90deg, var(--lvshihao-theme-color), #0bbd87, #0062ff);
  background-size: 200% 100%;
  background-clip: text;
  color: transparent;
  animation: nameGradient 3.8s ease-in-out infinite;
}

.welcome_sub {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 4px;
  min-width: 0;
}

.typing {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 12px;
  font-weight: 600;
  color: #767676;
  animation:
    typingReveal 0.9s steps(var(--typing-steps, 24)) both,
    caretBlink 0.9s step-end 2;
}

.quote_btn {
  flex: 0 0 auto;
  padding: 0;
  line-height: 1;
  font-weight: 700;
  color: var(--lvshihao-theme-color);
  opacity: 0.9;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.quote_btn:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.welcome_meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: 4px;
}

.meta_tag {
  border-radius: 999px;
}

:global(html.dark) .home_welcome {
  background: rgb(40 40 40 / 55%);
}


:global(html.dark) .typing {
  color: rgb(207 211 220 / 82%);
}

:global(html.dark) .online_dot {
  box-shadow: 0 0 0 2px rgb(0 0 0 / 55%);
}

@keyframes avatarPulse {
  0%,
  100% {
    transform: scale(0.98);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.04);
    opacity: 1;
  }
}

@keyframes dotBreath {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}

@keyframes nameGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes typingReveal {
  from {
    max-width: 0;
  }
  to {
    max-width: 100%;
  }
}

@keyframes caretBlink {
  0%,
  100% {
    box-shadow: inset -2px 0 0 transparent;
  }
  50% {
    box-shadow: inset -2px 0 0 rgb(111 104 246 / 55%);
  }
}

.home_mid_row {
  margin-top: 10px;
  --mid-card-height: 420px;
}

.home_panels {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: var(--mid-card-height);
}

.home_panels_row {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr;
  gap: 10px;
}

@media (max-width: 1200px) {
  .home_panels_row {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

.home_panel {
  position: relative;
  overflow: hidden;
  border: 0;
  border-radius: 14px;
}

.home_panel::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  opacity: 0.95;
  background: var(--lvshihao-theme-color);
}

:global(.home_panel .el-card__body) {
  padding: 12px 14px;
}

.card-chat {
  min-height: var(--mid-card-height);
  height: var(--mid-card-height);
}

.panel_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.panel_title {
  font-size: 14px;
  font-weight: 800;
  color: var(--el-text-color-primary);
}

.panel_sub {
  font-size: 12px;
  font-weight: 600;
  color: var(--el-text-color-secondary);
  margin-bottom: 10px;
}

.pill_list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill_tag {
  border-radius: 6px;
}

.kv_list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel--frontend,
.panel--backend {
  height: 100%;
}

.panel--frontend :global(.el-card__body),
.panel--backend :global(.el-card__body) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel--frontend .kv_list,
.panel--backend .kv_list {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.panel--frontend .panel_head,
.panel--backend .panel_head {
  justify-content: center;
}

.kv_row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.kv_key {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.kv_val {
  font-size: 12px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  text-align: right;
}

:global(html.dark) .home_panel {
  box-shadow: 0 10px 26px rgb(0 0 0 / 35%);
}

:global(html.dark) .card-chat {
  box-shadow: 0 10px 26px rgb(0 0 0 / 35%);
}
.box-card {
  height: 100%;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-title {
      font-size: 16px;
      font-weight: bold;
      color: var(--lvshihao-theme-color);
    }
  }
}
.notice-list {
  padding: 5px;
  .notice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.3s;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: #fafafa;
      .notice-content {
        color: var(--lvshihao-theme-color);
      }
    }
    .notice-tag {
      margin-right: 10px;
      flex-shrink: 0;
    }
    .notice-content {
      overflow: hidden;
      margin-right: 10px;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #606266;
      transition: color 0.3s;
      flex: 1;
      line-height: 1.5; // 增加行高防止文字被切
    }
    .notice-time {
      font-size: 12px;
      color: #909399;
      flex-shrink: 0;
    }
  }
}
.timeline-card {
  padding: 10px;
  h4 {
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 13px;
    color: #909399;
  }
}

// 暗黑模式适配
html.dark {
  .notice-list {
    .notice-item {
      border-bottom-color: #363637;
      &:hover {
        background-color: #1d1e1f;
      }
      .notice-content {
        color: #cfd3dc;
      }
    }
  }
  .timeline-card {
    border-color: #363637;
    background-color: #1d1e1f;
    h4 {
      color: #cfd3dc;
    }
  }
}

.welcome_stats {
  margin-left: auto;
  display: flex;
  gap: 24px;
  padding-right: 12px;
}
.stat_item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.stat_icon_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgb(255 255 255 / 50%);
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
  color: var(--lvshihao-theme-color);
}
.stat_text {
  display: flex;
  flex-direction: column;
}
.stat_value {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
  color: #333;
}
.stat_label {
  font-size: 12px;
  color: #666;
}
:global(html.dark) .stat_value {
  color: #eee;
}
:global(html.dark) .stat_label {
  color: #aaa;
}
:global(html.dark) .stat_icon_wrap {
  background: rgb(255 255 255 / 5%);
}
</style>
