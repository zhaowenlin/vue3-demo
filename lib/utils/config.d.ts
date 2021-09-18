interface InstallOptions {
    projectName: string;
    zIndex: number;
    prefix: string;
    joinPrefix: boolean;
    timeout: number;
    requestOptions?: any;
    ext?: any;
}
declare const setConfig: (option: InstallOptions) => void;
declare const getConfig: (key: keyof InstallOptions) => unknown;
export { getConfig, setConfig, InstallOptions, };
