<template>
  <el-card class="box-card-body">
    <div class="filter-container">
      <el-button type="primary" size="small" @click="printHandler">生成图片</el-button>
    </div>
    <div class="p-e">
      <div v-if="imgUrl">
        <img :src="imgUrl" alt="" class="c-i">
      </div>
      <div id="i-r-p">
        <div style="margin-bottom: 10px;">
          <span class="t-t">安全区</span>
        </div>
        <div class="clearfix">
          <div v-for="item in list" :key="item.key" :style="getBg(item.color)" class="ety">{{ item.name }}</div>
        </div>
        <div style="margin: 10px 0;">
          <span class="t-t">风控区</span>
        </div>
        <div class="clearfix">
          <div v-for="item in listGreen" :key="item.key" :style="getBg(item.color)" class="ety">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import themeUtil from '@/utils/themeUtil.js'
export default {
  name: 'IndexRisk',
  components: {
  },
  data() {
    return {
      list: [],
      listGreen: [],
      imgUrl: ''
    }
  },
  computed: {
  },
  created() {
    this.queryList()
  },
  methods: {
    getBg(item) {
      return `background-color: ${item}`
    },
    printHandler() {
      this.$createImageUrl('i-r-p').then((url) => {
        this.imgUrl = url
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    paginationChange(info) {
      this.current = info.page
      this.size = info.limit
      this.queryList()
    },
    reQueryList() {
      this.current = 1
      this.queryList()
    },
    queryList() {
      this.$http.get('fbsServer/riskSignal/getLastSignal').then((res) => {
        const data = res.data
        const record = data.record || []
        const list = []
        const listGreen = []
        record.forEach((v) => {
          let r = (Math.abs(v.netChangeRatio) * 3) + 10
          if (r > 90) {
            r = 90
          }
          if (r < 10) {
            r = 10
          }
          r = 100 - r
          // 越大越淡
          if (v.netChangeRatio > 0) {
            v.color = themeUtil.tintColor('F56C6C', Number((r / 100).toFixed(2)))
            list.push(v)
          } else {
            v.color = themeUtil.tintColor('67C23A', Number((r / 100).toFixed(2)))
            listGreen.push(v)
          }
        })
        listGreen.reverse()
        this.list = list
        this.listGreen = listGreen
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ety {
    width: 100px;
    height: 50px;
    float: left;
    text-align: center;
    line-height: 50px;
    color: #303133;
  }
  .p-e {
    height: calc(100vh - 170px);
    overflow-y: auto;
  }
  .c-i {
    width: 500px;
  }
  #i-r-p {
    width: 500px;
  }
  .t-t {
    font-size: 22px;
  }
</style>
