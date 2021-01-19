<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="1000px"
    title="组织选择"
  >
    <div class="select-b-wrap">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="filter-container">
            <div class="left-block">
              <span class="label-text">选择</span>
            </div>
          </div>
          <div v-loading="queryLoading" class="share-sub-wrap">
            <div class="select-l-w">
              <div class="level-w">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item
                    v-for="(item, index) in levelList"
                    :key="item.phid"
                  >
                    <span @click="backParent(item, index)">{{ item.name }}</span>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div v-for="(item) in selectList" :key="item.phid" class="select-l-i">
                <span class="s-n" @dblclick="toCheckedList(item)">{{ item.encode ? `【${item.encode}】` : '' }}{{ item.name }}</span>
                <el-button
                  v-if="!item.end"
                  style="float: right;line-height: 30px;margin-right: 5px"
                  type="text"
                  @click="toChildList(item)"
                >下级</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="filter-container">
            <div class="left-block">
              <span class="label-text">已选</span>
            </div>
          </div>
          <div class="share-sub-wrap">
            <div class="select-l-w">
              <div v-for="(item, index) in checkedList" :key="item.phid" class="select-l-i">
                <span>{{ item.encode ? `【${item.encode}】` : '' }}{{ item.name }}</span>
                <el-button
                  v-if="!item.end"
                  style="float: right;line-height: 30px;margin-right: 5px;color: #F56C6C"
                  type="text"
                  @click="deleteChecked(item, index)"
                ><i class="el-icon-delete"/></el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="okHandler"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { uniqueArr } from '@/utils'
// import treeUtil from '@/utils/treeUtil'
// import arrayUtil from '@/utils/arrayUtil'

export default {
  name: 'OrgTransferDialog',
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'end'
      },
      selectList: [],
      levelList: [
        { name: '全部', phid: 'asdojih' }
      ],
      checkedList: [],
      queryLoading: false
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  methods: {
    queryFirstOrg() {
      this.queryLoading = true
      return this.$http.get(`ucenterGh/org/getNowUserFirstOrg`).then(({ status, data }) => {
        this.selectList = data.map(item => {
          item.end = !!item.end
          return item
        })
        this.queryLoading = false
      }).catch((err) => {
        console.log(err)
        this.queryLoading = false
      })
    },
    open() {
      this.levelList = [
        { name: '全部', phid: 'asdojih' }
      ]
      this.queryFirstOrg().then(() => {
      })
      this.dialogVisible = true
    },
    queryChildList(row) {
      this.queryLoading = true
      return this.$http.get('ucenterGh/org/getOrgByParentId', { parentId: row.phid }).then(({ status, data }) => {
        this.selectList = data.map(item => {
          item.end = !!item.end
          return item
        })
        this.queryLoading = false
      }).catch((err) => {
        console.log(err)
        this.queryLoading = false
      })
    },
    toChildList(row) {
      this.levelList.push(row)
      this.queryChildList(row)
    },
    backParent(row, index) {
      if (index !== this.levelList.length - 1) {
        this.levelList = this.levelList.splice(0, index + 1)
        if (row.phid === 'asdojih') {
          this.queryFirstOrg()
        } else {
          this.queryChildList(row)
        }
      }
    },
    ifHas(phid) {
      for (let i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i].phid === phid) {
          return true
        }
      }
      return false
    },
    toCheckedList(row) {
      if (!this.ifHas(row.phid)) {
        this.checkedList.push(row)
      } else {
        this.$message({
          type: 'warning',
          message: '已被选择！'
        })
      }
    },
    deleteChecked(row, index) {
      this.checkedList.splice(index, 1)
    },
    okHandler() {

    },
    toLeft() {
      // 只有全选的可以
      // const checkSubjects = this.$refs.subjectHasTree.getCheckedKeys()
      // if (checkSubjects.length !== 0) {
      //   this.changeHasList(arrayUtil.removeArray(this.hasList, checkSubjects))
      //   this.filterTree()
      // }
    },
    toRight() {
      // 半选的也可以
      // const checkSubjects = this.$refs.subjectNoHasTree.getCheckedKeys()
      // const halfCheckSubjects = this.$refs.subjectNoHasTree.getHalfCheckedKeys()
      // const addList = [...checkSubjects, ...halfCheckSubjects]
      // if (addList.length !== 0) {
      //   this.changeHasList(uniqueArr([...this.hasList, ...addList]))
      //   this.filterTree()
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-wrap {
  padding-top: 10px;
  text-align: right;
}
.select-b-wrap {
  position: relative;
}
.filter-container {
  // margin-top: 10px;
  .label-text {
    font-weight: bold;
    line-height: 32px;
  }
}
.share-sub-wrap {
  border: 1px solid #19A0E8;
  border-radius: 4px;
  padding: 20px 10px;
  height: 500px;
  overflow-y: auto;
}
  .select-l-i {
    line-height: 32px;
    &:hover {
      background-color: #F5F7FA;
    }
  }
  .s-n {
    cursor: pointer;
    user-select: none;
    &:hover{
      color: #19A0E8;
    }
  }
  .level-w {
    margin-bottom: 10px;
    padding: 0 5px;
    /deep/ {
      .el-breadcrumb__inner {
        cursor: pointer;
      }
      .el-breadcrumb__item {
        &:not(:last-child) {
          .el-breadcrumb__inner {
            color: #19A0E8;
            &:hover{
              color: #19A0E8;
            }
          }
        }
      }
    }
  }
</style>
