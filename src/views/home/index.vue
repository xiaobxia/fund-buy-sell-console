<template>
  <div class="home-container">
    <div class="top-wrap">
      <img src="../../assets/home-bg.png" alt="" class="a-bg">
      <div class="main-title">行政事业单位智能财务平台</div>
      <div class="right-top clearfix">
        <div class="top-item" @click="userChange">
          <img src="../../assets/home/user.png" alt="">
          <span v-if="userInfo.phid">退出登录</span>
          <span v-else>登录</span>
        </div>
        <div v-if="userInfo.phid && ifAdmin" class="top-item" @click="toUserCenter">
          <img src="../../assets/home/config.png" alt="">
          <span>用户中心</span>
        </div>
      </div>
    </div>
    <div class="bottom-wrap">
      <div class="card-list">
        <!--<div v-if="userInfo.phid && ifAdmin" style="margin-right: 160px" class="card-item" @click="toPath('/sysConfig/mailList')">-->
        <!--<img src="../../assets/home/setting.png" alt="">-->
        <!--<div class="text">基础数据</div>-->
        <!--</div>-->
        <div class="card-item" @click="toPath('/')">
          <img src="../../assets/home/budget.png" alt="">
          <div class="text">支付中心</div>
        </div>
      </div>
      <div class="copy-right">技术支持单位 杭州政云数据技术有限公司</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import storageUtil from '@/utils/storageUtil'
import setting from '@/setting'
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    ifAdmin() {
      return [2, 3, 4].indexOf(this.userInfo.userType) !== -1
    }
  },
  created() {
    this.$store.dispatch('getUserInfo', false)
  },
  methods: {
    toPath(path) {
      if (this.userInfo.phid) {
        this.$router.push({
          path
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    userChange() {
      this.$removeToken()
      storageUtil.setData('userInfo', {})
      window.location.reload()
    },
    toUserCenter() {
      window.location = `/${setting.userCenterName}/`
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-wrap {
    position: relative;
    height: 65vh;
    min-height: 335px;
    overflow: hidden;
    .a-bg {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      min-height: 100%;
      z-index: -1;
    }
    .main-title {
      font-size:65px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:91px;
      text-shadow:0 3px 4px rgba(0,0,0,0.44);
      text-align: center;
      margin-top: 110px;
    }
  }
  .bottom-wrap {
    position: relative;
    height: 35vh;
    min-height: 225px;
    .copy-right {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      font-size: 16px;
    }
  }
  .card-list {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 0;
    bottom: 0;
    height: 135px;
    text-align: center;
    .card-item {
      display: inline-block;
      width: 94px;
      cursor: pointer;
      img {
        width: 94px;
        height: 94px;
      }
      .text {
        margin-top: 15px;
        font-size: 20px;
      }
    }
  }
  .right-top {
    position: absolute;
    top: 40px;
    right: 40px;
    .top-item {
      line-height: 24px;
      cursor: pointer;
      display: inline-block;
      margin-left: 30px;
      img {
        width: auto;
        height: 24px;
        vertical-align: top;
      }
      span {
        color: #fff;
        font-size: 18px;
        margin-left: 5px;
      }
    }
  }
</style>
