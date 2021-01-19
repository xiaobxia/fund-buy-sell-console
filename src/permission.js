import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import storageUtil from '@/utils/storageUtil'
import authUtil from '@/utils/authUtil'
import appCommonUtil from '@/utils/appCommonUtil'
import setting from '@/setting'

NProgress.configure({ showSpinner: false })

const beforeEach = (to, from, next) => {
  const token = authUtil.getToken()
  const userInfo = storageUtil.getData('userInfo') || {}
  if (token && userInfo.phid) {
    // 没有生成过
    if (store.getters.ifAddRouters) {
      next()
    } else {
      const roles = userInfo.userType || ''
      store.dispatch('generateRoutes', { roles: [roles] }).then(() => {
        // console.log('生成菜单')
        // router里面原本只有基础的路由，是后来添加的有权限的路由
        console.log(store.getters.addRouters)
        router.addRoutes(store.getters.addRouters)
        next({ ...to, replace: true })
      })
    }
    // 没有必要检查了，没有的会直接404
    // if (permissionUtil.checkPermission(userInfo.roles, to)) {
    // } else {
    //   next({ path: '/401', replace: true, query: { noGoBack: true }})
    // }
  } else {
    // 直接进入
    if (to.meta && to.meta.auth === false) {
      next()
    } else {
      NProgress.done()
      // 开发环境跳本项目
      if (process.env.NODE_ENV === 'development') {
        next(`/login`)
      } else {
        if (process.env.ENV_CONFIG === 'ms') {
          window.location = setting.msLogoutUrl
          // 预留位，给民银行单点登录使用
        } else {
          window.location = appCommonUtil.backToAppLogin(`/${setting.userCenterName}/#/start`)
        }
      }
    }
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log('beforeEach')
  // console.log('from', from)
  // console.log('to', to)
  const queryToken = to.query.token
  if (queryToken) {
    // 银行单点登录，token从url传入
    window._token = queryToken
    appCommonUtil.setLoginToken(queryToken)
    store.dispatch('getUserInfo').then(() => {
      beforeEach(to, from, next)
    })
  } else {
    // 正常情况下
    beforeEach(to, from, next)
  }
})

router.afterEach((to, from) => {
  // console.log('afterEach')
  // console.log(from)
  // console.log(to)
  NProgress.done() // finish progress bar
})
