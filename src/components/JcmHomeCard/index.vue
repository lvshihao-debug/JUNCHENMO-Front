<template>
  <div>
    <div class="home-card">
      <div class="title">
        <span>
          <svg-icon :name="icon" color="currentColor" width="15px" height="15px" />
        </span>
        <p class="home-card-title-text">
          {{ title }}
        </p>
        <p class="percent">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
            <path
              d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
            </path>
          </svg> {{ rate }}
        </p>
      </div>
      <div class="data">
        <p>
          {{ data }}
        </p>

        <!-- <div class="range">
                    <div class="fill">
                    </div>
                </div> -->
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
/** 
 *  作者: JUN CHEN MO
 *  time: 2024/12/26 16:33:18  
 */
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  data: {
    type: String,
    default: ''
  },
  rate: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.home-card {
  background-color: #fff;
  box-shadow:  0px 4px 20px #00000010;
  padding: 1rem;
  // box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.title {
  display: flex;
  align-items: center;
}

.title span {
  position: relative;
  padding: 0.5rem;
  background-color: var(--lvshihao-theme-color);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
}

.title span svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  height: 1rem;
}

.home-card-title-text {
  margin-left: 0.5rem;
  color: #374151;
  font-size: 17px;
}

.percent {
  margin-left: 0.5rem;
  color: var(--lvshihao-theme-color);
  font-weight: 600;
  display: flex;
}

.data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.home-card {
  .data p {
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    color: #1F2937;
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 700;
    text-align: left;
  }
}


.data .range {
  position: relative;
  background-color: #E5E7EB;
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
}

.data .range .fill {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #10B981;
  width: 72%;
  height: 100%;
  border-radius: 0.25rem;
}
</style>