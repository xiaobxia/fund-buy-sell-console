export default {
  // 收入支出模型
  createCertTmpInOut(tar) {
    let raw = {
      'bookId': '',
      'certType': '',
      'certYear': '',
      'digest': '',
      'inSubCode': '',
      'inSubId': '',
      'outSubCode': '',
      'outSubId': '',
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
  }
}
