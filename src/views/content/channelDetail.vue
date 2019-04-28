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
        title="内容设置"
        type="info"/>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item prop="fixedInvestmentContent" label="定投：">
            <el-select v-model="dialogForm.fixedInvestmentContent" :style="{width: '100%'}" class="filter-item">
              <el-option value="严重低估区间，坚定定投" label="严重低估区间，坚定定投"/>
              <el-option value="低估区间，乐观定投" label="低估区间，乐观定投"/>
              <el-option value="估值合理区间，谨慎定投" label="估值合理区间，谨慎定投"/>
              <el-option value="高估区间，停止定投" label="高估区间，停止定投"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="positionContent" label="波段仓位">
            <el-input v-model="dialogForm.positionContent"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="marketWarn" label="波段操作">
            <el-input v-model="dialogForm.marketWarn"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'ContentDetail',
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
      this.$http.get('admin/getAllContent').then((res) => {
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
            'admin/updateAllContent',
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

