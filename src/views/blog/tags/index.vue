<script setup lang="ts">
import Pagination from '@components/pagination/index.vue'
import { useTags } from './hooks/useTags'
import { onMounted, watch } from 'vue'
import moment from 'moment'

const { tableData, total, search, loading, getTableData } = useTags()

watch(
    () => search,
    () => getTableData(),
    { deep: true }
)

onMounted(() => getTableData())
</script>

<template>
    <el-card>
        <el-row :gutter="10">
            <el-col :span="4">
                <el-input v-model="search.keywords" placeholder="名称" clearable @clear="search.keywords = undefined" />
            </el-col>
            <el-col :span="4">
                <el-button type="success">查询</el-button>
            </el-col>
            <el-col :span="4">
                <div class="test"></div>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="tableData">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="描述" :show-overflow-tooltip="true" width="180">
                <template #default="{ row }">
                    {{ row.remark ? row.remark : '无' }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180">
                <template #default="{ row }">
                    {{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
        </el-table>
        <Pagination :page-size="search.size" :current-page="search.current" :total="total" />
    </el-card>
</template>

<style scoped lang="scss">
.test {
    width: 30px;
    height: 30px;
    background-color: deepskyblue;
}
</style>
