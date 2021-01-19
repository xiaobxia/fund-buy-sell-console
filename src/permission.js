import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import storageUtil from '@/utils/storageUtil'
import authUtil from '@/utils/authUtil'

NProgress.configure({ showSpinner: false })

const beforeEach = (to, from, next) => {
  const token = authUtil.getToken()
  const userInfo = storageUtil.getData('userInfo') || {}
  if (token && userInfo._id) {
    if (store.getters.ifAddRouters) {
      next()
    } else {
      store.dispatch('generateRoutes', { roles: [''] }).then(() => {
        // console.log('生成菜单')
        // router里面原本只有基础的路由，是后来添加的有权限的路由
        console.log(store.getters.addRouters)
        router.addRoutes(store.getters.addRouters)
        next({ ...to, replace: true })
      })
    }
  } else {
    // 直接进入
    if (to.meta && to.meta.auth === false) {
      next()
    } else {
      NProgress.done()
      // 开发环境跳本项目
      next(`/login`)
    }
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log('beforeEach')
  // console.log('from', from)
  // console.log('to', to)
  beforeEach(to, from, next)
})

router.afterEach((to, from) => {
  // console.log('afterEach')
  // console.log(from)
  // console.log(to)
  NProgress.done() // finish progress bar
})
