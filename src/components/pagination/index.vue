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
        layout: 'jumper,prev,pager,next,sizes,total',
        pageSizes: () => [10, 15, 20, 30, 50],
        prevText: '',
        nextText: '',
        hideOnSinglePage: false
    }
)
const emit = defineEmits<{
    (e: 'change-page', currentPage: number): void
    (e: 'change-size', currentPage: number): void
}>()
const changePage = (value: number) => emit('change-page', value)
const changeSize = (value: number) => emit('change-size', value)
</script>

<template>
    <el-pagination
        class="pagination"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="props.pageSizes"
        :small="small"
        :disabled="disabled"
        :background="background"
        :layout="layout"
        :prev-text="prevText"
        :next-text="nextText"
        :hide-on-single-page="hideOnSinglePage"
        @size-change="changeSize"
        @current-change="changePage"
    />
</template>

<style scoped lang="scss">
.pagination {
    @apply m-p-10px;
}
</style>
