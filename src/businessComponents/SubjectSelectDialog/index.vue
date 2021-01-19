<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" title="选择科目" append-to-body>
    <el-tabs type="card" @tab-click="tabClick">
      <el-tab-pane v-for="(item) in tabList" :key="item" :label="item"/>
    </el-tabs>
    <div class="wrap">
      <el-tree
        v-if="dialogVisible"
        ref="tree"
        :data="subjectTreeTemp"
        :default-expand-all="true"
        :show-checkbox="true"
        :check-strictly="true"
        :props="defaultProps"
        :expand-on-click-node="false"
        node-key="phid"
        class="filter-tree subject-tree">
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ data.encode }} - {{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const caiList = ['资产', '负债', '净资产', '收入', '支出']
const yuList = ['预算收入', '预算支出', '预算结余']
const allList = ['资产', '负债', '净资产', '收入', '支出']
export default {
  name: 'SubjectSelectDialog',
  props: {
    // 是否选择末级组织
    last: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      keyword: '',
      dialogVisible: false,
      defaultProps: {
        children: 'childList',
        label: 'name',
        disabled: (data) => {
          if (this.last) {
            return data.childList && data.childList.length > 0
          } else {
            return false
          }
        }
      },
      tabList: [],
      subjectTreeTemp: []
    }
  },
  computed: {
    ...mapGetters([
      'subjectTree'
    ])
  },
  created() {
  },
  methods: {
    open(model) {
      if (model === 'cai') {
        // 财务科目
        this.tabList = caiList
      } else if (model === 'yu') {
        // 预算科目
        this.tabList = yuList
      } else {
        // 不区分（仍然是财务科目）
        this.tabList = allList
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.changeTree(this.tabList[0])
      })
    },
    okHandler() {
      const data = this.$refs.tree.getCheckedNodes()
      if (data.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择！'
        })
        return false
      }
      if (data.length > 1) {
        this.$message({
          type: 'warning',
          message: '只能选择一个科目'
        })
        return false
      }
      this.$emit('ok', data[0])
      this.dialogVisible = false
    },
    changeTree(type) {
      // 清空
      this.$refs.tree.setCheckedNodes([])
      const list = []
      this.subjectTree.forEach((item) => {
        if (item.subType === type) {
          list.push(item)
        }
      })
      this.subjectTreeTemp = list
    },
    tabClick(v) {
      this.changeTree(v.label)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wrap {
    max-height: 55vh;
    overflow-y: auto;
  }
</style>
