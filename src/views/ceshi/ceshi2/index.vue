<template>
    <div>
        <el-card>
            <JcmBarChat />
        </el-card>
    </div>
</template>
<script setup lang="ts">
/** 
 *  作者: JUN CHEN MO
 *  time: 2024/12/26 16:33:18  
 */
// 定义图表的数据
const data = {
    labels: ['12-28', '12-29', '12-29', '12-29', '12-29', '12-29', '12-29', '12-29', '12-29'],
    datasets: [{ data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12] }]
}

</script>

<style lang="scss" scoped>

</style>