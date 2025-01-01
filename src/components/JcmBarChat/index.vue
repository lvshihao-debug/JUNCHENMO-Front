<template>
    <div>
        <div ref="chartDom" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const layoutSettingStore = useLayoutSettingStore()

// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null);
let chartInstance = null;

onMounted(async () => {
    await nextTick();
    chartInstance = echarts.init(chartDom.value);
    // const body = document.querySelector('body')
    // options.borderColor = body?.style.getPropertyValue('--lvshihao-theme-color')
    let option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: '访问量统计'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
            },
        ]
    };

    chartInstance.setOption(option);
})



</script>

<style lang="scss" scoped></style>