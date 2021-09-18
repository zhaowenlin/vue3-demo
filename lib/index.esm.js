import { defineComponent, reactive, ref, computed, h, getCurrentInstance, watch, resolveComponent, resolveDirective, openBlock, createBlock, withDirectives, createVNode, mergeProps, withCtx, renderSlot, unref, readonly, provide, inject, onMounted, nextTick, onUnmounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElCheckbox, ElCheckboxGroup, ElDatePicker, ElTimePicker, ElRadio, ElRadioGroup, ElSwitch, ElSlider, ElButton, ElRow, ElCol, ElInputNumber, ElCascader, ElMessage, ElNotification, ElMessageBox, ElLoading } from 'element-plus';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';

const getPrefix = (tag, lib) => {
    const iviewMap = {
        form: 'i-form',
        'form-item': 'form-item',
        input: 'i-input',
        select: 'i-select',
        option: 'i-option',
        checkbox: 'checkbox',
        'checkbox-group': 'checkbox-group',
        'date-picker': 'date-picker',
        'time-picker': 'time-picker',
        radio: 'radio',
        'radio-group': 'radio-group',
        switch: 'i-switch',
        slider: 'slider',
        button: 'i-button',
        row: 'row',
        col: 'i-col',
        'input-number': 'input-number',
        cascader: 'cascader'
    };
    const elementMap = {
        form: ElForm,
        'form-item': ElFormItem,
        input: ElInput,
        select: ElSelect,
        option: ElOption,
        checkbox: ElCheckbox,
        'checkbox-group': ElCheckboxGroup,
        'date-picker': ElDatePicker,
        'time-picker': ElTimePicker,
        radio: ElRadio,
        'radio-group': ElRadioGroup,
        switch: ElSwitch,
        slider: ElSlider,
        button: ElButton,
        row: ElRow,
        col: ElCol,
        'input-number': ElInputNumber,
        cascader: ElCascader
    };
    return lib === 'iview' ? iviewMap[tag] : elementMap[tag];
};
var script$1 = defineComponent({
    name: 'NForm',
    props: {
        grid: {
            type: [Number, Array],
            default: 3
        },
        gutter: {
            type: Number
        },
        formList: {
            type: [Object, Array],
            default: () => []
        },
        notCtrl: {
            type: Boolean,
            default: false
        },
        enterSubmit: {
            type: Boolean,
            default: false
        },
        lib: {
            type: String,
            default: 'elementUI'
        },
        labelWidth: {
            type: Number,
            default: 100
        },
        contentWidth: {
            type: [Number, String],
            default: 240
        },
        submitText: {
            type: String,
            default: '提交'
        },
        resetText: {
            type: String,
            default: '重置'
        },
        hasSubmitBtn: {
            type: Boolean,
            default: true
        },
        hasResetBtn: {
            type: Boolean,
            default: true
        },
        options: {
            type: Object
        },
        clearable: {
            type: Boolean,
            default: true
        },
        maxlength: {
            type: [Number, String],
            default: 20
        },
        textareaMaxlength: {
            type: Number,
            default: 256
        },
        disabled: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: ''
        },
        footerAlign: {
            type: String,
            default: 'center'
        }
    },
    emits: ['submit'],
    setup(props, { slots, emit }) {
        const initForm = () => {
            const form = {};
            const map = {
                input: '',
                select: null,
                checkbox: false,
                'checkbox-group': [],
                date: new Date(),
                datetime: new Date(),
                daterange: [],
                datetimerange: [],
                time: '',
                radio: false,
                'radio-group': '',
                slider: 0,
                switch: false,
                'input-number': 0,
                cascader: []
            };
            props.formList.forEach(item => {
                let defaultValue = '';
                defaultValue =
                    item.defaultValue !== undefined ? item.defaultValue : map[item.type];
                if (item.key) {
                    form[item.key] = defaultValue;
                }
            });
            return form;
        };
        const form = reactive(initForm());
        const formRef = ref(null);
        const rules = computed(() => {
            const tempRules = {};
            props.formList.forEach(item => {
                if (item.rule !== undefined) {
                    tempRules[item.key] = [item.rule];
                }
            });
            return tempRules;
        });
        const submit = () => {
            formRef === null || formRef === void 0 ? void 0 : formRef.value.validate((valid) => {
                emit('submit', form, valid);
            });
        };
        const getHypeScript = () => {
            const { ctx } = getCurrentInstance();
            return ctx === null || ctx === void 0 ? void 0 : ctx.$parent.$createElement;
        };
        const renderTitle = (item) => {
            const titleDom = h('span', {}, typeof item.renderTitle === 'function'
                ? item.renderTitle(item, form)
                : item.title);
            const titleArr = [];
            if (typeof item.renderTitle === 'function') ;
            else {
                titleArr.push(titleDom);
            }
            return h('span', {}, titleArr);
        };
        const getFormItem = (item, content) => {
            if (item.isShow === false)
                return;
            else if (typeof item.isShow === 'function') {
                if (item.isShow(form, item) === false) {
                    return;
                }
            }
            if (typeof item.render === 'function') {
                return item.render(getHypeScript(), item, form);
            }
            else {
                const settings = {
                    key: item.key,
                    prop: item.key
                };
                return h(getPrefix('form-item', props.lib), Object.assign(settings, item.settings), {
                    label: () => renderTitle(item),
                    default: () => content
                });
            }
        };
        const formatDateValue = (value, item) => {
            switch (item.type) {
                case 'date':
                case 'datetitme':
                    if (!value) {
                        value = '';
                    }
                    break;
                case 'daterange':
                case 'datetimerange':
                    if (!value) {
                        value = ['', ''];
                    }
                    break;
            }
            return value;
        };
        const emitInput = (value, item) => {
            if (typeof item.onInput === 'function') {
                item.onInput(value, item, form);
            }
        };
        const generateTag = (tag) => {
            var _a;
            const { tagName, props: tagProps, children, on = {}, nativeOn = {} } = tag;
            const item = tag.item || {
                type: 'input',
                key: 'demo'
            };
            const currProps = Object.assign(Object.assign({}, tagProps), { disabled: (tagProps === null || tagProps === void 0 ? void 0 : tagProps.disabled) || item.disabled });
            const attrs = item.attrs || {};
            const itemOn = item.on || {};
            const itemNativeOn = item.nativeOn || {};
            let childrenNodes = [];
            if (isArray(children)) {
                childrenNodes = children || [];
            }
            else if (children) {
                childrenNodes.push(children);
            }
            return h(tagName, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, currProps), attrs), itemOn), on), itemNativeOn), nativeOn), { modelValue: form[item.key], 'onUpdate:modelValue': (val) => {
                    form[item.key] = val;
                } }), [...childrenNodes, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
        };
        const renderInput = (item) => {
            const props = item.props || {};
            const attrs = item.attrs || {};
            if (props.placeholder) {
                attrs.placeholder = props.placeholder;
            }
            if (props.type !== 'textarea') {
                attrs.maxlength = +props.maxlength || +props.maxlength;
            }
            else {
                attrs.maxlength = +props.maxlength || +props.textareaMaxlength;
            }
            item.attrs = attrs;
            const tag = {
                item,
                tagName: getPrefix('input', props.lib),
                props: Object.assign({ clearable: props.clearable }, props),
                nativeOn: {
                    onInput: (value) => {
                        value = formatDateValue(value, item);
                        form[item.key] = value;
                        emitInput(value, item);
                    },
                    onKeydown: (e) => {
                        console.log('keydown');
                        if (e.keyCode === 13 &&
                            props.enterSubmit &&
                            props.type !== 'textarea') {
                            submit();
                        }
                    }
                }
            };
            return generateTag(tag);
        };
        const renderSelect = (item) => {
            var _a;
            const tag = {
                item,
                tagName: getPrefix('select', props.lib),
                props: Object.assign({ clearable: props.clearable }, (item.props || {})),
                children: (_a = item.options) === null || _a === void 0 ? void 0 : _a.map((option) => {
                    return h(getPrefix('option', props.lib), {
                        label: option.text,
                        value: option.value
                    }, [
                        typeof item.renderOption === 'function'
                            ? item.renderOption(option, item)
                            : item.text
                    ]);
                })
            };
            return generateTag(tag);
        };
        const getCascaderOptions = (options) => {
            if (typeof options === 'undefined')
                return;
            let list = JSON.stringify(options);
            list = list.replace(/"text":/g, '"label":');
            return JSON.parse(list);
        };
        const renderCheckbox = (item) => {
            const props = item.props || {};
            if (item.border) {
                props.border = true;
            }
            const tag = {
                item,
                tagName: getPrefix('checkbox', props.lib),
                props,
                children: item.text
            };
            return generateTag(tag);
        };
        const renderCheckboxGroup = (item) => {
            var _a;
            const tag = {
                item,
                tagName: getPrefix('checkbox-group', props.lib),
                props: item.props || {},
                children: (_a = item.options) === null || _a === void 0 ? void 0 : _a.map(option => {
                    return h(getPrefix('checkbox', props.lib), {
                        border: item.border,
                        label: option.value
                    }, option.text);
                })
            };
            return generateTag(tag);
        };
        const renderDatePicker = (item) => {
            const tag = {
                item,
                tagName: getPrefix('date-picker', props.lib),
                props: Object.assign({ clearable: props.clearable, type: item.type }, (item.props || {}))
            };
            return generateTag(tag);
        };
        const renderDateRange = (item) => {
            if (item.type === 'datetimerange') {
                item.width = item.width || 360;
            }
            const tag = {
                item,
                tagName: getPrefix('date-picker', props.lib),
                props: Object.assign({ clearable: props.clearable, type: item.type }, (item.props || {}))
            };
            return generateTag(tag);
        };
        const renderTimePicker = (item) => {
            const tag = {
                item,
                tagName: getPrefix('time-picker', props.lib),
                props: Object.assign({ clearable: props.clearable, type: item.type }, (item.props || {}))
            };
            return generateTag(tag);
        };
        const renderRadio = (item) => {
            const props = item.props || {};
            if (item.border) {
                props.border = true;
            }
            const tag = {
                item,
                tagName: getPrefix('radio', props.lib),
                props,
                children: item.text
            };
            return generateTag(tag);
        };
        const renderRadioGroup = (item) => {
            var _a;
            const tag = {
                item,
                tagName: getPrefix('radio-group', props.lib),
                props: item.props || {},
                children: (_a = item.options) === null || _a === void 0 ? void 0 : _a.map(option => {
                    return h(getPrefix('radio', props.lib), {
                        border: item.border,
                        label: option.value
                    }, option.text);
                })
            };
            return generateTag(tag);
        };
        const renderSwitch = (item) => {
            const tag = {
                item,
                tagName: getPrefix('switch', props.lib),
                props: item.props || {}
            };
            return generateTag(tag);
        };
        const renderSlider = (item) => {
            const tag = {
                item,
                tagName: getPrefix('slider', props.lib),
                props: item.props || {}
            };
            return generateTag(tag);
        };
        const renderInputNumber = (item) => {
            const tag = {
                item,
                tagName: getPrefix('input-number', props.lib),
                props: item.props || {}
            };
            return generateTag(tag);
        };
        const renderCascader = (item) => {
            const props = item.props || {};
            const tag = {
                item,
                props: {},
                tagName: getPrefix('cascader', props.lib)
            };
            if (props.lib === 'iview') {
                props.data = getCascaderOptions(item.options);
            }
            else {
                props.options = getCascaderOptions(item.options);
            }
            tag.props = props;
            return generateTag(tag);
        };
        const getContent = (item) => {
            let content;
            switch (item.type) {
                case 'input':
                    content = renderInput(item);
                    break;
                case 'select':
                    content = renderSelect(item);
                    break;
                case 'checkbox':
                    content = renderCheckbox(item);
                    break;
                case 'checkbox-group':
                    content = renderCheckboxGroup(item);
                    break;
                case 'date':
                    content = renderDatePicker(item);
                    break;
                case 'datetime':
                    content = renderDatePicker(item);
                    break;
                case 'daterange':
                    content = renderDateRange(item);
                    break;
                case 'datetimerange':
                    content = renderDateRange(item);
                    break;
                case 'time':
                    content = renderTimePicker(item);
                    break;
                case 'radio':
                    content = renderRadio(item);
                    break;
                case 'radio-group':
                    content = renderRadioGroup(item);
                    break;
                case 'switch':
                    content = renderSwitch(item);
                    break;
                case 'slider':
                    content = renderSlider(item);
                    break;
                case 'input-number':
                    content = renderInputNumber(item);
                    break;
                case 'cascader':
                    content = renderCascader(item);
                    break;
                default:
                    if (typeof item.renderContent === 'function') {
                        content = item.renderContent(getHypeScript(), item, form);
                    }
                    break;
            }
            return content;
        };
        const getRow = (childrenList) => {
            return h(getPrefix('row', props.lib), {
                gutter: props.gutter
            }, childrenList);
        };
        const getFormListByNumber = () => {
            const list = [];
            if (typeof props.grid !== 'number')
                return;
            let grid = ~~Math.abs(props.grid);
            if (grid < 1)
                grid = 1;
            for (let i = 0; i < props.formList.length; i += grid) {
                const childrenList = [];
                for (let j = 0; j < grid && i + j < props.formList.length; j++) {
                    const children = props.formList[i + j];
                    if (!children)
                        break;
                    const childrenItem = getFormItem(children, getContent(children));
                    const childrenParts = h(getPrefix('col', props.lib), {
                        span: 24 / grid
                    }, [childrenItem]);
                    childrenList.push(childrenParts);
                }
                const row = getRow(childrenList);
                list.push(row);
            }
            return list;
        };
        const getFormListByArray = () => {
            const list = [];
            let gridIndex = 0;
            if (!(isArray(props.grid)))
                return;
            for (let i = 0; i < props.formList.length;) {
                const childrenList = [];
                const grid = props.grid[gridIndex];
                for (let j = 0; j < grid; j++) {
                    const children = props.formList[i + j];
                    if (!children)
                        break;
                    const childrenItem = getFormItem(children, getContent(children));
                    const childrenParts = h(getPrefix('col', props.lib), {
                        span: 24 / grid
                    }, [childrenItem]);
                    childrenList.push(childrenParts);
                }
                const row = getRow(childrenList);
                list.push(row);
                gridIndex += 1;
                i += grid;
            }
            return list;
        };
        const getFormListByGrid = () => {
            const list = [];
            let gridIndex = 0;
            for (let i = 0; i < props.formList.length;) {
                const childrenList = [];
                let grid = props.grid[gridIndex];
                if (!grid)
                    grid = [1];
                for (let j = 0; j < grid.length; j++) {
                    const children = props.formList[i + j];
                    if (!children)
                        break;
                    const childrenItem = getFormItem(children, getContent(children));
                    const childrenParts = h(getPrefix('col', props.lib), {
                        span: grid[j]
                    }, [childrenItem]);
                    childrenList.push(childrenParts);
                }
                const row = getRow(childrenList);
                list.push(row);
                gridIndex += 1;
                i += grid.length;
            }
            return list;
        };
        const getFormList = () => {
            return props.formList.map(item => {
                return getFormItem(item, getContent(item));
            });
        };
        const renderFormList = () => {
            let list = [];
            const grid = props.grid || [];
            if (typeof grid === 'number') {
                list = getFormListByNumber();
            }
            else if (isArray(grid)) {
                if (grid.every(item => !isArray(item))) {
                    list = getFormListByArray();
                }
                else {
                    list = getFormListByGrid();
                }
            }
            else {
                list = getFormList();
            }
            return list;
        };
        const clear = () => {
            var _a;
            (_a = formRef.value) === null || _a === void 0 ? void 0 : _a.clearValidate();
        };
        const reset = () => {
            var _a;
            clear();
            (_a = formRef.value) === null || _a === void 0 ? void 0 : _a.resetFields();
        };
        const renderSubmit = () => {
            const btns = [];
            if (props.hasSubmitBtn) {
                btns.push(h(getPrefix('button', props.lib), {
                    type: 'primary', style: {
                        'margin-left': '10px',
                        'margin-right': '10px'
                    },
                    onClick: submit
                }, props.submitText));
            }
            if (props.hasResetBtn) {
                btns.push(h(getPrefix('button', props.lib), {
                    style: {
                        'margin-left': '10px',
                        'margin-right': '10px'
                    },
                    onClick: reset
                }, props.resetText));
            }
            return h('div', {
                className: 'footer',
                style: {
                    marginBottom: '20px',
                    textAlign: props.footerAlign || 'center'
                },
            }, btns);
        };
        const setForm = (form) => {
            for (const key in form) {
                form[key] = form[key];
            }
        };
        const validateField = (props, callback) => {
            formRef.value.validateField(props, callback);
        };
        return {
            clear,
            reset,
            setForm,
            validateField,
            form,
            renderFormList,
            renderSubmit,
            formRef,
            rules,
            submit,
            slots
        };
    },
    render() {
        var _a, _b, _c, _d;
        return h(getPrefix('form', this.lib), Object.assign(Object.assign({ model: this.form, class: this.className, rules: this.rules, 'label-width': this.lib === 'iview'
                ? this['labelWidth']
                : this['labelWidth'] + 'px' }, this.options), { ref: 'formRef', submit(e) {
                e.preventDefault();
                e.stopPropagation();
            } }), [(_b = (_a = this.slots) === null || _a === void 0 ? void 0 : _a.prepend) === null || _b === void 0 ? void 0 : _b.call(_a), this.renderFormList(), !this.notCtrl && this.renderSubmit(), (_d = (_c = this.slots).default) === null || _d === void 0 ? void 0 : _d.call(_c)]);
    }
});

script$1.__file = "packages/form/src/index.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};

var script = defineComponent({
    name: 'NTablePage',
    props: {
        method: {
            type: String,
            default: 'get'
        },
        url: {
            type: String,
            default: ''
        },
        tableData: {
            type: Array,
            default: () => []
        },
        reqParams: {
            type: Object,
            default: () => { return {}; }
        },
        ajaxOption: {
            type: Object,
            default: {}
        },
        requestOptions: {
            type: Object,
            default: {}
        },
        currentPage: {
            type: Number,
            default: 1
        },
        totalPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 15
        },
        resDataKey: {
            type: String,
            default: 'data'
        },
        resTotalPageKey: {
            type: String,
            default: 'totalPage'
        },
        resCurrentPageKey: {
            type: String,
            default: 'currentPage'
        },
        resPageSizeKey: {
            type: String,
            default: 'pageSize'
        },
        beforeRequestHook: {
            type: Function
        },
        afterRequestHook: {
            type: Function
        },
        finallyRequestHook: {
            type: Function
        },
    },
    setup(props) {
        const instance = getCurrentInstance();
        const _global = instance === null || instance === void 0 ? void 0 : instance.appContext.config.globalProperties;
        const internalTableData = ref(props.tableData);
        const internalPageSize = ref(props.pageSize);
        const internalTotal = ref(props.totalPage);
        const internalCurrentPage = ref(props.currentPage);
        const loading = ref(false);
        watch(() => props.tableData, (newVal) => {
            internalTableData.value = newVal;
        });
        watch(() => props.pageSize, (newVal) => {
            internalPageSize.value = newVal;
        });
        watch(() => props.totalPage, (newVal) => {
            internalTotal.value = newVal;
        });
        watch(() => props.currentPage, (newVal) => {
            internalCurrentPage.value = newVal;
        });
        watch(() => props.reqParams, (newVal) => {
            reqTableData(newVal);
        });
        const reqTableData = (params) => {
            loading.value = true;
            _global === null || _global === void 0 ? void 0 : _global.$ajax[props.method](Object.assign({ url: props.url, [props.method === 'get' ? 'params' : 'data']: Object.assign(Object.assign({ [props.resPageSizeKey]: internalPageSize.value, [props.resTotalPageKey]: internalTotal.value, [props.resCurrentPageKey]: internalCurrentPage.value }, props.reqParams), params) }, props.ajaxOption), Object.assign({ lock: false }, props.requestOptions)).then((res) => {
                var _a;
                const status = (_a = props === null || props === void 0 ? void 0 : props.beforeRequestHook) === null || _a === void 0 ? void 0 : _a.call(props);
                if (status === false)
                    return;
                internalTableData.value = res[props.resDataKey];
                internalPageSize.value = res[props.resPageSizeKey];
                internalTotal.value = res[props.resTotalPageKey];
                internalCurrentPage.value = res[props.resCurrentPageKey];
            }).catch((e) => {
                var _a;
                (_a = props === null || props === void 0 ? void 0 : props.beforeRequestHook) === null || _a === void 0 ? void 0 : _a.call(props, e);
            }).finally(() => {
                var _a;
                (_a = props === null || props === void 0 ? void 0 : props.finallyRequestHook) === null || _a === void 0 ? void 0 : _a.call(props);
                loading.value = false;
            });
        };
        reqTableData();
        const currentPageChange = (num) => {
            reqTableData({
                [props.resCurrentPageKey]: num
            });
        };
        return {
            currentPageChange,
            reqTableData,
            loading,
            internalPageSize,
            internalTotal,
            internalCurrentPage,
            internalTableData
        };
    }
});

const _hoisted_1 = { class: "n-table-page" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _directive_loading = resolveDirective("loading");

  return (openBlock(), createBlock("div", _hoisted_1, [
    withDirectives(createVNode(_component_el_table, mergeProps(_ctx.$attrs, { data: _ctx.internalTableData }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "tableColumn")
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["data"]), [
      [_directive_loading, _ctx.loading]
    ]),
    createVNode(_component_el_pagination, {
      "current-page": _ctx.internalCurrentPage,
      "onUpdate:current-page": _cache[1] || (_cache[1] = $event => (_ctx.internalCurrentPage = $event)),
      layout: "prev, pager, next",
      "page-size": _ctx.internalPageSize,
      "pager-count": 10,
      total: _ctx.internalTotal,
      onCurrentChange: _ctx.currentPageChange
    }, null, 8 /* PROPS */, ["current-page", "page-size", "total", "onCurrentChange"])
  ]))
}

script.render = render;
script.__file = "packages/tablePage/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};

let $PERFIN = {};
const setConfig = (option) => {
    $PERFIN = Object.assign(Object.assign({}, $PERFIN), option);
};
const getConfig = (key) => {
    return $PERFIN[key];
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function createConfirm(message, title, options) {
    ElMessageBox.alert(message, title, options);
}
function createSuccessModal(options) {
    const { msg, title, callback } = options;
    createConfirm(msg, title, {
        type: 'success',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        callback,
    });
}
function createErrorModal$1(options) {
    const { msg, title, callback } = options;
    createConfirm(msg, title, {
        type: 'error',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        callback,
    });
}
function createInfoModal(options) {
    const { msg, title, callback } = options;
    createConfirm(msg, title, {
        type: 'info',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        callback,
    });
}
function createWarningModal(options) {
    const { msg, title, callback } = options;
    createConfirm(msg, title, {
        type: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        callback,
    });
}
function useMessage() {
    return {
        createMessage: ElMessage,
        notification: ElNotification,
        createConfirm,
        createErrorModal: createErrorModal$1,
        createSuccessModal,
        createInfoModal,
        createWarningModal,
    };
}

function useLoading(text) {
    return ElLoading.service({
        lock: true,
        text,
        spinner: 'el-icon-lock',
        background: 'rgb(0,0,0,0.3)',
    });
}

const toString = Object.prototype.toString;
function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}
function isDef(val) {
    return typeof val !== 'undefined';
}
function isUnDef(val) {
    return !isDef(val);
}
function isObject(val) {
    return val !== null && is(val, 'Object');
}
function isEmpty(val) {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }
    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }
    return false;
}
function isDate(val) {
    return is(val, 'Date');
}
function isNull(val) {
    return val === null;
}
function isNullAndUnDef(val) {
    return isUnDef(val) && isNull(val);
}
function isNullOrUnDef(val) {
    return isUnDef(val) || isNull(val);
}
function isNumber(val) {
    return is(val, 'Number');
}
function isPromise(val) {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function isString(val) {
    return is(val, 'String');
}
function isFunction(val) {
    return typeof val === 'function';
}
function isBoolean(val) {
    return is(val, 'Boolean');
}
function isRegExp(val) {
    return is(val, 'RegExp');
}
function isArray(val) {
    return val && Array.isArray(val);
}
function isWindow(val) {
    return typeof window !== 'undefined' && is(val, 'Window');
}
function isElement(val) {
    return isObject(val) && !!val.tagName;
}
const isServer = typeof window === 'undefined';
const isClient = !isServer;
function isUrl(path) {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}

let pendingMap = new Map();
const getPendingUrl = (config) => [config.method, config.url].join('&');
class AxiosCanceler {
    addPending(config) {
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken =
            config.cancelToken ||
                new axios.CancelToken(cancel => {
                    if (!pendingMap.has(url)) {
                        pendingMap.set(url, cancel);
                    }
                });
    }
    removeAllPending() {
        pendingMap.forEach(cancel => {
            cancel && isFunction(cancel) && cancel();
        });
        pendingMap.clear();
    }
    removePending(config) {
        const url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url);
            cancel && cancel(url);
            pendingMap.delete(url);
        }
    }
    reset() {
        pendingMap = new Map();
    }
}

const errorResult = '__ERROR_RESULT__';

var ResultEnum;
(function (ResultEnum) {
    ResultEnum[ResultEnum["SUCCESS"] = 0] = "SUCCESS";
    ResultEnum[ResultEnum["ERROR"] = 1] = "ERROR";
    ResultEnum[ResultEnum["TIMEOUT"] = 401] = "TIMEOUT";
    ResultEnum["TYPE"] = "success";
})(ResultEnum || (ResultEnum = {}));
var RequestEnum;
(function (RequestEnum) {
    RequestEnum["GET"] = "GET";
    RequestEnum["POST"] = "POST";
    RequestEnum["PUT"] = "PUT";
    RequestEnum["DELETE"] = "DELETE";
})(RequestEnum || (RequestEnum = {}));
var ContentTypeEnum;
(function (ContentTypeEnum) {
    ContentTypeEnum["JSON"] = "application/json;charset=UTF-8";
    ContentTypeEnum["FORM_URLENCODED"] = "application/x-www-form-urlencoded;charset=UTF-8";
    ContentTypeEnum["FORM_DATA"] = "multipart/form-data;charset=UTF-8";
})(ContentTypeEnum || (ContentTypeEnum = {}));

class VAxios {
    constructor(options) {
        this.lockCount = 0;
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }
    getTransform() {
        const { transform } = this.options;
        return transform;
    }
    getAxios() {
        return this.axiosInstance;
    }
    setHeader(headers) {
        if (!this.axiosInstance) {
            return;
        }
        Object.assign(this.axiosInstance.defaults.headers, headers);
    }
    setupInterceptors() {
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch, } = transform;
        const axiosCanceler = new AxiosCanceler();
        this.axiosInstance.interceptors.request.use((config) => {
            var _a;
            const { headers: { ignoreCancelToken }, } = config;
            const ignoreCancel = ignoreCancelToken !== undefined
                ? ignoreCancelToken
                : (_a = this.options.requestOptions) === null || _a === void 0 ? void 0 : _a.ignoreCancelToken;
            !ignoreCancel && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config);
            }
            return config;
        }, undefined);
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);
        this.axiosInstance.interceptors.response.use((res) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }
    uploadFile(config, params) {
        const formData = new window.FormData();
        if (params.data) {
            Object.keys(params.data).forEach(key => {
                if (!params.data)
                    return;
                const value = params.data[key];
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }
                formData.append(key, params.data[key]);
            });
        }
        formData.append(params.name || 'file', params.file, params.filename);
        return this.axiosInstance.request(Object.assign(Object.assign({}, config), { method: 'POST', data: formData, headers: {
                'Content-type': ContentTypeEnum.FORM_DATA,
                ignoreCancelToken: true,
            } }));
    }
    supportFormData(config) {
        var _a, _b;
        const headers = (_a = this.options) === null || _a === void 0 ? void 0 : _a.headers;
        const contentType = (headers === null || headers === void 0 ? void 0 : headers['Content-Type']) || (headers === null || headers === void 0 ? void 0 : headers['content-type']);
        if (contentType !== ContentTypeEnum.FORM_URLENCODED ||
            !Reflect.has(config, 'data') ||
            ((_b = config.method) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === RequestEnum.GET) {
            return config;
        }
        return Object.assign(Object.assign({}, config), { data: JSON.stringify(config.data) });
    }
    get(config, options) {
        return this.request(Object.assign(Object.assign({}, config), { method: 'GET' }), options);
    }
    post(config, options) {
        return this.request(Object.assign(Object.assign({}, config), { method: 'POST' }), options);
    }
    put(config, options) {
        return this.request(Object.assign(Object.assign({}, config), { method: 'PUT' }), options);
    }
    delete(config, options) {
        return this.request(Object.assign(Object.assign({}, config), { method: 'DELETE' }), options);
    }
    requestLifeCycle(methodType, name, options) {
        const { lock, ajaxLock } = options;
        const canLock = ['POST', 'PUT', 'DELETE'].includes(methodType);
        const combineLock = lock === false ? false : canLock ? lock || ajaxLock : false;
        if (name === 'start') {
            if (combineLock) {
                this.lockCount++;
                if (!this.LockInstance) {
                    this.LockInstance = useLoading(ajaxLock || '');
                }
            }
        }
        else {
            if (combineLock) {
                this.lockCount--;
                if (this.LockInstance && this.lockCount <= 0) {
                    this.LockInstance.close();
                    this.lockCount = 0;
                    this.LockInstance = null;
                }
            }
        }
    }
    sendQuest(config, options) {
        this.requestLifeCycle(config.method || 'get', 'start', options || {});
        let conf = cloneDeep(config);
        const transform = this.getTransform();
        const { requestOptions } = this.options;
        const opt = Object.assign({}, requestOptions, options);
        const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }
        conf = this.supportFormData(conf);
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request(conf)
                .then((res) => {
                if (transformRequestHook && isFunction(transformRequestHook)) {
                    const ret = transformRequestHook(res, opt);
                    ret !== errorResult ? resolve(ret) : reject(new Error('request error!'));
                    return;
                }
                resolve(res);
            })
                .catch((e) => {
                if (requestCatchHook && isFunction(requestCatchHook)) {
                    reject(requestCatchHook(e));
                    return;
                }
                reject(e);
            }).finally(() => {
                setTimeout(() => {
                    this.requestLifeCycle(config.method || 'get', 'end', options || {});
                }, 400);
            });
        });
    }
    request(config, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({ lock: true, ajaxLock: '正在请求...' }, options);
            if (options && options.confirm) {
                const { createConfirm } = useMessage();
                return new Promise((resolve, reject) => {
                    createConfirm((options === null || options === void 0 ? void 0 : options.message) || '', '', {
                        type: 'warning',
                        callback: (action) => {
                            if (action === 'confirm') {
                                resolve(this.sendQuest(config, options));
                            }
                            else {
                                reject('你已取消');
                            }
                        },
                    });
                });
            }
            else {
                return this.sendQuest(config, options);
            }
        });
    }
}

const { createMessage: createMessage$1 } = useMessage();
const error$1 = createMessage$1.error;
function checkStatus(status, msg) {
    switch (status) {
        case 400:
            error$1(`${msg}`);
            break;
        case 401:
            error$1('请求失败401');
            break;
        case 403:
            error$1('请求失败403');
            break;
        case 404:
            error$1('请求失败');
            break;
        case 405:
            error$1('请求失败');
            break;
        case 408:
            error$1('请求失败');
            break;
        case 500:
            error$1('请求失败500');
            break;
        case 501:
            error$1('请求失败501');
            break;
        case 502:
            error$1('请求失败502');
            break;
        case 503:
            error$1('请求失败503');
            break;
        case 504:
            error$1('请求失败504');
            break;
        case 505:
            error$1('请求失败505');
            break;
    }
}

const timestamp = () => +Date.now();
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const noop = () => { };
const now = () => Date.now();
function getPopupContainer(node) {
    var _a;
    return (_a = node === null || node === void 0 ? void 0 : node.parentNode) !== null && _a !== void 0 ? _a : document.body;
}
function generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
function setObjToUrlParams(baseUrl, obj) {
    let parameters = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
function deepMerge(src = {}, target = {}) {
    let key;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}
function openWindow(url, opt) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature = [];
    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');
    window.open(url, target, feature.join(','));
}
function getDynamicProps(props) {
    const ret = {};
    Object.keys(props).map(key => {
        ret[key] = unref(props[key]);
    });
    return ret;
}
function setDocumentTitle(title) {
    document.title = title;
    const ua = navigator.userAgent;
    const regex = /\bMicroMessenger\/([\d.]+)/;
    if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        const i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
}
function setTitle(title, appTitle) {
    if (title) {
        const _title = title ? ` ${title} - ${appTitle} ` : `${appTitle}`;
        setDocumentTitle(_title);
    }
}

function createNow(join, restful = false) {
    if (!join) {
        return restful ? '' : {};
    }
    const now = new Date().getTime();
    if (restful) {
        return `?_t=${now}`;
    }
    return { _t: now };
}
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
function formatRequestDate(params) {
    for (const key in params) {
        if (params[key] && params[key]._isAMomentObject) {
            params[key] = params[key].format(DATE_TIME_FORMAT);
        }
        if (isString(key)) {
            const value = params[key];
            if (value) {
                try {
                    params[key] = isString(value) ? value.trim() : value;
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        }
        if (isObject(params[key])) {
            formatRequestDate(params[key]);
        }
    }
}

const { createMessage, createErrorModal } = useMessage();
const transform = {
    transformRequestHook: (res, options) => {
        const { isTransformRequestResult } = options;
        if (!isTransformRequestResult) {
            return res.data;
        }
        const { data } = res;
        if (!data) {
            return errorResult;
        }
        const { code, result, message = '系统错误，请重试~' } = data;
        const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
        if (!hasSuccess) {
            if (message) {
                if (options.errorMessageMode === 'modal') {
                    createErrorModal({ title: '错误提示', msg: message });
                }
                else if (options.errorMessageMode === 'message') {
                    createMessage.error(message);
                }
            }
            Promise.reject(new Error(message));
            return errorResult;
        }
        if (code === ResultEnum.SUCCESS) {
            return result;
        }
        if (code === ResultEnum.ERROR) {
            if (message) {
                createMessage.error(data.message);
                Promise.reject(new Error(message));
            }
            else {
                const msg = '系统错误，请重试~';
                createMessage.error(msg);
                Promise.reject(new Error(msg));
            }
            const { afterRequst } = options || {};
            if (afterRequst && isFunction(afterRequst)) {
                afterRequst(result, data);
            }
            return errorResult;
        }
        if (code === ResultEnum.TIMEOUT) {
            const timeoutMsg = '请求超时';
            createErrorModal({
                title: '提示',
                msg: timeoutMsg,
            });
            Promise.reject(new Error(timeoutMsg));
            return errorResult;
        }
        return errorResult;
    },
    beforeRequestHook: (config = {}, options = {}) => {
        var _a;
        const { joinPrefix, prefix, joinParamsToUrl, formatDate, joinTime = true } = options;
        if (joinPrefix) {
            config.url = `${prefix}${config.url}`;
        }
        const params = config.params || {};
        if (((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === RequestEnum.GET) {
            if (!isString(params)) {
                config.params = Object.assign(params || {}, createNow(joinTime, false));
            }
            else {
                config.url = config.url + params + `${createNow(joinTime, true)}`;
                config.params = undefined;
            }
        }
        else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params);
                config.data = params;
                config.params = undefined;
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url, config.data);
                }
            }
            else {
                config.url = config.url + params;
                config.params = undefined;
            }
        }
        const { beforeRequest } = options;
        if (beforeRequest && isFunction(beforeRequest)) {
            const cfg = beforeRequest(config, options);
            if (!cfg)
                return;
        }
        return config;
    },
    requestInterceptors: config => {
        return config;
    },
    responseInterceptorsCatch: (error) => {
        var _a, _b, _c, _d, _e, _f;
        const { response, code, message } = error || {};
        const msg = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : '';
        const err = (_e = (_d = error === null || error === void 0 ? void 0 : error.toString) === null || _d === void 0 ? void 0 : _d.call(error)) !== null && _e !== void 0 ? _e : '';
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                createMessage.error('请求超时');
            }
            if (err === null || err === void 0 ? void 0 : err.includes('Network Error')) {
                createMessage.error('网络错误');
            }
        }
        catch (error) {
            throw new Error(error);
        }
        checkStatus((_f = error === null || error === void 0 ? void 0 : error.response) === null || _f === void 0 ? void 0 : _f.status, msg);
        return Promise.reject(error);
    },
};
function createAxios(app, opt) {
    var _a;
    app.config.globalProperties.$ajax = new VAxios(deepMerge({
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: Object.assign(Object.assign({}, transform), (_a = opt.ext) === null || _a === void 0 ? void 0 : _a.transform),
        requestOptions: Object.assign({ isTransformRequestResult: true, joinParamsToUrl: false, formatDate: true, errorMessageMode: 'message', joinTime: true, ignoreCancelToken: true }, ((opt === null || opt === void 0 ? void 0 : opt.requestOptions) || {})),
    }, opt || {}));
}

function createContext(context, key = Symbol(), options = {}) {
    const { readonly: readonly$1 = true, createProvider = false, native = false } = options;
    const state = reactive(context);
    const provideData = readonly$1 ? readonly(state) : state;
    !createProvider && provide(key, native ? context : provideData);
    const Provider = createProvider
        ? defineComponent({
            name: 'Provider',
            inheritAttrs: false,
            setup(_, { slots }) {
                provide(key, provideData);
                return () => { var _a; return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots); };
            },
        })
        : null;
    return { Provider, state };
}
function useContext(key = Symbol(), defaultValue) {
    const val = inject(key, defaultValue || {});
    return val;
}

function throttle(handle, wait, options = {}) {
    if (!isFunction(handle)) {
        throw new Error('handle is not Function!');
    }
    let { immediate = false } = options;
    const { once = false, debounce = false } = options;
    let timeoutId;
    let cancelled = false;
    function clearTimer() {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
    }
    function cancel() {
        clearTimer();
        cancelled = true;
    }
    function cancelExec() {
        once && cancel();
    }
    function fn(...args) {
        if (cancelled) {
            return;
        }
        const exec = () => {
            !debounce && clearTimer();
            handle.apply(this, args);
            cancelExec();
        };
        if (immediate) {
            immediate = false;
            const callNow = !timeoutId;
            if (callNow) {
                exec();
                timeoutId = null;
            }
        }
        else {
            debounce && clearTimer();
            if (!timeoutId || debounce) {
                timeoutId = setTimeout(exec, wait);
            }
        }
    }
    return [fn, cancel];
}
function useThrottle(handle, wait, options = {}) {
    return throttle(handle, wait, options);
}

function useDebounce(handle, wait, options = {}) {
    return useThrottle(handle, wait, Object.assign(options, {
        debounce: true,
    }));
}

const projectName = 'perfintech';
function warn(message) {
    console.warn(`[${projectName} warn]:${message}`);
}
function error(message) {
    throw new Error(`[${projectName} error]:${message}`);
}

function explicitComputed(source, fn) {
    const v = reactive({ value: fn() });
    watch(source, () => (v.value = fn()));
    return computed(() => v.value);
}
function tryOnMounted(fn, sync = true) {
    if (getCurrentInstance()) {
        onMounted(fn);
    }
    else if (sync) {
        fn();
    }
    else {
        nextTick(fn);
    }
}
function tryOnUnmounted(fn) {
    getCurrentInstance() && onUnmounted(fn);
}
function tryTsxEmit(fn) {
    const instance = getCurrentInstance();
    instance && fn.call(null, instance);
}
function isInSetup() {
    if (!getCurrentInstance()) {
        error('Please put useForm function in the setup function!');
    }
}

function useWindowSizeFn(fn, wait = 150, options) {
    let handler = () => {
        fn();
    };
    const [handleSize, cancel] = useDebounce(handler, wait, options);
    handler = handleSize;
    const start = () => {
        if (options && options.immediate) {
            handler();
        }
        window.addEventListener('resize', handler);
    };
    const stop = () => {
        window.removeEventListener('resize', handler);
        cancel();
    };
    tryOnMounted(() => {
        start();
    });
    tryOnUnmounted(() => {
        stop();
    });
    return [start, stop];
}

const version = '1.0.0';
const defaultInstallOpt = {
    projectName: 'perfintech',
    zIndex: 2000,
    prefix: '',
    joinPrefix: false,
    timeout: 10 * 10000
};
const components = [
    script$1,
    script
];
const install = (app, opt) => {
    const option = Object.assign(defaultInstallOpt, opt);
    setConfig(option);
    createAxios(app, {
        requestOptions: opt === null || opt === void 0 ? void 0 : opt.requestOptions,
        timeout: opt.timeout,
        ext: opt.ext
    });
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = {
    version,
    install,
};

export default index;
export { script$1 as NForm, script as NTablePage, clamp, createAxios, createContext, deepMerge, error, explicitComputed, generateUUID, getConfig, getDynamicProps, getPopupContainer, install, is, isArray, isBoolean, isClient, isDate, isDef, isElement, isEmpty, isFunction, isInSetup, isNull, isNullAndUnDef, isNullOrUnDef, isNumber, isObject, isPromise, isRegExp, isServer, isString, isUnDef, isUrl, isWindow, noop, now, openWindow, setConfig, setObjToUrlParams, setTitle, throttle, timestamp, tryOnMounted, tryOnUnmounted, tryTsxEmit, useContext, useDebounce, useLoading, useMessage, useThrottle, useWindowSizeFn, version, warn };
