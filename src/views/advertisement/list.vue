<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :model="searchForm" label-position="left" label-width="100px">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item prop="status" label="状态：">
              <el-select v-model="searchForm.status" :style="{width: '100%'}" class="filter-item">
                <el-option label="全部" value=""/>
                <el-option :value="1" label="上架"/>
                <el-option :value="2" label="下架"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="type" label="类型：">
              <el-select v-model="searchForm.type" :style="{width: '100%'}" class="filter-item">
                <el-option label="全部" value=""/>
                <el-option value="食品" label="食品"/>
                <el-option value="茶具" label="茶具"/>
                <el-option value="男士用品" label="男士用品"/>
                <el-option value="女士用品" label="女士用品"/>
                <el-option value="宿舍用品" label="宿舍用品"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button class="filter-item" icon="el-icon-refresh" type="primary" @click="handleResetSearch">重置
            </el-button>
            <el-button
              :loading="searchLoading"
              class="filter-item"
              icon="el-icon-search"
              type="primary"
              @click="handleSearch">搜索
            </el-button>
            <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="handleCreate">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column type="expand" label="展开" width="50">
        <template slot-scope="props">
          <img v-if="props.row.img_url" :src="props.row.img_url" style="height: 700px;width: auto;" class="list-img-icon" alt="">
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序值">
        <template slot-scope="scope">
          <span>{{ scope.row.sortIndex || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="formatStatusType(scope.row.status)">{{ formatStatus(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleChangeStatus(scope.row)">{{ scope.row.status === 1?'下架':'上架' }}
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="listTotal>0"
      :total="listTotal"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.pageSize"
      @pagination="queryList"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const searchFormBase = {
  type: '',
  status: ''
}
export default {
  name: 'AdvertisementList',
  components: { Pagination },
  data() {
    return {
      loading: false,
      searchLoading: false,
      searchForm: Object.assign({}, searchFormBase),
      list: [],
      listTotal: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.queryList()
    },
    queryList() {
      this.listLoading = true
      this.$http.get('advertisement/getAdvertisements', {
        ...this.searchForm,
        ...this.listQuery
      }).then(response => {
        this.list = response.data.list
        this.listTotal = response.data.count
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getUsers()
    },
    handleSearch() {
      this.queryList()
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, searchFormBase)
    },
    handleChangeStatus(row) {
      let newStatus = 1
      if (row.status === 1) {
        newStatus = 2
      }
      this.$http.post('advertisement/updateStatus', {
        id: row._id,
        status: newStatus
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.initPage()
      })
    },
    handleCreate() {
      this.$router.push({ path: '/advertisement/add' })
    },
    verifyAfterDelete() {
      if (this.current < 2) {
        if (this.listQuery.pageSize > 1) {
          this.listQuery.pageSize = this.listQuery.pageSize - 1
        }
      }
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('advertisement/deleteAdvertisement', {
          _id: row._id
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.verifyAfterDelete()
          this.initPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
