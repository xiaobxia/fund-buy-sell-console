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
        <div class="clearfix">
          <div v-for="item in list" :key="item" :style="getBg(item)" class="ety">1</div>
        </div>
        <div class="clearfix">
          <div v-for="item in listGreen" :key="item" :style="getBg(item)" class="ety">1</div>
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
    const list = []
    for (let i = 1; i < 100; i++) {
      list.push(themeUtil.tintColor('F56C6C', Number((i / 100).toFixed(2))))
    }
    this.list = list
    const listGreen = []
    for (let i = 1; i < 100; i++) {
      listGreen.push(themeUtil.tintColor('67C23A', Number((i / 100).toFixed(2))))
    }
    this.listGreen = listGreen
    this.reQueryList()
  },
  methods: {
    getBg(item) {
      return `background-color: ${item}`
    },
    printHandler() {
      this.$createImageUrl('i-r-p').then((url) => {
        console.log(url)
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
</style>
