<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="1000px"
    append-to-body
    title="选择客商"
  >
    <div v-if="dialogVisible">
      <div class="filter-container">
        <div class="left-block">
          <el-input v-model="name" style="width: 200px;" suffix-icon="el-icon-search" size="small" placeholder="请输入编码或名称" @change="reQueryList"/>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :border="true"
        :data="tableData"
        :header-cell-style="{textAlign: 'center'}"
        tooltip-effect="dark"
        height="500px"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
        />
        <el-table-column
          prop="code"
          label="编码"
          align="left"
        />
        <el-table-column
          prop="name"
          label="名称"
          align="left"
        />
        <el-table-column
          prop="taxNumber"
          label="税号"
          align="left"
        />
        <el-table-column
          prop="faxNumber"
          label="传真"
          align="left"
        />
        <el-table-column
          prop="zipCode"
          label="邮政编码"
          align="left"
        />
        <el-table-column
          prop="linkMan"
          label="联系人"
          align="left"
        />
        <el-table-column
          prop="telephone"
          label="电话"
          align="left"
        />
        <el-table-column
          prop="address"
          label="地址"
          align="left"
        />
        <!-- <el-table-column
          prop="idType"
          label="证件类型"
        >
          <template slot-scope="scope">
            <span>{{ $formatIdType(scope.row.idType) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="idNumber"
          label="统一社会信用代码"
          min-width="140"
          align="left"
        />
        <el-table-column
          prop="isInternalContact"
          label="是否内部往来"
          align="left"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isInternalContact === 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="内部往来组织"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isInternalContact ? scope.row.orgName : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="medium">
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" align="center" width="220">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--:disabled="scope.row.isPublic !== 0"-->
        <!--type="text"-->
        <!--@click="editRow(scope.row)"-->
        <!--&gt;编辑-->
        <!--</el-button>-->
        <!--<el-button-->
        <!--:disabled="scope.row.isPublic !== 0"-->
        <!--type="text"-->
        <!--@click="deleteRow(scope.row)"-->
        <!--&gt;删除-->
        <!--</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
    <div class="page-wrap">
      <pagination :page="current" :limit="size" :total="total" @pagination="paginationChange"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'ContractGuestSelect',
  components: {
    Pagination
  },
  data() {
    return {
      name: '',
      dialogVisible: false,
      multipleSelection: [],
      digestList: [],
      tableData: [],
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
      const params = {
        current: this.current,
        size: this.size,
        search: this.name,
        orgId: this.$commonQueryParam.orgId,
        status: '',
        showTree: 1,
        type: 1,
        year: this.$commonQueryParam.year,
        groupId: this.$commonQueryParam.groupId || -1
      }
      this.$http.post('ucenter/commonBasic/listOrg', params).then((res) => {
        const data = res.data || {}
        this.total = data.total
        this.tableData = data.records
      })
    },
    paginationChange(info) {
      this.current = info.page
      this.size = info.limit
      this.queryList()
    },
    open() {
      this.multipleSelection = []
      this.digestList = []
      this.tableData = []
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
      this.$emit('ok', this.multipleSelection[0])
      this.dialogVisible = false
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
