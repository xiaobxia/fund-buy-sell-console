<template>
  <div v-if="!item.hidden&&item.children&&((sysConfig&&item.sysConfig)||(!sysConfig&&!item.sysConfig))" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" @click="toggleSideBar">
          <template v-if="onlyOneChild.meta">
            <i v-if="onlyOneChild.meta.icon||item.meta.icon" :class="onlyOneChild.meta.icon||item.meta.icon" style="margin-right: 5px; width: 16px"/>
            <span slot="title" >{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template v-if="item.meta" slot="title">
        <i v-if="item.meta.icon" :class="item.meta.icon" style="margin-right: 5px; width: 16px"/>
        <span v-if="item.meta && !isCollapse" slot="title">{{ item.meta.title }}</span>
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)" @click="toggleSideBar">
            <template v-if="child.meta">
              <i v-if="child.meta.icon" :class="child.meta.icon" style="margin-right: 5px; width: 16px"/>
              <span slot="title">{{ child.meta.title }}</span>
            </template>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    sysConfig() {
      return !!this.$route.meta.sysConfig
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    toggleSideBar() {
      // this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
<style rel="stylesheet">
  .openSidebar /deep/ .el-menu-item-group__title {
    padding: 0;
  }
</style>
