<script setup lang="ts">
import { ref } from 'vue'

const val = ref(230)
const status = ref(true)
const sa = ref(235)
const aa = () => {
    status.value = !status.value
}
</script>

<template>
    <div style="width: 100%; height: 100%">
        <!--    layout-->
        <!--    <router-view />-->
        <div
            :style="{ width: status ? val + 'px' : val - 170 + 'px' }"
            style="height: 100%; background-color: aqua; transition: width linear 0.2s"
        ></div>
        <div style="width: 300px; height: 100%; background-color: antiquewhite"></div>
        <el-button
            type="primary"
            style="position: fixed; top: 15px; transition: left linear 0.2s"
            :style="{ left: status ? sa + 'px' : sa - 170 + 'px' }"
            @click="aa"
        >
            {{ status ? '收缩' : '展开' }}
        </el-button>
    </div>
</template>

<style scoped lang="scss">
#aaaa {
    transition: width linear 0.2s;
}

#bth {
    transition: left linear 0.2s;
}
</style>
