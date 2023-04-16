<script setup lang="ts">
import { useSetting } from '../../../store/modules/setting'

withDefaults(
    defineProps<{
        collapse: boolean
    }>(),
    {}
)

const setting = useSetting()
</script>

<template>
    <!-- 折叠 -->
    <div class="collapse" @click="setting.changeCollapse()">
        <el-icon size="20" color="black">
            <component :is="collapse ? 'Expand' : 'Fold'" />
        </el-icon>
    </div>
</template>

<style scoped lang="scss">
.collapse {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color ease-in-out 0.2s;

    &:hover {
        background-color: #d0d4d9;
        transition: background-color ease-in-out 0.2s;
    }
}
</style>
