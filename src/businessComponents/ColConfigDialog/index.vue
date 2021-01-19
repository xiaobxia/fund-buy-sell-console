<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="700px"
    title="定制列"
  >
    <div v-if="dialogVisible">
      <el-table
        :data="tableData"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{textAlign: 'center'}"
        border
        height="400px"
        style="width: 100%">
        <el-table-column
          prop="columnIndex"
          label="序号"/>
        <el-table-column
          prop="columnName"
          label="原列名"/>
        <el-table-column
          prop="newName"
          label="新列名">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.newName"
              :maxlength="50"
              placeholder="请输入新列名"
              clearable
              class="no-border-input"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="隐藏/显示">
          <template slot-scope="scope">
            <el-switch
              :disabled="ifDisabled(scope.$index +1)"
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ColConfigDialog',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      loading: false,
      type: 1
    }
  },
  computed: {},
  created() {
  },
  methods: {
    ifDisabled(index) {
      if (this.type === 1) {
        return [1, 2, 3, 4, 5, 6].indexOf(index) !== -1
      }
      if (this.type === 2) {
        return [1, 2, 3, 4, 5, 6, 7, 8].indexOf(index) !== -1
      }
      if (this.type === 3) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].indexOf(index) !== -1
      }
      if (this.type === 4) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(index) !== -1
      }
      if (this.type === 5) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].indexOf(index) !== -1
      }
      return false
    },
    open(type) {
      this.type = type
      this.loading = false
      this.$http.post('budget/columnMade/findByCondition', {
        'type': type,
        'userId': this.$commonQueryParam.phUserId
      }).then((res) => {
        const list = res.data || []
        list.forEach((item) => {
          item.newName = ''
        })
        this.tableData = list
        this.dialogVisible = true
      })
    },
    okHandler() {
      this.loading = true
      const data = this.$deepClone(this.tableData)
      data.forEach((item) => {
        if (item.newName) {
          item.columnName = item.newName
        }
      })
      this.$http.post('budget/columnMade/edit', data).then(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
