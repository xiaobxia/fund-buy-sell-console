<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="600px"
    title="合并支付">
    <div>
      <div class="w-i">
        <span class="el-icon-warning"/>
      </div>
      <div class="t-w">合并支付{{ $formatMoney(form.sum) }}元？</div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="okHandler">确定</el-button>
      <div>
        <div class="d-c" @click="tgDetailShow">
          <span class="theme-text">点击查看详细收款方</span>
          <span class="theme-text el-icon-arrow-down" style="float: right;font-size: 20px"/>
        </div>
        <div v-if="detailShow">
          <el-table
            :data="form.detailList"
            border
            size="small"
            height="300px"
            style="width: 100%;margin-top: 15px">
            <el-table-column
              type="index"
              label="序号"
              width="55"/>
            <el-table-column
              prop="unitName"
              label="收款方名称"/>
            <el-table-column
              label="待付金额（元）">
              <template slot-scope="scope">
                <el-button type="text">{{ $formatMoney(scope.row.receiveMoney) }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'MergePay',
  data() {
    return {
      dialogVisible: false,
      form: {
        sum: 0,
        detailList: []
      },
      detailShow: false,
      detailList: [],
      loading: false
    }
  },
  computed: {},
  created() {
  },
  methods: {
    tgDetailShow() {
      this.detailShow = !this.detailShow
    },
    open(data) {
      this.form = data
      this.dialogVisible = true
    },
    okHandler() {
      this.loading = true
      this.$http.post('pcenterGh/payment/paySuccess', {
        ids: this.form.ids
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .w-i {
    font-size: 60px;
    color: #ffc600;
    display: inline-block;
  }
  .t-w {
    vertical-align: top;
    line-height: 60px;
    display: inline-block;
    margin-left: 20px;
  }
  .d-c{
    margin-top: 20px;
    border-top: 1px solid #bbb;
    text-align: left;
    line-height: 20px;
    padding-top: 15px;
    cursor: pointer;
    span {
      vertical-align: bottom;
    }
  }
</style>
