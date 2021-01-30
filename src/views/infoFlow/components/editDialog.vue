<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="50%"
    title="编辑">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="vip内容" prop="is_vip" label-width="80px">
        <el-select v-model="form.is_vip" size="small" style="width: 100%" placeholder="请选择">
          <el-option :value="true" label="是"/>
          <el-option :value="false" label="否"/>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          :rows="4"
          v-model="form.content"
          type="textarea"
          maxlength="200"
          placeholder="请输入内容"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
function createForm(tar) {
  let raw = {
    is_vip: true,
    content: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'EditDialog',
  data() {
    return {
      dialogVisible: false,
      form: createForm(),
      rules: {
        is_vip: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        content: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {},
  created() {
  },
  methods: {
    open(row) {
      this.form = createForm(row)
      this.dialogVisible = true
    },
    okHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post('fbsServer/infoFlow/updateInfoFlow', {
            ...this.form
          }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.dialogVisible = false
            this.loading = false
            this.$emit('ok')
          }).catch((err) => {
            console.log(err)
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
