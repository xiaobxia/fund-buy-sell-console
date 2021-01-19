import { asyncRouterMap, constantRouterMap, asyncRouterMapWithRoles } from '@/router'
import permissionUtil from '@/utils/permission'
import router, { resetRouter } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    ifAdd: false,
    menuList: [],
    hasDefaultRouter: true
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      state.ifAdd = true
    },
    SET_MENU_LIST: (state, list) => {
      state.menuList = list
    },
    SET_HAS_DEFAULT: (state, flag) => {
      state.hasDefaultRouter = flag
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // role
        const roleRouter = permissionUtil.filterAsyncRouter(asyncRouterMapWithRoles, roles)
        // 暂时这个逻辑
        const menuRouter = permissionUtil.filterAsyncRouter(asyncRouterMap, roles)
        // const menuRouter = []
        commit('SET_ROUTERS', [...roleRouter, ...menuRouter])
        resolve()
      })
    },
    // 账本的路由权限
    generateBudgetRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menus } = data
        const menuList = []
        menus.forEach((item) => {
          if (item.moduleName === '预算') {
            menuList.push(item.permName)
          }
        })
        const menuRouter = permissionUtil.filterAsyncRouterWithMenu(asyncRouterMap, menuList)
        const result = [...menuRouter]
        // 重置
        resetRouter()
        // 添加
        router.addRoutes(result)
        commit('SET_ROUTERS', result)
        commit('SET_MENU_LIST', menuList)
        resolve()
      })
    },
    generateRoutesWithMenu({ commit }, data) {
      return new Promise(resolve => {
        const { menu } = data
        commit('SET_ROUTERS', permissionUtil.filterAsyncRouterWithMenu(asyncRouterMap, menu))
        resolve()
      })
    }
  }
}

export default permission
