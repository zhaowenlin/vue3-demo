import type { App } from 'vue';
import NForm from './n-form';
import NTablePage from './n-tablePage';
import { InstallOptions } from './utils';
declare const version = "1.0.0";
declare const install: (app: App, opt: InstallOptions) => void;
export { NForm, NTablePage, version, install, };
export * from './utils';
declare const _default: {
    version: string;
    install: (app: App<any>, opt: InstallOptions) => void;
};
export default _default;
