export default {
  // 账本模型
  createAccountBook(tar) {
    const date = new Date()
    let raw = {
      category: '2',
      encode: '',
      name: '',
      type: '',
      accountsSystem: '',
      certLength: 4,
      subLevel: 4,
      subLength: '',
      isNewAccounts: 0,
      isForeignCurrency: 0,
      enableDateString: '',
      delFlag: 0,
      phid: '',
      defCashierId: '',
      defCashierName: '',
      defTreasurerId: '',
      defTreasurerName: '',
      bookTypeId: '',
      schemeId: '',
      // 需要删的，前端字段，不传给后端
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      subLengthList: []
    }
    const subLengthList = []
    for (let i = 0; i < raw.subLevel; i++) {
      subLengthList.push(1)
    }
    raw.subLengthList = subLengthList
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
