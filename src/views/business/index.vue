<template>
  <el-card class="form-card">
    <n-form
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
          label="商户编号"
        />
        <el-table-column
          prop="b"
          label="商户经营名称"
        />
        <el-table-column
          prop="b"
          label="商户状态"
        />
        <el-table-column
          prop="b"
          label="商户等级"
        />
        <el-table-column
          prop="b"
          label="执照号码"
        />
        <el-table-column
          prop="b"
          label="经度信息"
        />
        <el-table-column
          prop="b"
          label="联系人手机号"
        />
        <el-table-column
          prop="b"
          label="区县"
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
  name: 'BusinessList',
  components: {
    NForm,
    NTablePage
  },
  setup() {
    const formData = reactive({})
    const formList = computed(() => {
      return  [
        {
          title: '商户名称',
          type: 'input',
          key: 'username1',
          props: {
            placeholder: '活动名称'
          }
        }, {
          title: '商户注册地',
          type: 'input',
          key: 'username2',
          props: {
            placeholder: '商户注册地'
          }
        }, {
          title: '商户号',
          type: 'input',
          key: 'username3',
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


