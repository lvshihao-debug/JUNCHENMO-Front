<template>
  <div>
    <div class="container">
      <div class="calendar">
        <div class="calendar-header">
          <span class="month-picker" @click="showMonthList">
            {{ month_names[currentMonth] }}
          </span>
          <div class="year-picker">
            <span class="year-change" @click="prevYear">
              <pre><</pre>
            </span>
            <span id="year">{{ currentYear }}</span>
            <span class="year-change" @click="nextYear">
              <pre>></pre>
            </span>
          </div>
        </div>

        <div class="calendar-body">
          <div class="calendar-week-days">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="calendar-days"></div>
        </div>
        <div class="calendar-footer"></div>
        <div class="date-time-format">
          <div class="day-text-format">TODAY</div>
          <div class="date-time-value">
            <div class="time-format">02:51:20</div>
            <div class="date-format">23 - july - 2022</div>
          </div>
        </div>
        <div class="month-list" :class="monthListClass">
          <div v-for="(e, index) in month_names" :key="index">
            <div @click="selectMonth(index)">{{ e }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 判断是否为闰年的函数
const isLeapYear = (year: number) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  )
}

// 根据年份获取2月的天数
const getFebDays = (year: number) => {
  return isLeapYear(year) ? 29 : 28
}

// 月份名称数组
const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// 当前选中的月份，使用ref创建响应式数据，初始值为当前日期的月份
const currentMonth = ref(new Date().getMonth())
// 当前选中的年份，使用ref创建响应式数据，初始值为当前日期的年份
const currentYear = ref(new Date().getFullYear())

// 控制月份列表显示隐藏的类名，使用ref创建响应式数据
const monthListClass = ref('hideonce')

// 显示月份列表的方法，切换月份列表的显示隐藏类名，并控制相关时间格式显示隐藏
const showMonthList = () => {
  monthListClass.value = 'show'
  document.querySelector('.day-text-format')?.classList.remove('showtime')
  document.querySelector('.day-text-format')?.classList.add('hidetime')
  document.querySelector('.time-format')?.classList.remove('showtime')
  document.querySelector('.time-format')?.classList.add('hideTime')
  document.querySelector('.date-format')?.classList.remove('showtime')
  document.querySelector('.date-format')?.classList.add('hideTime')
}

// 生成日历的方法，根据传入的月份和年份生成对应日历布局及日期显示
const generateCalendar = (month: number, year: number) => {
  const calendar_days = document.querySelector('.calendar-days')
  if (calendar_days) {
    calendar_days.innerHTML = ''
  }
  const calendar_header_year = document.querySelector('#year')
  if (calendar_header_year) {
    calendar_header_year.textContent = `${year}`
  }
  const days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]

  const first_day = new Date(year, month)

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    const day = document.createElement('div')
    if (i >= first_day.getDay()) {
      day.innerHTML = `${i - first_day.getDay() + 1}`
      const currentDate = new Date()
      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date')
      }
    }
    if (calendar_days) {
      calendar_days.appendChild(day)
    }
  }
}

// 选择月份的方法，更新当前选中的月份，重新生成日历，切换月份列表显示隐藏及时间格式显示隐藏
const selectMonth = (index: number) => {
  currentMonth.value = index
  generateCalendar(currentMonth.value, currentYear.value)
  monthListClass.value = 'hide'
  document.querySelector('.day-text-format')?.classList.remove('hideTime')
  document.querySelector('.day-text-format')?.classList.add('showtime')
  document.querySelector('.time-format')?.classList.remove('hideTime')
  document.querySelector('.time-format')?.classList.add('showtime')
  document.querySelector('.date-format')?.classList.remove('hideTime')
  document.querySelector('.date-format')?.classList.add('showtime')
}

// 上一年的方法，将当前年份减1，并重新生成日历
const prevYear = () => {
  currentYear.value--
  generateCalendar(currentMonth.value, currentYear.value)
}

// 下一年的方法，将当前年份加1，并重新生成日历
const nextYear = () => {
  currentYear.value++
  generateCalendar(currentMonth.value, currentYear.value)
}

// 页面加载时生成初始日历
onMounted(() => {
  generateCalendar(currentMonth.value, currentYear.value)
})

// 实时更新时间显示的定时器逻辑，每秒更新一次时间格式的显示内容
const todayShowTime = document.querySelector('.time-format')
const todayShowDate = document.querySelector('.date-format')
const updateTime = () => {
  const currshowDate = new Date()
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption,
  ).format(currshowDate)
  if (todayShowDate) {
    todayShowDate.textContent = currentDateFormate
  }
  const timer = new Date()
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer)
  if (todayShowTime) {
    todayShowTime.textContent = formateTimer
  }
}
setInterval(updateTime, 1000)
</script>

<style lang="scss">
:root {
  --dark-text: #f8fbff;
  --light-body: #f3f8fe;
  --light-main: #fdfdfd;
  --light-second: #c3c2c8;
  --light-hover: #f0f0f0;
  --light-text: #151426;
  --light-btn: #9796f0;
  --blue: #0000ff;
  --white: #ffffff;
  --shadow: rgb(100 100 111 / 20%) 0 7px 29px 0;
  --font-family: consolas;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  overflow: hidden;
  font-family: var(--font-family);
  background: linear-gradient(to right, #9796f0, #fbc7d4);
  place-items: center;
}
.container {
  position: relative;
  top: 10%;
  right: 0%;
  display: flex;
  justify-content: center;
  padding: 2% 0 0;
  width: max-content;
  width: 100%;
  height: max-content;
  height: 100%;
}
.calendar {
  overflow: hidden;
  padding: 30px 50px 0;
  width: max-content;
  height: 610px;
  border-radius: 25px;
  background-color: white;
}
.calendar {
  box-shadow: var(--shadow);
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-weight: 700;
  color: var(--white);
  background: #9796f0;
}
.calendar-body {
  pad: 10px;
}
.calendar-week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 600;
  cursor: pointer;
  color: rgb(104 104 104);
}
.calendar-week-days div:hover {
  color: black;
  transform: scale(1.2);
  transition: all 0.2s ease-in-out;
}
.calendar-week-days div {
  display: grid;
  height: 50px;
  color: var(--bg-second);
  place-items: center;
}
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  color: var(--color-txt);
}
.calendar-days div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 37px;
  height: 33px;
  cursor: pointer;
  animation: to-top 1s forwards;
}
.month-picker {
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}
.month-picker:hover {
  background-color: var(--color-hover);
}
.month-picker:hover {
  color: var(--color-txt);
}
.year-picker {
  display: flex;
  align-items: center;
}
.year-change {
  display: grid;
  margin: 0 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  place-items: center;
  cursor: pointer;
}
.year-change:hover {
  background-color: var(--light-btn);
  transition: all 0.2s ease-in-out;
  transform: scale(1.12);
}
.year-change:hover pre {
  color: var(--bg-body);
}
.calendar-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}
#year:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: all 0.2 ease-in-out;
}
.calendar-days div span {
  position: absolute;
}
.calendar-days div:hover {
  border-radius: 20%;
  color: var(--dark-text);
  background-color: #fbc7d4;
  transition:
    width 0.2s ease-in-out,
    height 0.2s ease-in-out;
}
.calendar-days div.current-date {
  border-radius: 20%;
  color: var(--dark-text);
  background-color: var(--light-btn);
}
.month-list {
  position: relative;
  top: -50px;
  left: 0;
  display: grid;
  border-radius: 20px;
  color: var(--light-text);
  background-color: #ebebeb;
  grid-template-columns: repeat(3, auto);
  gap: 5px;
}
.month-list > div {
  display: grid;
  place-content: center;
  margin: 5px 10px;
  transition: all 0.2s ease-in-out;
}
.month-list > div > div {
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
}
.month-list > div > div:hover {
  color: var(--dark-text);
  background-color: var(--light-btn);
  transition: all 0.2s ease-in-out;
  transform: scale(0.9);
}
.month-list.show {
  visibility: visible;
  pointer-events: visible;
  transition: 0.6s ease-in-out;
  animation: to-left 0.71s forwards;
}
.month-list.hideonce {
  visibility: hidden;
}
.month-list.hide {
  animation: to-right 1s forwards;
  visibility: none;
  pointer-events: none;
}
.date-time-format {
  position: relative;
  top: 140px;
  display: inline;
  justify-content: center;
  width: max-content;
  height: max-content;
  font-family:
    'Dubai Light',
    'Century Gothic';
}
.day-text-format {
  position: absolute;
  left: -1rem;
  padding-right: 5%;
  font-size: 1.4rem;
  font-family: 'Microsoft JhengHei UI';
  border-right: 3px solid #9796f0;
}
.date-time-value {
  position: relative;
  top: -18px;
  left: 40%;
  display: block;
  width: max-content;
  height: max-content;
  text-align: center;
}
.time-format {
  font-size: 1.5rem;
}
.time-format.hideTime {
  animation: hidetime 1.5s forwards;
}
.day-text-format.hidetime {
  animation: hidetime 1.5s forwards;
}
.date-format.hideTime {
  animation: hidetime 1.5s forwards;
}
.day-text-format.showtime {
  animation: showtime 1s forwards;
}
.time-format.showtime {
  animation: showtime 1s forwards;
}
.date-format.showtime {
  animation: showtime 1s forwards;
}

@keyframes to-top {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 1;
  }
}

@keyframes to-left {
  0% {
    transform: translateX(230%);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes to-right {
  10% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-150%);
    opacity: 1;
  }
}

@keyframes showtime {
  0% {
    transform: translateX(250%);
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes hidetime {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(-370%);
    opacity: 1;
  }
}

@media (max-width: 375px) {
  .month-list > div {
    margin: 5px 0;
  }
}
</style>
