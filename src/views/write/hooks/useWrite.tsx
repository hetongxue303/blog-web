import { reactive, ref } from 'vue'
import { Article } from '../../../api/types'
import { FormInstance, FormRules } from 'element-plus'
import i18n from '../../../locales'

export function useWrite() {
    const { t } = i18n.global
    const content = ref('# hello word！')
    const dialogShow = ref(false)
    const dialogForm = ref<Article>({ type: 3, isTop: false, isFeatured: false, content: content.value })
    const dialogFormRef = ref<FormInstance>()
    const dialogFormRules = reactive<FormRules>({})

    const openDialog = () => {
        dialogShow.value = true
    }

    const handleOperate = async (formEl?: FormInstance) => {
        if (!formEl) return
        await formEl.validate(async (valid) => {
            if (valid) {
                const { value } = dialogForm
                console.log(value)
            }
        })
    }

    return {
        t,
        dialogForm,
        dialogShow,
        dialogFormRef,
        dialogFormRules,
        content,
        openDialog,
        handleOperate
    }
}
