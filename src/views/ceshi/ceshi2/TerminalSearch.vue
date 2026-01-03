<template>
  <div
    id="search-card"
    ref="searchRef"
    v-show="search.visible"
    @keydown.esc="closeSearch"
  >
    <!-- <el-icon @click="closeSearch" class="close-icon"> -->
    <!-- 输入框-->
    <input
      class="search-input"
      ref="searchInput"
      v-model="search.value"
      placeholder="搜索关键字"
      @keyup.enter="find(true)"
      @keyup.esc="close"
    />
    <!-- 选项 -->
    <div class="search-options" style="display: flex; align-items: center">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="上一个"
        placement="bottom"
      >
        <div class="tool-button" @click="find(false)">
          <svg-icon name="jcm-上一个" color="#C3C6C9" width="15" height="v" />
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="下一个"
        placement="bottom"
      >
        <div class="tool-button" @click="find(true)">
          <svg-icon name="jcm-下一个" color="#C3C6C9" width="15" height="v" />
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="区分大小写"
        placement="bottom"
      >
        <div
          class="tool-button"
          @click="toggleOption('caseSensitive')"
          :class="{ active: searchOptions.caseSensitive }"
        >
          <svg-icon
            name="jcm-区分大小写"
            color="#C3C6C9"
            width="15"
            height="15"
          />
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="单词全匹配"
        placement="bottom"
      >
        <div
          class="tool-button"
          @click="toggleOption('wholeWord')"
          :class="{ active: searchOptions.wholeWord }"
        >
          <svg-icon
            name="jcm-单词全匹配"
            color="#C3C6C9"
            width="10"
            height="10"
          />
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="正则匹配"
        placement="bottom"
      >
        <div
          class="tool-button"
          @click="toggleOption('regex')"
          :class="{ active: searchOptions.regex }"
        >
          <svg-icon
            name="jcm-正则匹配"
            color="#C3C6C9"
            width="15"
            height="15"
          />
        </div>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="关闭"
        placement="bottom"
      >
        <div class="tool-button" @click="closeSearch()">
          <svg-icon name="叉" color="#C3C6C9" width="10" height="10" />
        </div>
      </el-tooltip>
    </div>
    <!-- 按钮 -->
    <!-- <div class="search-buttons">
      <el-button @click="searchKeywords(false)">
        上一个
      </el-button>
      <el-button @click="searchKeywords(true)">
        下一个
      </el-button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const searchRef = ref()

const searchOptions = ref({
  caseSensitive: false,
  wholeWord: false,
  regex: false,
})
// 定义 emits
const emits = defineEmits(['close', 'find'])

// 定义响应式数据
const search = reactive({
  visible: false,
  value: '',
})

// 定义搜索输入框的 ref
const searchInput = ref<HTMLInputElement | null>(null)

// 打开搜索框
const open = () => {
  search.visible = !search.visible
  nextTick(() => {
    if (searchInput.value && search.visible) {
      addEventListeners()
      searchInput.value.focus()
    }
  })
}

// 关闭搜索框
const closeSearch = () => {
  if (search.visible) {
    search.visible = false
    search.value = ''
    removeEventListeners()
    emits('close')
  }
}

// 切换选项
const toggleOption = (key: string) => {
  searchOptions.value[key] = !searchOptions.value[key]
  searchInput.value?.focus()
}

// 处理 mouseenter 事件
const handleMouseEnter = () => {
  searchRef.value.style.opacity = '1'
}

// 处理 mouseleave 事件
const handleMouseLeave = () => {
  searchRef.value.style.opacity = '0.5'
}

// 添加事件监听器
const addEventListeners = () => {
  if (searchRef.value) {
    searchRef.value.addEventListener('mouseenter', handleMouseEnter)
    searchRef.value.addEventListener('mouseleave', handleMouseLeave)
  }
}

// 移除事件监听器
const removeEventListeners = () => {
  if (searchRef.value) {
    searchRef.value.removeEventListener('mouseenter', handleMouseEnter)
    searchRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// 搜索关键字
const find = (next: boolean) => {
  searchInput.value?.focus()
  if (search.value) {
    emits('find', search.value, next, searchOptions.value)
  }
}

// 导出方法供外部调用
defineExpose({
  open,
})
</script>

<style lang="scss" scoped>
.tool-button:hover {
  cursor: pointer;
  background-color: #3e4246;
}
.active {
  background-color: #3e4246;
}
.tool-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
}
#search-card {
  position: absolute;
  top: 5px;
  right: 50px;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 270px;
  height: 30px;
  border-radius: var(--lvshihao-border-radius);
  background-color: black;
  opacity: 0.5;
  transition: opacity 0.7s ease;
  .search-input {
    width: 130px;
    height: 18px;
    font-size: 12px;
    border: none;
    color: white;
    background: none;
    outline: none;
  }
}
</style>
