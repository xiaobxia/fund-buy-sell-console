export default {
  createContractBaseForm(tar) {
    let raw = {
      phid: '',
      capitalType: 1,
      settlementMethod: 4,
      conEndDate: '',
      conMoney: '',
      conName: '',
      conNum: '',
      conSignDate: '',
      conStartDate: '',
      conStatus: 0,
      conSummarize: '',
      typeId: '',
      'planAddress': '',
      'planDetail': '',
      'planName': '',
      'conDeposit': '',
      'failDate': '',
      'failRemark': '',
      'handlingDate': '',
      'handlingDepartment': '',
      'isCard': 0,
      'manager': '',
      'orgId': '',
      'successDate': '',
      'successRemark': '',
      'totalDays': '',
      // 变更字段
      'oldNum': '',
      'changeReason': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createUnitInformationForm(tar) {
    let raw = {
      'type': 2,
      'unitId': '',
      'unitName': '',
      'unitPhone': '',
      'personName': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createSubjectMatterForm(tar) {
    let raw = {
      'cardId': '',
      'count': '1',
      'originalValue': '',
      'subjectName': '',
      'unitId': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createCollectionManagementForm(tar) {
    let raw = {
      'phid': '',
      'collectionMoney': '',
      'collectionName': '',
      'collectionType': 0,
      'estimatedDate': '',
      'paymentId': '',
      'planEndTime': '',
      'planStartTime': '',
      'remark': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  createExtFieldsForm(tar) {
    let raw = {
      'attachmentType': '',
      'calculationFormula': '',
      'decimalPlaces': '',
      'fieldName': '',
      'fieldValue': '',
      'fieldType': '',
      'isRequired': '',
      'maxValue': '',
      'minValue': '',
      'promptText': '',
      'selectType': 1,
      'selectValue': '',
      'sort': '',
      'timeRequired': '',
      'valueList': [
        { value: '' }
      ]
    }
    if (tar) {
      if (tar.selectValue) {
        const selectValueList = tar.selectValue.split(',')
        tar.valueList = selectValueList.map((item) => {
          return { value: item }
        })
      }
      raw = Object.assign(raw, tar)
    }
    return raw
  },
  // 合同字段
  createContractExtField(tar) {
    let raw = {
      'attachmentType': '',
      'calculationFormula': '',
      'decimalPlaces': '',
      'fieldName': '',
      'fieldValue': '',
      'fieldType': '',
      'isRequired': '',
      'maxValue': '',
      'minValue': '',
      'promptText': '',
      'selectType': 1,
      'selectValue': '',
      'sort': '',
      'timeRequired': '',
      'valueList': [
        { value: '' }
      ]
    }
    if (tar) {
      if (tar.selectValue) {
        const selectValueList = tar.selectValue.split(',')
        tar.valueList = selectValueList.map((item) => {
          return { value: item }
        })
      }
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
