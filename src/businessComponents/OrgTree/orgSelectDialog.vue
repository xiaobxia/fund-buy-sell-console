<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="1000px"
    title="组织选择"
  >
    <div v-if="dialogVisible">
      <div class="filter-content">
        <el-input
          v-model="orgFilter"
          size="mini"
          clearable
          placeholder="输入编码或名称搜索"
          @click="(e) => {e.stopPropagation()}"/>
      </div>
      <div class="orgList">
        <el-tree
          ref="orgTree"
          :data="orgList"
          :filter-node-method="filterNode"
          :props="defaultProps"
          :load="handleLoadNode"
          :check-strictly="checkStrictly"
          lazy
          show-checkbox
          node-key="phid"
          highlight-current
          style="height: 300px; overflow-y: auto"
          @check="checkChange">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ data.encode ? `【${data.encode}】` : '' }}{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrgSelectDialog',
  props: {

  },
  data() {
    return {
      dialogVisible: false,
      orgFilter: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'end'
      },
      orgName: '',
      orgList: [],
      loading: false,
      checkStrictly: false,
      multiple: false
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
  },
  methods: {
    // 加载组织树子节点
    handleLoadNode(node, resolve) {
      if (node.level === 0) {
        this.$http.get(`ucenterGh/org/getNowUserFirstOrg`).then(({ status, data, message }) => {
          if (status) {
            resolve(data.map(item => {
              item.end = !!item.end
              return item
            }))
          } else {
            this.$message.error(message)
          }
        })
      } else {
        this.$http.get('ucenterGh/org/getOrgByParentId', { parentId: node.data.phid }).then(({ status, data, message }) => {
          if (status) {
            resolve(data.map(item => {
              item.end = !!item.end
              return item
            }))
          } else {
            this.$message.error(message)
          }
        })
      }
    },
    // 过滤组织树节点
    filterNode(value, data) {
      if (!value) return true
      return data.name.includes(value) || data.encode.includes(value)
    },
    open(config) {
      config = config || {}
      this.phid = config.phid || ''
      this.checkStrictly = config.checkStrictly || false
      this.multiple = config.multiple || false
      this.dialogVisible = true
    },
    // 选中节点
    checkChange(data, checkInfo) {
      // 如果是单选的那就把其他的给关了
      if (!this.multiple) {
        const checkedKeys = checkInfo.checkedKeys
        if (checkedKeys.length === 0) {
          this.$refs.orgTree.getCheckedKeys([])
        } else {
          if (checkedKeys.indexOf(data.phid) !== -1) {
            this.$refs.orgTree.setCheckedKeys([data.phid])
          }
        }
      }
    },
    okHandler() {
      this.loading = true
      const checkedNodes = this.$refs.orgTree.getCheckedNodes()
      if (checkedNodes.length !== 1) {
        this.$message({
          type: 'warning',
          message: '请选择一个组织！'
        })
        this.loading = false
        return false
      }
      this.loading = false
      this.dialogVisible = false

      this.$emit('ok', checkedNodes[0])
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tree-wrap {
    max-height: 400px;
    overflow-y: auto;
  }
  .orgList {
    margin-top: 20px;
  }
</style>
