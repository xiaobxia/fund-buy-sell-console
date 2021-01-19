<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" title="选择摘要">
    <div class="filter-container">
      <div class="left-block">
        <el-input v-model="condition" style="width: 200px;" suffix-icon="el-icon-search" size="small" placeholder="请输入编码或名称" @change="reQueryList"/>
      </div>
      <div class="right-block">
        <el-button type="primary" size="small" @click="openAdd">新增</el-button>
        <!--<el-button type="primary" size="small">删除</el-button>-->
      </div>
    </div>
    <el-table
      :data="digestList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="value"
        label="摘要"/>
    </el-table>
    <div class="page-wrap">
      <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
    </div>
    <add-digest-dialog ref="addDigestDialog" @ok="addDigestDialogOk"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
import AddDigestDialog from '@/businessComponents/AddDigestDialog'

export default {
  name: 'DigestSelect',
  components: {
    Pagination,
    AddDigestDialog
  },
  data() {
    return {
      condition: '',
      dialogVisible: false,
      multipleSelection: [],
      digestList: [],
      current: 1,
      total: 0,
      size: 10
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    reQueryList() {
      this.current = 1
      this.size = 10
      this.queryList()
    },
    queryList() {
      this.$http.post('account/cert/getDigest', {
        condition: this.condition,
        currPage: this.current,
        pageSize: this.size,
        bookId: this.$commonQueryParam.bookId,
        orgId: this.$commonQueryParam.orgId,
        year: this.$commonQueryParam.year
      }).then((res) => {
        this.digestList = res.data.list
        this.total = parseFloat(res.data.totalNum || 0)
      })
    },
    paginationChange(info) {
      this.current = info.page
      this.size = info.limit
      this.queryList()
    },
    open() {
      this.queryList()
      this.dialogVisible = true
    },
    okHandler() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          type: 'info',
          message: '请选择一项'
        })
        return false
      }
      this.$emit('ok', this.multipleSelection[0].value)
      this.dialogVisible = false
    },
    openAdd() {
      this.$refs.addDigestDialog.open()
    },
    addDigestDialogOk() {
      this.reQueryList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-wrap {
    padding-top: 10px;
    text-align: right;
  }
</style>
