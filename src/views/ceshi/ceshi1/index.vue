<template>
  
  <div class="layout-icon" onclick="toggleTwoColumnLayout()">
    <div class="left-column">
      <div class="left-menu-item"></div>
      <div class="left-menu-item"></div>
      <div class="left-menu-item"></div>
    </div>
    <div class="right-column">
      <div class="right-item"></div>
      <div class="right-item"></div>
      <div class="right-item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'ceshi1',
}
</script>
<style scoped>
    /* 整体图标容器样式 */
    .layout-icon {
        width: 66px;
        height: 45px;
        background-color: white;
        display: flex;
        cursor: pointer;
        margin-bottom: 10px;
        border-radius: 6px;
        box-shadow: 0 2px 8px #00003;
        border: 2px solid #f9f9f9;
    }
    .layout-icon:active{
      
    }
    /* 左侧栏样式 */
  .left-column {
        width: 35%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 5px;
    }

    /* 左侧栏中的每个长条样式 */
  .left-menu-item {
        width: 100%;
        height: 4px;
        background-color: #EDEEF0;
    }

  .left-menu-item:nth-child(2) {
    width: 80%; 
  }
    /* 右侧栏样式 */
  .right-column {
        padding: 5px;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    /* 右侧栏中的每个长条样式 */
  .right-item {
        width: 90%;
        height: 7px;
        background-color: #EDEEF0;
    }

    .right-item:nth-child(2) {
        width: 70%; /* 让右侧第二个长条稍微短一些 */
    }
</style>