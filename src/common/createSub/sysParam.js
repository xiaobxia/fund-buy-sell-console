export default {
  // 基本参数模型
  createSysParamInfoForm(tar) {
    let raw = {
      numberDig: '0',
      unitPriceDig: '0',
      standardCurrencyDig: '0',
      foreignCurrencyDig: '0',
      certDealMode: '',
      // monthlyCloseLimit01: '0',
      monthlyCloseLimit02: '0',
      yearlyCloseLimit01: '0',
      bussinessCertRule01: '1',
      bussinessCertRule02: '0',
      cashRegistEntryMode: '0',
      printSetting: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 历史凭证人员模型
  createCertOperatorName(tar) {
    let raw = {
      'bookId': '',
      'cashName': '',
      'certNoEnd': '',
      'certNoStart': '',
      'certTypeId': '',
      'cfoName': '',
      'createName': '',
      'endTime': '',
      'orgId': '',
      'startTime': '',
      'verifyName': '',
      // 需要删除的
      dateRange: ['', '']
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
