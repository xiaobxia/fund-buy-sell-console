export default {
  // 凭证详情模型
  createCertPara(tar) {
    let raw = {
      'attachNum': '',
      'bookId': '',
      'businessDate': '',
      'cashId': '',
      'cashName': '',
      'certCategory': '1',
      'certDate': '',
      'certMonth': '',
      'certNo': '',
      'certPhid': '',
      'certType': '',
      'certYear': '',
      'cfoId': '',
      'cfoName': '',
      'closeLabel': '',
      'creatId': '',
      'creatName': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'source': '',
      'verifyDate': '',
      'verifyId': '',
      'verifyName': '',
      'verifyStatus': '',
      'dataSign': '1',
      'finBudgId': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证明细模型
  createHsCertDtlPara(tar) {
    let raw = {
      'businessDate': '',
      'certDifId': '',
      'certId': '',
      'debit': '',
      'debitActive': false,
      'digest': '',
      'foreignKey': '',
      'foreignMoney': '',
      'foreignRate': '',
      'lender': '',
      'lenderActive': false,
      'num': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'price': '',
      'sort': '',
      'subCode': '',
      'subId': '',
      'subName': '',
      'subType': '',
      'subDetail': {
      }
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证差异项模型
  createHsCertDtlDifEntity(tar) {
    let raw = {
      'budgDebit': '',
      'budgLender': '',
      'budgSub': '',
      'budgSubCate': '',
      'certDtlId': '',
      'diffCate': '',
      'diffItem': '',
      'diffItemId': '',
      'diffMoney': '',
      'finDebit': '',
      'finLender': '',
      'finSub': '',
      'finSubCate': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证辅助项模型
  createHsCertDtlAst(tar) {
    let raw = {
      'astMap': {},
      'astNameMap': {},
      'astValueMap': {},
      'certDtlId': '',
      'foreignKey': '',
      'foreignMoney': '',
      'foreignRate': '',
      'money': '',
      'num': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'price': '',
      'sort': '',
      'subCode': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 第二版
  // 凭证模型
  createCertForm(tar) {
    let raw = {
      'bookId': '',
      'businessDate': '',
      'cashId': '',
      'cashName': '',
      'certCategory': '',
      'certDate': '',
      'certNo': '',
      'certPhid': '',
      'certType': '',
      'cfoId': '',
      'cfoName': '',
      'creatId': '',
      'creatName': '',
      'phid': '',
      'tmpId': '',
      'verifyId': '',
      'verifyName': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证明细模型
  createCertDtlForm(tar) {
    let raw = {
      'businessDate': '',
      'certDifId': '',
      'debit': '',
      'digest': '',
      'foreignKey': '',
      'foreignMoney': '',
      'foreignRate': '',
      'lender': '',
      'num': '',
      'phid': '',
      'price': '',
      'sort': '',
      'subCode': '',
      'subId': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证辅助项模型
  createCertAstForm(tar) {
    let raw = {
      'astMap': {},
      'astNameMap': {},
      'certDtlId': '',
      'foreignKey': '',
      'foreignMoney': '',
      'foreignRate': '',
      'money': '',
      'num': '',
      'phid': '',
      'price': '',
      'sort': '',
      'subCode': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
