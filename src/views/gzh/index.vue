<template>
  <el-card class="box-card-body">
    <el-tabs v-model="activeName">
      <el-tab-pane label="封面" name="first">
        <div class="filter-container">
          <el-input v-model="text" placeholder="请输入内容" size="small" style="display: inline-block;width: 200px"/>
          <el-upload
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            style="display: inline-block"
            action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-button type="primary" size="small" @click="printHandler">生成图片</el-button>
        </div>
        <div class="p-e">
          <div v-if="imgUrl">
            <img :src="imgUrl" alt="" class="c-i">
          </div>
          <div>
            <div id="i-gzh-p" class="a">
              <div class="c-b">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
              </div>
              <div class="b">
                <div class="c">
                  <div class="t">
                    <span>{{ text }}</span>
                  </div>
                  <div class="t-1">
                    <div class="b-1"/>
                    <div class="b-2"/>
                    <span>养基定投波段</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="底部二维码" name="second">
        <div class="filter-container">
          <el-button type="primary" size="small" @click="printHandlerT">生成图片</el-button>
        </div>
        <div>
          <div v-if="imgUrlT">
            <img :src="imgUrlT" alt="">
          </div>
          <div id="i-gzb-p">
            <div class="f-l-t" style="margin-top: 8px">
              <div style="margin-bottom: 10px">
                <img src="./搜索框传播样式-白色版.png" class="b-s-r">
              </div>
              <div>
                <div style="padding-left: 10px">点击左下角“阅读原文”或公众号菜单打开信号工具！</div>
              </div>
            </div>
            <img src="./微信图片_20210324201105.png" alt="" class="a-i">
            <div class="f-t">
              <img src="./链接二维码.png" alt="" class="b-qr">
              <div class="b-b-t">长按扫码打开工具</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'Gzh',
  components: {
  },
  data() {
    return {
      imgUrl: '',
      imageUrl: '',
      text: '交易手记',
      activeName: 'second',
      imgUrlT: ''
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    getBg(item) {
      return `background-color: ${item}`
    },
    formatXS(value) {
      return Math.abs(value).toFixed(2)
    },
    beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file)
    },
    printHandler() {
      this.$createImageUrl('i-gzh-p').then((url) => {
        this.imgUrl = url
      })
    },
    printHandlerT() {
      this.$createImageUrl('i-gzb-p').then((url) => {
        this.imgUrlT = url
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .c-i {
    position: relative;
    width: 900px;
    height: 383px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .a {
    position: relative;
    width: 900px;
    height: 383px;
    color: #fff;
    background-color: #eee;
    .c-b {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .b {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 820px;
      height: 300px;
      background-color: rgba(0,0,0, 0.4);
    }
    .c {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 740px;
      height: 220px;
      border: 4px solid #fff;
    }
    .t {
      margin-top: 25px;
      text-align: center;
      font-size: 70px;
      letter-spacing: 60px;
      text-indent: 60px;
    }
    .t-1 {
      position: relative;
      margin-top: 30px;
      text-align: center;
      font-size: 40px;
      letter-spacing: 12px;
      text-indent: 12px;
    }
    .b-1, .b-2 {
      position: absolute;
      background-color: #fff;
      height: 6px;
      width: 120px;
      top: 20px;
    }
    .b-1 {
      left: 70px;
    }
    .b-2 {
      right: 70px;
    }
  }
  .p-e {
    height: calc(100vh - 220px);
    overflow-y: auto;
  }
  .b-qr {
    height: 100px;
  }
  #i-gzb-p {
    display: inline-block;
    padding: 0 12px;
  }
  .b-b-t {
    font-size: 12px;
  }
  .f-t {
    display: inline-block;
    vertical-align: top;
  }
  .f-l-t {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    margin-right: 30px;
  }
  .b-s-r {
    height: 60px;
  }
  .a-i {
    vertical-align: top;
    height: 120px;
    margin-right: 30px;
  }
</style>
