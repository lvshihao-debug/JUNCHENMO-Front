<template>
  <div>
    <div class="card">
      <div class="stats-wrapper">
        <p class="heading">Rating</p>
        <div class="bottom-wrapper">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="star">
            <g data-name="Layer 2">
              <g data-name="star">
                <rect opacity="0" transform="rotate(90 12 12)" height="24" width="24"></rect>
                <path
                  d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z">
                </path>
              </g>
            </g>
          </svg>
          <p class="count">4.5</p>
        </div>
      </div>
      <div class="stats-wrapper">
        <p class="heading">Review</p>
        <div class="bottom-wrapper">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="thumb">
            <path
              d="M472.06 334l-144.16-6.13c-4.61-.36-23.9-1.21-23.9-25.87 0-23.81 19.16-25.33 24.14-25.88L472.06 270c12.67.13 23.94 14.43 23.94 32s-11.27 31.87-23.94 32zM330.61 202.33L437.35 194C450 194 464 210.68 464 227.88v.33c0 16.32-11.14 29.62-24.88 29.79l-108.45-1.73C304 253 304 236.83 304 229.88c0-22.88 21.8-27.15 26.61-27.55zM421.85 480l-89.37-8.93C308 470.14 304 453.82 304 443.59c0-18.38 13.41-24.6 26.67-24.6l91-3c14.54.23 26.32 14.5 26.32 32s-11.67 31.67-26.14 32.01zm34.36-71.5l-126.4-6.21c-9.39-.63-25.81-3-25.81-26.37 0-12 4.35-25.61 25-27.53l127.19-3.88c13.16.14 23.81 13.49 23.81 31.4s-10.65 32.43-23.79 32.58z">
            </path>
            <path fill="none"
              d="M133.55 238.06A15.85 15.85 0 01126 240a15.82 15.82 0 007.51-1.92zM174.14 168.78l.13-.23-.13.23c-20.5 35.51-30.36 54.95-33.82 62 3.47-7.07 13.34-26.51 33.82-62z">
            </path>
            <path d="M139.34 232.84l1-2a16.27 16.27 0 01-6.77 7.25 16.35 16.35 0 005.77-5.25z"></path>
            <path
              d="M316.06 52.62C306.63 39.32 291 32 272 32a16 16 0 00-14.31 8.84c-3 6.07-15.25 24-28.19 42.91-18 26.33-40.35 59.07-55.23 84.8l-.13.23c-20.48 35.49-30.35 54.93-33.82 62l-1 2a16.35 16.35 0 01-5.79 5.22 15.82 15.82 0 01-7.53 2h-25.31A84.69 84.69 0 0016 324.69v38.61a84.69 84.69 0 0084.69 84.7h48.79a17.55 17.55 0 019.58 2.89C182 465.87 225.34 480 272 480c7.45 0 14.19-.14 20.27-.38a8 8 0 006.2-12.68l-.1-.14C289.8 454.41 288 441 288 432a61.2 61.2 0 015.19-24.77 17.36 17.36 0 000-14.05 63.81 63.81 0 010-50.39 17.32 17.32 0 000-14 62.15 62.15 0 010-49.59 18.13 18.13 0 000-14.68A60.33 60.33 0 01288 239c0-8.2 2-21.3 8-31.19a15.63 15.63 0 001.14-13.64c-.38-1-.76-2.07-1.13-3.17a24.84 24.84 0 01-.86-11.58c3-19.34 9.67-36.29 16.74-54.16 3.08-7.78 6.27-15.82 9.22-24.26 6.14-17.57 4.3-35.2-5.05-48.38z">
            </path>
          </svg>
          <p class="count">1.1k</p>
        </div>
      </div>
      <div class="stats-wrapper">
        <p class="heading">Sells</p>
        <div class="bottom-wrapper">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tag">
            <path
              d="M448 183.8v-123A44.66 44.66 0 00403.29 16H280.36a30.62 30.62 0 00-21.51 8.89L13.09 270.58a44.86 44.86 0 000 63.34l117 117a44.84 44.84 0 0063.33 0l245.69-245.61A30.6 30.6 0 00448 183.8zM352 144a32 32 0 1132-32 32 32 0 01-32 32z">
            </path>
            <path
              d="M496 64a16 16 0 00-16 16v127.37L218.69 468.69a16 16 0 1022.62 22.62l262-262A29.84 29.84 0 00512 208V80a16 16 0 00-16-16z">
            </path>
          </svg>
          <p class="count">2.1k</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>
<style lang="scss" >
/* From Uiverse.io by vinodjangid07 */
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.stats-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100px;
  height: 90px;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  padding: 15px;
  box-shadow:
    20px 20px 60px #e6e6e6,
    -20px -20px 60px #f3f3f3;
}

.heading {
  font-size: 0.7em;
  font-weight: 700;
  letter-spacing: 1px;
}

.bottom-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottom-wrapper .star {
  width: 30px;
  fill: gold;
}

.bottom-wrapper .tag {
  width: 27px;
  fill: rgb(141, 214, 32);
}

.bottom-wrapper .thumb {
  width: 27px;
  fill: blueviolet;
}

.bottom-wrapper p {
  font-size: 1.2em;
  font-weight: 700;
}
</style>