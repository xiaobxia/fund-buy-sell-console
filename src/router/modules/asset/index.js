import Layout from '@/views/layout/Layout'

const basePath = '/asset'

export default [
  {
    path: `${basePath}/resList`,
    name: '资源列表',
    meta: { title: '资源列表', icon: 'el-icon-document', menu: '资源列表' },
    component: Layout,
    children: [{
      path: 'resTable',
      name: '资源列表-1',
      component: () => import('@/views/asset/resList/resTable.vue'),
      meta: { title: '资源列表', menu: '资源列表--资源列表' }
    }]
  },
  {
    path: `${basePath}/resManage`,
    name: '资源经营',
    meta: { title: '资源经营', icon: 'el-icon-s-cooperation', menu: '资源经营' },
    component: Layout,
    children: [{
      path: 'resTable',
      name: '资源经营-1',
      component: () => import('@/views/asset/resManage/resManageTable.vue'),
      meta: { title: '资源经营', menu: '资源经营--资源经营' }
    }]
  },
  {
    path: `${basePath}/assetSetting`,
    name: '资源设置',
    meta: { title: '资源设置', icon: 'el-icon-setting', menu: '资源设置' },
    component: Layout,
    children: [
      {
        path: 'assetCode',
        name: '资源条码',
        component: () => import('@/views/asset/assetSetting/assetCode.vue'),
        meta: { title: '资源条码', menu: '资源设置--资源条码' }
      },
      {
        path: 'measurement',
        name: '计量单位',
        component: () => import('@/views/asset/assetSetting/measurement.vue'),
        meta: { title: '计量单位', menu: '资源设置--计量单位' }
      },
      // {
      //   path: 'funding',
      //   name: '资金来源',
      //   component: () => import('@/views/asset/assetSetting/funding.vue'),
      //   meta: { title: '资金来源', menu: '资源设置--资金来源' }
      // },
      {
        path: 'assetClassify',
        name: '资源类别',
        component: () => import('@/views/asset/assetSetting/assetClassify.vue'),
        meta: { title: '资源类别', menu: '资源设置--资源类别' }
      }
    ]
  }
]
