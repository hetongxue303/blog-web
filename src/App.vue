<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { setBrowserTitle } from './utils/common'
import { getLocale } from './locales'
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const route = useRoute()
const locale = computed(() => (getLocale() === 'en' ? en : zhCn))
watch(
    () => route.path,
    () => setBrowserTitle(),
    { deep: true }
)
</script>

<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>

<style scoped></style>
