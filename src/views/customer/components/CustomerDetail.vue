<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-back" @click="handleBack">返回</el-button>
      <el-button style="float: right" class="filter-item" icon="el-icon-check" type="primary" @click="handleSave">保存</el-button>
    </div>
    <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="100px">
      <el-alert
        :closable="false"
        style="margin-bottom: 20px"
        title="详情"
        type="info"/>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item prop="name" label="微信Id">
            <el-input v-model="dialogForm.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="buy_type" label="产品类型：">
            <el-select v-model="dialogForm.buy_type" :style="{width: '100%'}" class="filter-item">
              <el-option value="定投" label="定投"/>
              <el-option value="波段" label="波段"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="can_use_day" label="可用时间">
            <el-input v-model="dialogForm.can_use_day"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="status" label="状态：">
            <el-select v-model="dialogForm.status" :style="{width: '100%'}" class="filter-item">
              <el-option :value="1" label="正常"/>
              <el-option :value="2" label="拉黑"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item prop="reward" label="奖励天数">
            <el-input v-model="dialogForm.reward"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="if_test" label="已经试用：">
            <el-select v-model="dialogForm.if_test" :style="{width: '100%'}" class="filter-item">
              <el-option :value="true" label="是"/>
              <el-option :value="false" label="否"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="if_count_day" label="计算今日：">
            <el-select v-model="dialogForm.if_count_day" :style="{width: '100%'}" class="filter-item">
              <el-option :value="true" label="是"/>
              <el-option :value="false" label="否"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'CustomerDetail',
  data() {
    return {
      rawDetail: {},
      dialogForm: {},
      dialogFormRules: {}
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.queryDetail()
    },
    queryDetail() {
      const params = this.$router.history.current.params
      this.$http.get('admin/getCustomer', {
        id: params.id
      }).then((res) => {
        this.rawDetail = Object.assign({}, res.data)
        this.dialogForm = Object.assign({}, res.data)
      })
    },
    handleBack() {
      this.$router.history.go(-1)
    },
    handleSave() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.$http.post(
            'admin/updateCustomer',
            this.dialogForm
          ).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.initPage()
          }).catch(() => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>

