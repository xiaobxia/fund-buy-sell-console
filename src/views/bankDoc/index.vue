<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="5">
        <el-card>
          <div>
            <filter-block-tree
              ref="FilterBlockTree"
              :has-callback="true"
              :check-strictly="true"
              :search-type="1"
              :user-id="$commonQueryParam.userId"
              :current-node="orgInfo"
              :current-node-id="orgInfo.phid"
              :first-url="'ucenterGh/org/getNowUserFirstOrg'"
              :filter-type="'single'"
              :expand-on-click-node="false"
              tree-height="calc(100vh - 140px)"
              @handleNodeClick="currentOrgChange"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="19" class="mini-container">
        <el-card>
          <div class="filter-container">
            <div class="left-block">
              <el-button type="primary" size="small" @click="addNew">新增</el-button>
              <el-button type="primary" size="small" @click="editRow">修改</el-button>
              <el-button type="primary" size="small" @click="multipleDeleteHandler">删除</el-button>
              <el-input
                v-model="codeOrName"
                style="width: 200px;margin-left: 10px"
                suffix-icon="el-icon-search"
                size="small"
                placeholder="银行账户名称/账号"
                @change="reQueryDetail"
              />
            </div>
          </div>
          <div class="table-wrap">
            <el-table
              v-loading="tableLoading"
              ref="multipleTable"
              :border="true"
              :data="detailList"
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{textAlign: 'center'}"
              height="calc(100vh - 185px)"
              class="light-header"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                align="center"
                width="55"/>
              <el-table-column
                label="银行账户名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.accountName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="银行账号">
                <template slot-scope="scope">
                  <span>{{ scope.row.accountNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开户行">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="银行行号">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="启用/停用">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.status === 1 ? 'success' : 'danger'"
                    size="medium"
                  >
                    {{ scope.row.status === 1 ? '启用' : '禁用' }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 10px;text-align: right">
            <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <edit-dialog ref="editDialog" @ok="reQueryDetail"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import FilterBlockTree from '@/components/FilterBlockTree'
import EditDialog from './components/editDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'BankDoc',
  components: {
    EditDialog,
    Pagination,
    FilterBlockTree
  },
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      name: '',
      codeOrName: '',
      detailList: [],
      currentOrg: {},
      isEditing: false,
      multipleSelection: [],
      deptList: [],
      tableLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'orgInfo',
      'orgList'
    ])
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.setCurrentOrg()
  },
  methods: {
    setCurrentOrg() {
      this.currentOrgChange(this.orgList[0])
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    currentOrgChange(row) {
      console.log(row)
      this.currentOrg = row
      this.queryList()
    },
    initPage() {
    },
    queryList() {
      this.tableLoading = true
      this.$http.get('pcenterGh/bankInformation/findByOrgId', {
        'orgId': this.currentOrg.phid,
        'currentPage': this.current,
        'size': this.size,
        data: this.codeOrName
      }).then((res) => {
        const data = res.data || {}
        this.total = parseInt(data.total || 0) || 0
        this.detailList = data.records || []
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    addNew() {
      this.$refs.editDialog.open({
        orgId: this.currentOrg.phid,
        orgName: this.currentOrg.name
      })
    },
    editRow() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          type: 'warning',
          message: '请选择一项！'
        })
        return false
      }
      this.$refs.editDialog.open({
        ...this.multipleSelection[0],
        orgId: this.currentOrg.phid,
        orgName: this.currentOrg.name
      })
    },
    reQueryDetail() {
      this.current = 1
      this.queryList()
    },
    paginationChange(info) {
      this.current = info.page
      this.size = info.limit
      this.queryList()
    },
    multipleDeleteHandler() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请至少选择一项！')
        return false
      }
      const ids = []
      this.multipleSelection.forEach((item) => {
        ids.push(item.phid)
      })
      this.deleteHandler(ids)
    },
    deleteHandler(ids) {
      this.$confirm('一旦删除，将不可恢复，是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false
      }).then(() => {
        const opList = []
        ids.forEach((v) => {
          opList.push(
            this.$http.post(`pcenterGh/bankInformation/delete`, {
              id: v
            })
          )
        })
        Promise.all(opList).then(() => {
          this.$message.success('操作成功！')
          this.reQueryDetail()
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .detail-wrap {
    height: calc(100vh - 300px);
    overflow-y: auto;
  }
  .add-btn {
    border: 1px solid #1a84e8;
  }
  .right-text {
    float: right;
  }
  .mini-container {
    position: relative;
  }
  .page-pagination {
    text-align: right;
  }
  .radio-icon {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    &.active {
      background-color: #1a84e8;
      border: 1px solid #1a84e8;
    }
  }
</style>
