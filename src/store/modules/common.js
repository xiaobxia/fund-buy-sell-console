import Http from '@/utils/httpUtil'
import storageUtil from '@/utils/storageUtil'
import Vue from 'vue'
const orgInfo = storageUtil.getData('orgInfo') || storageUtil.getData('userInfo').orgInfo
// 扁平科目
function createSubjectList(listRaw, list) {
  list = list || []
  for (let i = 0; i < listRaw.length; i++) {
    const item = listRaw[i]
    list.push({
      phid: item.phid,
      parentId: item.parentId,
      encode: item.encode,
      name: item.name,
      subType: item.subType,
      balanceType: item.balanceType,
      foreignCheck: item.foreignCheck,
      assistCheck: item.assistCheck,
      amountCheck: item.amountCheck,
      subAstTypeVOList: item.subAstTypeVOList || [],
      subForTypeVOList: item.subForTypeVOList || []
    })
    if (item.childList && item.childList.length > 0) {
      createSubjectList(item.childList, list)
    }
  }
  return list
}

// 扁平科目末级
function createSubjectListLast(listRaw, list) {
  list = list || []
  for (let i = 0; i < listRaw.length; i++) {
    const item = listRaw[i]
    if (item.childList && item.childList.length > 0) {
      // 有子级
      createSubjectListLast(item.childList, list)
    } else {
      // 不在有子级了
      list.push({
        phid: item.phid,
        parentId: item.parentId,
        encode: item.encode,
        name: item.name,
        subType: item.subType,
        balanceType: item.balanceType,
        foreignCheck: item.foreignCheck,
        assistCheck: item.assistCheck,
        amountCheck: item.amountCheck,
        subAstTypeVOList: item.subAstTypeVOList || [],
        subForTypeVOList: item.subForTypeVOList || []
      })
    }
  }
  return list
}

const common = {
  state: {
    bookList: [],
    bookInfo: {},
    orgList: [],
    orgPhids: [],
    orgInfo: orgInfo || {},
    orgTree: [],
    departmentList: [],
    financeConfig: {
      // 主管
      cfoId: '',
      cfoName: '',
      // 审核
      verifyId: '',
      verifyName: '',
      // 制单
      creatId: '',
      creatName: '',
      // 出纳
      cashId: '',
      cashName: ''
    },
    bookStyleList: [],
    subjectTree: [],
    subjectHasAss: [],
    subjectList: [],
    subjectListHasAss: [],
    // 凭证类型
    certTypeList: [],
    settleList: [], // 结算方式
    userList: [], // 组织下所有人员
    subList: [], // 所有科目
    accountList: [], // 当前用户不同类型的所有账号
    certList: [], // 当前账本下的凭证
    foreignKeyList: [], // 币别列表(仅出纳)
    commonForeignKeyList: [], // 币别列表(除出纳外)
    // 末级科目
    subjectListLast: [],
    subjectListLastHasAss: [],
    currencyList: [],
    assistList: [],
    sysParam: {},
    // 科目方案
    subjectScheme: {},
    orgSubjectSchemeList: [],
    // 银行账户
    orgBankList: [],
    defaultOrgBank: {},
    // 预算科目
    budgetSub: []
  },
  mutations: {
    SET_ORG_LIST: (state, list) => {
      state.orgList = list
      state.orgPhids = list.map((item) => {
        return item.phid
      })
    },
    SET_ORG_INFO: (state, orgInfo) => {
      state.orgInfo = orgInfo
    },
    SET_BOOK_LIST: (state, list) => {
      state.bookList = list
    },
    SET_BOOK_INFO: (state, bookInfo) => {
      state.bookInfo = bookInfo
    },
    SET_FINANCE_CONFIG: (state, config) => {
      state.financeConfig = {
        ...state.financeConfig,
        ...config
      }
    },
    SET_BOOK_STYLE_LIST: (state, info) => {
      state.bookStyleList = info
    },
    SET_SUBJECT_TREE: (state, info) => {
      state.subjectTree = info
    },
    SET_SUBJECT_LIST: (state, info) => {
      state.subjectList = info
    },
    SET_SETTLE_LIST: (state, info) => {
      state.settleList = info
    },
    SET_SUBJECT_LIST_LAST: (state, info) => {
      state.subjectListLast = info
    },
    SET_CURRENCY_LIST: (state, info) => {
      state.currencyList = info
    },
    SET_CERT_TYPE_LIST: (state, info) => {
      state.certTypeList = info
    },
    SET_ASSIST_LIST: (state, info) => {
      state.assistList = info
    },
    SET_SYS_PARAM: (state, info) => {
      state.sysParam = info
    },
    SET_USER_LIST: (state, info) => {
      state.userList = info
    },
    SET_SUB_LIST: (state, info) => {
      state.subList = info
    },
    SET_ACCOUNT_LIST: (state, info) => {
      state.accountList = info
    },
    SET_CERT_LIST: (state, info) => {
      state.certList = info
    },
    SET_FOREIGNKEY_LIST: (state, info) => {
      state.foreignKeyList = info
    },
    SET_COMMONFOREIGNKEY_LIST: (state, info) => {
      state.commonForeignKeyList = info
    },
    SET_SUBJECT_SCHEME: (state, info) => {
      state.subjectScheme = info
    },
    SET_ORG_SUBJECT_SCHEME_LIST: (state, info) => {
      state.orgSubjectSchemeList = info
    },
    SET_ORG_TREE: (state, info) => {
      state.orgTree = info
    },
    SET_DEPARTMENT_LIST: (state, info) => {
      state.departmentList = info
    },
    SET_ORG_BANK_INFO: (state, info) => {
      console.log(info)
      state.orgBankList = info[0] || []
      state.defaultOrgBank = info[1] || {}
    },
    SET_BudgetSub: (state, info) => {
      state.budgetSub = info
    }
  },
  actions: {
    setBookList({ commit }, list) {
      commit('SET_BOOK_LIST', list)
    },
    setBookInfo({ commit, state }, phid) {
      if (state.bookList.length === 0) {
        if (phid) {
          storageUtil.setData('appConfig', 'bookId', phid)
        }
        return false
      }
      let id = ''
      let bookInfo = null
      // 有传入就用传入的id
      if (phid) {
        id = phid
      } else {
        // 没有就用之前设置的
        const bookId = storageUtil.getData('appConfig', 'bookId')
        if (bookId) {
          id = bookId
        }
      }
      // 通过id找账本
      if (id) {
        for (let i = 0; i < state.bookList.length; i++) {
          if (state.bookList[i].phid === id) {
            bookInfo = state.bookList[i]
            break
          }
        }
      }
      // 发现找不到就用主账本
      if (!bookInfo) {
        bookInfo = state.bookList[0] || {}
      }
      const nowPeriod = bookInfo.nowPeriod
      if (nowPeriod) {
        const value = nowPeriod.split('-')
        bookInfo.year = value[0]
        bookInfo.month = value[1]
      }
      // 设置记录
      storageUtil.setData('appConfig', 'bookId', bookInfo.phid)
      Vue.prototype.$commonQueryParam = {
        ...(Vue.prototype.$commonQueryParam || {}),
        bookId: bookInfo.phid,
        year: bookInfo.year,
        month: bookInfo.month
      }
      commit('SET_BOOK_INFO', bookInfo)
      commit('SET_FINANCE_CONFIG', {
        // 主管
        cfoId: '1', // 未来废弃，永远传1
        cfoName: bookInfo.defTreasurerName || '',
        // 出纳
        cashId: '1', // 未来废弃，永远传1
        cashName: bookInfo.defCashierName || '',
        // 制单人，自己
        creatId: Vue.prototype.$commonQueryParam.phUserId || '',
        creatName: Vue.prototype.$commonQueryParam.phCreator || ''
      })
      return bookInfo
    },
    setOrgList({ commit, state }, list) {
      commit('SET_ORG_LIST', list)
    },
    // setOrgInfo({ commit, state }, phid) {
    //   if (state.orgList.length === 0) {
    //     return false
    //   }
    //   let id = ''
    //   let orgInfo = null
    //   // 有传入就用传入的id
    //   if (phid) {
    //     id = phid
    //   } else {
    //     // 没有就用之前设置的
    //     const orgId = storageUtil.getData('appConfig', 'orgId')
    //     if (orgId) {
    //       id = orgId
    //     }
    //   }
    //   // 通过id找
    //   if (id) {
    //     for (let i = 0; i < state.orgList.length; i++) {
    //       if (state.orgList[i].phid === id) {
    //         orgInfo = state.orgList[i]
    //         break
    //       }
    //     }
    //   }
    //   // 发现找不到就用第一个
    //   if (!orgInfo) {
    //     orgInfo = state.orgList[0] || {}
    //   }
    //   // 设置记录
    //   storageUtil.setData('appConfig', 'orgId', orgInfo.phid)
    //   Vue.prototype.$commonQueryParam = {
    //     ...(Vue.prototype.$commonQueryParam || {}),
    //     phCurorgid: orgInfo.phid,
    //     // 未来将废除的字段
    //     orgId: orgInfo.phid,
    //     orgCode: orgInfo.encode,
    //     orgName: orgInfo.name
    //   }
    //   commit('SET_ORG_INFO', orgInfo)
    //   return orgInfo
    // },
    setOrgInfo({ commit, state }, orgInfo) {
      // 设置记录
      storageUtil.setData('appConfig', 'orgId', orgInfo.phid)
      storageUtil.setData('orgInfo', orgInfo)
      Vue.prototype.$commonQueryParam = {
        ...(Vue.prototype.$commonQueryParam || {}),
        // 未来将废除的字段
        orgId: orgInfo.phid,
        orgName: orgInfo.name,
        orgCode: orgInfo.encode
      }
      commit('SET_ORG_INFO', orgInfo)
    },
    setYear({ commit, state }, year) {
      // 设置记录
      storageUtil.setData('appConfig', 'year', year)
      Vue.prototype.$commonQueryParam = {
        ...(Vue.prototype.$commonQueryParam || {}),
        year: year
      }
    },
    // 初始化组织树数据
    initOrgTree({ commit, state }, query) {
      return Http.get('ucenterGh/org/tree').then(res => {
        commit('SET_ORG_TREE', res.data || [])
        return res.data
      }).catch(() => {
      })
    },
    // 初始化部门数据
    initDepartmentList({ commit, state }, query) {
      query = query || {}
      return Http.get('ucenterGh/dept/listDept', {
        ...query
      }).then(res => {
        commit('SET_DEPARTMENT_LIST', res || [])
        return res.data
      }).catch(() => {
      })
    },
    // 初始化账本类型
    initBookStyleList({ commit, state }, query) {
      query = query || {}
      return Http.get('ucenterGh/dict-data/getBookStyle', {
        ...query
      }).then(res => {
        commit('SET_BOOK_STYLE_LIST', res.data || [])
        return res.data
      }).catch(() => {
      })
    },
    // 初始化科目数据
    initSubjectTree({ commit, state }, query) {
      return Http.post('account/subject/getSubListBySubType', {
        ...query,
        isOnlyPublic: 0,
        subType: 'all',
        schemeId: state.bookInfo.schemeId || ''
      }).then(res => {
        commit('SET_SUBJECT_TREE', res.data || [])
        commit('SET_SUBJECT_LIST', createSubjectList(res.data))
        commit('SET_SUBJECT_LIST_LAST', createSubjectListLast(res.data))
        return res.data
      }).catch(() => {
      })
    },
    // 初始化外币数据
    initCurrencyList({ commit, state }, query) {
      query = query || {}
      return Http.post('account/subject/forCurr', {
        ...query,
        name: '外币设置'
      }).then(res => {
        commit('SET_CURRENCY_LIST', res.data || [])
        return res.data
      }).catch(() => {
      })
    },
    // 初始化辅助项数据
    initAssistList({ commit, state }, query) {
      query = query || {}
      return Http.post('account/subject/ass', {
        ...query,
        name: '核算类型'
      }).then(res => {
        commit('SET_ASSIST_LIST', res.data || [])
        return res.data
      })
    },
    // 初始化系统参数数据
    initSysParam({ commit, state }, query) {
      query = query || {}
      return Http.get('account/sysparam/info', {
        ...query
      }).then(res => {
        commit('SET_SYS_PARAM', res.data || {})
        return res.data
      })
    },
    // 凭证类型
    initCertTypeList({ commit, state }, query) {
      query = query || {}
      return Http.get('account/certType/listDtlByBookId', {
        bookId: query.bookId
      })
        .then(res => {
          commit('SET_CERT_TYPE_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_CERT_TYPE_LIST', [])
        })
    },
    // 初始化结算方式
    initSettleList({ commit, state }, query) {
      query = query || {}
      return Http.post('account/cashAccount/findSetType', {
        ...query
      })
        .then(res => {
          commit('SET_SETTLE_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_SETTLE_LIST', [])
        })
    },
    // 初始化组织下的所有人员
    initUserList({ commit, state }, query) {
      query = query || ''
      return Http.get(`account/cashAccount/findAllUser/${query}`)
        .then(res => {
          commit('SET_USER_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_USER_LIST', [])
        })
    },
    // 初始化组织下的所有科目
    initSubList({ commit, state }, query) {
      query = query || {}
      return Http.post('account/cashAccount/getAllSubByFeature', { ...query })
        .then(res => {
          commit('SET_SUB_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_SUB_LIST', [])
        })
    },
    // 初始化当前用户不同类型的所有账号
    initAccountList({ commit, state }, query) {
      query = query || {}
      return Http.post('account/cashAccount/listAllByType', { ...query })
        .then(res => {
          commit('SET_ACCOUNT_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_ACCOUNT_LIST', [])
        })
    },
    // 初始化当前账本下的所有凭证
    initCertList({ commit, state }, query) {
      query = query || ''
      return Http.get(`account/cert/getCertWord/${query}/1`)
        .then(res => {
          commit('SET_CERT_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_CERT_LIST', [])
        })
    },
    // 获得所有账号的币别（所有币别，仅出纳模块使用）
    initAllForeignKeyList({ commit, state }, query) {
      query = query || ''
      return Http.get(`account/cashAccount/findAllForKey/${query}`)
        .then(res => {
          commit('SET_FOREIGNKEY_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_FOREIGNKEY_LIST', [])
        })
    },
    // 获得所有账号的币别（所有币别，除出纳模块使用）
    initCommonForeignKeyList({ commit, state }, query) {
      query = query || ''
      return Http.post(`account/baseData/foreignKeyListNoPage`, query)
        .then(res => {
          commit('SET_COMMONFOREIGNKEY_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_COMMONFOREIGNKEY_LIST', [])
        })
    },
    // 根据出纳账号Id查询出纳账里的币别（query: cashId ，仅出纳模块使用）
    initForeignKeyListByCashId({ commit, state }, query) {
      query = query || ''
      return Http.get(`account/cashAccount/findCurrency/${query}`)
        .then(res => {
          commit('SET_FOREIGNKEY_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_FOREIGNKEY_LIST', [])
        })
    },
    // 根据科目id查询对应币别(query: subId)
    initForeignKeyListBySubId({ commit, state }, query) {
      query = query || ''
      return Http.get(`account/cashAccount/getKeyBySubId/${query}`)
        .then(res => {
          commit('SET_FOREIGNKEY_LIST', res.data || [])
          return res.data
        })
        .catch(() => {
          commit('SET_FOREIGNKEY_LIST', [])
        })
    },
    // 初始化科目方案数据
    initSubjectScheme({ commit, state }, query) {
      return Http.get('account/subScheme/findById', {
        ...query
      }).then(res => {
        commit('SET_SUBJECT_SCHEME', res.data)
        return res.data
      }).catch(() => {
      })
    },
    // 初始化组织科目方案数据
    initOrgSubjectSchemeList({ commit, state }, query) {
      return Http.get('account/HsOrgScheme/findSchemeByOrgId', {
        ...query
      }).then(res => {
        commit('SET_ORG_SUBJECT_SCHEME_LIST', res.data)
        return res.data
      }).catch(() => {
      })
    },
    // 获取业务线
    getAdjustReaseonList({ commit, state }, query) {
      return Http.get('budget/MsYsDictDtl/findAllByCondition', {
        orgId: query.orgId,
        type: 'adjustReason',
        year: query.year
      }).then((res) => {
      })
    },
    getOrgBankList({ commit, state }, query) {
      return Promise.all([
        Http.get('ucenterGh/bankInformation/findByOrgIdAndState', {
          orgId: query.orgId
        }),
        Http.get('ucenterGh/bankInformation/getDefaultBankInformation', {
          orgId: query.orgId
        })
      ]).then((resList) => {
        // console.log(resList)
        commit('SET_ORG_BANK_INFO', [resList[0].data || [], resList[1].data || {}])
      })
    },
    getBudgetSub({ commit, state }, query) {
      return Http.get('accountGh/subject/findSub', {
        ...query
      }).then((res) => {
        commit('SET_BudgetSub', res.data || [])
      })
    }
  }
}

export default common
