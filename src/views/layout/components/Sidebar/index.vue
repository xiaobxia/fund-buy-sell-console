<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
    >
      <sidebar-item
        v-for="(route, index) in routers"
        :key="route.path + index"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

// 是不是业务菜单
function isBusinessMenu(path) {
  const start = ['/contractManage/', '/assetsManage/', '/asset/']
  for (let i = 0; i < start.length; i++) {
    if (path.indexOf(start[i]) === 0) {
      return true
    }
  }
  return false
}

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    sysConfig() {
      return !!this.$route.meta.sysConfig
    },
    routers() {
      // 区分合同、资产、资源
      const basePath = this.$route.path.split('/')[1]
      let subPermissionRouters = []
      this.permission_routers.forEach((item) => {
        if (isBusinessMenu(item.path)) {
          if (item.path.startsWith(`/${basePath}/`)) {
            subPermissionRouters.push(item)
          }
        } else {
          subPermissionRouters.push(item)
        }
      })
      if (process.env.NODE_ENV === 'development') {
        // 开发环境全量显示
        subPermissionRouters = this.permission_routers
      } else {
        // 上线后显示对应模块
      }
      return subPermissionRouters
    }
  }
}
</script>
