export default {
  // 期初模型
  createSubBeg(tar) {
    let raw = {
      'creator': '',
      'debitCount': '',
      'debitCumulative': '',
      'forDebitCumulative': '',
      'forInitialBalance': '',
      'forLenderCumulative': '',
      'forYearBalance': '',
      'foreignKey': '',
      'foreignRate': '',
      'initialBalance': '',
      'initialCount': '',
      'isStandardMoney': '',
      'lenderCount': '',
      'lenderCumulative': '',
      'subCode': '',
      'subId': '',
      'subInitial': '',
      'subYear': '',
      'yearBalance': '',
      'yearNum': '',
      'phid': '',
      'bookId': '',
      'balanceType': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 期初模型
  createAstDtl(tar) {
    let raw = {
      'astDtlId': '',
      'value': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
