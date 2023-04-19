import { onMounted, reactive, ref, watch } from 'vue'
import i18n from '../../../../locales'
import { confirmBox, MessageWarning, NotificationError, NotificationSuccess } from '../../../../utils/element'
import { delayRequest } from '../../../../utils/common'
import { clone, cloneDeep } from 'lodash-es'
import { FormInstance, FormRules } from 'element-plus'
import { Article, Filter, Search } from '../../../../api/types'
import { addArticleUrl, batchDeleteArticleUrl, deleteArticleUrl, getArticleListUrl, updateArticleUrl } from '../../../../api/article'

export function useArticle() {
    const tableData = ref<Article[]>([])
    const total = ref(0)
    const loading = ref(false)
    const selection = ref<Article[]>([])
    const search: Search = reactive({ current: 1, size: 10 })
    const disableStatus = ref(true)
    const { t } = i18n.global
    const filterColumns = ref<Filter[]>([
        { label: t('page.article.ID'), status: false },
        { label: t('page.article.thumbnail'), status: true },
        { label: t('page.article.title'), status: true },
        { label: t('page.article.category'), status: true },
        { label: t('page.article.tag'), status: true },
        { label: t('page.article.type'), status: true },
        { label: t('page.article.isTop'), status: true },
        { label: t('page.article.isFeatured'), status: true },
        { label: t('page.article.createTime'), status: true },
        { label: t('page.article.updateTime'), status: false },
        { label: t('page.article.operate'), status: true }
    ])

    const result = (data: any, dialog?: boolean) => {
        if (data.code === 200) {
            NotificationSuccess(t('common.success'))
            getTableData()
            if (dialog) dialogShow.value = false
            return
        }
        NotificationError(t('common.fail'))
    }
    const add = (value: Article) => {
        addArticleUrl(value)
            .then(async ({ data }) => result(data, true))
            .catch(({ response }) => MessageWarning(response.data.message))
    }

    const handleDelete = (id: number) => deleteArticleUrl(id).then(async ({ data }) => result(data))

    const handleBatchDelete = () => {
        confirmBox(t('common.popConfirms'), t('common.tip'), 'warning', () =>
            batchDeleteArticleUrl(selection.value.map((item: Article) => item.id) as number[]).then(async ({ data }) => result(data))
        )
    }

    const update = (value: Article) => {
        updateArticleUrl(value)
            .then(async ({ data }) => result(data, true))
            .catch(({ response }) => MessageWarning(response.data.message))
    }
    const getCategoryList = () => {
        getArticleListUrl(search)
            .then(async ({ data }) => {
                if (data.code === 200) {
                    tableData.value = cloneDeep(data.data.records)
                    total.value = clone(data.data.total)
                }
            })
            .finally(() => (loading.value = false))
    }
    const getTableData = () => {
        loading.value = true
        delayRequest(() => getCategoryList(), 5, 500)
    }

    const changePage = (page: number) => (search.current = page)

    const changeSize = (size: number) => (search.size = size)

    const handleSelectionChange = (data: Article[]) => (selection.value = data)

    const dialogShow = ref(false)
    const dialogForm = ref<Article>({})
    const dialogFormRef = ref<FormInstance>()
    const dialogOperate = ref('')
    const dialogTitle = ref('')
    const dialogFormRules = reactive<FormRules>({
        name: [
            { required: true, message: t('rules.name'), trigger: 'blur' },
            { min: 1, max: 10, message: t('rules.nameLength'), trigger: 'blur' }
        ]
    })

    const openDialog = (operate: string, row?: Article) => {
        if (operate === 'add') {
            dialogTitle.value = t('common.add')
        } else {
            dialogTitle.value = t('common.edit')
            dialogForm.value = row ? cloneDeep(row) : cloneDeep(selection.value[0])
        }
        dialogShow.value = true
        dialogOperate.value = operate
    }

    const handleOperate = async (formEl?: FormInstance) => {
        if (!formEl) return
        await formEl.validate(async (valid) => {
            if (valid) {
                const { value } = dialogForm
                dialogOperate.value === 'add' ? add(value) : update(value)
            }
        })
    }

    watch(
        () => search,
        () => getTableData(),
        { deep: true }
    )

    watch(
        () => dialogShow.value,
        (value) => {
            if (!value) {
                dialogForm.value = {}
                dialogOperate.value = ''
            }
        },
        { deep: true }
    )

    watch(
        () => selection.value,
        (value) => (disableStatus.value = value.length < 1),
        { deep: true }
    )

    onMounted(() => getTableData())

    return {
        t,
        filterColumns,
        tableData,
        total,
        search,
        loading,
        dialogShow,
        dialogForm,
        dialogOperate,
        dialogFormRef,
        dialogTitle,
        disableStatus,
        dialogFormRules,
        getTableData,
        changePage,
        changeSize,
        openDialog,
        handleOperate,
        handleDelete,
        handleBatchDelete,
        handleSelectionChange
    }
}
