<script setup lang="ts">
withDefaults(defineProps<{ menuData: any[] }>(), {})
</script>

<template>
    <template v-for="(item, index) in menuData" :key="index">
        <!-- 有子组件时 -->
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                <component :is="item.icon" class="icon" />
                <span>{{ item.title }}</span>
            </template>
            <MenuItem :menu-data="item.children" />
        </el-sub-menu>
        <!-- 无子组件时 -->
        <el-menu-item v-else :index="item.path">
            <component :is="item.icon" class="icon" />
            <template #title>{{ item.title }}</template>
        </el-menu-item>
    </template>
</template>

<style scoped lang="scss">
.icon {
    margin-right: 10px;
}
</style>
