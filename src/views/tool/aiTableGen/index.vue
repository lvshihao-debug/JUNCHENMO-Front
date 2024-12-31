<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="form-control">
                    <input class="input input-alt" v-model="prompts" placeholder="请输入提示词" type="text">
                    <span class="input-border input-border-alt"></span>

                </div>
            </el-col>

        </el-row>
        <el-row style="margin-top: 10px;" v-if="loadingStatus">
            <el-col :span="24">
                <el-card>
                    <template #header>
                        <div class="card-header-style">
                            <div class="card-header">
                                <span>表结构展示</span>
                            </div>
                            <div class="card-end">
                                <el-check-tag disable-transitions="false" checked="true">
                                    {{ lastClickRow.name }}
                                </el-check-tag>
                                <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="insertTopEvent()">
                                    <template #icon>
                                        <svg-icon name="上方插入" />
                                    </template>
                                </JcmButton>
                                <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="remove()">
                                    <template #icon>
                                        <svg-icon name="减号" />
                                    </template>
                                </JcmButton>
                                <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="add()">
                                    <template #icon>
                                        <svg-icon name="加号" />
                                    </template>
                                </JcmButton>
                                <JcmButton :buttonBgColor="layoutSettingStore.getTheme" @click="genTable()">
                                    <template #icon>
                                        <svg-icon name="生成" />
                                    </template>
                                </JcmButton>
                            </div>
                        </div>
                    </template>
                    <!-- // "vxe-table": "4.9.35" -->


                    <vxe-table :edit-config="editConfig" @cell-click="cellClickEvent" :row-config="rowConfig"
                        ref="tableRef" :column-config="columnConfig" :data="tableData" @row-dragend="rowDragendEvent"
                        @sort-change="sortChangeEvent">
                        <vxe-column type="seq" width="60" drag-sort></vxe-column>
                        <vxe-column field="name" title="名" width="180" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-input v-model="row.name" />
                            </template>
                            <template #default="{ row }">
                                <span>{{ row.name }}</span>
                            </template>
                        </vxe-column>
                        <vxe-column field="type" title="类型" width="180" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-select v-model="row.type">
                                    <el-option label="启用" value="int" />
                                </el-select>
                            </template>
                            <template #default="{ row }">
                                <span>{{ row.type }}</span>
                            </template>
                        </vxe-column>
                        <vxe-column field="length" title="长度" width="180" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-input-number v-model="row.length"></el-input-number>
                            </template>
                            <template #default="{ row }">
                                <span>{{ row.length }}</span>
                            </template>
                        </vxe-column>
                        <vxe-column field="point" title="小数点" width="180" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-input-number v-model="row.point"></el-input-number>
                            </template>
                            <template #default="{ row }">
                                <span>{{ row.point }}</span>
                            </template>
                        </vxe-column>
                        <vxe-column field="notNull" title="不是null" width="100" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-checkbox v-model="row.notNull"></el-checkbox>
                            </template>
                            <template #default="{ row }">
                                <el-checkbox v-model="row.notNull"></el-checkbox>
                            </template>
                        </vxe-column>
                        <vxe-column field="primaryKey" title="主键字段" width="100" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-checkbox v-model="row.primaryKey"></el-checkbox>
                            </template>
                            <template #default="{ row }">
                                <el-checkbox v-model="row.primaryKey"></el-checkbox>
                            </template>
                        </vxe-column>
                        <vxe-column field="comment" title="注释" min-width="180" :edit-render="{}">
                            <template #edit="{ row }">
                                <el-input v-model="row.comment" />
                            </template>
                            <template #default="{ row }">
                                <span>{{ row.comment }}</span>
                            </template>
                        </vxe-column>
                    </vxe-table>
                </el-card>

            </el-col>
        </el-row>
        <!--加载动画-->
        <div class="table-data-loading" v-else>
            <Loading />
        </div>
    </div>
</template>

<script lang="ts" setup>
import useAiTableGenStore from '@/store/modules/tool/aiTableGen'
import useLayoutSettingStore from '@/store/modules/layout/layoutSetting'
import { VxeTableEvents } from 'vxe-table'
import type { VxeTablePropTypes, VxeTableInstance } from 'vxe-table'

const layoutSettingStore = useLayoutSettingStore()
const aiTableGenStore = useAiTableGenStore()

onMounted(() => {

})
//当前输入的提示词
const prompts = ref('');

const tableRef = ref<VxeTableInstance<RowVO>>()
const insertRecords: RowVO[] = []
interface RowVO {
    id: number
    name: string | undefined
    type: string | undefined
    length: number | undefined
    point: number | undefined
    notNull: boolean
    primaryKey: boolean
    comment: string
}
//最后一次点击的行数据
const lastClickRow = ref<RowVO>({
    id: 0,
    name: '',
    type: '',
    length: 0,
    point: 0,
    notNull: false,
    primaryKey: false,
    comment: ''
})

//页面数据加载的状态
const loadingStatus = computed(() => {
    return !aiTableGenStore.loading || !layoutSettingStore.setting.dataLoading;
});

const editConfig = reactive<VxeTablePropTypes.EditConfig>({
    trigger: 'click',
    mode: 'cell'
})
const rowConfig = reactive<VxeTablePropTypes.RowConfig<RowVO>>({
    drag: true
})

const columnConfig = reactive<VxeTablePropTypes.ColumnConfig<RowVO>>({
})

const tableData = ref<RowVO[]>([])

const rowDragendEvent: VxeTableEvents.RowDragend = ({ newRow, oldRow, dragPos }) => {
    console.log(`拖拽完成，被拖拽行：${oldRow.name} 目标行：${newRow.name} 目标位置：${dragPos}`);
    // 获取被拖拽行在tableData中的索引
    const oldIndex = tableData.value.findIndex(item => item.id === oldRow.id);
    // 获取目标行在tableData中的索引
    const newIndex = tableData.value.findIndex(item => item.id === newRow.id);

    // 如果新索引小于旧索引，说明是往前拖拽，需要先将被拖拽行到目标行之间的数据后移一位（从后往前移动）
    if (newIndex < oldIndex) {
        for (let i = oldIndex; i > newIndex; i--) {
            tableData.value[i] = tableData.value[i - 1];
        }
    } else {
        // 如果新索引大于旧索引，说明是往后拖拽，需要先将目标行到被拖拽行之间的数据前移一位（从前往后移动）
        for (let i = oldIndex; i < newIndex; i++) {
            tableData.value[i] = tableData.value[i + 1];
        }
    }
    // 将被拖拽行的数据放置到目标位置
    tableData.value[newIndex] = oldRow;
};
//在上方插入
const insertTopEvent = () => {
    addData(getLastClickRowIndex())
}

const add = () => {
    addData(tableData.value.length)
}

const addData = (index: number) => {
    const newRow: RowVO = {
        "id": new Date().getTime(),
        "name": undefined,
        "type": undefined,
        "length": undefined,
        "point": undefined,
        "notNull": false,
        "primaryKey": false,
        "comment": ""
    }

    tableData.value.splice(index, 0, newRow)
    insertRecords.push(newRow)
    nextTick(() => {
        const $table = tableRef.value
        if ($table) {
            $table.setEditRow(newRow)
        }
    })
}

const remove = () => {
    console.log(getLastClickRowIndex())
    if (getLastClickRowIndex() != -1) {
        tableData.value.splice(getLastClickRowIndex(), 1)
    }
}

/**
* 生成当前table的json数据
*/
const genTable = () => {
    aiTableGenStore.loading = true;
    aiTableGenStore.genTable(prompts.value).then(res => {
        const jsonStringWithExtra = res.output.choices[0].message.content
        // 先去除字符串前后多余的部分（去掉开头的json以及最后的）
        const trimmedString = jsonStringWithExtra.replace("```json", "").replace("```", "");
        console.log(trimmedString)
        // 再去除可能存在的多余空白字符（比如换行、空格等，使其格式更规范便于解析）
        const cleanedString = trimmedString.trim();
        console.log(cleanedString)
        // 使用 JSON.parse 方法将处理后的字符串解析为 JSON 数组
        const jsonArray: any[] = JSON.parse(cleanedString);
        // 此时 jsonArray 就是你想要的 JSON 数组了，可以进行后续的操作，比如遍历等
        tableData.value = jsonArray
        aiTableGenStore.loading = false;
    }).catch(err => {
        console.log("生成失败")
    })
}

/**
* 点击table某一行的某一列时触发的函数
* @param {Object} row - 当前行对象
* @param {Object} column - 当前列对象
*/
const cellClickEvent: VxeTableEvents.CellClick<RowVO> = ({ row, column }) => {
    tableData.value.forEach(item => {
        if (item.id == row.id) {
        }
    })
    console.log(row, column)
    lastClickRow.value = row
}

const getLastClickRowIndex = () => {
    return tableData.value.findIndex(item => item.id === lastClickRow.value.id);
}
</script>
<script lang="ts">
export default {
    name: 'aiTableGen',
}
</script>
<style lang="scss" scoped>
.el-checkbox {
    display: flex;
    justify-content: center;
}

.el-card .el-card__body {
    .el-select {
        width: 100%;
    }

    .el-input {
        width: 100%;
    }
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