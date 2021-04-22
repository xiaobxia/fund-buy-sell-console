<template>
  <el-card class="box-card-body">
    <div class="filter-container">
      <el-button style="margin-left: 10px" type="primary" size="small" @click="printHandler">生成图片</el-button>
    </div>
    <div class="p-e">
      <div v-if="imgUrl">
        <img :src="imgUrl" alt="" class="c-i">
      </div>
      <div id="s-t-p-i">
        <table class="print-table" style="width: 100%;" border="1" cellspacing="0">
          <thead style="text-align: center">
            <tr>
              <td colspan="1" rowspan="1" style="text-align: center"><div>指数名称</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>今年涨跌幅</div></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td colspan="1" rowspan="1"><div class="cell">{{ item.realName || item.name }}</div></td>
              <td colspan="1" rowspan="1"><div :class="$stockNumberClass(item.rate)" class="cell">{{ item.rate }}%</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-card>
</template>

<script>
import indexList from '@/common/indexList'
import moment from 'moment'

const nameMap = {}
const nameKeyMap = {}
const codeKeyMap = {}
indexList.forEach((v) => {
  codeKeyMap[v.key] = v.code
  nameMap[v.code] = v.realName || v.name
  nameKeyMap[v.key] = v.realName || v.name
})

export default {
  name: 'RecentIncrease',
  components: {
  },
  data() {
    return {
      list: [],
      imgUrl: '',
      tradeDate: '',
      nameMap,
      codeKeyMap,
      nameKeyMap,
      bandList: [],
      position: 0,
      radio: 1,
      startDate: ''
    }
  },
  computed: {
  },
  created() {
    const list = [
      { key: 'chuangye', rate: -0.91 },
      { key: '上证', rate: -0.23 },
      { key: 'wulin', rate: -4.21 },
      { key: 'sanbai', rate: -2.34 },
      { key: 'wubai', rate: 1.23 },
      { key: 'yiqian', rate: -2.43 }
    ]
    list.forEach((v) => {
      v.realName = nameKeyMap[v.key] || v.key
    })
    this.list = list
  },
  methods: {
    formatDate(value) {
      return moment(value).format('YYYY/M/D')
    },
    printHandler() {
      this.$createImageUrl('s-t-p-i').then((url) => {
        this.imgUrl = url
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
    color: #303133;
    padding: 6px 0;
  }
  .n-t {
    margin-top: 6px;
  }
  .p-e {
    height: calc(100vh - 170px);
    overflow-y: auto;
  }
  .c-i {
    width: 520px;
  }
  #s-t-p-i {
    padding: 20px 10px 20px 10px;
    width: 520px;
  }
  .t-t {
    font-size: 22px;
  }
  .g-q {
    width: 100%;
    position: relative;
    img {
      position: absolute;
      right: -14px;
      display: block;
      width: 256px;
      top: 0;
    }
    .w-t {
      display: inline-block;
      width: 260px;
      vertical-align: top;
      font-size: 12px;
      p {
        margin: 0;
      }
    }
  }
  .print-table {
    line-height: 30px;
    border-color: #bbb;
    td {
      border-color: #bbb;
      text-align: center;
    }
    thead {
      td {
        font-weight: bold;
        background-color: rgb(244, 244, 244);
      }
    }
    th {
      border-color: #bbb;
    }
    .cell {
      padding: 0 10px;
    }
  }
  .wbs {
    position: relative;
    z-index: 100;
    background-color: #fff;
    width: 350px!important;
    line-height: 1.4em;
  }
  .wbsi {
    z-index: 1;
    top: -5px!important;
  }
  .m-t {
    margin-top: 12px;
    color: red;
    font-size: 24px;
    text-align: center;
  }
  .w-p-t {
    vertical-align: top;
    font-size: 12px;
    p {
      margin: 0;
    }
  }
</style>
