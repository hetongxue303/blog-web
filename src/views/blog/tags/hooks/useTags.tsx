import { reactive, ref } from 'vue'
import { getTagList } from '../../../../api/tags'
import { Search, Tags } from '../../../../api/types'
import { clone, cloneDeep } from 'lodash-es'
import { delayRequest } from '../../../../utils/common'

export function useTags() {
    const tableData = ref<Tags[]>([])
    const total = ref(0)
    const loading = ref(false)
    const search: Search = reactive({ current: 1, size: 10 })

    const getTableData = () => {
        loading.value = true
        delayRequest(
            () =>
                getTagList(search)
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
    return { getTableData, tableData, total, search, loading }
}
