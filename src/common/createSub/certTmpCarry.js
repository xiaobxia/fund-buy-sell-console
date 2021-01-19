export default {
  createHsCertTmpCarrySubEntityFin(tar) {
    let raw = {
      carryId: '',
      carryProp: '',
      certCategory: '2',
      lastId: '',
      phCreator: '',
      phCurorgid: '',
      phEditorId: '',
      phEditorName: '',
      phInsertDt: '',
      phUpdateDt: '',
      phUserId: '',
      phid: '',
      sort: '',
      subCode: '',
      subId: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createHsCertTmpCarrySubEntityBudg(tar) {
    let raw = {
      carryId: '',
      carryProp: '',
      certCategory: '1',
      lastId: '',
      phCreator: '',
      phCurorgid: '',
      phEditorId: '',
      phEditorName: '',
      phInsertDt: '',
      phUpdateDt: '',
      phUserId: '',
      phid: '',
      sort: '',
      subCode: '',
      subId: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarryToOneVO(tar) {
    let raw = {
      bookId: '',
      budgInDigest: '',
      budgInSubCode: '',
      budgInSubId: '',
      budgOutDigset: '',
      budgOutSubCode: '',
      budgOutSubId: '',
      certType: '',
      certYear: '',
      creator: '',
      delFlag: '',
      finInDigest: '',
      finInSubCode: '',
      finInSubId: '',
      finOutDigset: '',
      finOutSubCode: '',
      finOutSubId: '',
      name: '',
      ngInsertDt: '',
      orgId: '',
      phid: '',
      tmpType: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarryAstVOBudg(tar) {
    let raw = {
      astMap: {},
      carryProp: '',
      carrySubId: '',
      certCategory: '1',
      creator: '',
      delFlag: '',
      ngInsertDt: '',
      phid: '',
      sort: '',
      subCode: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarryAstVOFin(tar) {
    let raw = {
      astMap: {},
      carryProp: '',
      carrySubId: '',
      certCategory: '2',
      creator: '',
      delFlag: '',
      ngInsertDt: '',
      phid: '',
      sort: '',
      subCode: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarryToManyVO(tar) {
    let raw = {
      bookId: '',
      budgInDigest: '',
      budgInSubCode: '',
      budgInSubId: '',
      budgOutDigset: '',
      budgOutSubCode: '',
      budgOutSubId: '',
      certType: '',
      certYear: '',
      creator: '',
      delFlag: '',
      finInDigest: '',
      finInSubCode: '',
      finInSubId: '',
      finOutDigset: '',
      finOutSubCode: '',
      finOutSubId: '',
      name: '',
      ngInsertDt: '',
      orgId: '',
      phid: '',
      tmpType: ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarrySubToManyVOBudg(tar) {
    let raw = {
      carryId: '',
      carryProp: '',
      certCategory: '1',
      phCreator: '',
      phCurorgid: '',
      phEditorId: '',
      phEditorName: '',
      phInsertDt: '',
      phUpdateDt: '',
      phUserId: '',
      phid: '',
      sort: '',
      subCode: '',
      subId: '',
      certTmpCarryAstVOList: [],
      subAstTypeVOList: []
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarrySubToManyVOFin(tar) {
    let raw = {
      carryId: '',
      carryProp: '',
      certCategory: '2',
      phCreator: '',
      phCurorgid: '',
      phEditorId: '',
      phEditorName: '',
      phInsertDt: '',
      phUpdateDt: '',
      phUserId: '',
      phid: '',
      sort: '',
      subCode: '',
      subId: '',
      certTmpCarryAstVOList: [],
      subAstTypeVOList: []
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCertTmpCarryAstVO(tar) {
    let raw = {
      'astMap': {},
      'carryProp': '',
      'carrySubId': '',
      'certCategory': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'sort': '',
      'subCode': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
