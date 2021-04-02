<template>
  <div class="n-table-page">
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      :data="internalTableData"
    >
      <slot name="tableColumn"></slot>
    </el-table>
    <el-pagination
      v-model:current-page="internalCurrentPage"
      layout="prev, pager, next"
      :page-size="internalPageSize"
      :pager-count="10"
      :total="internalTotal"
      @current-change="currentPageChange"
    />
  </div>
</template>
<script lang="ts">
import { Recordable } from 'perfintech'
import { CreateAxiosOptions, RequestOptions, Result } from 'perfintech/lib/utils/axios/types'
import { defineComponent, getCurrentInstance, PropType, ref, watch } from 'vue'
export default defineComponent({
  name: 'NTablePage',
  props: {
    // 请求方法类型
    method: {
      type: String,
      default: 'get'
    },
    // 分页表格请求接口
    url: {
      type: String,
      default: ''
    },
    // 表格初始数据
    tableData: {
      type: Array,
      default: ()=>[]
    },
    // 表格请求参数化
    reqParams: {
      type: Object,
      default: () => { return {}}
    },
    // 默认当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 总条数
    totalPage: {
      type: Number,
      default: 1
    },
    // 每页展示条数
    pageSize: {
      type: Number,
      default: 15
    },
    // 返回参数data的字段配置
    resDataKey: {
      type: String,
      default: 'data'
    },
    // 返回参数的totalPage字段配置
    resTotalPageKey: {
      type: String,
      default: 'totalPage'
    },
    // 返回参数的currentPage字段配置
    resCurrentPageKey: {
      type: String,
      default: 'currentPage'
    },
    // 返回参数的perPageNumer字段配置
    resPageSizeKey: {
      type: String,
      default: 'pageSize'
    },
    // 请求之前的钩子
    beforeRequestHook: {
      type: Function as PropType<(...args: any[]) => unknown>
    },
    // 请求成功之后的钩子
    afterRequestHook: {
      type: Function as PropType<(...args: any[]) => unknown>
    },
    // 无论请求成功还是失败之后的钩子
    finallyRequestHook: {
      type: Function as PropType<(...args: any[]) => unknown>
    },

  },
  setup(props) {
    const instance = getCurrentInstance()
    const _global = instance?.appContext.config.globalProperties

    const internalTableData = ref(props.tableData)
    const internalPageSize = ref(props.pageSize)
    const internalTotal = ref(props.totalPage)
    const internalCurrentPage = ref(props.currentPage)
    const loading = ref(false)
    watch(()=>props.tableData, (newVal)=> {
      internalTableData.value = newVal
    })
    watch(()=>props.pageSize, (newVal)=> {
      internalPageSize.value = newVal
    })
    watch(()=>props.totalPage, (newVal)=> {
      internalTotal.value = newVal
    })
    watch(()=>props.currentPage, (newVal)=> {
      internalCurrentPage.value = newVal
    })
    const reqTableData = (params?: Recordable, ajaxOption?: CreateAxiosOptions, ext?: RequestOptions) => {
      loading.value = true
      _global?.$ajax[props.method]({
        url: props.url,
        [props.method === 'get'? 'params': 'data']: {
          [props.resPageSizeKey]: internalPageSize.value,
          [props.resTotalPageKey]: internalTotal.value,
          [props.resCurrentPageKey]: internalCurrentPage.value,
          ...props.reqParams,
          ...params
        },
        ...ajaxOption,
      }, {
        lock: false,
        ...ext
      }).then((res: Result)=> {
        res = res || {}
        const status = props?.beforeRequestHook?.()
        if (status === false) return
        internalTableData.value = res[props.resDataKey]
        internalPageSize.value = res[props.resPageSizeKey]
        internalTotal.value = res[props.resTotalPageKey]
        internalCurrentPage.value = res[props.resCurrentPageKey]
      }).catch((e: Error)=> {
        props?.beforeRequestHook?.(e)
      }).finally(()=>{
        props?.finallyRequestHook?.()
        loading.value = false
      })
    }
    // 加载table数据
    reqTableData()
    // 切换页的时候重新加载table数据
    const currentPageChange = (num: number)=>{
      reqTableData({
        [props.resCurrentPageKey]: num
      })
    }
    return {
      currentPageChange,
      reqTableData,
      loading,
      internalPageSize,
      internalTotal,
      internalCurrentPage,
      internalTableData
    }
  }
})
</script>
<style lang="scss" scoped>
.n-table-page {
    .el-pagination {
        margin: 10px auto;
        text-align: center;
    }
}
</style>
