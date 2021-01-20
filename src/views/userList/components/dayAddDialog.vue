<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="500px"
    title="增加天数"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="天数" prop="days">
        <el-select v-model="form.days" size="small" style="width: 100%" placeholder="请选择">
          <el-option v-for="(item) in dayList" :key="item" :value="item" :label="item"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
function createForm(tar) {
  let raw = {
    days: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'DayAddDialog',
  data() {
    return {
      dialogVisible: false,
      form: createForm(),
      rules: {
        days: [
          { required: true, message: '必填', trigger: 'change' }
        ]
      },
      dayList: [20, 60, 120, 240],
      email: ''
    }
  },
  computed: {},
  created() {
  },
  methods: {
    open(email) {
      this.email = email
      this.form = createForm()
      this.dialogVisible = true
    },
    okHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('fbsServer/user/addUserVipDays', {
            // 多送一天
            days: this.form.days + 1,
            email: this.email
          }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.dialogVisible = false
            this.$emit('ok')
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
