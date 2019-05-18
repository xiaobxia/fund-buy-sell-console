<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
    <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="100px">
      <el-alert
        :closable="false"
        style="margin-bottom: 20px"
        title="发奖设置"
        type="info"/>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="注册奖">
            <el-button type="primary" @click="registerSend">发送</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="节日奖">
            <el-input v-model="day"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="vacationSend">发送</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'GiftDetail',
  data() {
    return {
      day: 0
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
    },
    handleBack() {
      this.$router.history.go(-1)
    },
    registerSend() {
      this.$http.post(
        'admin/giveGiftCanUseDay'
      ).then(() => {
        this.$message({
          type: 'success',
          message: '发送成功!'
        })
        this.initPage()
      }).catch(() => {
      })
    },
    vacationSend() {
      this.$http.post(
        'admin/giveVacationCanUseDay',
        {
          day: this.day || 0
        }
      ).then(() => {
        this.$message({
          type: 'success',
          message: '发送成功!'
        })
        this.initPage()
      }).catch(() => {
      })
    }
  }
}
</script>

<style>
</style>

