<template>
  <el-card v-loading="tableLoading" class="box-card-body">
    <div>
      <el-form ref="form" :model="searchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="vip内容" prop="is_vip" label-width="60px">
              <el-select v-model="searchForm.is_vip" size="small" style="width: 100%" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option :value="true" label="是"/>
                <el-option :value="false" label="否"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="date" label-width="50px">
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
          <el-col :span="4">
            <el-button size="small" type="primary" @click="reQueryList">查询</el-button>
            <el-button size="small" type="primary" @click="addNew">新增</el-button>
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
        label="内容">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="150"
        label="vip">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_vip" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
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
      <el-table-column
        align="center"
        min-width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="addNew(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;text-align: right">
      <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
    </div>
    <edit-dialog ref="editDialog" @ok="reQueryList"/>
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import EditDialog from './components/editDialog'

function createSearchForm(tar) {
  let raw = {
    'endTime': '',
    'beginTime': '',
    'search': '',
    'is_vip': '',
    date: ['', '']
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'InfoFlow',
  components: {
    Pagination,
    EditDialog
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
      this.$http.get('fbsServer/infoFlow/getAdminInfoFlow', {
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
    addNew(row) {
      this.$refs.editDialog.open(row || {})
    },
    deleteRow(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('fbsServer/infoFlow/deleteRecord', {
          info_id: row.id
        }).then(({ message }) => {
          this.$message.success('成功')
          this.reQueryList()
        })
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
