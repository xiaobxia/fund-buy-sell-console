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
    name: '用户列表',
    meta: { title: '用户列表', icon: 'el-icon-user' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '用户列表-1',
        component: () => import('@/views/userList/index.vue'),
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: `/log`,
    name: '日志记录',
    meta: { title: '日志记录', icon: 'el-icon-printer' },
    component: Layout,
    children: [
      {
        path: 'emailSendLog',
        name: '邮件记录-1',
        component: () => import('@/views/log/emailSendLog.vue'),
        meta: { title: '邮件记录' }
      },
      {
        path: 'invitationLog',
        name: '邀请记录-1',
        component: () => import('@/views/log/invitationLog.vue'),
        meta: { title: '邀请记录' }
      },
      {
        path: 'feedback',
        name: '意见反馈-1',
        component: () => import('@/views/log/feedback.vue'),
        meta: { title: '意见反馈' }
      }
    ]
  },
  {
    path: `/indexRisk`,
    name: '指数风险',
    meta: { title: '指数风险', icon: 'el-icon-light-rain' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '指数风险-1',
        component: () => import('@/views/indexRisk/index.vue'),
        meta: { title: '指数风险' }
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
