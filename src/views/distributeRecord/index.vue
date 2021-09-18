<template>
  <el-card class="form-card">
    <n-form
      v-model="formData"
      footer-align="center"
      submit-text="查询"
      :form-list="formList"
      :grid="3"
      @submit="submit"
    >
      <template #prepend>
        <div class="split-line form-title">查询条件</div>
      </template>
    </n-form>
    <NTablePage
      url="/table"
      :req-params="reqParams"
    >
      <template #tableColumn>
        <el-table-column
          prop="a"
          label="券号"
        />
        <el-table-column
          prop="b"
          label="活动名称"
        />
        <el-table-column
          prop="b"
          label="发放人"
        />
        <el-table-column
          v-if="formData.listChange === 2"
          prop="b"
          label="机构号"
        />
        <el-table-column
          v-if="formData.listChange === 3"
          prop="b"
          label="商户名称"
        />
        <el-table-column
          prop="b"
          label="客户号"
        />
        <el-table-column
          prop="b"
          label="使用时间"
        />
        <el-table-column
          prop="b"
          label="发放时间"
        />
        <el-table-column
          prop="b"
          label="状态"
        />
      </template>
    </NTablePage>
  </el-card>
</template>
<script lang="tsx">
import { computed, defineComponent, reactive, ref } from 'vue'
import NForm from '/@/components/NForm/index.vue'
import NTablePage from '/@/components/NTablePage/index.vue'
export default defineComponent({
  name: 'DistributeRecordList',
  components: {
    NForm,
    NTablePage
  },
  setup() {
    const formData = reactive({
      listChange: 2
    })
    const formList = computed(() => {
      return  [
        {
          title: '券号',
          type: 'input',
          key: 'username1',
          props: {
            placeholder: '活动名称'
          }
        }, {
          title: '手机号',
          type: 'input',
          key: 'username2',
          props: {
            placeholder: '商户注册地'
          }
        }, {
          title: '机构号',
          type: 'input',
          key: 'username3',
          props: {
            placeholder: '商户号'
          }
        }, {
          title: '客户号',
          type: 'input',
          key: 'username3',
          props: {
            placeholder: '商户号'
          }
        }, {
          title: '活动名称',
          type: 'input',
          key: 'username3',
          props: {
            placeholder: '商户号'
          }
        }, {
          title: '类型',
          type: 'input',
          key: 'listChange',
          props: {
            placeholder: '商户号'
          }
        }, {
          title: '开始时间',
          type: 'datetime',
          key: 'username3',
          span: 12,
          props: {
            placeholder: '商户号'
          }
        }, {
          title: '结束时间',
          type: 'datetime',
          key: 'username3',
          span: 12,
          props: {
            placeholder: '商户号'
          }
        }]
    })
    const reqParams = ref({})

    const submit = (value)=> {
      reqParams.value = {
        ...value
      }
    }

    return {
      reqParams,
      submit,
      formData,
      formList
    }
  }
})
</script>


