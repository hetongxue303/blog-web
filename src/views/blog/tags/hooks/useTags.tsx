import { onMounted, reactive, ref, watch } from 'vue'
import { addTagUrl, batchDeleteTagUrl, deleteTagUrl, getTagListUrl, updateTagUrl } from '../../../../api/tags'
import { Filter, Search, Tags } from '../../../../api/types'
import { clone, cloneDeep } from 'lodash-es'
import { delayRequest } from '../../../../utils/common'
import i18n from '../../../../locales'
import { FormInstance, FormRules } from 'element-plus'
import { confirmBox, MessageWarning, NotificationError, NotificationSuccess } from '../../../../utils/element'

export function useTags() {
    const tableData = ref<Tags[]>([])
    const total = ref(0)
    const loading = ref(false)
    const selection = ref<Tags[]>([])
    const search: Search = reactive({ current: 1, size: 10 })
    const disableStatus = ref(true)
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

    const result = (data: any, dialog?: boolean) => {
        if (data.code === 200) {
            NotificationSuccess(t('common.success'))
            getTableData()
            if (dialog) dialogShow.value = false
            return
        }
        NotificationError(t('common.fail'))
    }

    const add = (value: Tags) => {
        addTagUrl(value)
            .then(async ({ data }) => result(data, true))
            .catch(({ response }) => MessageWarning(response.data.message))
    }

    const handleDelete = (id: number) => deleteTagUrl(id).then(async ({ data }) => result(data))

    const handleBatchDelete = () => {
        confirmBox(t('common.popConfirms'), t('common.tip'), 'warning', () =>
            batchDeleteTagUrl(selection.value.map((item: Tags) => item.id) as number[]).then(async ({ data }) => result(data))
        )
    }

    const update = (value: Tags) => {
        updateTagUrl(value)
            .then(async ({ data }) => result(data, true))
            .catch(({ response }) => MessageWarning(response.data.message))
    }

    const getList = () => {
        getTagListUrl(search)
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
        delayRequest(() => getList(), 5, 500)
    }

    const changePage = (page: number) => (search.current = page)

    const changeSize = (size: number) => (search.size = size)

    const handleSelectionChange = (data: Tags[]) => (selection.value = data)

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
