import { getToken } from '@/utils/auth'
import Http from '@/utils/httpUtil'
import storageUtil from '@/utils/storageUtil'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const email = userInfo.email.trim()
      return Http.post('auth/login', {
        email: email,
        password: userInfo.password,
        platform: 'pc'
      }).then((data) => {
        window._token = data.data.token
        localStorage.setItem('token', data.data.token)
        storageUtil.initUserInfo({
          ...data.data,
          isLogin: true
        })
        return data.data
      })
    },

    CheckLogin({ commit }, userInfo) {
    },
    // 登出
    LogOut() {
      return Http.get('auth/logout', {
        token: localStorage.getItem('token'),
        platform: 'mobile'
      }).then(() => {
        localStorage.removeItem('token')
        storageUtil.initUserInfo({
          isLogin: false
        })
      })
    }
  }
}

export default user
