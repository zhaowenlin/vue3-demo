export declare interface Fn<T = any, R = T> {
    (...arg: T[]): R
  }

export declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>
  }

export declare interface IObj<T = any> {
    [key: string]: T
    [key: number]: T
  }

export declare function parseInt(s: string | number, radix?: number): number;

export declare function parseFloat(string: string | number): number;

export declare type Nullable<T> = T | null;


export declare type RefType<T> = T | null;

export declare type CustomizedHTMLElement<T> = HTMLElement & T;

export declare type Indexable<T extends any = any> = {
    [key: string]: T
  };

export declare type Recordable<T extends any = any> = Record<string, T>;

export declare type ReadonlyRecordable<T extends any = any> = {
    readonly [key: string]: T
  };

export declare type Hash<T> = Indexable<T>;

export declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

export declare type LabelValueOptions = {
    label: string
    value: any
  }[];

export declare type EmitType = (event: string, ...args: any[]) => void;

export declare type TargetContext = '_self' | '_blank';

export declare type TimeoutHandle = ReturnType<typeof setTimeout>;

export declare type IntervalHandle = ReturnType<typeof setInterval>;

export declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T
  }

export declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

export declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

export type IsSame<A, B> = A | B extends A & B ? true : false;

