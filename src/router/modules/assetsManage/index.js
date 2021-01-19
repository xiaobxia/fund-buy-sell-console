import Layout from '@/views/layout/Layout'

const basePath = '/assetsManage'
export default [
  {
    path: `${basePath}/assetsCard`,
    name: '资产卡片',
    meta: { title: '资产卡片', icon: 'el-icon-tickets' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资产卡片-1',
        component: () =>
          import('@/views/assetsManage/assetsCard/index.vue'),
        meta: { title: '资产卡片' }
      }
    ]
  },
  {
    path: `${basePath}/assetsChange`,
    name: '资产变动',
    meta: { title: '资产变动', icon: 'el-icon-edit-outline' },
    component: Layout,
    children: [
      {
        path: 'scrap',
        name: '资产报废',
        component: () =>
          import('@/views/assetsManage/assetsChange/scrap.vue'),
        meta: { title: '资产报废' }
      },
      {
        path: 'damage',
        name: '资产毁损',
        component: () =>
          import('@/views/assetsManage/assetsChange/damage.vue'),
        meta: { title: '资产毁损' }
      },
      {
        path: 'donation',
        name: '资产捐赠转出',
        component: () =>
          import('@/views/assetsManage/assetsChange/donation.vue'),
        meta: { title: '资产捐赠转出' }
      },
      {
        path: 'loss',
        name: '资产盘亏',
        component: () =>
          import('@/views/assetsManage/assetsChange/loss.vue'),
        meta: { title: '资产盘亏' }
      },
      {
        path: 'tansfer',
        name: '资产转让',
        component: () =>
          import('@/views/assetsManage/assetsChange/tansfer.vue'),
        meta: { title: '资产转让' }
      },
      {
        path: 'mortgage',
        name: '抵押、质押',
        component: () =>
          import('@/views/assetsManage/assetsChange/mortgage.vue'),
        meta: { title: '抵押、质押' }
        // },
        // {
        //   path: "other",
        //   name: "其他",
        //   component: () =>
        //     import("@/views/assetsManage/assetsChange/other.vue"),
        //   meta: { title: "其他" }
      }
    ]
  },
  {
    path: `${basePath}/assetDepreciate`,
    name: '资产折旧',
    meta: {
      title: '资产折旧',
      icon: 'el-icon-sell',
      noCache: true,
      menu: '资产折旧'
    },
    component: Layout,
    children: [
      {
        path: 'depreciation',
        name: '资产折旧-1',
        component: () => import('@/views/assetsManage/assetDepreciate/index.vue'),
        meta: {
          title: '资产折旧',
          noCache: true,
          menu: '资产折旧--资产折旧'
        }
      }
    ]
  },
  {
    path: `${basePath}/assetInventory`,
    name: '资产盘点',
    meta: {
      title: '资产盘点',
      icon: 'el-icon-c-scale-to-original',
      noCache: true,
      menu: '资产盘点'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资产盘点-1',
        component: () => import('@/views/assetsManage/Inventory/index.vue'),
        meta: {
          title: '资产盘点',
          noCache: true,
          menu: '资产盘点--资产盘点'
        }
      },
      {
        path: 'progress',
        name: '盘点单进展',
        component: () =>
          import('@/views/assetsManage/Inventory/progress.vue'),
        meta: {
          title: '盘点单进展',
          noCache: true,
          menu: '资产盘点--盘点单进展'
        },
        hidden: true
      }
    ]
  },
  {
    path: `${basePath}/assetsTable`,
    name: '资产报表',
    meta: { title: '资产报表', icon: 'el-icon-document-copy', menu: '资产报表' },
    component: Layout,
    children: [
      {
        path: 'assetsSpecification',
        name: '资产分类明细表',
        component: () =>
          import('@/views/assetsManage/assetsTable/assetsSpecification.vue'),
        meta: { title: '资产分类明细表' }
      },
      {
        path: 'assetsDetail',
        name: '资产折旧明细表',
        component: () =>
          import('@/views/assetsManage/assetsTable/assetsDetail.vue'),
        meta: { title: '资产折旧明细表' }
      }
    ]
  },
  {
    path: `${basePath}/assetSetting`,
    name: '资产设置',
    meta: {
      title: '资产设置',
      icon: 'el-icon-setting',
      noCache: true,
      menu: '资产设置'
    },
    component: Layout,
    children: [
      {
        path: 'assetsSort',
        name: '资产分类',
        component: () =>
          import('@/views/assetsManage/assetsSetting/assetsSort.vue'),
        meta: {
          title: '资产分类',
          noCache: true,
          menu: '资产设置--资产分类'
        }
      },
      {
        path: 'assetsField',
        name: '资产字段',
        component: () =>
          import('@/views/assetsManage/assetsSetting/assetsField.vue'),
        meta: {
          title: '资产字段',
          noCache: true,
          menu: '资产设置--资产字段'
        }
      },
      {
        path: 'assetsBarCode',
        name: '资产条码',
        component: () =>
          import('@/views/assetsManage/assetsSetting/assetsBarCode.vue'),
        meta: {
          title: '资产条码',
          noCache: true,
          menu: '资产设置--资产条码'
        }
      },
      {
        path: 'assetsRunPeriod',
        name: '资产启用期间',
        component: () =>
          import('@/views/assetsManage/assetsSetting/assetsRunPeriod.vue'),
        meta: {
          title: '资产启用期间',
          noCache: true,
          menu: '资产设置--资产启用期间'
        }
      },
      // {
      //   path: 'changeType',
      //   name: '变动类型',
      //   component: () =>
      //     import('@/views/assetsManage/assetsSetting/changeType.vue'),
      //   meta: {
      //     title: '变动类型',
      //     noCache: true,
      //     menu: '资产设置--变动类型'
      //   }
      // }
      {
        path: 'measurement',
        name: '资产计量单位',
        component: () => import('@/views/asset/assetSetting/measurement.vue'),
        meta: { title: '资产计量单位' }
      },
      {
        path: 'funding',
        name: '资金来源',
        component: () => import('@/views/asset/assetSetting/funding.vue'),
        meta: { title: '资金来源' }
      }
    ]
  }
]
