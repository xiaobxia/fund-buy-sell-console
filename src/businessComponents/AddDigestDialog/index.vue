<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body width="50%" title="新增摘要">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="编码" prop="encode">
        <el-input v-model="form.encode"/>
      </el-form-item>
      <el-form-item label="摘要" prop="value">
        <el-input v-model="form.value"/>
      </el-form-item>
      <el-form-item label="备注" prop="attrValue2">
        <el-input v-model="form.attrValue2"/>
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
    encode: '',
    value: '',
    attrValue2: '',
    phid: '',
    dataId: '',
    status: '1'
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'AddDigestDialog',
  data() {
    return {
      dialogVisible: false,
      form: createForm(),
      rules: {
        encode: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 50, message: '长度50个字符以内', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 500, message: '长度500个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created() {
  },
  methods: {
    open() {
      this.form = createForm()
      this.dialogVisible = true
    },
    okHandler() {
      this.$http.post('account/baseData/addDataDtl', {
        ...this.form,
        bookId: this.$commonQueryParam.bookId,
        dataEncode: 'summarySetting',
        phCurorgid: this.$commonQueryParam.phCurorgid
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
