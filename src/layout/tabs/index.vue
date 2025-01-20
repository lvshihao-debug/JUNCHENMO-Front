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
                                                    @click.stop="tabsStore.removeTab(tag, $router)"
                                                    :color="iconColor" />
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
// 获取 tabs 的引用
const tabsRef = ref<HTMLElement | null>(null);

//获取主题样式
const themeClass = computed(() => {
    return layoutSettingStore.getThemeStatus ? 'sunny' : 'moon';
});
//图标根据主题模式动态切换颜色
const iconColor = computed(() => layoutSettingStore.getThemeStatus ? 'black' : 'white');

// 往左偏移
const previous = () => {
    previousOrNext(false);
};
// 往右偏移
const next = () => {
    previousOrNext(true);
};

const previousOrNext = (direction: boolean) => {
    const tabbox = document.getElementsByClassName("main-box-tab-roll");
    if (tabbox.length > 0) {
        const transform = tabbox[0].style.transform;
        if (transform) {
            const match = transform.match(/translateX\((-?\d+)px\)/);
            if (match) {
                const translateXValue = parseInt(match[1], 10);
                console.log(translateXValue)
                const positiveTranslateXValue = Math.abs(translateXValue);
                let moveWidth = 0;
                const moveBase = 120;
                if(direction){
                    moveWidth  = positiveTranslateXValue + moveBase;
                }else{
                    moveWidth  = positiveTranslateXValue - moveBase;
                }
                if(tabsRef.value){
                    //获取可视化的tabsdiv的宽度
                    let tabsWidth = tabsRef.value.offsetWidth;
                    //获取总tabs的宽度
                    let tabTotalWidth = 0;
                    for (let i = 0; i < tabsStore.tabs.length; i++) {
                        const getStyle = getComputedStyle(tabsRef.value.children[0].children[i], null);
                        const marginLeft = parseFloat(getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2));
                        const marginRight = parseFloat(getStyle.marginRight.substr(0, getStyle.marginRight.length - 2));
                        // tag元素实际宽度 = 元素的宽度 + 外边距
                        tabTotalWidth += marginLeft + marginRight + tabsRef.value.children[0].children[i].offsetWidth;
                    }
                    const remainWidth =tabTotalWidth - (tabsWidth + positiveTranslateXValue)
                    //如果（可视区域的宽度 + （当前偏移的宽度和固定偏移的80））小于当前的总tabs宽度，则继续偏移，否则偏移到剩余宽度
                    if( (tabsWidth + moveWidth) < tabTotalWidth){
                        translateX(moveWidth);
                    }else if(remainWidth!=0){
                        translateX(positiveTranslateXValue + remainWidth);
                    }
                }
            } else {
                return;
            }
        } else {
            return;
        }
    } else {
        return;
    }
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
                move(tabsStore.tabs[i].path);
            });
            return;
        }
    }
});

onMounted(() => {
    //添加当前刚进入页面的tab
    const exist = tabsStore.tabs.find((tag: any) => tag.path === route.path);
    if (!exist) {
        tabsStore.addTab(
          {
            path: route.path,
            closable: true,
            title: route.meta.title as string,
            checked: true,
            icon: route.meta.icon as string,
          },
          $router,'add'
        )
    }
    // 初始
    nextTick(() => {
        if (tabsStore.tabs.length > 1) {
            const currenttagItem = tabsStore.tabs.find((tag: any) => tag.checked);
            move(currenttagItem.path);
        } else if (tabsStore.tabs.length == 1) {
            move(tabsStore.tabs[0].path);
        }
    });
});

const move = (path: string) => {
    if (tabsRef.value) {
        const lastTab = tabsStore.tabs[tabsStore.tabs.length - 1];
        let tabsWidth = tabsRef.value.offsetWidth;
        let tabTotalWidth = 0;
        for (let i = 0; i < tabsStore.tabs.length; i++) {
            const getStyle = getComputedStyle(tabsRef.value.children[0].children[i], null);
            const marginLeft = parseFloat(getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2));
            const marginRight = parseFloat(getStyle.marginRight.substr(0, getStyle.marginRight.length - 2));
            // tag元素实际宽度 = 元素的宽度 + 外边距
            tabTotalWidth += marginLeft + marginRight + tabsRef.value.children[0].children[i].offsetWidth;
            if (tabsStore.tabs[i].path == path) {
                break;
            }
        }
        const pianyi = tabTotalWidth - tabsWidth;
        nextTick(() => {
            if(lastTab.path == path){
                translateX(pianyi);
            }else{
                translateX(pianyi + 20);
            }
        });
    }
}

</script>
<script lang="ts">
export default {
    name: 'tabs',
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