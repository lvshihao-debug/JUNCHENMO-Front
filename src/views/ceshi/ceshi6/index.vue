<template>
  <div class="main-box">
    <button @click="add('66668')">添加</button>
    <div class="main-box-tab">
      <i @click="previous">
        << </i> <i @click="next"> >> </i>
          <div class="main-box-tab-content" ref="tabsRef">
            <div class="main-box-tab-roll">
              <el-check-tag v-for="(tag, index) in tabs" :key="tag" :disable-transitions="false" :checked="true"
                class="el-check-tag-jcm" @click.stop="clickTab(tag.title)">
                <div style="display: flex; align-items: center">
                  <div class="jcm-tabs-titleWithIcon">
                    <!-- 新增的分隔符 -->
                    <span>{{ tag.title }}</span>
                    <svg-icon class="jcm-tabs-icon" name="叉" :width="12" :height="12"
                      @click.stop="close(tag.title, index)" />
                  </div>
                </div>
              </el-check-tag>
            </div>
          </div>
    </div>
    <div class="main-box-content">
      <div>{{ actionName }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//创建Tabs相关的小仓库
import useTabsStore from '@/store/modules/layout/tabs'
import { i } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
const TabsStore = useTabsStore()

// 定义响应式数据
const tabs = ref([]);
const moveX = ref(0);
const count = ref(1);
const unoccupied = ref(0);
const tabsCount = ref(0);
const differ = ref(0);
const actionName = ref('test1');
const width = ref(0);

// 获取 tabs 的引用
const tabsRef = ref<HTMLElement | null>(null);


// 点击添加按钮的方法
const add = (name:string) => {
  tabs.value.push({
      title: name
    })
  count.value++;
  actionName.value = name;

};

// 切换 tab 标签页的方法
const clickTab = (name: string) => {
  if (actionName.value !== name) {
    actionName.value = name;
  }
};

// 关闭 tab 标签页的方法
const close = (name: string, i: number) => {
  if (tabs.value.length > 1) {
    tabs.value.splice(i, 1);
    nextTick(() => {
      // 关闭第 0 个标签，并且为选中状态的触发
      if (i === 0 && name === actionName.value) {
        clickTab(tabs.value[0].name);
      }
      // 关闭的标签为选中状态的触发
      else if (name === actionName.value) {
        clickTab(tabs.value[i - 1].name);
      }
      previous();
    });
  }
};

// 往右偏移
const next = () => {
  const totalWidth = width.value * tabs.value.length;
  nextTick(() => {
    if (tabsRef.value) {
      // 可视区域 < 滚动区域（滚动区域大于可视区域才可以移动）
      // 移动距离 + 可视区域 = 滚动区域的宽度（上一次的宽度，当点击时才是实际宽度）< 滚动区域
      if (tabsRef.value.clientWidth < totalWidth && moveX.value + tabsRef.value.clientWidth < totalWidth) {
        const x = width.value - unoccupied.value;
        // moveX 为 0 减去空余空间的宽度
        moveX.value += moveX.value ? width.value : x || width.value;

        if (moveX.value + tabsRef.value.clientWidth > totalWidth) {
          moveX.value = moveX.value - width.value;
        }
        translateX(moveX.value);
      }
    }
  });
};

// 往左偏移
const previous = () => {
  if (moveX.value > 0) {
    moveX.value -= width.value;
    translateX(moveX.value);
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
watch(actionName, (val) => {
  console.log(val)
  const len = tabs.value.length;
  console.log(len)
  // 如有重复数据退出后续函数执行
  for (let i = 0; i < len; i++) {
    if (tabs.value[i].title === val) {
      console.log((i + 1 - tabsCount.value) * width.value - unoccupied.value)
      nextTick(() => {
        translateX((i + 1 - tabsCount.value) * width.value - unoccupied.value);
      });
      return;
    }
  }
  nextTick(() => {
    // (总共有多少个 tabs - 未偏移时可见的元素个数) * 单个 tab 标签元素长度 - 被遮挡 tab 元素的可见部分的宽度
    translateX((tabs.value.length - tabsCount.value) * width.value - unoccupied.value);
  });
});

onMounted(() => {
  TabsStore.tabs.forEach((tag) => {
    count.value++;
    actionName.value = tag.title;
    tabs.value.push(tag)
  });
  // nextTick(() => {
  //   if (tabsRef.value) {
  //     const getStyle = getComputedStyle(tabsRef.value.children[0].children[0], null);
  //     const marginLeft = parseFloat(getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2));
  //     const marginRight = parseFloat(getStyle.marginRight.substr(0, getStyle.marginRight.length - 2));

  //     console.log("测试")
  //     console.log(tabsRef.value)
  //     console.log(tabsRef.value.children[0].children[0])
  //     console.log(getStyle)
  //     console.log( getStyle.marginLeft.length)
  //     console.log( getStyle.marginRight.length)
  //     console.log( marginLeft)
  //     console.log( marginRight)
  //     // tag元素实际宽度 = 元素的宽度 + 外边距
  //     width.value = marginLeft + marginRight + tabsRef.value.children[0].children[0].offsetWidth;
  //     console.log( width.value )

  //     // 最终精简为取余（得数跟上面的计算是一样的）
  //     unoccupied.value = tabsRef.value.offsetWidth % width.value;
  //     console.log(tabsRef.value.offsetWidth )
  //     console.log( width.value)
  //     console.log(unoccupied.value)
  //     // 计算相差数
  //     // 如果数字相差不大的话表示可视区域创建的 tab 肉眼看到是没有被遮挡的
  //     differ.value = width.value - unoccupied.value;
  //     // unoccupied 和 width 比如相差 1、2px，这时如果 moveX 为 0，点击 next 肉眼是看不到有移动的。因为只移动了 1、2px
  //     // 相差数小于 10 unoccupied 设置为单个 tab 的宽度
  //     unoccupied.value = differ.value < 10 ? width.value : unoccupied.value;
  //     // 转为整数
  //     tabsCount.value = Math.floor(tabsRef.value.offsetWidth / width.value);
  //     console.log(tabsCount.value)
  //   }
  // });
  nextTick(() => {
    if (tabsRef.value) {
      let tabsWidth = tabsRef.value.offsetWidth;
      let number = 0;
      for (let i = 0; i < tabs.value.length; i++) {
        const getStyle = getComputedStyle(tabsRef.value.children[0].children[number], null);
        const marginLeft = parseFloat(getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2));
        const marginRight = parseFloat(getStyle.marginRight.substr(0, getStyle.marginRight.length - 2));
        // tag元素实际宽度 = 元素的宽度 + 外边距
        width.value = marginLeft + marginRight + tabsRef.value.children[0].children[number].offsetWidth;
        number++;

        if ((tabsWidth = tabsWidth - width.value) <= 0) {
          break;
        }
      }
      tabsCount.value = number-1;
      console.log(number)
    }
  });
});
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

.main-box {
  height: 500px;
  width: 1400px;
  padding: 10px 20px 20px 20px;

  .main-box-tab {
    position: relative;
    padding: 10px 20px;
    overflow: hidden;

    &>i {
      position: absolute;
      cursor: pointer;
      bottom: 15px;

      &:nth-child(1) {
        left: 0;
      }

      &:nth-child(2) {
        right: 0;
      }
    }

    .main-box-tab-content {
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
            margin-left: 10px;
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

  .main-box-content {
    height: calc(100% - 70px);
    padding: 10px;
    border: 1px saddlebrown solid;
    background-size: 100% 100%;
  }
}
</style>