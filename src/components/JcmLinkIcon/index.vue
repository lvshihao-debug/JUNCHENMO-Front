<template>
  <div class="card">
    <a class="social-link1">
      <svg-icon name="qq" color="black" width="35px" height="35px" />
    </a>
    <a class="social-link2">
      <svg-icon name="微信" color="black" width="35px" height="35px" />
    </a>
    <a class="social-link3">
      <svg-icon name="github" color="black" width="35px" height="35px" />
    </a>
    <a class="social-link4">
      <svg-icon name="支付宝" color="black" width="35px" height="35px" />
    </a>
  </div>
</template>
<style lang="ts" setup></style>
<style scoped lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 40px;
}
.card svg {
  position: absolute;
  z-index: 2;
  display: flex;
  padding: 0.25rem;
  width: 60%;
  font-weight: 700;
  opacity: 1;
  transition: opacity 0.25s;
  cursor: pointer;
}
.card .social-link1,
.card .social-link2,
.card .social-link3,
.card .social-link4 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  border-radius: 50px;
  text-decoration: none;
  color: rgb(0 0 0);
  transition: 0.25s;
}
.card svg {
  transform: scale(1);
}
.card .social-link1:hover {
  background-color: #ffffff;
  animation: bounce_613 0.4s linear;
}
.card .social-link2:hover {
  background-color: #ffffff;
  animation: bounce_613 0.4s linear;
}
.card .social-link3:hover {
  background-color: #ffffff;
  animation: bounce_613 0.4s linear;
}
.card .social-link4:hover {
  background-color: #ffffff;
  animation: bounce_613 0.4s linear;
}

@keyframes bounce_613 {
  40% {
    transform: scale(1.4);
  }
  60% {
    transform: scale(0.8);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
