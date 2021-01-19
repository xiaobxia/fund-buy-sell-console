import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

// 都有的路由
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      auth: false
    }
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    hidden: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true,
    meta: {
      auth: false
    }
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    // 可以被重设
    redirect: '/userList/index'
  }
]

export const asyncRouterMapWithRoles = [
]

export const asyncRouterMap = [
  {
    path: `/userList`,
    name: '下级银行档案',
    meta: { title: '下级银行档案', icon: 'icon-newgrand icon-newgrand-pc-yhda' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '下级银行档案-1',
        component: () => import('@/views/payPlatform/index.vue'),
        meta: { title: '下级银行档案' }
      }
    ]
  },
  {
    path: `/bankDoc`,
    name: '下级银行档案',
    meta: { title: '下级银行档案', icon: 'icon-newgrand icon-newgrand-pc-yhda' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '下级银行档案-1',
        component: () => import('@/views/bankDoc/index.vue'),
        meta: { title: '下级银行档案' }
      }
    ]
  },
  {
    path: `/payPlatform`,
    name: '支付平台',
    meta: { title: '支付平台', icon: 'icon-newgrand icon-newgrand-pc-zfpt' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '支付平台-1',
        component: () => import('@/views/payPlatform/index.vue'),
        meta: { title: '支付平台' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => {
  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
