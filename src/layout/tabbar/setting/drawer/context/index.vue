<template>
  <div>
    <el-divider>主题风格</el-divider>
    <div class="filed-style">
      <div class="layout-icon-container">
        <!-- 使用v-for指令遍历layoutIcons数组来创建多个LayoutIcon组件 -->
        <LayoutIcon v-for="(icon, index) in layoutIcons" :key="index" :iconText="icon.iconText"
          :ref="(el:any) => layoutIconRefs[index] = el" :leftBgColor="icon.leftBgColor"
          :rightBgColor="icon.rightBgColor" :leftWidth="icon.leftWidth" :rightWidth="icon.rightWidth"
          :class="['layout-icon-item']" @click="showDot(index)" :index="index" />
      </div>

    </div>
  </div>

    <div>
      <el-divider>布局设置</el-divider>
      <div class="filed-style">
        <div>导航栏</div>
        <div>
          <el-switch v-model="LayoutSettingStore.navigationBar" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>多页签</div>
        <div>
          <el-switch v-model="LayoutSettingStore.tabs" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>面包屑</div>
        <div>
          <el-switch v-model="LayoutSettingStore.breadcrumb" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>底部页脚</div>
        <div>
          <el-switch v-model="LayoutSettingStore.copyright" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>菜单栏</div>
        <div>
          <el-switch v-model="LayoutSettingStore.menu" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>菜单宽度(px)</div>
        <div>
          <el-input style="width: 60px" size="small" />
        </div>
      </div>
    </div>
    <!-- Other设置 -->
    <div>
      <el-divider> Other设置</el-divider>
      <div class="filed-style">
        <div>全局水印</div>
        <div>
          <el-switch v-model="LayoutSettingStore.watermark" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>标签页图标</div>
        <div>
          <el-switch v-model="LayoutSettingStore.tabsIcon" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>色弱模式</div>
        <div>
          <el-switch v-model="LayoutSettingStore.weakColor" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>黑白模式</div>
        <div>
          <el-switch v-model="LayoutSettingStore.grayscale" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>模糊模式</div>
        <div>
          <el-switch v-model="LayoutSettingStore.blur" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>低亮模式</div>
        <div>
          <el-switch v-model="LayoutSettingStore.contrast" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>色相旋转</div>
        <div>
          <el-switch v-model="LayoutSettingStore.hueRotate" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
      <div class="filed-style">
        <div>饱和度</div>
        <div>
          <el-switch v-model="LayoutSettingStore.saturate" class="mt-2 setting-context" inline-prompt />
        </div>
      </div>
    </div>

    <div>
      <div>
        <el-divider>数据设置</el-divider>
      </div>
      <div class="filed-style">
        <div>表格条数</div>
        <div>
          <el-select v-model="LayoutSettingStore.size" placeholder="Select" style="width: 80px" size="small">
            <el-option label="10条/页" value="10" />
            <el-option label="20条/页" value="20" />
            <el-option label="30条/页" value="30" />
            <el-option label="40条/页" value="40" />
          </el-select>
        </div>
      </div>

    </div>

    <div>
      <div>
        <el-divider>系统主题色</el-divider>
      </div>
      <div class="dot-buttons-row">
        <div v-for="(color, index) in colors" :key="index" class="dot-button" @click="selectColor(color)">
          <div :class="['dot', { 'active': selectedColor === color }]" :style="{ backgroundColor: color }">
            <template v-if="selectedColor === color">
              <div class="icon-container" style="background-color: transparent;">
                <svg-icon name="对号" :color="LayoutSettingStore.theme" width="12px" height="20px" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup lang="ts">
//获取设置相关的小仓库
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
//获取layout配置相关的仓库
const LayoutSettingStore = useLayoutSettingStore()
const colors = ref(['#FF80C8', '#6F68F6', '#dc440d', '#4a18ee', '#ee1871', '#2d18ee']);
const selectedColor = ref('');

// 定义布局图标相关的数据数组，每个对象包含对应组件的属性
// 定义layoutIcons数组，存放各个LayoutIcon组件的配置信息
const layoutIcons = ref([
  {
    iconText: "浅色",
    leftBgColor: "white",
    rightBgColor: "white",
    leftWidth: 30,
    rightWidth: 60
  },
  {
    iconText: "深色",
    leftBgColor: "#22252A",
    rightBgColor: "#22252A",
    leftWidth: 40,
    rightWidth: 50
  },
  {
    iconText: "系统",
    leftBgColor: "white",
    rightBgColor: "#22252A",
    leftWidth: 50,
    rightWidth: 50
  }
]);

// 创建一个ref数组，用于存储各个LayoutIcon组件的引用
const layoutIconRefs = reactive([]);


// 点击LayoutIcon时触发的函数，用于切换对应小圆点的显示状态以及执行其他相关逻辑
const showDot = (index: number) => {
  // 遍历所有的LayoutIcon组件引用，调用selectIndex方法（前提是组件实例有这个方法）
  layoutIconRefs.forEach((ref) => {
    if (ref && ref.selectIndex) {
      ref.selectIndex(index);
    }
  });
  const html = document.documentElement;

  if (index === 0) {
    LayoutSettingStore.theme = true;
    html.className = '';
  } else if (index === 1) {
    LayoutSettingStore.theme = false;
    html.className = 'dark';
  }else{
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    themeMedia.addEventListener("change", event => {
      if(themeMedia.matches){
        LayoutSettingStore.theme = true;
        html.className = '';
      }else{
        LayoutSettingStore.theme = false;
        html.className = 'dark';
      }
    })
    if(themeMedia.matches){
        LayoutSettingStore.theme = true;
        html.className = '';
      }else{
        LayoutSettingStore.theme = false;
        html.className = 'dark';
      }
  }
};

//获取body的dom
const body = document.querySelector('body')

//设置主题色
const selectColor = (color: string) => {
  selectedColor.value = color;
  LayoutSettingStore.themeColor = color;
  body?.style.setProperty('--lvshihao-theme-color', color)
};


// 监听色弱数据变更
watch(() => LayoutSettingStore.weakColor, (v) => {
  if (v) {
    body?.style.setProperty('--lvshihao-theme-filter-invert', "100%")
  } else {
    body?.style.setProperty('--lvshihao-theme-filter-invert', "0%")
  }
});

// 监听黑白模式数据变更
watch(() => LayoutSettingStore.grayscale, (v) => {
  if (v) {
    body?.style.setProperty('--lvshihao-theme-filter-grayscale', "100%")
  } else {
    body?.style.setProperty('--lvshihao-theme-filter-grayscale', "0%")
  }
});

// 监听模糊模式数据变更
watch(() => LayoutSettingStore.blur, (v) => {
  if (v) {
    body?.style.setProperty('--lvshihao-theme-filter-blur', "2px")
  } else {
    body?.style.setProperty('--lvshihao-theme-filter-blur', "0px")
  }
});

// 监听对比度数据变更
watch(() => LayoutSettingStore.contrast, (v) => {
  if (v) {
    body?.style.setProperty('--lvshihao-theme-filter-contrast', "75%")
  } else {
    body?.style.setProperty('--lvshihao-theme-filter-contrast', "100%")
  }
});

// 监听色相旋转数据变更
watch(() => LayoutSettingStore.hueRotate, (v) => {
  if (v) {
    body?.style.setProperty('--lvshihao-theme-filter-hueRotate', "80deg")
  } else {
    body?.style.setProperty('--lvshihao-theme-filter-hueRotate', "0deg")
  }
});

// 监听色饱和度数据变更
watch(() => LayoutSettingStore.saturate, (v) => {
  if (v) {
    body?.style.setProperty('--lvshihao-theme-filter-saturate', "180%")
  } else {
    body?.style.setProperty('--lvshihao-theme-filter-saturate', "100%")
  }
});

</script>

<script lang="ts">
export default {
  name: 'DrawerContext',
}
</script>
<style scoped>
.setting-context {
  margin-left: 24px
}

.filed-style {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}


.dot-buttons-row {
  display: flex;
  justify-content: space-around;

}

.dot-button {
  cursor: pointer;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
  position: relative;
  box-shadow: var(--el-box-shadow-light);
}

.icon-container {
  display: flex;
  justify-content: space-around;
}

.dot-with-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.layout-icon-container {
  display: flex;
  align-items: center;
  /* 垂直方向居中对齐 */
}

.layout-icon-item {
  margin-left: 25px;
}
</style>
