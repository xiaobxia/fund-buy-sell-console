<template>
  <el-card v-loading="tableLoading" class="box-card-body">
    <div>
      <el-form ref="form" :model="searchForm" label-width="80px" size="small">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="是否有vip" prop="hasVip">
              <el-select v-model="searchForm.hasVip" size="small" style="width: 100%" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option :value="1" label="有"/>
                <el-option :value="0" label="没有"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="是否有邀请人" label-width="110px" prop="hasInviter">
              <el-select v-model="searchForm.hasInviter" size="small" style="width: 100%" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option :value="1" label="有"/>
                <el-option :value="0" label="没有"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
                @change="()=>{$setDateRange(searchForm, 'date', 'beginTime', 'endTime')}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchForm.search"
              style="width: 100%"
              class="enter-item"
              placeholder="请输入关键词"
              size="small"
            />
          </el-col>
          <el-col :span="2">
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
      height="calc(100vh - 220px)"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55"/>
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
      <el-table-column
        align="center"
        min-width="150"
        label="注册时间">
        <template slot-scope="scope">
          <span>{{ $formatToDateTime(scope.row.create_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="openDayAddDialog(scope.row)">增加vip天数</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;text-align: right">
      <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
    </div>
    <day-add-dialog ref="dayAddDialog" @ok="queryList"/>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import DayAddDialog from './components/dayAddDialog'

function createSearchForm(tar) {
  let raw = {
    'endTime': '',
    'beginTime': '',
    'hasVip': '',
    'hasInviter': '',
    'search': '',
    date: ['', '']
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
    DayAddDialog
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
        pageSize: this.size,
        ...this.searchForm
      }).then((res) => {
        const data = res.data || {}
        this.total = parseInt(data.count || 0) || 0
        this.tableData = data.list || []
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    openDayAddDialog(row) {
      this.$refs.dayAddDialog.open(row.email)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
