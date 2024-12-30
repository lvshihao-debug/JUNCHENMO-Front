<template>
    <el-row>
        <el-col :span="24">
            <div class="form-control">
                <input class="input input-alt" placeholder="请输入提示词" required="" type="text">
                <span class="input-border input-border-alt"></span>

            </div>
        </el-col>

    </el-row>
    <el-row>
        <el-card>
            <template #header>
                <div class="card-header-style">
                    <div class="card-header">
                        <span>表结构展示</span>
                    </div>
                    <div class="card-end">
                        <JcmButton :buttonBgColor="layoutSettingStore.getThemeStatus ? '#fff' : '#29909'"
                            style="margin-top: 15px;" @click="search()">
                            <template #icon>
                                <svg-icon name="搜索" width="20" height="20" />
                            </template>
                        </JcmButton>
                    </div>
                </div>
            </template>


            <vxe-table :edit-config="{ mode: 'row', trigger: 'click' }" :data="tableData"
                height="500px">
                <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column field="name" title="名" min-width="180" :edit-render="{ autoFocus: 'input' }">
                    <template #edit="{ row }">
                        <el-input v-model="row.name" />
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.name }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="role" title="类型" width="180" :edit-render="{ autoFocus: 'input' }">
                    <template #edit="{ row }">
                        <el-select v-model="row.role">
                            <el-option label="启用" value="biy" />
                            <el-option label="禁用" value="string" />
                        </el-select>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.role }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="integer" title="长度" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <vxe-input v-model="row.integer" type="integer"></vxe-input>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.integer }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="float" title="小数点" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <vxe-input v-model="row.float" type="float"></vxe-input>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.float }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="date" title="不是null" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <vxe-input v-model="row.date" type="date"></vxe-input>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.date }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="year" title="主键" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <vxe-input v-model="row.year" type="year"></vxe-input>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.year }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="quarter" title="注释" width="180" :edit-render="{}">
                    <template #edit="{ row }">
                        <vxe-input v-model="row.quarter" type="quarter"></vxe-input>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.quarter }}</span>
                    </template>
                </vxe-column>

            </vxe-table>
        </el-card>
    </el-row>
</template>

<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()

// 如果要定义一些内部使用的响应式数据，可以使用 ref、reactive 等
// 比如记录输入框的值
const inputValue = ref('');

interface RowVO {
    id: number
    name: string
    role: string
    sex: string
    num: string
    float: string
    integer: string
    date: string
    time: string
    year: string
    quarter: string
    month: string
    week: string
    datetime: string
    address: string
}

const tableData = ref<RowVO[]>([
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', num: '', integer: '', float: '', date: '', time: '', year: '', quarter: '', month: '', week: '', datetime: '', address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', num: '22', integer: '23', float: '22.35', date: '', time: '', year: '', quarter: '', month: '', week: '', datetime: '', address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', num: '32', integer: '', float: '', date: '2024-06-06', time: '10:30:45', year: '2024', quarter: '2024-01-01', month: '2024-06', week: '2024-06-03', datetime: '2024-06-06 10:30:45', address: 'Shanghai' }
])

const search = () => {
console.log(tableData)
}
// 可以定义一些方法，比如处理输入框输入变化的方法
const handleInput = (e) => {
inputValue.value = e.target.value;
// 这里也可以触发一个自定义事件，向外传递输入的值等，示例如下：
// emit('input-change', inputValue.value);
};
</script>

<style lang="scss" scoped>
.el-card .el-card__body .el-input {
    width: 100%;
}
.input {
    color: #fff;
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
    border-bottom: var(--border-height) solid var(--border-before-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-border {
    position: absolute;
    background: var(--border-after-color);
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.input:focus {
    outline: none;
}

.input:focus+.input-border {
    width: 100%;
}

.form-control {
    position: relative;
    --width-of-input: 300px;
}

.input-alt {
    font-size: 1.2rem;
    padding-inline: 1em;
    padding-block: 0.8em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-border-alt {
    height: 3px;
    background: linear-gradient(90deg, #FF6464 0%, #FFBF59 50%, #47C9FF 100%);
    transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);
}

.el-card .el-card__body .el-select {
    width: 100px;
}
.input-alt:focus+.input-border-alt {
    width: 100%;
}
</style>