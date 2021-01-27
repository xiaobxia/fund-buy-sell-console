<template>
  <el-card v-loading="tableLoading" class="box-card-body">
    <el-table
      ref="multipleTable"
      :border="true"
      :data="tableData"
      :header-cell-style="{textAlign: 'center'}"
      tooltip-effect="dark"
      style="width: 100%"
      height="calc(100vh - 130px)">
      <el-table-column
        align="center"
        min-width="150"
        label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="doSchedule(scope.row.url)">手动执行</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>

export default {
  name: 'Schedule',
  components: {
  },
  data() {
    return {
      tableData: [
        { name: '验证开盘', url: 'schedule/verifyMarketOpening' },
        { name: '扣减vip天数', url: 'schedule/deleteVipDays' },
        { name: '更新公众号token', url: 'schedule/getGzhToken' }
      ],
      tableLoading: false
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    doSchedule(url) {
      this.$http.get(`fbsServer/${url}`).then((res) => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
