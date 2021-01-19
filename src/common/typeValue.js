// 基于常量的选择框数据，列表数据格式化
function findLabel(list, value) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.value === value) {
      return item.label
    }
  }
  return ''
}
// 根据数组生成枚举 { [value]: [label] }
function generateEnumObject(list) {
  return list.reduce(
    (init, cur) => ({ ...init, [cur.value]: cur.label }),
    {}
  )
}
// 年份
const YEAR_LIST = [
]
for (let i = 0; i < 51; i++) {
  const year = i + 2000
  YEAR_LIST.push({ value: year, label: year + '' })
}
// 月份
const MONTH_LIST = [
]
for (let i = 0; i < 12; i++) {
  const month = i + 1
  MONTH_LIST.push({ value: month, label: month + '' })
}
// 月份
const MONTH_NAME_LIST = [
  { value: 1, label: '一' },
  { value: 2, label: '二' },
  { value: 3, label: '三' },
  { value: 4, label: '四' },
  { value: 5, label: '五' },
  { value: 6, label: '六' },
  { value: 7, label: '七' },
  { value: 8, label: '八' },
  { value: 9, label: '九' },
  { value: 10, label: '十' },
  { value: 11, label: '十一' },
  { value: 12, label: '十二' }
]
// 运算类型
const OPERATION_TYPE_LIST = [
  { value: '+', label: '+' },
  { value: '-', label: '-' }
]
// 取数规则类型
const FETCH_NUMBER_TYPE_LIST = [
  { value: '余额', label: '余额' },
  { value: '借方余额', label: '借方余额' },
  { value: '贷方余额', label: '贷方余额' },
  { value: '借方发生额', label: '借方发生额' },
  { value: '贷方发生额', label: '贷方发生额' }
]

// 记账时间类型
const ACCOUNT_DATE_TYPE_LIST = [
  { value: '期初', label: '期初' },
  { value: '期末', label: '期末' },
  { value: '年初', label: '年初' }
]

// 是否
const SHI_FOU_LIST = [
  { value: 0, label: '否' },
  { value: 1, label: '是' }
]

// 会计制度
const ACCOUNT_SYSTEM_LIST = [
  { value: '7', label: '交通行业' },
  { value: '8', label: '铁路行业' },
  { value: '10', label: '邮电通讯行业' },
  { value: '16', label: '事业单位' },
  { value: '17', label: '行政单位' },
  { value: '18', label: '水利水电行业' },
  { value: '19', label: '医疗卫生行业' },
  { value: '20', label: '监狱系统' },
  { value: '22', label: '总决算（中心统管）' },
  { value: '23', label: '总决赛' },
  { value: '24', label: '其他' },
  { value: '25', label: '基建会计' },
  { value: '26', label: '村集体经济组织' },
  { value: '27', label: '经费资产一体化' },
  { value: '28', label: '疾控中心' },
  { value: '29', label: '工会新会计制度' },
  { value: '96', label: '新政府会计制度（事业）' },
  { value: '97', label: '新政府会计制度（行政）' },
  { value: '99', label: '新政府会计制度' }
]

// 凭证长度
const VOUCHER_LENGTH_LIST = []
for (let i = 2; i < 10; i++) {
  VOUCHER_LENGTH_LIST.push({ value: i, label: i })
}

// 科目级数
const SUBJECT_PROGRESSION = []
for (let i = 1; i < 10; i++) {
  SUBJECT_PROGRESSION.push({ value: i, label: i })
}

// 差异项种类
const DIFFERENCE_TERM_TYPE_LIST = [
  { value: '1', label: '当期确认为收入但没有确认为预算收入' },
  { value: '2', label: '当期确认为预算收入但没有确认为收入' },
  { value: '3', label: '当期确认为费用但没有确认为预算支出' },
  { value: '4', label: '当期确认为预算支出但没有确认为费用' }
]

// 投资对象属性
const INVESTMENT_TARGET_TYPE_LIST = [
  { value: '1', label: '对企业的投资' },
  { value: '2', label: '对投资基金股权投资' },
  { value: '3', label: '其他投资' }
]

// 收入来源属性
const INCOME_SOURCE_TYPE_LIST = [
  { value: '1', label: '来自财政专户管理资金' },
  { value: '2', label: '本部门内部单位' },
  { value: '3', label: '本部门以外的同级政府单位' },
  { value: '4', label: '本部门以外的非同级政府单位' },
  { value: '5', label: '其他单位' }
]

// 收入来源属性
const PAYMENT_TARGET_TYPE_LIST = [
  { value: '1', label: '本部门内部单位' },
  { value: '2', label: '本部门以外的同级政府单位' },
  { value: '3', label: '本部门以外的非同级政府单位' },
  { value: '4', label: '其他单位、个人' }
]

// 受控系统
const CONTROL_SYSTEM_LIST = [
  { value: '1', label: '出纳系统' }
]

// 科目类别
const SUBJECT_CATEGORY_OLD_LIST = [
  { value: '资产', label: '资产' },
  { value: '负债', label: '负债' },
  { value: '净资产', label: '净资产' },
  { value: '收入', label: '收入' },
  { value: '支出', label: '支出' }
]

// 科目类别-启用新政府会计制度
const SUBJECT_CATEGORY_NEW_LIST = [
  { value: '资产', label: '资产' },
  { value: '负债', label: '负债' },
  { value: '净资产', label: '净资产' },
  { value: '收入', label: '收入' },
  { value: '费用', label: '费用' },
  { value: '预算收入', label: '预算收入' },
  { value: '预算支出', label: '预算支出' },
  { value: '预算结余', label: '预算结余' }
]

// 科目特征
const SUBJECT_FEATURE_LIST = [
  { value: '1', label: '现金' },
  { value: '2', label: '银行' },
  { value: '3', label: '数量' },
  { value: '4', label: '单位往来' },
  { value: '5', label: '个人往来' },
  { value: '6', label: '数量+单位往来' },
  { value: '7', label: '一般' }
]

// 余额方向
const BALANCE_TYPE_LIST = [
  { value: '0', label: '平' },
  { value: '1', label: '借' },
  { value: '2', label: '贷' },
  { value: '3', label: '两性' }
]

// 科目状态
const STATUS_LIST = [
  { value: 0, label: '已启用' },
  { value: 1, label: '已禁用' }
]

const VERIFY_STATUS_LIST = [
  { value: '1', label: '未审核' },
  { value: '2', label: '已审核' }
]

// 结算方式
const SETTLEMENT_LIST = [
  { value: '1', label: '商业汇票' },
  { value: '2', label: '银行汇票' },
  { value: '3', label: '银行本票' },
  { value: '4', label: '支票' },
  { value: '5', label: '汇兑' },
  { value: '6', label: '委托收款' },
  { value: '7', label: '托收承付' },
  { value: '8', label: '信用证' },
  { value: '9', label: '信用卡' }
]

const S_P_STATUS = [
  { value: 1, label: '待送审' },
  { value: 2, label: '审批中' },
  { value: 3, label: '审批通过' },
  { value: 4, label: '审批不通过' },
  { value: 5, label: '审批驳回' }
]

const S_P_V_STATUS = [
  { value: 1, label: '待送审' },
  { value: 2, label: '审批中' },
  { value: 3, label: '审批通过' },
  { value: 4, label: '审批不通过' },
  { value: 5, label: '审批驳回' }
]

const PROJECT_STATUS = [
  { value: 1, label: '项目立项' },
  { value: 2, label: '项目执行' },
  { value: 3, label: '项目立项(草案)' }
]

const PROJECT_E_STATUS = [
  { value: 1, label: '项目立项' },
  { value: 2, label: '项目执行' },
  { value: 3, label: '项目调整' },
  { value: 4, label: '项目调整执行' }
]

const DECLARE_TYPE_STATUS = [
  { value: 1, label: '年初申报' },
  { value: 2, label: '年中新增' }
]

const RECENT_YEAR = (function() {
  const result = []
  for (let i = 2000; i <= 2050; i++) {
    result.push({
      label: i,
      value: i
    })
  }
  return result
})()

const CARRY_OVER_STATUS = [
  { value: 0, label: '未年结' },
  { value: 1, label: '已年结' }
]

// 合同部分
const COLLECTION_STATUS = [
  { value: 1, label: '草稿' },
  { value: 2, label: '未开始' },
  { value: 3, label: '执行中' },
  { value: 4, label: '变更中' },
  { value: 5, label: '终止中' },
  { value: 6, label: '验收中' },
  { value: 7, label: '已验收' },
  { value: 8, label: '已终止' }
]

const UNIT_NAME = ['甲', '乙', '丙', '丁']

// 合同类型
const COLLECTION_TYPE = [
  { value: '1', label: '买卖合同' },
  { value: '2', label: '租赁合同' },
  { value: '3', label: '建筑工程合同' },
  { value: '4', label: '自定义合同' }
]

const COLLECTION_IS_CHANGE = [
  { value: 0, label: '变更中' },
  { value: 1, label: '已变更' }
]

// 合同收付款状态
const BOND_PAY_STATUS_I = [
  { value: 1, label: '未收款' },
  { value: 2, label: '已收款' },
  { value: 3, label: '支付成功' },
  { value: 4, label: '支付失败' }
]

const BOND_PAY_STATUS_E = [
  { value: 1, label: '未支付' },
  { value: 2, label: '支付中' },
  { value: 3, label: '支付成功' },
  { value: 4, label: '支付失败' }
]

// 合同退款状态
const BOND_REFUND_STATUS = [
  { value: 1, label: '未退款' },
  { value: 2, label: '已退款' }
]

// 保证金类型
const BOND_TYPE = [
  { value: 1, label: '预付款保证金' },
  { value: 2, label: '质量保证金' }
]

// 合同凭证状态
const CREATE_VOUCHER_STATUS = [
  { value: 1, label: '未生成' },
  { value: 2, label: '已生成' }
]

const COLLECTION_SETTLEMENT = [
  { value: 1, label: '月付' },
  { value: 2, label: '季付' },
  { value: 3, label: '年付' },
  { value: 4, label: '一次性请' },
  { value: 5, label: '自定义' }
]

const CREATE_CARD_STATUS = [
  { value: 0, label: '未生成卡片' },
  { value: 1, label: '已生成卡片' }
]

const PAY_CONTENT = [
  { value: 1, label: '预付款' },
  { value: 2, label: '工程进度款' },
  { value: 3, label: '竣工结算款' },
  { value: 4, label: '保修扣留金' },
  { value: 5, label: '履约保证金' }
]

// 结算方式
export const clearingFrom = {
  1: { label: '月付', value: 1 },
  2: { label: '季付', value: 2 },
  3: { label: '年付', value: 3 },
  4: { label: '一次性请', value: 4 },
  5: { label: '自定义', value: 5 }
}

const PAY_CENTER_PAY_STATUS = [
  { value: 1, label: '待支付' },
  { value: 2, label: '支付中' },
  { value: 3, label: '支付异常' },
  { value: 4, label: '支付成功' }
]

const DOC_TYPE = [
  { value: 1, label: '资金拨付' }
]

const PAY_WAY = [
  { value: 1, label: '网银' }
]

const TRANS_WAY = [
  { value: 1, label: '同行' },
  { value: 2, label: '跨行' }
]

export default {
  YEAR_LIST,
  MONTH_LIST,
  MONTH_NAME_LIST,
  formatMonthName(value) {
    return findLabel(MONTH_NAME_LIST, value)
  },
  ACCOUNT_SYSTEM_LIST,
  INVESTMENT_TARGET_TYPE_LIST,
  formatInvestmentTargetType(value) {
    return findLabel(INVESTMENT_TARGET_TYPE_LIST, value)
  },
  INCOME_SOURCE_TYPE_LIST,
  formatIncomeSourceType(value) {
    return findLabel(INCOME_SOURCE_TYPE_LIST, value)
  },
  PAYMENT_TARGET_TYPE_LIST,
  formatPaymentTargetType(value) {
    return findLabel(PAYMENT_TARGET_TYPE_LIST, value)
  },
  OPERATION_TYPE_LIST,
  FETCH_NUMBER_TYPE_LIST,
  ACCOUNT_DATE_TYPE_LIST,
  VOUCHER_LENGTH_LIST,
  SUBJECT_PROGRESSION,
  DIFFERENCE_TERM_TYPE_LIST,
  formatDifferenceTermType(value) {
    return findLabel(DIFFERENCE_TERM_TYPE_LIST, value)
  },
  CONTROL_SYSTEM_LIST,
  SUBJECT_CATEGORY_OLD_LIST,
  SUBJECT_CATEGORY_NEW_LIST,
  SUBJECT_FEATURE_LIST,
  formatSubjectFeature(value) {
    return findLabel(SUBJECT_FEATURE_LIST, value)
  },
  BALANCE_TYPE_LIST,
  formatBalanceType(value) {
    return findLabel(BALANCE_TYPE_LIST, value)
  },
  STATUS_LIST,
  formatStatus(value) {
    return findLabel(STATUS_LIST, value)
  },
  SETTLEMENT_LIST,
  ENUM_SETTLEMENT_LIST: generateEnumObject(SETTLEMENT_LIST),
  RECENT_YEAR,
  VERIFY_STATUS_LIST,
  SHI_FOU_LIST,
  formatShiFou(value) {
    return findLabel(SHI_FOU_LIST, value)
  },
  S_P_STATUS,
  formatSPStatus(value) {
    return findLabel(S_P_STATUS, value) || '待送审'
  },
  S_P_V_STATUS,
  formatSPVStatus(value) {
    return findLabel(S_P_V_STATUS, value) || '待送审'
  },
  PROJECT_STATUS,
  formatProjectStatus(value) {
    return findLabel(PROJECT_STATUS, value) || '项目立项'
  },
  PROJECT_E_STATUS,
  formatProjectEStatus(value) {
    return findLabel(PROJECT_E_STATUS, value) || '项目立项'
  },
  DECLARE_TYPE_STATUS,
  formatDeclareTypeStatus(value) {
    return findLabel(DECLARE_TYPE_STATUS, value)
  },
  CARRY_OVER_STATUS,
  formatCarryOverStatus(value) {
    return findLabel(CARRY_OVER_STATUS, value)
  },
  COLLECTION_STATUS,
  clearingFrom,
  formatCollectionStatus(value) {
    return findLabel(COLLECTION_STATUS, value)
  },
  CREATE_CARD_STATUS,
  formatCreateCardStatus(value) {
    return findLabel(COLLECTION_STATUS, value)
  },
  COLLECTION_SETTLEMENT,
  formatCollectionSettlement(value) {
    return findLabel(COLLECTION_SETTLEMENT, value)
  },
  PAY_CONTENT,
  COLLECTION_TYPE,
  formatContractType(value) {
    return findLabel(COLLECTION_TYPE, value)
  },
  BOND_PAY_STATUS_I,
  formatBondPayStatusIncome(value) {
    return findLabel(BOND_PAY_STATUS_I, value)
  },
  BOND_PAY_STATUS_E,
  formatBondPayStatusExpend(value) {
    return findLabel(BOND_PAY_STATUS_E, value)
  },
  BOND_TYPE,
  formatBondType(value) {
    return findLabel(BOND_TYPE, value)
  },
  BOND_REFUND_STATUS,
  formatRefundStatus(value) {
    return findLabel(BOND_REFUND_STATUS, value)
  },
  CREATE_VOUCHER_STATUS,
  formatCreateVoucherStatus(value) {
    return findLabel(CREATE_VOUCHER_STATUS, value)
  },
  UNIT_NAME,
  COLLECTION_IS_CHANGE,
  formatCollectionIsChange(value) {
    return findLabel(COLLECTION_IS_CHANGE, value)
  },
  PAY_CENTER_PAY_STATUS,
  formatPayCenterPayStatus(value) {
    return findLabel(PAY_CENTER_PAY_STATUS, value)
  },
  DOC_TYPE,
  formatDocType(value) {
    return findLabel(DOC_TYPE, value)
  },
  PAY_WAY,
  formatPayWay(value) {
    return findLabel(PAY_WAY, value)
  },
  TRANS_WAY,
  formatTransWay(value) {
    return findLabel(TRANS_WAY, value)
  }
}
