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
    <div class="filter-container">
      <div class="left-block">
        <el-button type="primary" size="small" @click="payInfoC">收付款信息维护</el-button>
        <el-button :loading="mergePayLoading" type="primary" size="small" @click="openMergePay">合并支付</el-button>
        <el-button type="primary" size="small" @click="openErrorHandler">异常处理</el-button>
        <el-button type="primary" size="small" @click="batchSubmit">批量送审</el-button>
        <el-button type="primary" size="small" @click="cancelSubmit">取消送审</el-button>
        <el-button type="primary" size="small" @click="multipleDeleteHandler">删除</el-button>
        <el-button type="primary" size="small">导出数据</el-button>
      </div>
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
        min-width="200"
        label="支付单编号">
        <template slot-scope="scope">
          <el-button type="text" @click="openView(scope.row)">{{ scope.row.payNo }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        min-width="150"
        label="应付金额（元）">
        <template slot-scope="scope">
          <span>{{ $formatMoney(scope.row.amountPayable) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        min-width="150"
        label="实付金额（元）">
        <template slot-scope="scope">
          <span>{{ $formatMoney(scope.row.actuallyPayable) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="单据类型">
        <template slot-scope="scope">
          <span>{{ $formatDocType(scope.row.documentType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="200"
        label="申报单编号">
        <template slot-scope="scope">
          <span>{{ scope.row.declarationNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="申报单名称">
        <template slot-scope="scope">
          <span>{{ scope.row.declarationName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="申报日期">
        <template slot-scope="scope">
          <span>{{ scope.row.declarationDt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="审批状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.approvalId" type="text" @click="openApprovalDetail(scope.row)">{{ $formatSPVStatus(scope.row.approveStatus) }}</el-button>
          <div v-else>{{ $formatSPVStatus(scope.row.approveStatus) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="支付状态">
        <template slot-scope="scope">
          <span>{{ $formatPayCenterPayStatus(scope.row.payStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="支付方式">
        <template slot-scope="scope">
          <span>网银</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="支付日期">
        <template slot-scope="scope">
          <span>{{ scope.row.payTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;text-align: right">
      <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
    </div>
    <error-handler ref="errorHandler"/>
    <merge-pay ref="mergePay" @ok="queryList"/>
    <pay-view ref="payView" @ok="queryList"/>
    <approval-detail-notify ref="approvalDetailNotify"/>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import ErrorHandler from './components/errorHandler'
import MergePay from './components/mergePay'
import PayView from './components/payView'
import ApprovalDetailNotify from '@/businessComponents/ApprovalDetailNotify'

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
    Pagination,
    ErrorHandler,
    MergePay,
    PayView,
    ApprovalDetailNotify
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
    this.$store.dispatch('getOrgBankList', {
      orgId: this.$commonQueryParam.orgId
    })
    this.$store.dispatch('getBudgetSub', {
      year: this.$commonQueryParam.year
    })
    // setTimeout(() => {
    //   this.$refs.payView.open()
    // })
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
      this.$http.post('pcenterGh/payment/findByCondition', {
        ...this.searchForm,
        index: this.current,
        size: this.size,
        orgId: this.$commonQueryParam.orgId,
        'declareEndDt': this.searchForm.declareEndDt ? (this.searchForm.declareEndDt + ' 23:59:59') : '',
        'declareStartDt': this.searchForm.declareStartDt ? (this.searchForm.declareStartDt + ' 00:00:01') : '',
        'payEndDt': this.searchForm.payEndDt ? (this.searchForm.payEndDt + ' 23:59:59') : '',
        'payStartDt': this.searchForm.payStartDt ? (this.searchForm.payStartDt + ' 00:00:01') : ''
      }).then((res) => {
        const data = res.data || {}
        this.total = parseInt(data.total || 0) || 0
        this.tableData = data.records || []
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
