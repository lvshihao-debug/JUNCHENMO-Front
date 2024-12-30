<template>
    <div>
        <el-card class="searchCard">
          <el-input v-model="desc" type="textarea" />
        </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  const desc = ref()
  </script>
  <script lang="ts">
  export default {
    name: 'aiTableGen',
  }
  </script>
  <style scoped>
  
  </style>