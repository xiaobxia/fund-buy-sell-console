import Layout from '@/views/layout/Layout'

const basePath = '/contractManage'

export default [
  {
    path: `${basePath}/collectionManagement`,
    name: '收款合同',
    meta: { title: '收款合同', icon: 'icon-newgrand icon-newgrand-contract-skht', menu: '收款合同' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '收款合同-1',
        component: () => import('@/views/contractManagement/collectionManagement/index.vue'),
        meta: { title: '收款合同', menu: '收款合同--收款合同' }
      }
    ]
  },
  {
    path: `${basePath}/expandManagement`,
    name: '付款合同',
    meta: { title: '付款合同', icon: 'icon-newgrand icon-newgrand-contract-fkht', menu: '付款合同' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '付款合同-1',
        component: () => import('@/views/contractManagement/collectionManagement/index.vue'),
        meta: { title: '付款合同', menu: '付款合同--付款合同' }
      }
    ]
  },
  {
    path: `${basePath}/collectionPaymentManagement`,
    name: '收付款管理',
    meta: { title: '收付款管理', icon: 'icon-newgrand icon-newgrand-contract-sfkgl', menu: '收付款管理' },
    component: Layout,
    children: [
      {
        path: 'collectionManagement',
        name: '收款管理-1',
        component: () => import('@/views/collectionPaymentManagement/collectionManagement/index.vue'),
        meta: { title: '收款管理', menu: '收付款管理--收款管理' }
      },
      {
        path: 'payManagement',
        name: '付款管理-1',
        component: () => import('@/views/collectionPaymentManagement/payManagement/index.vue'),
        meta: { title: '付款管理', menu: '收付款管理--付款管理' }
      }
    ]
  },
  {
    path: `${basePath}/changeManagement`,
    name: '合同变更',
    meta: { title: '合同变更', icon: 'icon-newgrand icon-newgrand-contract-htbg', menu: '合同变更' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '合同变更-1',
        component: () => import('@/views/contractManagement/collectionChange/index.vue'),
        meta: { title: '合同变更', menu: '合同变更--合同变更' }
      }
    ]
  },
  {
    path: `${basePath}/bond`,
    name: '保证金管理',
    meta: { title: '保证金管理', icon: 'icon-newgrand icon-newgrand-contract-htbg' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '保证金管理-1',
        component: () => import('@/views/contractManagement/bond/index.vue'),
        meta: { title: '保证金管理' }
      }
    ]
  },
  {
    path: `${basePath}/standingBook`,
    name: '合同台账',
    meta: { title: '合同台账', icon: 'icon-newgrand icon-newgrand-contract-htbg' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '合同台账-1',
        component: () => import('@/views/contractManagement/standingBook/index.vue'),
        meta: { title: '合同台账' }
      }
    ]
  },
  {
    path: `${basePath}/baseSetting`,
    name: '基础设置-合同',
    meta: { title: '基础设置', icon: 'icon-newgrand icon-newgrand-contract-htbg' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '基础设置-合同-1',
        component: () => import('@/views/contractManagement/baseSetting/index.vue'),
        meta: { title: '基础设置' }
      }
    ]
  }
]

