
import { RuleItem } from 'async-validator'
import { VNode } from 'vue'
interface NFormItemRules extends RuleItem {
    trigger: string
}
// import { ElFormContext } from 'element-plus/lib/el-form'
export interface FormItem {
    disabled?: boolean
    defaultValue?: string | null | number | undefined | null
    rule?: NFormItemRules
    key: string
    type: string
    span?: number
    title?: string
    isShow?: boolean & FormItemIsShow
    showTips?: boolean
    showSuffix?: boolean
    tipMsg?: string
    suffixMsg?: string
    tipIcon?: string
    condition: boolean & FormItemIsShow
    props?: NObj
    options?: FormItemOptions[] | undefined
    renderOption?: (option: FormItemOptions, item: FormItem) => void
    text?: string
    required?: boolean
    renderTitle?: (item: FormItem, form: NObj) => VNode
    render?: (item: FormItem, form: NObj) => VNode
    renderContent?: (item: FormItem, form: NObj) => VNode
    onInput?: (value: any, item: FormItem, form: NObj ) => void
    settings?: NObj
    attrs?: NObj
    border?: boolean
    width?: number
    on?: NObj
    nativeOn?: NObj



}
interface FormItemIsShow {
    (form: NObj, item: FormItem): boolean
}
export interface FormItemOptions {
    text: string
    value: unknown
}
export declare type RawSlots = {
    [name: string]: unknown
    $stable?: boolean
    /* Excluded from this release type: _ctx */
    /* Excluded from this release type: _ */
};
declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
export declare type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;
export declare type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
export interface TagItem {
    tagName: string
    props?: NObj
    item: FormItem
    nativeOn?: NObj
    children?: VNode[] | string
    on?: NObj
}
export declare type GridArray = number[]
