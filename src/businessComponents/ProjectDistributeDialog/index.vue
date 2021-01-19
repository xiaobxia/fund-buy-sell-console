<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body width="400px" title="项目分发">
    <div class="filter-container">
      <div class="left-block">
        <el-button size="small" type="primary" @click="checkAll">全选</el-button>
        <el-button size="small" type="primary" @click="reverseCheck">反选</el-button>
      </div>
    </div>
    <div v-if="dialogVisible" class="tree-wrap">
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        :check-strictly="true"
        show-checkbox
        node-key="phid"
        default-expand-all/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import treeUtil from '@/utils/treeUtil'
import { mapGetters } from 'vuex'

function createNewTree(children, hasList) {
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    item.disabled = hasList.indexOf(item.phid) === -1
    if (item.children && item.children.length > 0) {
      createNewTree(item.children, hasList)
    }
  }
}

export default {
  name: 'ProjectDistributeDialog',
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      phid: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'orgTree',
      'orgPhids'
    ])
  },
  created() {
    this.$store.dispatch('initOrgTree')
  },
  methods: {
    createTree() {
      const newTree = JSON.parse(JSON.stringify(this.orgTree))
      createNewTree(newTree, this.orgPhids)
      this.treeData = newTree
    },
    open(phid) {
      this.phid = phid
      this.createTree()
      this.dialogVisible = true
    },
    okHandler() {
      this.loading = true
      this.$http.post('budget/MsYsProject/share', {
        'orgIds': this.$refs.tree.getCheckedKeys(),
        'phid': this.phid
      }).then(() => {
        this.loading = false
        this.$emit('ok')
        this.dialogVisible = false
        this.$message.success('分发成功！')
      }).catch(() => {
        this.loading = false
      })
    },
    getAllKeys() {
      const allKeys = []
      treeUtil.getChildrenKeys(this.treeData, 'phid', allKeys)
      return allKeys
    },
    checkAll() {
      const allKeys = this.getAllKeys()
      this.$refs.tree.setCheckedKeys(allKeys)
    },
    reverseCheck() {
      const allKeys = this.getAllKeys()
      const hasKeys = this.$refs.tree.getCheckedKeys()
      const reverseKeys = []
      allKeys.forEach((item) => {
        if (hasKeys.indexOf(item) === -1) {
          reverseKeys.push(item)
        }
      })
      this.$refs.tree.setCheckedKeys(reverseKeys)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tree-wrap {
    max-height: 400px;
    overflow-y: auto;
  }
</style>
