import { defineComponent, getCurrentInstance, ref, watch, resolveComponent, resolveDirective, openBlock, createBlock, withDirectives, createVNode, mergeProps, withCtx, renderSlot } from 'vue';

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

export default script;
