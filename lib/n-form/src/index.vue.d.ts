import { FormItem, GridArray } from './type';
import { PropType, VNode } from 'vue';
import { ValidateFieldCallback } from 'element-plus/lib/el-form';
declare const _default: import("vue").DefineComponent<{
    grid: {
        type: PropType<number | GridArray>;
        default: number;
    };
    gutter: {
        type: NumberConstructor;
    };
    formList: {
        type: PropType<FormItem[]>;
        default: () => any[];
    };
    notCtrl: {
        type: BooleanConstructor;
        default: boolean;
    };
    enterSubmit: {
        type: BooleanConstructor;
        default: boolean;
    };
    lib: {
        type: StringConstructor;
        default: string;
    };
    labelWidth: {
        type: NumberConstructor;
        default: number;
    };
    contentWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    submitText: {
        type: StringConstructor;
        default: string;
    };
    resetText: {
        type: StringConstructor;
        default: string;
    };
    hasSubmitBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    hasResetBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: ObjectConstructor;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    textareaMaxlength: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: {
        type: StringConstructor;
        default: string;
    };
    footerAlign: {
        type: StringConstructor;
        default: string;
    };
}, {
    clear: () => void;
    reset: () => void;
    setForm: (form: any) => void;
    validateField: (props: string | string[], callback: ValidateFieldCallback) => void;
    form: {};
    renderFormList: () => any[];
    renderSubmit: () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    formRef: any;
    rules: import("vue").ComputedRef<{}>;
    submit: () => void;
    slots: Readonly<{
        [name: string]: import("vue").Slot;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "submit"[], "submit", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    grid: number | GridArray;
    formList: FormItem[];
    notCtrl: boolean;
    enterSubmit: boolean;
    lib: string;
    labelWidth: number;
    contentWidth: string | number;
    submitText: string;
    resetText: string;
    hasSubmitBtn: boolean;
    hasResetBtn: boolean;
    clearable: boolean;
    maxlength: string | number;
    textareaMaxlength: number;
    disabled: boolean;
    className: string;
    footerAlign: string;
} & {
    gutter?: number;
    options?: Record<string, any>;
}>, {
    grid: number | GridArray;
    formList: FormItem[];
    notCtrl: boolean;
    enterSubmit: boolean;
    lib: string;
    labelWidth: number;
    contentWidth: string | number;
    submitText: string;
    resetText: string;
    hasSubmitBtn: boolean;
    hasResetBtn: boolean;
    clearable: boolean;
    maxlength: string | number;
    textareaMaxlength: number;
    disabled: boolean;
    className: string;
    footerAlign: string;
}>;
export default _default;
