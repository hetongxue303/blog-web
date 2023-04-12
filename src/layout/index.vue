<script setup lang="ts"></script>

<template>
    <div class="m-container">
        <div class="m-header"></div>
        <div class="m-container">
            <div class="m-aside"></div>
            <div class="m-container">
                <div class="m-main"></div>
                <div class="m-footer"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.m-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #bfcbd9;
}

.m-header {
    height: 60px;
    position: relative;
    width: auto;
    background-color: aqua;
}

.m-aside {
    width: 210px;
    height: 100%;
    background-color: chartreuse;
}

.m-main {
    width: 100%;
    height: 100%;
    background-color: darkkhaki;
}

.m-footer {
    width: auto;
    height: 60px;
    background-color: deepskyblue;
}
</style>
