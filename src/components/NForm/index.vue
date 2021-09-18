<script lang="ts">
import { FormItem, FormItemOptions, GridArray, RawChildren, RawSlots, TagItem } from './type'
import {
  computed,
  defineComponent,
  h,
  PropType,
  VNode,
  reactive,
  ref,
  nextTick
} from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElTimePicker,
  ElRadio,
  ElRadioGroup,
  ElSwitch,
  ElSlider,
  ElButton,
  ElRow,
  ElCol,
  ElInputNumber,
  ElCascader,
  ElUpload
} from 'element-plus'
import { isArray, isFunction } from '/@/utils/is'
import { ElTooltip } from 'element-plus'
const getPrefix = (tag: string, lib: string) => {
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
  }
  const elementMap = {
    upload: ElUpload,
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
  }

  return lib === 'iview' ? iviewMap[tag] : elementMap[tag]
}
// import { ElFormContext } from 'element-plus/lib/el-form'
export default defineComponent({
  name: 'NForm',
  props: {
    // 是否启用 grid 布局
    grid: {
      type: [Number, Array] as PropType<number | GridArray>,
      default: 3
    },
    // grid 间距
    gutter: {
      type: Number
    },
    // formItem 项
    formList: {
      type: [Object, Array] as PropType<FormItem[]>,
      default: () => []
    },
    // 是否显示整个控制按钮
    notCtrl: {
      type: Boolean,
      default: false
    },
    // 是否开启 input 标签默认
    enterSubmit: {
      type: Boolean,
      default: false
    },
    // 默认 ui 库
    lib: {
      type: String,
      default: 'elementUI'
    },
    // 默认标签宽度
    labelWidth: {
      type: Number,
      default: 100
    },
    // 默认内容宽度
    contentWidth: {
      type: [Number, String],
      default: 240
    },
    // submit 按钮文本
    submitText: {
      type: String,
      default: '提交'
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置'
    },
    // 是否拥有 提交 按钮
    hasSubmitBtn: {
      type: Boolean,
      default: true
    },
    // 是否拥有 重置 按钮
    hasResetBtn: {
      type: Boolean,
      default: true
    },
    // 原生 form 标签上的 props
    options: {
      type: Object
    },
    // 开启全局 clearable
    clearable: {
      type: Boolean,
      default: true
    },
    // 文本框默认字符个数
    maxlength: {
      type: [Number, String],
      default: 20
    },
    // 多行文本框默认字符个数
    textareaMaxlength: {
      type: Number,
      default: 256
    },
    // 是否全局 disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // from表单样式
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
    // 初始化表单
    const initForm = () => {
      const form = {}
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
      }
      props.formList.forEach(item => {
        let defaultValue = ''
        defaultValue =
          item.defaultValue !== undefined ? item.defaultValue : map[item.type]
        if (item.key) {
          form[item.key] = defaultValue
        }
      })
      return form
    }
    let form = reactive(initForm())
    const formRef = ref(null)
    // end ---------------

    // computed
    const rules = computed(() => {
      const tempRules = {}
      props.formList.forEach(item => {
        if (item.rule !== undefined) {
          tempRules[item.key] = [item.rule]
        }
      })
      return tempRules
    })
    // end------------------
    const submit = () => {
      // @ts-ignore
      formRef?.value.validate((valid: any) => {
        emit('submit', form, valid)
      })
    }
    const renderTitle = (item: FormItem) => {
      const titleDom = h(
        'span',
        {},
        typeof item.renderTitle === 'function'
          ? item.renderTitle(item, form)
          : item.title
      )
      const titleArr: VNode[] = []
      if (typeof item.renderTitle === 'function') {
      } else {
        titleArr.push(titleDom)
      }
      return h('span', {}, titleArr)
    }
    const getFormItem = (item: FormItem, content: VNode): VNode | undefined => {
      if (item.condition === false) return
      if (isFunction(item.condition) && item.condition(form, item) === false) {
        return
      }
      if (typeof item.render === 'function') {
        return item.render(item, form)
      } else {
        const nodes = [content]
        const settings = {
          key: item.key,
          prop: item.key
        }
        if (item.showTips) {
          nodes.push(
            h(
              ElTooltip,
              {
                content: item.tipMsg,
                placement: 'top',
                class: 'tips-msg',
                style: {
                  'font-size': '18px',
                  'vertical-align': 'middle'
                }
              },
              h(ElButton, {
                type: 'text',
                icon: item.tipIcon || 'el-icon-question'
              })
            )
          )
        }
        return h(
          getPrefix('form-item', props.lib),
          Object.assign(settings, item.settings),
          {
            label: () => renderTitle(item),
            default: () => nodes
          }
        )
      }
    }
    // 格式化日期返回，避免 null 的出现
    const formatDateValue = (value: any, item: any) => {
      switch (item.type) {
        case 'date':
        case 'datetitme':
          if (!value) {
            value = ''
          }
          break
        case 'daterange':
        case 'datetimerange':
          if (!value) {
            value = ['', '']
          }
          break
      }
      return value
    }
    // 触发 item onInput 事件
    const emitInput = (value: any, item: FormItem) => {
      if (typeof item.onInput === 'function') {
        item.onInput(value, item, form)
      }
    }
    // 生产 tag
    const generateTag = (tag: TagItem) => {
      const { tagName, props: tagProps, children, on = {}, nativeOn = {} } = tag
      const item: FormItem = tag.item
      const currProps = {
        ...tagProps,
        disabled: tagProps?.disabled || item.disabled
      }
      const attrs = item.attrs || {}
      const itemOn = item.on || {}
      const itemNativeOn = item.nativeOn || {}

      let childrenNodes: any[] = []
      if (isArray(children)) {
        childrenNodes = children || []
      } else if (children) {
        childrenNodes.push(children)
      }
      const renderDom: RawChildren | RawSlots = {
        default: () => [...childrenNodes, slots.default?.()]
      }
      if (item.type === 'input' && item.showSuffix) {
        renderDom.append = () => item.suffixMsg
      }
      return h(
        tagName,
        {
          ...currProps,
          ...attrs,
          ...itemOn,
          ...on,
          ...itemNativeOn,
          ...nativeOn,
          style: {
            width: item.showTips ? '88%' : '100%'
          },
          modelValue: form[item.key],
          'onUpdate:modelValue': val => {
            form[item.key] = val
          }
        },
        renderDom
      )
    }
    const renderUpload = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('upload', props.lib)
      }
      return generateTag(tag)
    }
    const renderText = (item: FormItem) => {
      return h(
        'span',
        {
          ...item.attrs
        },
        form[item.key]
      )
    }
    // 渲染 input
    const renderInput = (item: FormItem) => {
      const props = item.props || {}
      const attrs = item.attrs || {}
      // 让 element-ui 在 props 里也可以设置 placeholder
      if (props.placeholder) {
        attrs.placeholder = props.placeholder
      }
      // 让 element-ui 在 props 里也可以设置 maxlength
      if (props.type !== 'textarea') {
        attrs.maxlength = +props.maxlength || +props.maxlength
      } else {
        // textarea 长度
        attrs.maxlength = +props.maxlength || +props.textareaMaxlength
      }
      item.attrs = attrs
      const tag = {
        item,
        tagName: getPrefix('input', props.lib),
        props: {
          clearable: props.clearable,
          ...props
        },
        nativeOn: {
          onInput: (value: any) => {
            value = formatDateValue(value, item)
            form[item.key] = value
            emitInput(value, item)
          },
          onKeydown: (e: KeyboardEvent) => {
            if (
              e.keyCode === 13 &&
              props.enterSubmit &&
              props.type !== 'textarea'
            ) {
              submit()
            }
          }
        }
      }
      return generateTag(tag)
    }
    // 渲染 select
    const renderSelect = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('select', props.lib),
        props: {
          clearable: props.clearable,
          ...(item.props || {})
        },
        children: item.options?.map((option: FormItemOptions) => {
          return h(
            getPrefix('option', props.lib),
            {
              label: option.text,
              value: option.value
            },
            [
              typeof item.renderOption === 'function'
                ? item.renderOption(option, item)
                : item.text
            ]
          )
        })
      }
      return generateTag(tag)
    }
    // 转换 cascader options
    const getCascaderOptions = (options: FormItemOptions[] | undefined) => {
      if (typeof options === 'undefined') return
      let list = JSON.stringify(options)
      list = list.replace(/"text":/g, '"label":')
      return JSON.parse(list)
    }
    // 渲染 单个checkbox
    const renderCheckbox = (item: FormItem) => {
      const props = item.props || {}
      if (item.border) {
        props.border = true
      }
      const tag = {
        item,
        tagName: getPrefix('checkbox', props.lib),
        props,
        children: item.text
      }
      return generateTag(tag)
    }
    // 渲染 checkbox group
    const renderCheckboxGroup = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('checkbox-group', props.lib),
        props: item.props || {},

        children: item.options?.map(option => {
          return h(
            getPrefix('checkbox', props.lib),
            {
              border: item.border,
              label: option.value
            },
            option.text
          )
        })
      }
      return generateTag(tag)
    }
    // 渲染 datepicker
    const renderDatePicker = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('date-picker', props.lib),
        props: {
          clearable: props.clearable,
          type: item.type,
          ...(item.props || {})
        }
      }
      return generateTag(tag)
    }
    // 渲染范围的 daterange
    const renderDateRange = (item: FormItem) => {
      // 处理 datetimerange 可能宽度不够的问题
      if (item.type === 'datetimerange') {
        item.width = item.width || 360
      }
      const tag = {
        item,
        tagName: getPrefix('date-picker', props.lib),
        props: {
          clearable: props.clearable,
          type: item.type,
          ...(item.props || {})
        }
      }
      return generateTag(tag)
    }
    // 渲染 timepicker
    const renderTimePicker = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('time-picker', props.lib),
        props: {
          clearable: props.clearable,
          type: item.type,
          ...(item.props || {})
        }
      }
      return generateTag(tag)
    }
    // 渲染 radio
    const renderRadio = (item: FormItem) => {
      const props = item.props || {}
      if (item.border) {
        props.border = true
      }
      const tag = {
        item,
        tagName: getPrefix('radio', props.lib),
        props,
        children: item.text
      }
      return generateTag(tag)
    }
    // 渲染 radio group
    const renderRadioGroup = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('radio-group', props.lib),
        props: item.props || {},
        children: item.options?.map(option => {
          return h(
            getPrefix('radio', props.lib),
            {
              border: item.border,
              label: option.value
            },
            option.text
          )
        })
      }
      return generateTag(tag)
    }
    // 渲染 switch
    const renderSwitch = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('switch', props.lib),
        props: item.props || {}
      }
      return generateTag(tag)
    }
    // 渲染 slider
    const renderSlider = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('slider', props.lib),
        props: item.props || {}
      }
      return generateTag(tag)
    }
    // 渲染 inputNumber
    const renderInputNumber = (item: FormItem) => {
      const tag = {
        item,
        tagName: getPrefix('input-number', props.lib),
        props: item.props || {}
      }
      return generateTag(tag)
    }
    // 渲染 cascader
    const renderCascader = (item: FormItem) => {
      const props = item.props || {}
      const tag = {
        item,
        props: {},
        tagName: getPrefix('cascader', props.lib)
      }
      if (props.lib === 'iview') {
        props.data = getCascaderOptions(item.options)
      } else {
        props.options = getCascaderOptions(item.options)
      }
      tag.props = props
      return generateTag(tag)
    }
    // 获取表单项操作区域
    const getContent = (item: FormItem): VNode => {
      let content: any
      switch (item.type) {
        case 'text':
          content = renderText(item)
          break
        case 'input':
          content = renderInput(item)
          break
        case 'select':
          content = renderSelect(item)
          break
        case 'checkbox':
          content = renderCheckbox(item)
          break
        case 'checkbox-group':
          content = renderCheckboxGroup(item)
          break
        case 'date':
          content = renderDatePicker(item)
          break
        case 'datetime':
          content = renderDatePicker(item)
          break
        case 'daterange':
          content = renderDateRange(item)
          break
        case 'datetimerange':
          content = renderDateRange(item)
          break
        case 'time':
          content = renderTimePicker(item)
          break
        case 'radio':
          content = renderRadio(item)
          break
        case 'radio-group':
          content = renderRadioGroup(item)
          break
        case 'switch':
          content = renderSwitch(item)
          break
        case 'slider':
          content = renderSlider(item)
          break
        case 'input-number':
          content = renderInputNumber(item)
          break
        case 'cascader':
          content = renderCascader(item)
          break
        case 'upload':
          content = renderUpload(item)
          break
        default:
          if (typeof item.renderContent === 'function') {
            content = item.renderContent(item, form)
          }
          break
      }
      return content
    }
    // 获取列
    const getRow = (childrenList: VNode[]): VNode => {
      return h(
        getPrefix('row', props.lib),
        {
          gutter: props.gutter
        },
        childrenList
      )
    }
    // grid为number的时候生成row
    const getFormListByNumber = (): VNode[] | undefined => {
      const list: VNode[] = []

      if (typeof props.grid !== 'number') return

      // 过滤 grid
      let grid = ~~Math.abs(props.grid)
      if (grid < 1) grid = 1
      const formList = props.formList.filter(item => item.isShow !== false)
      for (let i = 0; i < formList.length; i += grid) {
        const childrenList: VNode[] = []
        // 获取当前分成几列 grid 为 number 时
        for (let j = 0; j < grid && i + j < formList.length; j++) {
          const children = formList[i + j]
          if (!children) break
          const childrenItem = getFormItem(children, getContent(children))
          const childrenParts = h(
            getPrefix('col', props.lib),
            {
              // @ts-ignore
              span: +children.span || 24 / grid
            },
            [childrenItem]
          )
          childrenList.push(childrenParts)
        }
        const row = getRow(childrenList)
        list.push(row)
      }
      return list
    }
    // 当 grid 为一维数组时 生成row
    const getFormListByArray = () => {
      const list: VNode[] = []
      let gridIndex = 0
      if (!isArray(props.grid)) return
      for (let i = 0; i < props.formList.length; ) {
        const childrenList: VNode[] = []
        const grid = props.grid[gridIndex]

        for (let j = 0; j < grid; j++) {
          const children = props.formList[i + j]
          if (!children) break
          const childrenItem = getFormItem(children, getContent(children))
          const childrenParts: VNode = h(
            getPrefix('col', props.lib),
            {
              span: 24 / grid
            },
            [childrenItem]
          )
          childrenList.push(childrenParts)
        }
        const row = getRow(childrenList)
        list.push(row)
        gridIndex += 1
        i += grid
      }
      return list
    }
    // 当 grid 为二维数组
    const getFormListByGrid = () => {
      const list: VNode[] = []
      let gridIndex = 0
      for (let i = 0; i < props.formList.length; ) {
        const childrenList: VNode[] = []
        let grid = props.grid[gridIndex]
        if (!grid) grid = [1]
        for (let j = 0; j < grid.length; j++) {
          const children = props.formList[i + j]
          if (!children) break
          const childrenItem = getFormItem(children, getContent(children))
          const childrenParts = h(
            getPrefix('col', props.lib),
            {
              span: grid[j]
            },
            [childrenItem]
          )
          childrenList.push(childrenParts)
        }
        const row = getRow(childrenList)
        list.push(row)
        gridIndex += 1
        i += grid.length
      }
      return list
    }
    // 根据formList生成formItem
    const getFormList = () => {
      return props.formList.map(item => {
        return getFormItem(item, getContent(item))
      })
    }
    // 根据formList渲染form表单
    const renderFormList = () => {
      let list: any[] | undefined = []
      const grid: number[] | number = props.grid || []
      // 处理 grid 为不同值时
      if (typeof grid === 'number') {
        list = getFormListByNumber()
      } else if (isArray(grid)) {
        if (grid.every(item => !isArray(item))) {
          list = getFormListByArray()
        } else {
          list = getFormListByGrid()
        }
      } else {
        list = getFormList()
      }
      return list
    }

    // 清空验证
    const clear = () => {
      // @ts-ignore
      formRef.value?.clearValidate()
    }
    // 情况表单数据
    const clearFormData = () => {
      form = reactive(initForm())
    }
    // 设置表单项值
    const setForm = (data: any) => {
      for (const key in data) {
        form[key] = data[key]
      }
      nextTick(() => {
        clear()
      })
    }
    // 清空 form 表单
    const reset = () => {
      clear()
      // @ts-ignore
      formRef.value?.resetFields()
    }
    const validate = () => {
      let valid = false
      // @ts-ignore
      formRef.value.validate((res: any) => {
        valid = res
      })
      return valid
    }
    // 验证表单项
    const validateField = (
      props: string | string[],
      callback
    ) => {
      // @ts-ignore
      formRef.value.validateField(props, callback)
    }

    //  提交按钮渲染函数
    const renderSubmit = () => {
      const btns: VNode[] = []
      if (props.hasSubmitBtn) {
        btns.push(
          h(
            getPrefix('button', props.lib),
            {
              type: 'primary',
              style: {
                'margin-left': '10px',
                'margin-right': '10px'
              },
              onClick: submit
            },
            props.submitText
          )
        )
      }
      if (props.hasResetBtn) {
        btns.push(
          h(
            getPrefix('button', props.lib),
            {
              style: {
                'margin-left': '10px',
                'margin-right': '10px'
              },
              onClick: reset
            },
            props.resetText
          )
        )
      }
      return h(
        'div',
        {
          className: 'footer',
          style: {
            marginBottom: '20px',
            textAlign: props.footerAlign || 'center'
          }
        },
        btns
      )
    }
    // end---------------------

    // 导出外部可以操作的函数
    return {
      clearFormData,
      validate,
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
    }
  },
  render() {
    const children =
      [
        this.slots?.prepend?.(),
        this.renderFormList(),
        !this.notCtrl && this.renderSubmit()
      ]
    if (isFunction(this.slots.default) ) {
      children.push(this.slots.default())
    }
    return h(
      getPrefix('form', this.lib),
      {
        model: this.form,
        class: this.className,
        rules: this.rules,
        'label-width':
          this.lib === 'iview' ? this['labelWidth'] : this['labelWidth'] + 'px',
        ...this.options,
        ref: 'formRef',
        submit(e: Event) {
          e.preventDefault()
          e.stopPropagation()
        }
      },
      children
    )
  }
})
</script>
