<script setup lang="ts">
import icons from '@icon-park/vue-next/icons.json'
import { onBeforeMount, reactive, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { MessageSuccess } from '../utils/element'

const data = reactive({ list: [], page: { currentPage: 1, pageSize: 50 }, search: '' })
const initIcon = () => {
    const { pageSize, currentPage } = data.page
    data.list = icons.slice((currentPage - 1) * pageSize, pageSize * currentPage) as any
}

onBeforeMount(async () => {
    initIcon()
})
const handleClickChip = (name: string) => {
    const icon = `icon-${name}`
    MessageSuccess(`复制成功：${icon}`)
}
const handleSearchIcon = () => {
    const { search } = data
    if (!search) return
    const list: any = []
    // eslint-disable-next-line array-callback-return
    icons.map((item) => {
        if (item.title.indexOf(search) !== -1 || item.name.indexOf(search) !== -1 || item.categoryCN.indexOf(search) !== -1) list.push(item)
    })
    data.list = list
}
const handleCurrentChange = (page: number) => (data.page.currentPage = page)
const handlePageSizeChange = (size: number) => (data.page.pageSize = size)

watch(
    () => data.page,
    () => initIcon(),
    { deep: true }
)
watch(
    () => data.search,
    (val) => {
        if (!val) {
            const { pageSize, currentPage } = data.page
            data.list = icons.slice((currentPage - 1) * pageSize, pageSize * currentPage) as any
        }
    }
)
</script>

<template>
    <div class="icon-container">
        <div class="search">
            <el-input v-model="data.search" placeholder="请输入类型、名称、图标名">
                <template #append>
                    <el-button :icon="Search" @click="handleSearchIcon" />
                </template>
            </el-input>
        </div>
        <div class="icon-content">
            <div v-for="item in data.list" :key="item.id" class="icon-item" @click="handleClickChip(item.name)">
                <component
                    :is="'icon-park' + item.name"
                    class="icon-name"
                    theme="filled"
                    size="24"
                    fill="#333"
                    :stroke-width="3"
                    stroke-linejoin="bevel"
                    stroke-linecap="butt"
                />
                <p class="icon-title">{{ item.name }}</p>
            </div>
        </div>
        <div class="page">
            <el-pagination
                v-model:currentPage="data.page.currentPage"
                :page-size="data.page.pageSize"
                layout="total, prev, pager, next"
                :total="icons.length"
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>

    <el-icon size="16" color="red">
        <component is="icon-Lock" />
    </el-icon>
    <component is="icon-park-user" />
</template>

<style scoped lang="scss">
.icon-container {
    padding: 20px 30px;
    background-color: #fff;

    .search {
        width: 260px;
        padding: 15px 0;
    }

    .icon-content {
        display: flex;
        flex-wrap: wrap;

        .icon-item {
            display: flex;
            align-items: center;
            width: calc(100% / 9);
            padding: 5px 15px;
            margin: 5px;
            cursor: pointer;
            border-radius: 6px;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

            .icon-name {
                width: 30px;
            }

            .icon-title {
                padding-left: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .page {
        padding: 10px 0;
    }
}
</style>
