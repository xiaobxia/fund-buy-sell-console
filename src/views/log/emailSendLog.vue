<template>
  <el-card v-loading="tableLoading" class="box-card-body">
    <div>
      <el-form ref="form" :model="searchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="类型" label-width="50px" prop="typeName">
              <el-select v-model="searchForm.typeName" size="small" style="width: 100%" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option value="注册邮件" label="注册邮件"/>
                <el-option value="忘记密码邮件" label="忘记密码邮件"/>
              </el-select>
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
          <el-col :span="4">
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
        min-width="150"
        label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="激活码">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="时间">
        <template slot-scope="scope">
          <span>{{ $formatToDateTime(scope.row.create_at) }}</span>
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
    typeName: '',
    search: ''
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
      this.$http.get('fbsServer/log/emailSendLogGetRecords', {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
