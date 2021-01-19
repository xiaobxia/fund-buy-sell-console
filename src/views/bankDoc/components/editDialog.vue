<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="800px"
    title="银行账号"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
      <el-form-item label="所属组织" prop="orgName">
        <div>
          <el-input v-model="form.orgName" readonly maxlength="50"/>
        </div>
      </el-form-item>
      <el-form-item label="银行账号名称" prop="accountName">
        <el-input v-model="form.accountName" maxlength="50"/>
      </el-form-item>
      <el-form-item label="银行账号" prop="accountNumber">
        <el-input v-model="form.accountNumber" maxlength="50"/>
      </el-form-item>
      <el-form-item label="开户行名称" prop="bankName">
        <el-input v-model="form.bankName" maxlength="50"/>
      </el-form-item>
      <el-form-item label="开户行行号" prop="bankNumber">
        <el-input v-model="form.bankNumber" maxlength="50"/>
      </el-form-item>
      <el-form-item label="启用/停用">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
function createForm(tar) {
  let raw = {
    'accountName': '',
    'accountNumber': '',
    'bankName': '',
    'bankNumber': '',
    'orgId': '',
    'orgName': '',
    'phid': '',
    'status': 1
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
      loading: false,
      form: createForm(),
      rules: {
        orgName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        accountNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        bankNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
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
          let url = 'pcenterGh/bankInformation/add'
          if (this.form.phid) {
            url = 'pcenterGh/bankInformation/edit'
          }
          this.loading = true
          this.$http.post(url, {
            ...this.form
          }).then(() => {
            this.loading = false
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.dialogVisible = false
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
