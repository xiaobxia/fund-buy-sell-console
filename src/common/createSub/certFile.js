export default {
  // 凭证归档模型
  createCertFile(tar) {
    let raw = {
      'begCertCertNo': '',
      'begCertDate': '',
      'bookId': '',
      'certType': '',
      'endCertCertNo': '',
      'endCertDate': '',
      'name': '',
      'phCreator': '',
      'phCurorgid': '',
      'phEditorId': '',
      'phEditorName': '',
      'phInsertDt': '',
      'phUpdateDt': '',
      'phUserId': '',
      'phid': '',
      'remarks': '',
      'volumeNum': ''
    }
    if (tar) {
      raw = Object.assign(raw, tar)
    }
    return raw
  }
}
