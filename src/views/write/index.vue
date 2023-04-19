<script setup lang="ts">
import { useWrite } from './hooks/useWrite'
import { getCategoryAllUrl, searchCategoryUrl } from '../../api/category'
import { ref, watch } from 'vue'
import { Category } from '../../api/types'
import { cloneDeep } from 'lodash-es'

const { openDialog, content, dialogShow, dialogForm, dialogFormRules, dialogFormRef, t } = useWrite()
const categoryAll = ref<Category[]>([])
const keywords = ref<string | undefined>(undefined)

const getAll = () => {
    getCategoryAllUrl().then(({ data }) => (categoryAll.value = data.code === 200 ? cloneDeep(data.data) : []))
}
const searchCategory = (keywords: string, cb: (arg: any) => void) => {
    searchCategoryUrl(keywords).then(({ data }) => (data.code === 200 ? cb(cloneDeep(data.data)) : cb([])))
}
const removeCategory = () => (dialogForm.value.categoryId = undefined)
const handleSelectCategory = (item: Category) => {
    console.log(item)
}
const saveCategory = (item: Category) => {
    console.log(item)
}
const clickCategoryItem = (item: Category) => {
    dialogForm.value.category = item
    dialogForm.value.categoryId = item.id
}

watch(
    () => dialogShow.value,
    (value) => {
        if (value) getAll()
    },
    { deep: true }
)
</script>

<template>
    <el-card :style="{ borderRadius: '10px' }">
        <div style="width: 100%; height: 60px; display: flex; align-items: center">
            <div style="width: 100%">
                <el-input v-model="dialogForm.title" placeholder="输入文章标题" />
            </div>
            <div style="display: flex; justify-content: right">
                <el-button type="danger" text style="border: 1px solid red; margin-left: 10px" @click="openDialog"> 保存草稿 </el-button>
                <el-button type="danger" @click="openDialog">发布文章</el-button>
            </div>
        </div>
        {{ content }}
    </el-card>
    <el-dialog
        v-model="dialogShow"
        width="60%"
        destroy-on-close
        title="发布博客"
        :show-close="false"
        :close-on-click-modal="false"
        :style="{ borderRadius: '10px' }"
    >
        <el-form ref="dialogFormRef" :rules="dialogFormRules" :model="dialogForm" label-width="70">
            <el-form-item prop="title" label="文章标题">
                <el-input v-model="dialogForm.title" placeholder="输入文章标题" />
            </el-form-item>
            <el-form-item prop="tagId" label="文章标签">
                <el-tag
                    v-show="dialogForm.categoryId"
                    size="large"
                    disable-transitions
                    type="success"
                    style="margin: 0 1rem 0 0"
                    :closable="true"
                    @close="removeCategory"
                >
                    {{ dialogForm.category?.name }}
                </el-tag>
                <el-popover v-if="!dialogForm.categoryId" placement="bottom-start" :width="460" trigger="click">
                    <div class="popover-title">分类</div>
                    <el-autocomplete
                        v-model="keywords"
                        :fetch-suggestions="searchCategory"
                        :trigger-on-focus="false"
                        style="width: 100%"
                        clearable
                        placeholder="请输入分类名搜索，回车可添加自定义分类"
                        @keyup.enter="saveCategory"
                        @select="handleSelectCategory"
                    >
                        <template #default="{ item }"> {{ item.name }}</template>
                    </el-autocomplete>
                    <div class="popover-container">
                        <div v-for="item in categoryAll" :key="item" class="category-item" @click="clickCategoryItem(item)">
                            {{ item.name }}
                        </div>
                    </div>
                    <template #reference>
                        <el-button type="success" plain> 添加分类</el-button>
                    </template>
                </el-popover>
            </el-form-item>
            <el-form-item prop="isTop" label="文章置顶">
                <el-switch v-model="dialogForm.isTop" />
            </el-form-item>
            <el-form-item prop="isFeatured" label="文章推荐">
                <el-switch v-model="dialogForm.isFeatured" />
            </el-form-item>
            <el-form-item prop="password" :label="t('page.article.password')">
                <el-switch v-model="dialogForm.password" />
            </el-form-item>
            <el-form-item prop="type" label="文章类型">
                <el-radio-group v-model="dialogForm.type">
                    <el-radio-button :label="1">原创</el-radio-button>
                    <el-radio-button :label="2">转载</el-radio-button>
                    <el-radio-button :label="3">翻译</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <!--            <el-form-item prop="thumbnail" :label="t('page.article.thumbnail')">-->
            <!--                <el-upload-->
            <!--                    class="avatar-uploader"-->
            <!--                    action=""-->
            <!--                    :show-file-list="false"-->
            <!--                    :on-success="handleAvatarSuccess"-->
            <!--                    :before-upload="beforeAvatarUpload"-->
            <!--                >-->
            <!--                    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />-->
            <!--                    <el-icon v-else class="avatar-uploader-icon">-->
            <!--                        <component is="plus" />-->
            <!--                    </el-icon>-->
            <!--                </el-upload>-->
            <!--            </el-form-item>-->
        </el-form>
        <template #footer>
            <el-button text type="danger" @click="dialogShow = false">{{ t('button.back') }}</el-button>
            <el-button type="primary" @click="handleOperate(dialogFormRef)">{{ t('button.confirm') }}</el-button>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.popover-title {
    margin-bottom: 1rem;
    text-align: center;
}

.popover-container {
    margin-top: 1rem;
    height: 260px;
    overflow-y: auto;

    .category-item {
        cursor: pointer;
        padding: 0.6rem 0.5rem;

        &:hover {
            background-color: #f0f9eb;
            color: #67c23a;
        }
    }
}
</style>
