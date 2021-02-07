import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import urlUtil from './urlUtil'
import storageUtil from '@/utils/storageUtil'
import authUtil from '@/utils/authUtil'
import appCommonUtil from '@/utils/appCommonUtil'
import setting from '@/setting'

let basePath = '/'
// 默认连接地址，只在调试时有用
if (process.env.NODE_ENV === 'development') {
  basePath = `/${urlUtil.getQueryStringArgs('pt') || 'online'}/`
}

axios.interceptors.request.use(
  function(config) {
    config.headers.token = authUtil.getToken() || ''
    config.headers.currentOrgId = storageUtil.getData('appConfig', 'orgId') || ''
    // 接口统计
    config.metadata = { startTime: new Date() }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    if (response.data.success === false) {
      if (
        response.data.code === 401
      ) {
        // 未登录
        // 有些接口可以不拦截
        if (!response.config.noAuth) {
          Message({
            message: response.data.message,
            type: 'error',
            duration: 2 * 1000
          })
          appCommonUtil.removeLoginAuth()
          window.location.reload()
        }
      } else {
        Message({
          message: response.data.message,
          type: 'error',
          duration: 2 * 1000
        })
      }
      return Promise.reject(new Error(response.data.message))
    }
    return response
  },
  function(error) {
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    console.log('interceptors error')
    return Promise.reject(error)
  }
)

function replacePath(path) {
  const ucenterPathList = ['ucenter', 'ucenterCz', 'ucenterGh']
  const accountPathList = ['account', 'accountCz', 'accountGh']
  const ucenterRes = setting.sysType === 'cz' ? 'ucenterCz' : 'ucenterGh'
  const accountRes = setting.sysType === 'cz' ? 'accountCz' : 'accountGh'
  if (ucenterPathList.indexOf(path) !== -1) {
    return ucenterRes
  }
  if (accountPathList.indexOf(path) !== -1) {
    return accountRes
  }
  // // 线上是pcenterGh
  // // 本地是pcenterGH
  // if (process.env.NODE_ENV === 'development') {
  //   path = path.replace('pcenterGh', 'pcenterGH')
  // }
  return path
}

function makeUrl(url) {
  if (
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url
  } else {
    const list = url.split('/')
    list[0] = replacePath(list[0])
    url = list.join('/')
    return `${basePath}${url}`
  }
}

const Http = {
  get(url, query, options) {
    let queryString = ''
    if (query) {
      query.uuId = new Date().getTime()
    } else {
      query = { uuId: new Date().getTime() }
    }
    queryString = qs.stringify(query)
    return axios
      .get(makeUrl(url + (queryString ? '?' + queryString : '')), options)
      .then(data => data.data)
  },
  post(url, param, options) {
    return axios
      .post(makeUrl(url), param, options)
      .then(data => data.data)
  },
  put(url, param, options) {
    return axios.put(makeUrl(url), param, options).then(data => data.data)
  },
  postJson(url, param, options) {
    param = param || {}
    return axios
      .post(makeUrl(url), qs.stringify(param), options)
      .then(data => data.data)
  },
  makeUrl
}

export default Http
