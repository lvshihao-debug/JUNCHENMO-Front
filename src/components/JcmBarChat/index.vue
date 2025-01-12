<template>
    <div>
        <div ref="chartDom" style="width: 800px; height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const layoutSettingStore = useLayoutSettingStore()

// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null);
let chartInstance = null;

/**
 * themeColor:主题颜色
 * shadowColor:阴影颜色
 * theme:字体主题颜色
 */
const initOption = (themeColor: string, shadowColor: string,fontTheme: string) => {
    return {
        title: {
            text: '操作记录数 (7日)',
            textStyle:{
                color: fontTheme,
                fontSize:15
            },
            x: 'center',
            y: 'top',
            textAlign: 'left',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#DDD'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: fontTheme
                },
            },
            nameTextStyle: {
                color: '#999'
            },
            splitArea: {
                show: false
            }
        }],
        series: [{
            name: '操作次数',
            type: 'line',
            data: [23, 60, 20, 36, 23, 85, 55],
            lineStyle: {
                normal: {
                    width: 8,
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 1,
                            color: themeColor // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: shadowColor,
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderWidth: 10,
                    shadowColor: 'rgba(72,216,191, 0.3)',
                    shadowBlur: 100,
                    borderColor: '#A9F387'
                }
            },
            smooth: true
        }]
    };
}

onMounted(async () => {
    await nextTick();
    chartInstance = echarts.init(chartDom.value);
    ceshi()
})

//主题模式的变化
watch(() => layoutSettingStore.setting.themeColor, (v) => {
    if (chartInstance) {
        chartInstance.clear();
    }
    ceshi()
});

//主题模式的变化
watch(() => layoutSettingStore.setting.theme, (v) => {
    if (chartInstance) {
        chartInstance.clear();
    }
    ceshi()
});

const ceshi = () => {
    if (chartInstance) {
        const body = document.querySelector('body')
        const themeColor = body?.style.getPropertyValue('--lvshihao-theme-color');
        const theme = layoutSettingStore.getThemeStatus ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.)";
        const fontTheme = layoutSettingStore.getThemeStatus ?"#000": "#fff";
        chartInstance.setOption(initOption(themeColor as string, theme,fontTheme));
    }

}

</script>

<style lang="scss" scoped></style>