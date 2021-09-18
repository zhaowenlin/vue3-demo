import { ElMessageBox, ElMessage as Message, ElNotification as notification } from 'element-plus';

/**
 * @description: Create confirmation box
 */
function createConfirm(message, title, options) {
  ElMessageBox.alert(message, title, options);
}

function createSuccessModal(options) {
  var msg = options.msg,
      title = options.title,
      callback = options.callback;
  createConfirm(msg, title, {
    type: 'success',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback: callback
  });
}

function createErrorModal(options) {
  var msg = options.msg,
      title = options.title,
      callback = options.callback;
  createConfirm(msg, title, {
    type: 'error',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback: callback
  });
}

function createInfoModal(options) {
  var msg = options.msg,
      title = options.title,
      callback = options.callback;
  createConfirm(msg, title, {
    type: 'info',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback: callback
  });
}

function createWarningModal(options) {
  var msg = options.msg,
      title = options.title,
      callback = options.callback;
  createConfirm(msg, title, {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    callback: callback
  });
}
/**
 * @description: message
 */


export function useMessage() {
  return {
    createMessage: Message,
    notification: notification,
    createConfirm: createConfirm,
    createErrorModal: createErrorModal,
    createSuccessModal: createSuccessModal,
    createInfoModal: createInfoModal,
    createWarningModal: createWarningModal
  };
}