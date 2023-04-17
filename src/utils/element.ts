import { ElMessage, ElMessageBox, ElNotification, messageType } from 'element-plus'
import i18n from '../locales'

const DURATION_TIME = 1500
const { t } = i18n.global
// 消息框
export const NotificationSuccess = (message: string, duration: number = DURATION_TIME) =>
    ElNotification.success({
        message,
        duration
    })
export const NotificationError = (message: string, duration: number = DURATION_TIME) =>
    ElNotification.error({
        message,
        duration
    })
export const NotificationWarning = (message: string, duration: number = DURATION_TIME) =>
    ElNotification.warning({
        message,
        duration
    })
export const NotificationInfo = (message: string, duration: number = DURATION_TIME) =>
    ElNotification.info({
        message,
        duration
    })
export const MessageSuccess = (message: string, duration: number = DURATION_TIME) =>
    ElMessage.success({
        message,
        duration
    })
export const MessageError = (message: string, duration: number = DURATION_TIME) => ElMessage.error({ message, duration })
export const MessageWarning = (message: string, duration: number = DURATION_TIME) =>
    ElMessage.warning({
        message,
        duration
    })
export const MessageInfo = (message: string, duration: number = DURATION_TIME) => ElMessage.info({ message, duration })

/**
 * 确认框
 * @param text 文本
 * @param tip 提示
 * @param confirm 确认回调
 * @param cancel 取消回调
 * @param always 成功与否都会执行
 * @param type
 * @param confirmText 确认按钮文本
 * @param cancelText 返回按钮文本
 */
export const confirmBox = (
    text: string,
    tip: string,
    type: messageType,
    confirm: () => void,
    cancel?: () => void,
    always?: () => void,
    confirmText = t('button.confirm'),
    cancelText = t('button.back')
): void => {
    ElMessageBox.confirm(text, tip, {
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        type
    })
        .then(() => confirm())
        .catch((): void | null => (cancel ? cancel() : null))
        .finally((): void | null => (always ? always() : null))
}
