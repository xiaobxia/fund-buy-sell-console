<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    title="选择项目"
    width="1000px"
  >
    <div class="filter-container">
      <div class="left-block">
        <el-input
          v-model="query.searchKey"
          style="width: 200px;margin-right: 10px"
          size="small"
          placeholder="输入编码或名称"
          @change="reGetList"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
          />
        </el-input>
      </div>
      <div class="right-block">
        <span class="label-text">是否引用：</span>
        <el-select
          v-model="query.isActive"
          :clearable="false"
          placeholder="请选择业务条线"
          size="small"
          @change="reGetList"
        >
          <el-option label="全部" value=""/>
          <el-option label="引用" value="1"/>
          <el-option label="未引用" value="2"/>
        </el-select>
        <span class="label-text">业务条线：</span>
        <el-select
          v-model="query.busLineId"
          :clearable="false"
          placeholder="请选择业务条线"
          size="small"
          @change="reGetList"
        >
          <el-option label="全部" value=""/>
          <el-option
            v-for="item in businessList"
            :key="item.phid"
            :label="item.name"
            :value="item.phid"
          />
        </el-select>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        type="index"
        label="序号"
        width="70"
      />
      <el-table-column
        prop="projectCode"
        label="项目编码"/>
      <el-table-column
        prop="projectName"
        label="项目名称"/>
      <el-table-column
        prop="busLineName"
        label="业务条线"/>
    </el-table>
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
function createForm(tar) {
  let raw = {
    busLineId: '',
    searchKey: '',
    isActive: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'ProjectSelectDialog',
  components: {
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      query: createForm(),
      businessList: [],
      multipleSelection: []
    }
  },
  computed: {},
  created() {
    this.$http.get('budget/MsYsDictDtl/findAllByCondition', {
      orgId: this.$commonQueryParam.orgId,
      type: 'businessLine',
      year: this.$commonQueryParam.year
    }).then((res) => {
      this.businessList = res.data || []
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    reGetList() {
      this.current = 1
      this.size = 10
      this.queryList()
    },
    queryList() {
      return this.$http.get('budget/MsYsProject/findByOrgId', {
        ...this.query,
        year: this.$commonQueryParam.year,
        orgId: this.$commonQueryParam.orgId,
        pageIndex: this.current,
        pageSize: this.size
      }).then((res) => {
        const data = res.data || {}
        this.tableData = data.records || []
        this.total = data.total || 0
      })
    },
    paginationChange(info) {
      this.current = info.page
      this.size = info.limit
      this.queryList()
    },
    open() {
      this.query = createForm()
      this.multipleSelection = []
      this.queryList().then(() => {
        this.dialogVisible = true
      })
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
