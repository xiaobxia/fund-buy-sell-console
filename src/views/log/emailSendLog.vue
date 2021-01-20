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
  name: 'EmailSendLog',
  components: {
    Pagination
  },
  data() {
    return {
      searchForm: createSearchForm(),
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      multipleSelection: [],
      tableLoading: false
    }
  },
  computed: {
  },
  created() {
    this.reQueryList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
