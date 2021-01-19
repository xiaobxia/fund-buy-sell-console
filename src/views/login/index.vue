<template>
  <div class="login-container">
    <img src="../../assets/login-bg.jpg" alt="" class="login-bg">
    <div class="main-title">管理平台</div>
    <div class="login-wrap">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-position="left"
      >
        <el-form-item prop="username">
          <div class="label"><i class="el-icon-user"/><span>账号</span></div>
          <el-input v-model="loginForm.username" class="input-b" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item prop="password">
          <div class="label"><i class="el-icon-lock"/><span>密码</span></div>
          <el-input v-model="loginForm.password" type="password" class="input-b" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <div>
          <el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin">登 &nbsp;&nbsp;&nbsp; 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '账号不能为空！' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // 清除所有缓存
    sessionStorage.clear()
    localStorage.clear()
  },
  mounted() {
  },
  destroyed() { },
  methods: {
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            return this.$store.dispatch('getUserInfo').then((res) => {
              this.$router.push({
                path: '/userList/index',
                query: this.otherQuery
              })
              this.loading = false
              // 侧边菜单关闭
              this.$store.dispatch('setSideBar', true)
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
  .main-title {
    font-size:55px;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:91px;
    text-shadow:0 3px 4px rgba(0,0,0,0.44);
    text-align: center;
    position: absolute;
    width: 100%;
    top: 12%;
  }
 .login-container {
   position: relative;
   height: 100vh;
   min-height: 645px;
   .login-bg {
     z-index: -1;
     position: absolute;
     bottom: 0;
     width: 100%;
     min-height: 100%;
   }
 }
 .b-i {
   border-top: none;
   border-left: none;
   border-right: none;
 }
 .login-wrap {
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   margin: auto;
   width: 600px;
   height: 340px;
   background-color: #fff;
   border-radius: 4px;
   box-shadow: 0 0 5px rgba(0,0,0,0.2);
   padding: 25px;
   .label {
     color: #484848;
     i {
       font-size: 26px;
       vertical-align: middle;
     }
     span{
       font-size: 18px;
       vertical-align: middle;
       margin-left: 5px;
     }
   }
 }
 .login-btn {
   margin-top: 20px;
   height: 54px;
   background:linear-gradient(315deg,rgba(26,162,232,1) 0%,#1a84e8 100%);
   border-radius:4px;
   line-height: 54px;
   color: #fff;
   padding: 0;
   width: 100%;
   font-size: 20px;
   transition: none;
 }
  .copy-right {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #FFF;
  }
</style>
