import { Callback, ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type';
import { INotification } from 'element-plus/lib/el-notification/src/notification.type';
interface ModalOption {
    msg: string;
    title: string;
    callback?: Callback;
}
declare function createConfirm(message: string, title: string, options?: ElMessageBoxOptions): void;
declare function createSuccessModal(options: ModalOption): void;
declare function createErrorModal(options: ModalOption): void;
declare function createInfoModal(options: ModalOption): void;
declare function createWarningModal(options: ModalOption): void;
export declare function useMessage(): {
    createMessage: import("element-plus/lib/utils/types").SFCWithInstall<import("element-plus/lib/el-message/src/types").IMessage>;
    notification: INotification;
    createConfirm: typeof createConfirm;
    createErrorModal: typeof createErrorModal;
    createSuccessModal: typeof createSuccessModal;
    createInfoModal: typeof createInfoModal;
    createWarningModal: typeof createWarningModal;
};
export {};
