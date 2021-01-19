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
    handleInitData() {
      this.refreshPage()
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
