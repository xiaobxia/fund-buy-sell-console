<template>
  <div v-if="ifInit" :class="classObj" class="app-wrapper">
    <div class="main-container">
      <navbar/>
      <div class="container-bottom">
        <sidebar class="sidebar-container"/>
        <section class="app-main">
          <app-main/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import setting from '@/setting'
import theme from '@/utils/themeUtil'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      ifInit: false
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    key() {
      return this.$store.state.app.key
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  // 加入权限，直接刷界面，因为用户不一定由当前页的权限
  watch: {
    key() {
      this.refreshPage()
    }
  },
  created() {
    this.handleInitData()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    removeLogin() {
      setTimeout(() => {
        this.$store.dispatch('Logout')
      }, 1000)
    },
    handleInitData() {
      // 用户信息
      this.$store.dispatch('getUserInfo').then((res) => {
        this.getThemeList()
        return this.getOrgList(res.phid).then(() => {
          // 获取阶段
          if (setting.openMenuAuth) {
            return this.$http.get('ucenterGh/permission-entity/listByUserId', {
              userId: this.$commonQueryParam.phUserId,
              orgId: this.$commonQueryParam.orgId
            }).then((res) => {
              const menuList = res.data || []
              if (menuList.length === 0) {
                const msg = '用户操作权限，正在退出！'
                this.$message({
                  type: 'warning',
                  message: msg
                })
                this.removeLogin()
                throw new Error(msg)
              }
              this.$store.dispatch('generateBudgetRoutes', {
                menus: menuList
              }).then(() => {
                // 显示界面
                this.refreshPage()
              })
            })
          } else {
            // 显示界面
            this.refreshPage()
          }
        })
      }).catch((err) => {
        console.log(err)
        this.removeLogin()
      })
    },
    // 获取皮肤信息
    getThemeList() {
      const url = 'ucenter/skin/list'
      return this.$http.get(url).then(({ status, message, data }) => {
        if (status) {
          this.themeList = data
          this.setTheme()
        } else {
          this.$message.error(message)
        }
      }).catch(err => {
        console.log(err.message, 'err')
      })
    },
    // 设置主题
    setTheme() {
      const currentTheme = this.themeList.filter(item => item.status === 1)[0]
      const oldTheme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : {}
      const newTheme = {
        color: currentTheme.colour,
        colorId: currentTheme.phid,
        colorName: currentTheme.name,
        userName: this.userInfo.userName,
        userId: this.userInfo.phid
      }
      if (this.userInfo.phid === oldTheme.userId) { // 缓存的是当前用户的主题
        if (oldTheme.colorId === newTheme.colorId || !oldTheme.colorId) {
          theme.changeTheme(newTheme.color)
          !oldTheme.colorId && localStorage.setItem('theme', JSON.stringify(newTheme))
        } else {
          theme.changeTheme(newTheme.color, oldTheme.color)
          localStorage.setItem('theme', JSON.stringify(newTheme))
        }
      } else { // 缓存的不是当前用户的主题
        theme.changeTheme(newTheme.color)
        localStorage.setItem('theme', JSON.stringify(newTheme))
      }
    },
    // 查询用户组织
    getOrgList() {
      return this.$http.get(`ucenterGh/org/getNowUserFirstOrg`).then(({ data }) => {
        if (data.length === 0) {
          const msg = '用户无关联组织，正在退出！'
          this.$message({
            type: 'warning',
            message: msg
          })
          this.removeLogin()
          throw new Error(msg)
        }
        const orgList = [
          ...data
        ]
        return this.$store.dispatch('setOrgList', orgList).then(() => {
          // return this.$store.dispatch('setOrgInfo')
        })
      })
    },
    // 刷新界面
    refreshPage() {
      this.ifInit = false
      this.$nextTick(() => {
        this.ifInit = true
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .container-bottom {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-top: 55px;
    width: 100%;
    height: calc(100vh - 55px);

    .app-main {
      height: 100%;
      //position: absolute;
      padding: 10px 15px;
      overflow-y: scroll;
      flex: 1;
    }
  }
</style>
