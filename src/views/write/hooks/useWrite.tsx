import { ref, watch } from 'vue'
import { Article, Category, Tags } from '../../../api/types'
import { FormInstance } from 'element-plus'
import i18n from '../../../locales'
import { getCategoryAllUrl, searchCategoryUrl } from '../../../api/category'
import { clone, cloneDeep } from 'lodash-es'
import { getTagAllUrl, searchTagsUrl } from '../../../api/tags'
import { MessageWarning, NotificationError, NotificationSuccess } from '../../../utils/element'
import { addArticleUrl } from '../../../api/article'

export function useWrite() {
    const { t } = i18n.global
    const dialogShow = ref(false)
    const dialogForm = ref<Article>({ authority: 1, type: 1, isTop: false, isFeatured: false })
    const dialogFormRef = ref<FormInstance>()
    const categoryAll = ref<Category[]>([])
    const tagsAll = ref<Tags[]>([])
    const tagKeywords = ref<string | undefined>(undefined)
    const categoryKeywords = ref<string | undefined>(undefined)
    const maxSize = ref(5)
    const types = ref<string[]>(['image/jpeg', 'image/png'])
    const openDialog = (status: number) => {
        if (!dialogForm.value.title) {
            MessageWarning('标题不能为空')
            return
        }
        if (!dialogForm.value.content) {
            MessageWarning('内容不能为空')
            return
        }
        dialogForm.value.status = status
        if (status === 2) {
            add(dialogForm.value)
            return
        }
        dialogShow.value = true
    }

    const getCategoryAll = () => {
        getCategoryAllUrl().then(({ data }) => (categoryAll.value = data.code === 200 ? cloneDeep(data.data) : []))
    }

    const searchCategory = (keywords: string, cb: (arg: any) => void) => {
        searchCategoryUrl(keywords).then(({ data }) => (data.code === 200 ? cb(cloneDeep(data.data)) : cb([])))
    }
    const removeCategory = () => (dialogForm.value.categoryId = undefined)
    const saveCategory = () => {}
    const clickCategoryItem = (item: Category) => {
        dialogForm.value.category = item
        dialogForm.value.categoryId = item.id
    }
    const getTagAll = () => {
        getTagAllUrl().then(({ data }) => (tagsAll.value = data.code === 200 ? cloneDeep(data.data) : []))
    }
    const searchTags = (keywords: string, cb: (arg: any) => void) => {
        searchTagsUrl(keywords).then(({ data }) => (data.code === 200 ? cb(cloneDeep(data.data)) : cb([])))
    }
    const removeTags = () => (dialogForm.value.tagId = undefined)
    const saveTags = () => {}
    const clickTagsItem = (item: Tags) => {
        dialogForm.value.tag = item
        dialogForm.value.tagId = item.id
    }
    const handleUploadSuccess = (response: any) => (dialogForm.value.cover = clone(response.data))

    const handleBeforeUpload = (file: File) => {
        const { value } = maxSize
        const { size, type } = file
        if (size / 1000 / 1024 > value) {
            MessageWarning(`图片最大为${value}MB`)
            return false
        }
        if (types.value.indexOf(type) === -1) {
            MessageWarning('图片类型错误')
            return false
        }
    }
    const add = (value: Article) => {
        addArticleUrl(value)
            .then(async ({ data }) => {
                if (data.code === 200) {
                    NotificationSuccess(t('common.success'))
                    dialogShow.value = false
                    dialogForm.value.status === 1 ? window.location.replace('/blog/article') : null
                    return
                }
                NotificationError(t('common.fail'))
            })
            .catch(({ response }) => MessageWarning(response.data.message))
    }

    const handleOperate = () => {
        const { value } = dialogForm
        if (!value.categoryId) MessageWarning('请选择分类')
        if (!value.tagId) MessageWarning('请选择标签')
        if (!value.cover) MessageWarning('请上传文章封面')
        add(value)
    }

    watch(
        () => dialogShow.value,
        (value) => {
            if (value) {
                getCategoryAll()
                getTagAll()
            }
        },
        { deep: true }
    )
    return {
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
        getTagAll,
        getCategoryAll,
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
    }
}
