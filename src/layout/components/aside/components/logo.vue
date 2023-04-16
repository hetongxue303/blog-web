<script setup lang="ts">
withDefaults(
    defineProps<{
        collapse: boolean
    }>(),
    {}
)
</script>

<template>
    <div class="logo-content" :style="{ width: collapse ? '60px' : '210px' }">
        <el-image src="" style="width: 60px; height: 60px" />
        <span v-show="!collapse" class="logo-title">博客后台</span>
    </div>
</template>

<style scoped lang="scss">
.logo-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    transition: width 0.3s ease-in-out;
}
.logo-title {
    font-size: 24px;
    padding-right: 20px;
}
</style>
