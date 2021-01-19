import Http from '@/utils/httpUtil'
import Vue from 'vue'
import appCommonUtil from '@/utils/appCommonUtil'

const user = {
  state: {
    token: '',
    userInfo: {}
  },

  mutations: {
    SET_USER_INFO: (state, info) => {
      state.userInfo = {
        ...state.userInfo,
        ...info
      }
      appCommonUtil.setLoginInfo(state.userInfo)
      Vue.prototype.$commonQueryParam = {
        ...(Vue.prototype.$commonQueryParam || {}),
        phCreator: info.userName,
        phCurorgid: '' + info.orgId,
        phEditorId: '',
        phEditorName: '',
        phUserId: '' + info.phid,
        // 未来将废除的字段
        // orgId: '' + info.orgId,
        creator: '' + info.phid
      }
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const param = {
        email: userInfo.username.trim(),
        password: userInfo.password.trim()
      }
      return Http.post('fbsServer/auth/login', {
        ...param
      }).then((data) => {
        // window._token = data.data
        // appCommonUtil.setLoginToken(data.data)
        // return data.data
      })
    },
    getUserInfo({ commit }, noAuth) {
      return Http.get('ucenterGh/users-info/getUserInfoByToken', {}, { noAuth: !!noAuth }).then((res) => {
        commit('SET_USER_INFO', res.data)
        return res.data
      }).catch((err) => {
        console.log('err', err)
      })
    },
    CheckLogin({ commit }, userInfo) {
    },
    Logout() {
      Http.post('ucenterGh/users-local-oauth/logout')
      appCommonUtil.removeLoginAuth()
      window.location.reload()
    }
  }
}

export default user
