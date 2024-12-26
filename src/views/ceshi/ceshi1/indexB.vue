<template>
  <div>
    <CeshiAddFromModal ref="ceshiAddFromModal"></CeshiAddFromModal>
    <JcmButton @click="ceshiAddFromModal?.open()" >
          <template #icon>
            <svg-icon name="加号" />
          </template>
    </JcmButton>
  </div>
</template>
<script setup lang="ts">
/** 
 *  作者: JUN CHEN MO
 *  time: 2024/12/26 16:33:18  
 */
//弹出窗
import CeshiAddFromModal from './components/ceshi-add-from-modal.vue'

const ceshiAddFromModal = ref()
</script>
<style lang="scss">


</style>
