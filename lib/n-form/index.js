import { defineComponent, reactive, ref, computed, h, getCurrentInstance } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElCheckbox, ElCheckboxGroup, ElDatePicker, ElTimePicker, ElRadio, ElRadioGroup, ElSwitch, ElSlider, ElButton, ElRow, ElCol, ElInputNumber, ElCascader } from 'element-plus';
import '../n-form';
import '../n-tablePage';
import { isArray } from '../utils';

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
var script = defineComponent({
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

script.__file = "packages/form/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};

export default script;
