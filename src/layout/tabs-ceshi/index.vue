<template>
    <el-row class="row-tabs" :class="themeClass" style="display: flex;align-items: center;">
        <el-col :span="23">
            <div class="main-box">
                <div class="main-box-tab">
                    <i @click="previous">
                        <div class="jcm-tabs-icon-tool">
                            <svg-icon class="tabs-dropdown-icon-jcm" name="左滑" width="20px" height="25px"
                                :color="layoutSettingStore.getThemeInvert" />
                        </div>
                    </i> <i @click="next">
                        <div class="jcm-tabs-icon-tool">
                            <svg-icon class="tabs-dropdown-icon-jcm" name="右滑" width="20px" height="25px"
                                :color="layoutSettingStore.getThemeInvert" />
                        </div>
                    </i>
                    <div class="main-box-tab-content" ref="tabsRef">

                        <div class="main-box-tab-roll">
                    <transition-group name="tab">

                            <el-check-tag v-for="tag in tabsStore.tabs" :key="tag" :disable-transitions="false"
                                :checked="tag.checked" class="el-check-tag-jcm"
                                @click="tabsStore.routerTab(tag, $router)">
                                <div style="display: flex; align-items: center">
                                    <!--隐藏图标-->
                                    <div v-show="layoutSettingStore.setting.tabsIcon">
                                        <svg-icon :name="tag.icon" :color="iconColor" :width="12" :height="12" />
                                    </div>
                                    <div class="jcm-tabs-titleWithIcon">
                                        <!-- 新增的分隔符 -->
                                        <span>{{ tag.title }}</span>
                                        <template v-if="tag.closable === true">
                                            <svg-icon class="jcm-tabs-icon" name="叉" :width="12" :height="12"
                                                @click.stop="tabsStore.removeTab(tag, $router)" :color="iconColor" />
                                        </template>
                                    </div>
                                </div>
                            </el-check-tag>
                </transition-group>

                        </div>

                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="1" style="display: flex;justify-content: center;">
            <el-dropdown class="el-dropdown-jcm">
                <div class="jcm-tabs-icon-tool">
                    <svg-icon class="tabs-dropdown-icon-jcm" name="下选" width="20px" height="20px"
                        :color="layoutSettingStore.getThemeInvert" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="CircleCloseFilled" @click="tabsStore.removeOutherTab(route.path)">
                            关闭其他标签
                        </el-dropdown-item>
                        <el-dropdown-item icon="CircleCloseFilled" @click="tabsStore.removeAllTab($router)">
                            关闭所有标签
                        </el-dropdown-item>
                        <el-dropdown-item icon="CircleCloseFilled" @click="tabsStore.removeAllLeftTab(route.path)">
                            关闭左侧标签
                        </el-dropdown-item>
                        <el-dropdown-item icon="CircleCloseFilled" @click="tabsStore.removeAllRightTab(route.path)">
                            关闭右侧标签
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
//导入Router
import { useRouter, useRoute } from 'vue-router'
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'

const layoutSettingStore = useLayoutSettingStore()
const tabsStore = useTabsStore()

const $router = useRouter()
const route = useRoute()
// 定义响应式数据
const moveX = ref(0);
//可见区域的tab数量
const tabsCount = ref(0);
//TODO: 这个width如果页面变小需要根据页面的宽度重新赋值，现在没做
const width = ref(0);
// 获取 tabs 的引用
const tabsRef = ref<HTMLElement | null>(null);

//1.获取当前的可视区域宽度
//2.获取当前tag的所占用宽度总合
//3.添加元素，增加tag的所占宽度 ,如果超出可视区域则动画移动超出的宽度
//4.删除元素，减少tag的所占宽度
//4.点击元素，减少tag的所占宽度

//获取主题样式
const themeClass = computed(() => {
    return layoutSettingStore.getThemeStatus ? 'sunny' : 'moon';
});
//图标根据主题模式动态切换颜色
const iconColor = computed(() => layoutSettingStore.getThemeStatus ? 'black' : 'white');

// 往左偏移
const previous = () => {
    if (moveX.value > 0) {
        moveX.value -= width.value;
        translateX(moveX.value);
    }
};
// 往右偏移
const next = () => {
    let totalWidth = 0;
    tabsStore.tabs.forEach((tag: any) => {
        const nameLength = tag.title.length;
        //TODO: 67px是tag没有字符串的默认宽度(包括右边距10px)，12px是单个字符串的宽度
        totalWidth += 67 + (nameLength * 11.5);
    })
    console.log(totalWidth)
    nextTick(() => {
        if (tabsRef.value) {
            // 可视区域 < 滚动区域（滚动区域大于可视区域才可以移动）
            // 移动距离 + 可视区域 = 滚动区域的宽度（上一次的宽度，当点击时才是实际宽度）< 滚动区域
            console.log(tabsRef.value.clientWidth)
            console.log(moveX.value)

            // 67 79  91 103 115 127 1957
            if (tabsRef.value.clientWidth < totalWidth && moveX.value + tabsRef.value.clientWidth < totalWidth) {

                if (totalWidth - (moveX.value + tabsRef.value.clientWidth) <= 127) {
                    moveX.value += totalWidth - (moveX.value + tabsRef.value.clientWidth)
                } else {
                    moveX.value += 127;
                }

                if (moveX.value + tabsRef.value.clientWidth > totalWidth) {
                    moveX.value = moveX.value - 127;
                }
                translateX(moveX.value);
            }
        }
    });
};

// 开始移动 dom
const translateX = (x: number) => {
    moveX.value = x < 0 ? 0 : x;
    if (tabsRef.value?.children[0]) {
        (tabsRef.value.children[0] as HTMLElement).style.transform = `translateX(-${moveX.value}px)`;
    }
};
// 观察 actionName 的变化
watch(() => tabsStore.actionName, (val) => {
    const len = tabsStore.tabs.length;
    // 如有重复数据退出后续函数执行
    for (let i = 0; i < len; i++) {
        if (tabsStore.tabs[i].title === val) {
            nextTick(() => {
                tabCount();
                translateX((i + 1 - tabsCount.value) * width.value);
            });
            return;
        }
    }
});
onMounted(() => {
    // 初始化计数
    tabsStore.count = tabsStore.tabs.length;
    nextTick(() => {
        tabCount();
        if(tabsStore.tabs.length > 1){
            tabsStore.actionName = tabsStore.tabs.find((tag: any) => tag.checked).title;
        }else if(tabsStore.tabs.length == 1){
            tabsStore.actionName = tabsStore.tabs[0].title;
        }
    });
});

const tabCount = () => {
    if (tabsRef.value) {
        let tabsWidth = tabsRef.value.offsetWidth;
        let number = 0;
        for (let i = 0; i < tabsStore.tabs.length; i++) {
            const getStyle = getComputedStyle(tabsRef.value.children[0].children[number], null);
            const marginLeft = parseFloat(getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2));
            const marginRight = parseFloat(getStyle.marginRight.substr(0, getStyle.marginRight.length - 2));
            // tag元素实际宽度 = 元素的宽度 + 外边距
            width.value = marginLeft + marginRight + tabsRef.value.children[0].children[number].offsetWidth;
            if ((tabsWidth = tabsWidth - width.value) <= 0) {
                break;
            } else {
                ++number;
            }
        }
        tabsCount.value = number;
    }
}

</script>
<script lang="ts">
export default {
    name: 'ceshi6',
}
</script>
<style lang="scss" scoped>
.el-check-tag-jcm {
    padding: 0px;
    margin-right: 10px;
    display: flex;
    align-items: center;
}

.jcm-tabs-titleWithIcon {
    margin-left: 3px;
    display: flex;
    align-items: center;

    .jcm-tabs-icon {
        border-radius: 50%;
        margin-left: 3px;
        padding: 1px;
    }

    .jcm-tabs-icon:hover {
        background-color: #e7e7f5;
    }
}

.jcm-tabs-icon-tool {
    background-color: #fff;
    height: 25px;
    width: 30px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 4px 20px #00000010;
    cursor: pointer;
    border-radius: 6px;
}

.dark {
    .jcm-tabs-icon-tool {
        background-color: var(--lvshihao-moon-bg);
        box-shadow: 0px 4px 20px #ffffff10;
    }
}

.main-box {
    padding: 0px 0px 0px 10px;

    .main-box-tab {
        position: relative;
        padding: 10px 20px;
        overflow: hidden;

        &>i {
            position: absolute;
            cursor: pointer;

            &:nth-child(1) {
                left: 0;
            }

            &:nth-child(2) {
                right: 0;
            }
        }

        .main-box-tab-content {
            margin: 0px 15px;
            overflow: hidden;

            .main-box-tab-roll {
                transition: transform .5s;
                display: flex;
                align-items: center;

                div {
                    flex-shrink: 0;
                    cursor: pointer;
                    width: auto;
                    /*width: 140px;*/
                    height: 25px;
                    margin: 0 5px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    span,
                    i {
                        font-size: 12px;
                    }

                    span {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    i {
                        margin-right: 10px;
                    }
                }
            }
        }

        .tab-item {
            color: #cccccc;
            background-color: rgba(255, 255, 255, .5);
            border-radius: 0 1px 0 1px;
            border: 1px solid #052141;
        }

        .tab-item-action {
            color: #ffffff;
            background: rgba(0, 180, 255, 0.8);
            border-radius: 0 1px 0 1px;
            border: 1px solid #1E2088;
        }

    }

}
</style>