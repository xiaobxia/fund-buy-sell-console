<template>
  <el-card v-loading="tableLoading" class="box-card-body">
    <div>
      <el-form ref="form" :model="searchForm" label-width="70px" size="small">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="单据类型" prop="type">
              <el-select v-model="searchForm.type" size="small" style="width: 100%" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option
                  v-for="item in $DOC_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付状态" prop="status">
              <el-select v-model="searchForm.status" size="small" style="width: 100%" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option
                  v-for="item in $PAY_CENTER_PAY_STATUS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="searchForm.no"
              style="width: 100%"
              class="enter-item"
              placeholder="支付单号/申报单号"
              size="small"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="申报日期" prop="date">
              <el-date-picker
                v-model="searchForm.date"
                style="width: 100%"
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期"
                @change="()=>{$setDateRange(searchForm, 'date', 'declareStartDt', 'declareEndDt')}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付日期" prop="payDate">
              <el-date-picker
                v-model="searchForm.payDate"
                style="width: 100%"
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期"
                @change="()=>{$setDateRange(searchForm, 'payDate', 'payStartDt', 'payEndDt')}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button size="small" type="primary" @click="reQueryList">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :border="true"
      :data="tableData"
      :header-cell-style="{textAlign: 'center'}"
      tooltip-effect="dark"
      style="width: 100%"
      height="calc(100vh - 310px)"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
        <div slot="header">
          <el-button
            size="small"
            type="text"
            icon="el-icon-edit"
          />
        </div>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="100"
        label="激活状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.email_active" type="success">激活</el-tag>
          <el-tag v-else type="danger">未激活</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="100"
        label="vip天数">
        <template slot-scope="scope">
          <span>{{ scope.row.vip_days }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="200"
        label="激活码">
        <template slot-scope="scope">
          <span>{{ scope.row.email_code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="邀请人">
        <template slot-scope="scope">
          <span>{{ scope.row.inviter_email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="100"
        label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;text-align: right">
      <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
    </div>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'

function createSearchForm(tar) {
  let raw = {
    'declareEndDt': '',
    'declareStartDt': '',
    'index': '',
    'no': '',
    'payEndDt': '',
    'payStartDt': '',
    'size': '',
    'status': 1,
    'type': ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'PayPlatform',
  components: {
    Pagination
  },
  data() {
    return {
      name: '',
      codeOrName: '',
      searchForm: createSearchForm(),
      type: 1,
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      spStart: '',
      multipleSelection: [],
      tableLoading: false,
      expendList: [],
      mergePayLoading: false
    }
  },
  computed: {
  },
  created() {
    this.reQueryList()
  },
  methods: {
    handleSelectionChange(val) {
      console.log('1', val.length)
      this.multipleSelection = val
    },
    handleSelectionAll(val) {
      console.log('2', val.length)
    },
    paginationChange(info) {
      this.current = info.page
      this.size = info.limit
      this.queryList()
    },
    reQueryList() {
      this.current = 1
      this.queryList()
    },
    queryList() {
      this.tableLoading = true
      this.$http.get('fbsServer/user/getRecords', {
        current: this.current,
        pageSize: this.size
      }).then((res) => {
        const data = res.data || {}
        this.total = parseInt(data.count || 0) || 0
        this.tableData = data.list || []
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    addHandler() {
      this.$refs.signOffDialog.open()
    },
    editHandler() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          type: 'warning',
          message: '请选择一项！'
        })
        return false
      }
      if (this.multipleSelection[0].spStart === 2 || this.multipleSelection[0].spStart === 3) {
        this.$message({
          type: 'warning',
          message: '已审批不可编辑！'
        })
        return false
      }
      this.$http.postJson('budget/MsYsSignMst/findOneBySign', {
        phId: this.multipleSelection[0].phid
      }).then((res) => {
        this.$refs.signOffDialog.open(res.data || {})
      })
    },
    openView(row) {
      this.$http.get('pcenterGh/payment/findByPhId', {
        phId: row.phid
      }).then((res) => {
        this.$refs.payView.open(res.data || {}, {
          type: 'view'
        })
      })
    },
    payInfoC() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          type: 'warning',
          message: '请选择一项！'
        })
        return false
      }
      const row = this.multipleSelection[0]
      if (!(row.approveStatus === 1 || row.approveStatus === 4 || row.approveStatus === 5)) {
        this.$message({
          type: 'warning',
          message: `请选择【审批状态】为【待送审】或【审批不通过】或【审批驳回】的单据进行操作！`
        })
        return false
      }
      this.$http.get('pcenterGh/payment/findByPhId', {
        phId: this.multipleSelection[0].phid
      }).then((res) => {
        this.$refs.payView.open(res.data || {})
      })
    },
    openMergePay() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项！'
        })
        return false
      }
      const items = []
      let hasOther = false
      this.multipleSelection.forEach((v) => {
        if (v.approveStatus === 3 && v.payStatus === 1) {
          items.push(v)
        } else {
          hasOther = true
        }
        // items.push(v)
      })
      if (hasOther) {
        this.$message({
          type: 'warning',
          message: '请选择【审批状态】为【审批通过】且【支付状态】为【待支付】的单据！'
        })
        return false
      }
      this.mergePayLoading = true
      const qList = []
      const ids = []
      items.forEach((v) => {
        ids.push(v.phid)
        qList.push(this.$http.get('pcenterGh/payment/findByPhId', {
          phId: v.phid
        }).then((res) => {
          return res.data || {}
        }))
      })
      Promise.all(qList).then((resList) => {
        let sum = 0
        const detailList = []
        resList.forEach((v) => {
          v.payMentDtlVOList = v.payMentDtlVOList || []
          v.payMentDtlVOList.forEach((s) => {
            detailList.push(s)
            sum += parseFloat(s.receiveMoney || 0) || 0
          })
        })
        this.$refs.mergePay.open({
          sum,
          detailList,
          ids
        })
        this.mergePayLoading = false
      }).catch((err) => {
        console.log(err)
        this.mergePayLoading = false
      })
    },
    openErrorHandler() {
      this.$refs.errorHandler.open()
    },
    multipleDeleteHandler() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '至少选择一项'
        })
        return false
      } else {
        const ids = []
        let hasOther = false
        this.multipleSelection.forEach((v) => {
          if (v.payStatus === 2 || v.payStatus === 3 || v.approveStatus === 2 || v.approveStatus === 3) {
            hasOther = true
          } else {
            ids.push(v.phid)
          }
        })
        if (hasOther) {
          this.$message({
            type: 'warning',
            message: '请选择【支付状态】为【待支付】或【支付异常】并且【审批状态】为【待审批】或【审批不通过】的单据！'
          })
          return false
        }
        this.deleteHandler(ids)
      }
    },
    deleteHandler(ids) {
      this.$confirm('一旦删除，将不可恢复，是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false
      }).then(() => {
        this.$http.post('pcenterGh/payment/delete', {
          ids
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          this.reQueryList()
        })
      })
    },
    batchSubmit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项！'
        })
        return false
      }
      const ids = []
      let hasOther = false
      this.multipleSelection.forEach((v) => {
        if (v.approveStatus !== 1) {
          hasOther = true
        }
        ids.push(v.phid)
      })
      if (hasOther) {
        this.$message({
          type: 'warning',
          message: '请选择待送审的数据！'
        })
        return false
      }
      this.$http.post('pcenterGh/payment/batchSubmit', {
        ids: ids
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.queryList()
      })
    },
    cancelSubmit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项！'
        })
        return false
      }
      const ids = []
      let hasOther = false
      this.multipleSelection.forEach((v) => {
        if (v.approveStatus !== 2) {
          hasOther = true
        }
        ids.push(v.phid)
      })
      if (hasOther) {
        this.$message({
          type: 'warning',
          message: '请选择审批中的数据！'
        })
        return false
      }
      this.$http.post('pcenterGh/payment/cancelSubmit', {
        'ids': ids
      }).then(() => {
        this.$message({
          type: 'success',
          message: '取消送审成功！'
        })
        this.queryList()
      })
    },
    exportHandler() {
      return this.$http.post('budget/MsYsSignMst/exportSing', {
        pageIndex: this.current,
        pageSize: this.size,
        spStart: this.spStart,
        type: this.type,
        codeOrName: this.codeOrName
      }, { responseType: 'arraybuffer' }).then((res) => {
        this.$downloadExcel(res, '事项签报', 'xls')
      })
    },
    openApprovalDetail(row) {
      this.$refs.approvalDetailNotify.open(row.approvalId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
