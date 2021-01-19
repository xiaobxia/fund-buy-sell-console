<template>
  <el-popover
    v-model="orgListVisible"
    class="org-choose"
    placement="top"
    width="400">
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
        v-if="orgListVisible"
        ref="orgTree"
        :data="orgList"
        :filter-node-method="filterNode"
        :props="defaultProps"
        :expand-on-click-node="false"
        :load="handleLoadNode"
        lazy
        node-key="phid"
        highlight-current
        style="height: 300px; overflow-y: auto"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span @dblclick="orgChange(data)">{{ data.encode ? `【${data.encode}】` : '' }}{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div slot="reference" class="choose-org-title">
      {{ orgName }}
      <i class="el-icon-arrow-down el-icon--right"/>
    </div>
  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      orgFilter: '',
      orgListVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'end'
      },
      orgName: ''
    }
  },
  computed: {
    ...mapGetters([
      'orgList',
      'orgInfo'
    ])
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.orgName = this.orgInfo.name
  },
  methods: {
    orgChange(node) {
      this.orgName = node.name
      this.orgListVisible = false
      return this.$store.dispatch('setOrgInfo', { ...node, source: 'navbar' }).then(() => {
        // 直接刷界面，因为切换以后用户不一定当前页的权限
        setTimeout(() => {
          window.location.reload()
        }, 100)
      })
    },
    toPath(url) {
      window.location = url
    },
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  z-index: 1000;
  line-height: 55px;
  border-radius: 0 !important;
  // background: url("../../../assets/app-nav-bg.png");
  background-size: cover;
  color: #ffffff;

  .change-cloth,
  .user-center,
  .setting {
    cursor: pointer;
    margin-right: 15px;
    font-size: 14px;
    vertical-align: bottom;
  }

  .hamburger-container {
    line-height: 65px;
    height: 55px;
    float: left;
    padding: 0 20px;
  }

  .breadcrumb-container {
    float: left;
  }

  .app-icon {
    height: 26px;
    vertical-align: middle;
  }

  .period {
    margin-left: 30px;
    font-size: 16px;
    vertical-align: middle;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: 17px 20px;
    line-height: 21px;

    &:focus {
      outline: none;
    }

    .right-item {
      color: #fff;
      cursor: pointer;
      margin-right: 20px;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }

    .screenfull {
      height: 20px;
    }

    .international {
      vertical-align: top;
    }

    .theme-switch {
      vertical-align: 15px;
    }

    .avatar-container {
      height: 55px;
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.org-choose {
  display: inline-block;
  margin-right: 15px;

  .choose-org-title {
    cursor: pointer;
  }
}

.filter-content {
  margin-bottom: 15px;
}

.orgList {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 5px;

      &:last-child {
        margin: 0;
      }

      &:hover {
        background: #fff;
        transition: .2s all ease;
      }
    }
  }
}
</style>
