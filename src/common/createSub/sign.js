export default {
  createSignEntrty(tar) {
    let raw = {
      'agent': '',
      'budgetLines': '',
      'costLimit': '',
      'freason': '',
      'ftime': '',
      'phone': '',
      'sinTitle': '',
      'textEntry': '',
      'zcPhid': '',
      'resMoney': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createSignEditForm(tar) {
    let raw = {
      'agent': '',
      'budgetLines': '',
      'costLimit': '',
      'freason': '',
      'ftime': '',
      'phId': '',
      'phone': '',
      'sinTitle': '',
      'textEntry': '',
      'zcPhid': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createSignDtlForm(tar) {
    let raw = {
      'fmoney': '',
      'fprice': '',
      'isChang': '',
      'note': '',
      'proId': '',
      'subName': '',
      'unit1': '',
      'unit2': '',
      'unit3': '',
      'variable1': '',
      'variable2': '',
      'variable3': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createSingAttch(tar) {
    let raw = {
      'attachName': '',
      'attactType': '',
      'msatTem': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'tableName': '',
      'upDate': '',
      'url': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
