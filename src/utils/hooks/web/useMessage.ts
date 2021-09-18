import { ElMessageBox, ElMessage as Message, ElNotification as notification } from 'element-plus'
import { Callback, ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type'
import { INotification } from 'element-plus/lib/el-notification/src/notification.type'
interface ModalOption {
  msg: string
  title: string
  callback?: Callback
}
/**
 * @description: Create confirmation box
 */
function createConfirm(message: string, title: string, options?: ElMessageBoxOptions): void {
  ElMessageBox.alert(message, title,  options)
}
function createSuccessModal(options: ModalOption) {
  const { msg, title, callback }  = options
  createConfirm(msg, title, {
    type: 'success',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback,
  })
}

function createErrorModal(options: ModalOption) {
  const { msg, title, callback }  = options
  createConfirm(msg, title, {
    type: 'error',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback,
  })
}

function createInfoModal(options: ModalOption) {
  const { msg, title, callback }  = options
  createConfirm(msg, title, {
    type: 'info',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback,
  })
}

function createWarningModal(options: ModalOption) {
  const { msg, title, callback }  = options
  createConfirm(msg, title, {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback,
  })
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as INotification,
    createConfirm,
    createErrorModal,
    createSuccessModal,
    createInfoModal,
    createWarningModal,
  }
}
