// 兼容ie
import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
// 库样式
import '@/styles/element-variables.scss' // global css
import moment from 'moment'
import '@/styles/index.scss' // global css
// 项目主题样式
import '@/styles/theme/project-theme.scss'

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './permission' // permission control
import ScrollTable from '@/directive/scrollTable'
import MessageBox from './components/messageDialog'
import Http from '@/utils/httpUtil.js'
import numberUtil from '@/utils/numberUtil.js'
import stringUtil from '@/utils/stringUtil.js'
import printUtil from '@/utils/printUtil.js'
import transformElementTableUtil from '@/utils/transformElementTableUtil.js'
import fileUtil from '@/utils/fileUtil.js'

import typeValue from '@/common/typeValue' // global filters
import authUtil from '@/utils/authUtil.js'

import popup from '@/common/popup'

import * as filters from './filters' // global filters

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// 滚动加载表格
Vue.use(ScrollTable)

Vue.use(MessageBox)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// HTTP工具
Vue.prototype.$http = Http

function registerUtil(util) {
  for (const key in util) {
    if (util.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = util[key]
    }
  }
}
// 数字工具
registerUtil(numberUtil)
// 字符串工具
registerUtil(stringUtil)
// 文件工具
registerUtil(fileUtil)
// 常量格式化
registerUtil(typeValue)
// token
registerUtil(authUtil)
// 转换工具
registerUtil(transformElementTableUtil)
// 打印工具
registerUtil(printUtil)

// 弹窗工具
Vue.prototype.$popup = popup

// 按钮级别鉴权
Vue.prototype.$hasPermission = function(key) {
  return true
  // return store.getters.menuList.indexOf(key) !== -1
}

// 删除后获取分页位置
Vue.prototype.$getPageIndexAfterDelete = function(pageIndex, size, total, deleteNum) {
  deleteNum = deleteNum || 1
  let res = total - deleteNum
  if (res < 0) {
    res = 0
  }
  const newAll = pageIndex * size
  if (newAll <= res) {
    return pageIndex
  } else {
    return Math.ceil(res / size)
  }
}

Vue.prototype.$formatToDay = function(day) {
  if (!day) {
    return ''
  }
  return moment(day).format('YYYY-MM-DD')
}

Vue.prototype.$formatToDateTime = function(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

Vue.prototype.$getDiffHour = function(checkBeginTime) {
  return moment().diff(checkBeginTime, 'hours')
}

Vue.prototype.$numberClass = function(number, ifRed) {
  number = parseFloat(number || 0)
  return number < 0 ? 'red-text' : ''
}

Vue.prototype.$getDocumentHtml = function() {
  return document.getElementsByTagName('html')[0]
}

Vue.prototype.$filterCheckboxGroup = function(list) {
  const newList = []
  list.forEach((item) => {
    if (item) {
      newList.push(item)
    }
  })
  return newList
}

Vue.prototype.$filterBlankValue = function(tar) {
  const row = {}
  for (const key in tar) {
    if (tar.hasOwnProperty(key)) {
      if (tar[key] !== '') {
        row[key] = tar[key]
      }
    }
  }
  return row
}

// 科目归类
Vue.prototype.$groupSubjectList = function(list, model) {
  const caiList = ['资产', '负债', '净资产', '收入', '支出']
  const yuList = ['预算收入', '预算支出', '预算结余']
  const row = {}
  list.forEach((item) => {
    if (model === 'cai') {
      if (caiList.indexOf(item.subType) === -1) {
        return
      }
    } else if (model === 'yu') {
      if (yuList.indexOf(item.subType) === -1) {
        return
      }
    }
    if (row[item.subType]) {
      row[item.subType].push(item)
    } else {
      row[item.subType] = [item]
    }
  })
  const result = []
  for (const key in row) {
    if (row.hasOwnProperty(key)) {
      result.push({
        label: key,
        options: [...row[key]]
      })
    }
  }
  return result
}

Vue.prototype.$deepClone = function(data) {
  return JSON.parse(JSON.stringify(data))
}

Vue.prototype.$getDeclareType = function(orYear) {
  if (orYear === 0 || orYear === 1) {
    return ['1', '2'][orYear]
  }
  return ''
}

Vue.prototype.$setDateRange = function(form, dateKey, startKey, endKey) {
  const date = form[dateKey] || ['', '']
  form[startKey] = date[0] || ''
  form[endKey] = date[1] || ''
}

function getMoney(val) {
  return parseFloat(val || 0) || 0
}

Vue.prototype.$getMoney = getMoney

Vue.prototype.$getResMoney = function(a, b) {
  return getMoney(a) - getMoney(b)
}

// 全局数据
window.$nowYear = new Date().getFullYear()

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
