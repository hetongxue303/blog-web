<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { setBrowserTitle } from './utils/common'

const route = useRoute()

watch(
    () => route.path,
    () => setBrowserTitle(),
    { deep: true }
)
</script>

<template>
    <router-view />
</template>

<style scoped></style>
