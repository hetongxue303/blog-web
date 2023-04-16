<script setup lang="ts">
import Aside from './components/aside/index.vue'
import Header from './components/header/index.vue'
import { useSetting } from '../store/modules/setting'
import { computed } from 'vue'

const setting = useSetting()
const collapse = computed(() => setting.getCollapse)
</script>

<template>
    <div class="app-layout">
        <el-container>
            <el-aside width="auto">
                <Aside v-model:collapse="collapse" />
            </el-aside>
            <el-container>
                <el-header>
                    <Header v-model:collapse="collapse" />
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="scss">
.app-layout {
    position: relative;
    width: 100%;
    height: 100%;
    // 中间内容背景色
    background-color: #f1f2f5;
}

:deep(.el-container) {
    height: 100vh;
    width: 100vw;
}

:deep(.el-aside) {
    height: 100vh;
    width: auto;
    background-color: #304156;
}

:deep(.el-header) {
    padding: 0;
    margin: 0;
    width: auto;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

:deep(.el-main) {
    height: 100%;
    width: 100%;
    padding: 0;
    background-color: darkseagreen;
}
</style>
