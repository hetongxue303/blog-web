<script setup lang="ts">
import { useLogin } from './hooks/useLogin'
import { onMounted, watch } from 'vue'

const { route, form, imgUrl, loading, redirect, ruleFormRef, getCookie, refreshCaptcha, handleLogin } = useLogin()

watch(
    () => imgUrl.value,
    () => (form.captcha = ''),
    { deep: true }
)
watch(
    () => route,
    () => (redirect.value = route.query && (route.query.redirect as string)),
    { deep: true, immediate: true }
)

onMounted(() => {
    refreshCaptcha()
    getCookie()
})
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <el-form ref="ruleFormRef" :model="form">
                <el-form-item prop="username">
                    <div class="w-full flex justify-between items-center">
                        <el-input v-model="form.username" prefix-icon="user" clearable placeholder="用户名" />
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <div class="w-full flex justify-between items-center">
                        <el-input v-model="form.password" clearable prefix-icon="lock" show-password placeholder="密码" />
                    </div>
                </el-form-item>
                <el-form-item prop="captcha">
                    <div class="w-full flex justify-between items-center">
                        <el-input v-model="form.captcha" clearable prefix-icon="key" placeholder="验证码" />
                        <el-image :src="imgUrl" class="captcha" />
                    </div>
                </el-form-item>
                <el-form-item prop="status">
                    <div class="w-full flex justify-between items-center">
                        <el-checkbox v-model="form.status">记住密码</el-checkbox>
                    </div>
                </el-form-item>
                <div class="w-full flex justify-between items-center">
                    <el-button
                        type="primary"
                        class="w-full"
                        :loading="loading"
                        @click="handleLogin(ruleFormRef)"
                        @keyup.enter="handleLogin(ruleFormRef)"
                    >
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 陆 中...</span>
                    </el-button>
                </div>
                <div class="w-full flex justify-between items-center" style="margin-top: 25px">
                    <span class="h-1px w-35 bg-gray-200" />
                    <span style="color: rgb(107, 114, 128)">第三方登录</span>
                    <span class="h-1px w-35 bg-gray-200" />
                </div>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    width: 100vw;
    height: 100vh;
    background-color: white;
}

.login-box {
    padding: 50px 0 0 0;
    width: 350px;
    height: 400px;
    background-color: white;
    position: fixed;
    right: 200px;
    top: 200px;
}

.captcha {
    width: 180px;
    height: 35px;
}

:deep(.el-input__wrapper) {
    height: 35px;
    border-radius: 0;
}
</style>
