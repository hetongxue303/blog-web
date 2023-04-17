import { reactive, ref } from 'vue'
import { addTagUrl, getTagListUrl, updateTagUrl } from '../../../../api/tags'
import { Filter, Search, Tags } from '../../../../api/types'
import { clone, cloneDeep } from 'lodash-es'
import { delayRequest } from '../../../../utils/common'
import i18n from '../../../../locales'
import { FormInstance, FormRules } from 'element-plus'
import { MessageWarning, NotificationError, NotificationSuccess } from '../../../../utils/element'

export function useTags() {
    const tableData = ref<Tags[]>([])
    const total = ref(0)
    const loading = ref(false)
    const selection = ref<Tags[]>([])
    const search: Search = reactive({ current: 1, size: 10 })
    const { t } = i18n.global
    const filterColumns = ref<Filter[]>([
        { label: t('page.tags.ID'), status: false },
        { label: t('page.tags.name'), status: true },
        { label: t('page.tags.status'), status: true },
        { label: t('page.tags.remark'), status: true },
        { label: t('page.tags.createTime'), status: true },
        { label: t('page.tags.updateTime'), status: false },
        { label: t('page.tags.operate'), status: true }
    ])

    const getTableData = () => {
        loading.value = true
        delayRequest(
            () =>
                getTagListUrl(search)
                    .then(({ data }) => {
                        if (data.code === 200) {
                            tableData.value = cloneDeep(data.data.records)
                            total.value = clone(data.data.total)
                        }
                    })
                    .finally(() => (loading.value = false)),
            5,
            500
        )
    }

    const changePage = (page: number) => (search.current = page)

    const changeSize = (size: number) => (search.size = size)

    const dialogShow = ref(false)
    const dialogForm = ref<Tags>({})
    const dialogFormRef = ref<FormInstance>()
    const dialogOperate = ref('')
    const dialogTitle = ref('')
    const dialogFormRules = reactive<FormRules>({
        name: [
            { required: true, message: t('rules.name'), trigger: 'blur' },
            { min: 1, max: 10, message: t('rules.nameLength'), trigger: 'blur' }
        ]
    })
    const openDialog = (operate: string, row?: Tags) => {
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
                if (dialogOperate.value === 'add') {
                    addTagUrl(value)
                        .then(({ data }) => {
                            if (data.code === 200) {
                                NotificationSuccess(t('common.success'))
                                dialogShow.value = false
                                getTableData()
                                return
                            }
                            NotificationError(t('common.fail'))
                        })
                        .catch(({ response }) => MessageWarning(response.data.message))
                } else {
                    updateTagUrl(value)
                        .then(({ data }) => {
                            if (data.code === 200) {
                                NotificationSuccess(t('common.success'))
                                dialogShow.value = false
                                getTableData()
                                return
                            }
                            NotificationError(t('common.fail'))
                        })
                        .catch(({ response }) => MessageWarning(response.data.message))
                }
            }
        })
    }

    return {
        getTableData,
        changePage,
        changeSize,
        filterColumns,
        tableData,
        total,
        search,
        loading,
        t,
        dialogShow,
        dialogForm,
        dialogOperate,
        dialogFormRef,
        dialogTitle,
        openDialog,
        handleOperate,
        dialogFormRules
    }
}
