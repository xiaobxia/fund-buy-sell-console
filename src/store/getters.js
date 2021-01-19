const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  // 标签
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 权限
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  menuList: state => state.permission.menuList,
  ifAddRouters: state => state.permission.ifAdd,
  hasDefaultRouter: state => state.permission.hasDefaultRouter,
  // 公共值
  bookList: state => state.common.bookList,
  bookInfo: state => state.common.bookInfo,
  orgList: state => state.common.orgList,
  orgInfo: state => state.common.orgInfo,
  orgTree: state => state.common.orgTree,
  orgPhids: state => state.common.orgPhids,
  departmentList: state => state.common.departmentList,
  financeConfig: state => state.common.financeConfig,
  userInfo: state => state.user.userInfo,
  assistList: state => state.common.assistList,
  bookStyleList: state => state.common.bookStyleList,
  subjectTree: state => state.common.subjectTree,
  subjectList: state => state.common.subjectList,
  subjectListLast: state => state.common.subjectListLast,
  currencyList: state => state.common.currencyList,
  sysParam: state => state.common.sysParam,
  certTypeList: state => state.common.certTypeList,
  settleList: state => state.common.settleList, // 结算方式
  userList: state => state.common.userList, // 组织下所有人员
  subList: state => state.common.subList, // 组织下所有科目
  accountList: state => state.common.accountList, // 用户下所有账户
  certList: state => state.common.certList, // 账本下的凭证
  foreignKeyList: state => state.common.foreignKeyList, // 获取出纳币别
  commonForeignKeyList: state => state.common.commonForeignKeyList, // 获取全部币别
  subjectScheme: state => state.common.subjectScheme,
  orgSubjectSchemeList: state => state.common.orgSubjectSchemeList,
  // 银行账户
  orgBankList: state => state.common.orgBankList,
  defaultOrgBank: state => state.common.defaultOrgBank,
  // 预算科目
  budgetSub: state => state.common.budgetSub
}
export default getters
