import { RuleItem } from 'async-validator';
import { VNode } from 'vue';
interface NFormItemRules extends RuleItem {
    trigger: string;
}
export interface FormItem {
    disabled?: boolean;
    defaultValue?: string | null | number | undefined | null;
    rule?: NFormItemRules;
    key: string;
    type: string;
    title?: string;
    isShow?: boolean & FormItemIsShow;
    props?: NObj;
    options?: FormItemOptions[] | undefined;
    renderOption?: (option: FormItemOptions, item: FormItem) => void;
    text?: string;
    required?: boolean;
    renderTitle?: (item: FormItem, form: IObj) => VNode;
    render?: (parentDom: VNode, item: FormItem, form: IObj) => VNode;
    renderContent?: (dom: VNode, item: FormItem, form: IObj) => VNode;
    onInput?: (value: any, item: FormItem, form: IObj) => void;
    settings?: IObj;
    attrs?: IObj;
    border?: boolean;
    width?: number;
    on?: IObj;
    nativeOn?: IObj;
}
interface FormItemIsShow {
    (form: IObj, item: FormItem): boolean;
}
export interface FormItemOptions {
    text: string;
    value: unknown;
}
export declare type RawSlots = {
    [name: string]: unknown;
    $stable?: boolean;
};
declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
export declare type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;
export declare type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
export interface TagItem {
    tagName: string;
    props?: IObj;
    item: FormItem;
    nativeOn?: IObj;
    children?: VNode[] | string;
    on?: IObj;
}
export declare type GridArray = number[];
export {};
