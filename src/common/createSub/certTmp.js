export default {
  // 凭证模板主信息
  createHsCertTmpDataEntity(tar) {
    let raw = {
      'bookId': '',
      'name': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'remark': '',
      'tmpYear': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证模板副信息
  createHsCertTmpSubEntity(tar) {
    let raw = {
      'certTmpDataId': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'subId': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证模板凭证信息
  createCertTmpParaVO(tar) {
    let raw = {
      'bookId': '',
      'certCategory': '',
      'certType': '',
      'certYear': '',
      'orgId': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'tmpDataId': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 凭证模板凭证明细
  createHsCertTmpDtlVO(tar) {
    let raw = {
      'businessDate': '',
      'certTmpId': '',
      'debitActive': false,
      'debit': '',
      'digest': '',
      'foreignKey': '',
      'foreignMoney': '',
      'foreignRate': '',
      'lenderActive': false,
      'lender': '',
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
      'subDetail': {
      }
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 模板辅助项
  createCertAstVO(tar) {
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
  // 模板明细
  createCertTmpForm(tar) {
    let raw = {
      'bookId': '',
      'certCategory': '',
      'certType': '',
      'certYear': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'tmpDataId': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpDtlForm(tar) {
    let raw = {
      'businessDate': '',
      'certTmpId': '',
      'debit': '',
      'digest': '',
      'foreignKey': '',
      'foreignMoney': '',
      'foreignRate': '',
      'lender': '',
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
      'subName': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpAstForm(tar) {
    let raw = {
      'astMap': {},
      'astNameMap': {},
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
  }
}
