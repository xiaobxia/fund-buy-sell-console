<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="600px"
    title="支付异常处理">
    <div>
      <el-radio-group v-model="radio">
        <div style="margin-bottom: 18px">
          <el-radio :label="1">发起线上异常处理</el-radio>
        </div>
        <div>
          <el-radio :label="2">线下确认已成功支付</el-radio>
        </div>
      </el-radio-group>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button size="small" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ErrorHandler',
  data() {
    return {
      dialogVisible: false,
      radio: 1
    }
  },
  computed: {},
  created() {
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    okHandler() {
      this.$message({
        type: 'success',
        message: '操作成功！'
      })
      this.dialogVisible = false
      this.$emit('ok')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
