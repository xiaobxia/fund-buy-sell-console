
export default {
  data() {
    return {
    }
  },
  computed: {
    ifEditing() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].ifEditing) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    _getEditingItem() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].ifEditing) {
          return this.tableData[i]
        }
      }
    },
    _getEditingList() {
      const list = []
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].ifEditing) {
          list.push(this.tableData[i])
        }
      }
      return list
    },
    // 刷新界面
    _refreshPage() {
      this.ifInit = false
      this.$nextTick(() => {
        this.ifInit = true
      })
    },
    _tableRowClassName({ row }) {
      if (row.ifEditing === true) {
        return 'editing-row'
      }
      return ''
    },
    _getColInfo(index) {
      const list = this.colList.filter((item) => {
        return item.columnIndex === index
      })
      if (list.length !== 0) {
        return {
          ifShow: list[0].status === 0,
          name: list[0].columnName
        }
      }
      return {
        ifShow: false,
        name: ''
      }
    },
    // 校验部分
    _checkMultipleEditing() {
      if (this.ifEditing) {
        this.$message({
          type: 'warning',
          message: '只能进行单行编辑，请先保存！'
        })
        return true
      } else {
        return false
      }
    },
    // 检查不能处于编辑状态
    _checkNoEditing() {
      if (this.ifEditing) {
        this.$message({
          type: 'warning',
          message: '请先退出编辑状态！'
        })
        return false
      }
      return true
    },
    _checkSelectMin(min, minStr) {
      if (this.multipleSelection.length < min) {
        this.$message({
          type: 'warning',
          message: `${minStr}！`
        })
        return false
      }
      return true
    },
    _checkSelectOnly(num, numStr) {
      if (this.multipleSelection.length !== num) {
        this.$message({
          type: 'warning',
          message: `${numStr}`
        })
        return false
      }
      return true
    }
  }
}
