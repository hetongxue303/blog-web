<script setup lang="ts">
import MenuItem from './components/menuItem.vue'
import Logo from './components/logo.vue'
import { data } from '../../data'

withDefaults(
    defineProps<{
        collapse: boolean
    }>(),
    {}
)
</script>

<template>
    <div class="header-content" :style="{ width: collapse ? '60px' : '210px' }">
        <Logo :collapse="collapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                default-active="/dashboard"
                :unique-opened="true"
                :collapse-transition="true"
                router
                :collapse="collapse"
                text-color="#f4f4f5"
                active-text-color="#409eff"
                background-color="#304156"
            >
                <MenuItem :menu-data="data" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style scoped lang="scss">
:deep(.el-menu) {
    width: 60px;
    border-right: 0 !important;

    &:not(.el-menu--collapse) {
        width: 210px;
    }
}

:deep(.el-menu-item.is-active) {
    background-color: rgb(38, 52, 69);
}

.header-content {
    transition: width ease-in-out 0.3s;
}

:deep(.el-scrollbar) {
    height: calc(100% - 50px);
    background-color: #304156;
}

.scrollbar-wrapper {
    overflow-x: hidden !important;
}

.horizontal-collapse-transition {
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
}
</style>
