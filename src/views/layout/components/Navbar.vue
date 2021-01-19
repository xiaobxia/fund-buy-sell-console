<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <span class="period">{{ sysName }}</span>
    <div class="right-menu">
      <span
        class="user-center"
        style="margin-right: 20px"
        @click="toPathO(sysType === 'cz' ? '/ucenterCzWeb/#/home' : '/ucenterGhWeb/#/home')"
      >
        <i
          class="el-icon-s-home"
          title="工作平台"
        />
        工作平台
      </span>
      <!--<el-dropdown v-if="ifShowYear" class="right-item" trigger="click" @command="yearChange">-->
      <!--<span class="el-dropdown-link">-->
      <!--{{ year }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
      <!--</span>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<div class="app-el">-->
      <!--<el-dropdown-item v-for="(item, index) in $YEAR_LIST" :key="index" :command="item.value">{{ item.label }}</el-dropdown-item>-->
      <!--</div>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--<el-dropdown class="right-item" trigger="click" @command="orgChange">-->
      <!--<span class="el-dropdown-link">-->
      <!--{{ orgInfo.name || '' }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
      <!--</span>-->
      <!--<el-dropdown-menu slot="dropdown" popper-class="app-el">-->
      <!--<div class="app-el">-->
      <!--<el-dropdown-item v-for="(item, index) in orgList" :key="index" :command="item.phid">{{ item.name }}</el-dropdown-item>-->
      <!--</div>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <el-popover
        v-model="orgListVisible"
        class="org-choose"
        placement="top"
        width="400">
        <filter-block-tree
          v-if="orgListVisible"
          ref="FilterBlockTree"
          :has-callback="true"
          :check-strictly="true"
          :search-type="1"
          :user-id="$commonQueryParam.userId"
          :current-node="orgInfo"
          :current-node-id="orgInfo.phid"
          :first-url="'ucenterGh/org/getNowUserFirstOrg'"
          :filter-type="'single'"
          :expand-on-click-node="false"
          @handleNodeClick="orgChange"
        />
        <div slot="reference" class="choose-org-title">
          {{ orgName }}
          <i class="el-icon-arrow-down el-icon--right"/>
        </div>
      </el-popover>
      <el-dropdown class="right-item" trigger="click" @command="userChange">
        <span class="el-dropdown-link">
          <span><i class="el-icon-user" style="margin-right: 5px"/>{{ userInfo.userName }}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ThemePicker from '@/components/ThemePicker'
import FilterBlockTree from '@/components/FilterBlockTree'
import setting from '@/setting'
// import appCommonUtil from '@/utils/appCommonUtil'

export default {
  components: {
    Hamburger,
    ThemePicker,
    FilterBlockTree
  },
  data() {
    return {
      year: this.$commonQueryParam.year,
      orgListVisible: false,
      orgName: '',
      sysType: setting.sysType
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
      'orgInfo',
      'orgList'
    ]),
    ifShowYear() {
      return true
    },
    sysName() {
      return '支付中心'
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.orgName = this.orgInfo.name
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    userChange(command) {
      if (command === 'out') {
        // appCommonUtil.removeLoginAuth()
        // window.location.reload()
        this.$store.dispatch('Logout')
      }
    },
    yearChange(command) {
      this.year = command
      return this.$store.dispatch('setYear', parseInt(command)).then(() => {
        window.location.reload()
      })
    },
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
    toPath(path) {
      this.$router.push({
        path
      })
    },
    toPathO(path) {
      window.location = path
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
  background-size: cover;
  color: #ffffff;
  .hamburger-container {
    line-height: 65px;
    height: 55px;
    float: left;
    padding: 0 20px;
  }
  .breadcrumb-container{
    float: left;
  }
  .app-icon {
    height: 26px;
    vertical-align: middle;
  }
  .period {
    margin-left: 10px;
    font-size: 20px;
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
    &:focus{
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
    .international{
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

.infinite-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
