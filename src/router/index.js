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
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'fas fa-tachometer-alt', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: {
      title: '管理员',
      icon: 'fas fa-user',
      roles: { include: ['admin'] }
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: { title: '管理员列表', roles: { include: ['admin'] }}
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/viewLog',
    name: 'Customer',
    meta: {
      title: '用户',
      icon: 'fas fa-database',
      roles: { include: ['admin'] }
    },
    children: [
      {
        path: 'edit/:id',
        component: () => import('@/views/customer/edit'),
        name: 'CustomerDetail',
        meta: { title: '编辑用户', noCache: true, roles: { include: ['admin'] }},
        hidden: true
      },
      {
        path: 'customer',
        component: () => import('@/views/customer/customer'),
        name: 'CustomerList',
        meta: { title: '注册用户', roles: { include: ['admin'] }}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
