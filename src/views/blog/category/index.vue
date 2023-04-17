<script setup lang="ts">
import Pagination from '@components/pagination/index.vue'
import moment from 'moment'
import { Reload } from '@icon-park/vue-next'
import { MessageSuccess } from '../../../utils/element'
import { useCategory } from './hooks/useCategory'

const {
    tableData,
    filterColumns,
    total,
    search,
    loading,
    dialogOperate,
    dialogTitle,
    dialogShow,
    dialogFormRef,
    dialogForm,
    getTableData,
    changeSize,
    changePage,
    t,
    openDialog,
    dialogFormRules,
    handleOperate,
    handleDelete,
    handleBatchDelete,
    handleSelectionChange,
    disableStatus
} = useCategory()
</script>

<template>
    <el-dialog
        v-model="dialogShow"
        width="30%"
        destroy-on-close
        :title="dialogTitle"
        :show-close="false"
        :close-on-click-modal="false"
        :style="{ borderRadius: '10px' }"
    >
        <el-form ref="dialogFormRef" :rules="dialogFormRules" :model="dialogForm" label-width="50">
            <el-form-item prop="name" :label="t('page.category.name')">
                <el-input v-model="dialogForm.name" />
            </el-form-item>
            <el-form-item v-delEl="dialogOperate === 'add'" :label="t('page.category.status')">
                <el-radio-group v-model="dialogForm.status">
                    <el-radio-button :label="true">{{ t('common.tagEnable') }}</el-radio-button>
                    <el-radio-button :label="false">{{ t('common.tagDisable') }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="t('page.category.remark')">
                <el-input v-model="dialogForm.remark" type="textarea" resize="none" :rows="3" :placeholder="t('common.defaultRemark')" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button text type="danger" @click="dialogShow = false">{{ t('button.back') }}</el-button>
            <el-button type="primary" @click="handleOperate(dialogFormRef)">{{ t('button.confirm') }}</el-button>
        </template>
    </el-dialog>
    <el-card :style="{ borderRadius: '10px' }">
        <el-row :gutter="5">
            <el-col :span="4">
                <el-input v-model="search.keywords" :placeholder="t('page.category.name')" clearable @clear="search.keywords = undefined" />
            </el-col>
            <el-col :span="16">
                <el-button type="success">{{ t('common.search') }}</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="20">
                <el-button type="success" @click="openDialog('add')">{{ t('common.add') }}</el-button>
                <el-button type="danger" :disabled="disableStatus" @click="handleBatchDelete">{{ t('common.delete') }} </el-button>
            </el-col>
            <el-col :span="4">
                <el-tooltip effect="light" :content="t('common.upload')" placement="top" :show-after="500">
                    <!--TODO-->
                    <el-button icon="Upload" class="grid-button" @click="MessageSuccess('待开发')" />
                </el-tooltip>
                <el-tooltip effect="light" :content="t('common.download')" placement="top" :show-after="500">
                    <!--TODO-->
                    <el-button icon="Download" class="grid-button" @click="MessageSuccess('待开发')" />
                </el-tooltip>
                <el-tooltip effect="light" :content="t('common.refresh')" placement="top" :show-after="500">
                    <el-button icon="Refresh" class="grid-button" @click="getTableData" />
                </el-tooltip>
                <el-popover placement="bottom" :title="t('common.filterColumn')" style="" :width="80" trigger="click">
                    <template v-for="item in filterColumns" :key="item">
                        <el-checkbox v-model="item.status" :label="item.label" />
                    </template>
                    <template #reference>
                        <el-button icon="Grid" class="grid-button" />
                    </template>
                </el-popover>
            </el-col>
        </el-row>
        <el-table
            :key="Reload"
            v-loading="loading"
            :data="tableData"
            highlight-current-row
            :empty-text="t('common.emptyText')"
            tooltip-effect="light"
            :header-row-style="{ color: '#575656' }"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="30" align="center" />
            <el-table-column v-if="filterColumns[0].status" :label="filterColumns[0].label" prop="id" />
            <el-table-column v-if="filterColumns[1].status" :label="filterColumns[1].label" prop="name" />
            <el-table-column v-if="filterColumns[2].status" :label="filterColumns[2].label">
                <template #default="{ row }">
                    <el-tag disable-transitions :type="row.status ? 'success' : 'danger'">
                        {{ row.status ? t('common.tagNormal') : t('common.tagDisable') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column v-if="filterColumns[3].status" :label="filterColumns[3].label" :show-overflow-tooltip="true">
                <template #default="{ row }">
                    {{ row.remark }}
                </template>
            </el-table-column>
            <el-table-column v-if="filterColumns[4].status" :label="filterColumns[4].label">
                <template #default="{ row }">
                    {{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column v-if="filterColumns[5].status" :label="filterColumns[5].label">
                <template #default="{ row }">
                    {{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column v-if="filterColumns[6].status" :label="filterColumns[6].label" align="center" width="180">
                <template #default="{ row }">
                    <el-button type="primary" @click="openDialog('edit', row)">{{ t('common.edit') }}</el-button>
                    <el-popconfirm :title="t('common.popConfirm')" @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button type="danger">{{ t('common.delete') }}</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            class="pagination"
            :page-size="search.size"
            :current-page="search.current"
            :total="total"
            @change-page="changePage"
            @change-size="changeSize"
        />
    </el-card>
</template>

<style scoped lang="scss">
:deep(.el-button.grid-button) {
    @apply rounded-none;
    border: 0.1px solid #dcdfe6;
    transition: all ease-in-out 0.5s;

    &:hover {
        color: #000000;
        background-color: rgb(222, 223, 224);
    }
}

// 去除按钮间距
:deep(.el-button.grid-button + .el-button) {
    @apply ml-0;
}

.pagination {
    @apply flex justify-center mt-8;
}

:deep(.el-row) {
    @apply mb-20px;
}
</style>
