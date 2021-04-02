<template>
  <el-card class="form-card">
    <demo>1111</demo>
    <el-button>el-button</el-button>
    <n-demo>demo-click</n-demo>
    <n-form
      ref="testFormRef"
      v-model="formData"
      class-name="base-form"
      footer-align="left"
      :form-list="formList"
      :grid="1"
      @submit="submit"
    >
      <template #prepend>
        <div class="split-line form-title">普通表单</div>
      </template>
    </n-form>
    <div>
      12321312312
    </div>

    <NTablePage
      url="/table"
      border
      :req-params="reqParams"
      :before-request-hook="beforeRequestHook"
      :after-request-hook="afterRequestHook"
      :finally-request-hook="finallyRequestHook"
    >
      <template #tableColumn>
        <el-table-column
          prop="a"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="b"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="c"
          label="地址1"
        />
        <el-table-column
          prop="d"
          label="地址2"
        />
        <el-table-column
          prop="e"
          label="地址3"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template #default="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </template>
    </NTablePage>
  </el-card>
</template>
<script lang="ts">
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { computed, defineComponent, reactive, ref } from 'vue'
import { NTablePage, NForm } from 'perfintech'
import  Demo  from '/@/components/Demo/index.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: {
    NForm,
    Demo,
    // NDemo,
    NTablePage
  },
  setup(props) {
    // const { ctx } = getCurrentInstance()
    const { prefixCls } = useDesign('app-logo')
    debugger
    // console.log(NDemo,'===',NForm)

    const clickme = () => {
      // ctx.$ajax.post(
      //   {
      //     url: './test'
      //   },
      //   {
      //     confirm: true,
      //     message: '你确定要？'
      //   }
      // )

      console.log('00000', props, prefixCls)
    }

    //  getCurrentInstance().proxy
    const region = ref('shanghai')

    const testRef = ref(null)
    const dateValue = ref(null)

    const test = ref(1)
    const formData = reactive({})

    const testFormRef = ref(null)
    const formList = computed(() => {
      return  [
        {
          title: '用户名',
          type: 'input',
          key: 'username',
          defaultValue: 3,
          rule: { required: true, message: '请输入用户名', trigger: 'blur' },
          props: {
            placeholder: '请输入用户名'
          }
        },
        {
          title: 'qiehuan',
          type: 'switch',
          key: 'qiehuan',
          defaultValue: true,
          props: {
            placeholder: '请输入用户名'
          }
        },
        {
          title: 'ckbx',
          type: 'checkbox',
          key: 'ckbx',
          text: '是',
          defaultValue: true,
          props: {
            placeholder: '请输入用户名'
          }
        },
        {
          title: 'radio',
          type: 'radio-group',
          key: 'radio',
          defaultValue: '1',
          props: {
            placeholder: '请输入用户名'
          },
          options:[{
            text: '是',
            value: '1'
          },
          {
            text: '否',
            value: '0'
          }]
        },
        {
          title: '区域',
          type: 'select',
          key: 'password',
          defaultValue: 'beijing',
          rule: { required: true, message: '请输入密码', trigger: 'change' },
          on: {
            onChange(value){
              console.log(testFormRef, value)
            }

          },
          options:[{
            text: '区域一',
            value: 'shanghai'
          },
          {
            text: '区域二',
            value: 'beijing'
          }]

        },
        {
          title: 'CheckBox',
          type: 'checkbox-group',
          key: 'checkbox',
          defaultValue: ['shanghai'],
          rule: { required: true, message: 'CheckBox', trigger: 'change' },
          options:[{
            text: '区域一',
            value: 'shanghai'
          },
          {
            text: '区域二',
            value: 'beijing'
          }]

        }, {
          title: '生日',
          type: 'datetimerange',
          key: 'birthday'
        }]
    })

    const submit = (value)=> {
      console.log(value)
      debugger

    }
    const handleClick = (values)=> {
      console.log(values)
    }
    const reqParams = reactive({
      a: 1,
      b: 3
    })
    const finallyRequestHook = () => {
      console.log('finally')
    }
    const beforeRequestHook=()=> {
      console.log('before')
    }
    const afterRequestHook = (val)=>{
      console.log('after', val)
    }
    const tableData = ref([{
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }])
    return {
      tableData,
      afterRequestHook,
      beforeRequestHook,
      finallyRequestHook,
      reqParams,
      handleClick,
      submit,
      dateValue,
      testFormRef,
      formData,
      region,
      test,
      prefixCls,
      clickme,
      formList,
      testRef
    }
  }
})
</script>
