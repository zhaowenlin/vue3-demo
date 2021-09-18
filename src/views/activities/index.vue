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
    <NTablePage url="/table" :req-params="reqParams">
      <template #tableColumn>
        <el-table-column prop="a" label="活动编号" width="180" />
        <el-table-column prop="b" label="活动名称" width="180" />
        <el-table-column prop="e" label="活动创建机构" />

        <el-table-column prop="e" label="活动创建方" />

        <el-table-column prop="e" label="活动状态" />

        <el-table-column prop="e" label="创建人" />

        <el-table-column prop="e" label="创建时间" />
        <el-table-column prop="c" label="活动开始时间" />
        <el-table-column prop="d" label="活动结束时间" />
      </template>
    </NTablePage>
  </el-card>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  ref
} from 'vue'
import NForm from '/@/components/NForm/index.vue'
import NTablePage from '/@/components/NTablePage/index.vue'
export default defineComponent({
  name: 'ActivitiesList',
  components: {
    NForm,
    NTablePage
  },
  setup() {
    const formData = reactive({})
    const compaignTypeList = ref([])
    const formList = computed(() => {
      return [
        {
          title: '活动名称',
          type: 'text',
          key: 'username1',
          defaultValue: 3,
          props: {
            placeholder: '活动名称'
          }
        },
        {
          title: '活动类型',
          type: 'text',
          key: 'compaignType',
          defaultValue: 'xxx'
        },
        {
          title: '活动创建方',
          type: 'upload',
          key: 'username3',
          props: {
            'list-type': 'picture-card',
            action: 'xxx',
            on: {
              onProgress: (e, file, fileList) => {
                console.log(e, file, fileList)
              },
              onChange: (file, fileList) => {
                console.log(file, fileList)
              }
            }
          }
        }
      ]
    })
    const reqParams = ref({})

    const submit = value => {
      reqParams.value = {
        ...value
      }
    }
    //@ts-ignore
    const { ctx } = getCurrentInstance()

    const getCompaignTypeList = async () => {
      const data = await ctx.$ajax.get({
        url: '/types',
        params: {
          type: 1
        }
      })
      compaignTypeList.value = data.data || []
    }

    getCompaignTypeList()

    return {
      reqParams,
      submit,
      formData,
      formList
    }
  }
})
</script>
