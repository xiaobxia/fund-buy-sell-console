import moment from 'moment'

export default {
  // 获取凭证日期
  getCertDate(nowPeriod) {
    let certDate = localStorage.getItem('certDate')
    if (certDate) {
      // 如果是连续新增
      localStorage.removeItem('certDate')
      return certDate
    } else {
      if (moment().isSame(nowPeriod, 'month')) {
        certDate = moment().format('YYYY-MM-DD')
      } else {
        certDate = moment(nowPeriod).endOf('month').format('YYYY-MM-DD')
      }
      return certDate
    }
  },
  // 设置连续新增日期
  setCertDate(str) {
    localStorage.setItem('certDate', str)
  },
  getDisabledDateFn(commonQueryParam) {
    const pYear = commonQueryParam.year
    const pMonth = commonQueryParam.month
    return {
      disabledDate(time) {
        const year = '' + (time.getFullYear())
        const month = '' + (time.getMonth() + 1)
        return !(year >= pYear && month >= pMonth)
      }
    }
  }
}
