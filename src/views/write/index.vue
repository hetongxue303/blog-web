<script setup lang="ts">
import { useWrite } from './hooks/useWrite'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getLocale } from '../../locales'

const {
    t,
    tagsAll,
    categoryAll,
    tagKeywords,
    categoryKeywords,
    dialogForm,
    dialogShow,
    dialogFormRef,
    openDialog,
    handleOperate,
    removeCategory,
    removeTags,
    searchTags,
    searchCategory,
    saveTags,
    saveCategory,
    clickTagsItem,
    clickCategoryItem,
    handleUploadSuccess,
    handleBeforeUpload
} = useWrite()
</script>

<template>
    <el-card :style="{ borderRadius: '10px', height: '100%' }">
        <div style="width: 100%; height: 30px; margin-bottom: 20px; display: flex; align-items: center">
            <div style="width: 100%">
                <el-input v-model="dialogForm.title" placeholder="输入文章标题" />
            </div>
            <div style="display: flex; justify-content: right">
                <el-button type="danger" text style="border: 1px solid red; margin-left: 10px" @click="openDialog(2)"> 保存草稿 </el-button>
                <el-button type="danger" @click="openDialog(1)">发布文章</el-button>
            </div>
        </div>
        <MdEditor
            v-model="dialogForm.content"
            :language="getLocale() === 'zh_cn' ? 'zh-CN' : 'en-US'"
            placeholder="记录今日学习笔记吧！"
            :style="{ height: '630px', borderRadius: '10px' }"
        />
    </el-card>

    <el-dialog
        v-model="dialogShow"
        width="60%"
        align-center
        destroy-on-close
        title="发布博客"
        :show-close="false"
        :close-on-click-modal="false"
        :style="{ borderRadius: '10px' }"
    >
        <el-form ref="dialogFormRef" :model="dialogForm" label-width="80">
            <el-form-item prop="categoryId" label="文章分类">
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
                        v-model="categoryKeywords"
                        :fetch-suggestions="searchCategory"
                        :trigger-on-focus="false"
                        style="width: 100%"
                        clearable
                        placeholder="请输入分类名搜索，回车可添加自定义分类"
                        @keyup.enter="saveCategory"
                        @select="clickCategoryItem"
                    >
                        <template #default="{ item }"> {{ item.name }}</template>
                    </el-autocomplete>
                    <div class="popover-container">
                        <div v-for="item in categoryAll" :key="item" class="popover-item" @click="clickCategoryItem(item)">
                            {{ item.name }}
                        </div>
                    </div>
                    <template #reference>
                        <el-button type="success" plain> 添加分类</el-button>
                    </template>
                </el-popover>
            </el-form-item>
            <el-form-item prop="tagId" label="文章标签">
                <el-tag v-show="dialogForm.tagId" size="large" disable-transitions style="margin: 0 1rem 0 0" :closable="true" @close="removeTags">
                    {{ dialogForm.tag?.name }}
                </el-tag>
                <el-popover v-if="!dialogForm.tagId" placement="bottom-start" :width="460" trigger="click">
                    <div class="popover-title">标签</div>
                    <el-autocomplete
                        v-model="tagKeywords"
                        :fetch-suggestions="searchTags"
                        :trigger-on-focus="false"
                        style="width: 100%"
                        clearable
                        placeholder="请输入标签名搜索，回车可添加自定义标签"
                        @keyup.enter="saveTags"
                        @select="clickTagsItem"
                    >
                        <template #default="{ item }"> {{ item.name }}</template>
                    </el-autocomplete>
                    <div class="popover-container">
                        <div v-for="item in tagsAll" :key="item" class="popover-item" @click="clickTagsItem(item)">
                            {{ item.name }}
                        </div>
                    </div>
                    <template #reference>
                        <el-button type="primary" plain> 添加标签</el-button>
                    </template>
                </el-popover>
            </el-form-item>
            <el-form-item prop="cover" label="文章封面">
                <el-upload
                    class="images-upload"
                    drag
                    multiple
                    action="/api/article/upload/images"
                    :show-file-list="false"
                    :on-success="handleUploadSuccess"
                    :before-upload="handleBeforeUpload"
                >
                    <el-image v-if="dialogForm.cover" :src="dialogForm.cover" fit="fill" class="images-box" alt="" />
                    <div v-else class="images-box">
                        <el-icon class="images-upload-icon" :size="67">
                            <component is="upload-filled" />
                        </el-icon>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item prop="isTop" label="文章置顶">
                <el-switch v-model="dialogForm.isTop" />
            </el-form-item>
            <el-form-item prop="isFeatured" label="文章推荐">
                <el-switch v-model="dialogForm.isFeatured" />
            </el-form-item>
            <el-form-item prop="password" label="文章权限">
                <el-radio-group v-model="dialogForm.authority">
                    <el-radio-button :label="1">公开</el-radio-button>
                    <el-radio-button :label="2">私有</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="type" label="文章类型">
                <el-radio-group v-model="dialogForm.type">
                    <el-radio-button :label="1">原创</el-radio-button>
                    <el-radio-button :label="2">转载</el-radio-button>
                    <el-radio-button :label="3">翻译</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button text type="danger" @click="dialogShow = false">{{ t('button.back') }}</el-button>
            <el-button type="primary" @click="handleOperate">{{ t('button.confirm') }}</el-button>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.popover-title {
    margin-bottom: 1rem;
    text-align: center;
}

.popover-container {
    margin-top: 1rem;
    height: 260px;
    overflow-y: auto;

    .popover-item {
        cursor: pointer;
        padding: 0.6rem 0.5rem;

        &:hover {
            background-color: #f0f9eb;
            color: #67c23a;
        }
    }
}

$images-upload-width: 350px;
$images-upload-height: 200px;
:deep(.images-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: $images-upload-width;
    height: $images-upload-height;

    &:hover {
        border-color: var(--el-color-primary);
    }
}

:deep(.el-upload-dragger) {
    padding: 0;
}

.images-upload-icon {
    color: #8c939d;
    text-align: center;
}

.images-box {
    width: $images-upload-width;
    height: $images-upload-height;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
