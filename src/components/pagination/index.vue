<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        currentPage: number
        pageSize: number
        total: number
        small?: boolean
        disabled?: boolean
        background?: boolean
        layout?: string
        pageSizes?: number[]
        prevText?: string
        nextText?: string
        hideOnSinglePage?: boolean
    }>(),
    {
        small: true,
        disabled: false,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: () => [5, 10, 15, 20, 50],
        prevText: '',
        nextText: '',
        hideOnSinglePage: false
    }
)
const emit = defineEmits<{
    (e: 'current-change', currentPage: number): void
    (e: 'size-change', currentPage: number): void
}>()
const handleCurrentChange = (value: number) => emit('current-change', value)
const handleSizeChange = (value: number) => emit('size-change', value)
</script>

<template>
    <el-pagination
        class="pagination"
        :current-page="props.currentPage"
        :page-size="props.pageSize"
        :total="props.total"
        :page-sizes="props.pageSizes"
        :small="props.small"
        :disabled="props.disabled"
        :background="props.background"
        :layout="props.layout"
        :prev-text="props.prevText"
        :next-text="props.nextText"
        :hide-on-single-page="props.hideOnSinglePage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>

<style scoped lang="scss">
.pagination {
    @apply m-p-10px;
}
</style>
