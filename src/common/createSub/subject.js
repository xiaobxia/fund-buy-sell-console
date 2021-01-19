export default {
  // 科目模型
  createSubjectForm(tar) {
    let raw = {
      end: 0,
      ngInsertDt: '',
      phid: '',
      subLevels: '1',
      subYear: '',
      encode: '',
      name: '',
      parentId: '',
      subType: '',
      balanceType: '1',
      assistCheck: '0',
      amountCheck: '0',
      unit: '',
      foreignCheck: '0',
      feature: '',
      controSystem: '',
      status: '1'
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
