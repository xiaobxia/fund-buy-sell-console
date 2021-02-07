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
        <div
          style="text-align: left;margin-bottom: 10px;font-size: 22px"
        >
          <span>信号汇总({{ tradeDate }})</span>
          <span style="float: right">仓位：{{ position }}</span>
        </div>
        <!--<div style="margin-bottom: 10px;">-->
        <!--<span class="t-t">指数安全区</span>-->
        <!--<span>(指数名称+安全系数)</span>-->
        <!--</div>-->
        <!--<div class="clearfix">-->
        <!--<div v-for="item in list" :key="item.key" :style="getBg(item.color)" class="ety">-->
        <!--<span>{{ nameMap[item.name] }}</span>-->
        <!--<div class="n-t">{{ item.netChangeRatio }}</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div style="margin: 10px 0;">-->
        <!--<span class="t-t">指数风控区</span>-->
        <!--<span>(指数名称+风险系数)</span>-->
        <!--</div>-->
        <!--<div class="clearfix">-->
        <!--<div v-for="item in listGreen" :key="item.key" :style="getBg(item.color)" class="ety">-->
        <!--<div>{{ nameMap[item.name] }}</div>-->
        <!--<div class="n-t">{{ item.netChangeRatio }}</div>-->
        <!--</div>-->
        <!--</div>-->
        <table class="print-table" style="width: 100%" border="1" cellspacing="0">
          <thead style="text-align: center">
            <tr>
              <td colspan="1" rowspan="1" style="text-align: center"><div>指数名称</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>涨跌幅</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>风险分析</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>定投信号</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>波段信号</div></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td colspan="1" rowspan="1"><div class="cell">{{ item.name }}</div></td>
              <td colspan="1" rowspan="1"><div :class="$stockNumberClass(item.rate)" class="cell">{{ item.rate }}</div></td>
              <td colspan="1" rowspan="1">
                <div :style="getBg(item.color)" class="cell" >
                  <span v-if="item.fb === 'r'">安全系数:{{ formatXS(item.qdiff) }}</span>
                  <span v-if="item.fb === 'g'">风险系数:{{ formatXS(item.qdiff) }}</span>
                </div>
              </td>
              <td colspan="1" rowspan="1">
                <div v-if="item.buyNum" class="cell red-bg" style="color: #fff">定投{{ item.buyNum }}份</div>
              </td>
              <td colspan="1" rowspan="1">
                <div
                  :class="{'red-bg': item.flag === '加仓', 'green-bg': item.flag === '减仓'}"
                  class="cell"
                  style="color: #fff"
                >{{ item.flag }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="g-q">
          <img src="../../assets/gzhQr.png" alt="">
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import themeUtil from '@/utils/themeUtil.js'
import indexList from '@/common/indexList'

const indexSort = [
  'chuangye', 'chuangWL', 'wulin', 'sanbai', 'wubai', 'yiqian',
  'yiyao', 'yiliao', 'shengwu',
  'dianzi', 'xinxi', 'jisuanji',
  'shipin', 'baijiu',
  'yinhang', 'baoxian', 'zhengquan', 'dichan',
  'gangtie', 'meitan', 'youse',
  'jungong', 'huanbao', 'qiche', 'chuanmei',
  'jijian'
]

const nameMap = {}
const nameKeyMap = {}
const codeKeyMap = {}
indexList.forEach((v) => {
  codeKeyMap[v.key] = v.code
  nameMap[v.code] = v.realName || v.name
  nameKeyMap[v.key] = v.realName || v.name
})
export default {
  name: 'IndexRisk',
  components: {
  },
  data() {
    return {
      list: [],
      listGreen: [],
      imgUrl: '',
      tradeDate: '',
      nameMap,
      codeKeyMap,
      nameKeyMap,
      bandList: [],
      position: 0
    }
  },
  computed: {
  },
  created() {
    this.queryBandFix()
  },
  methods: {
    getBg(item) {
      return `background-color: ${item}`
    },
    formatXS(value) {
      return Math.abs(value).toFixed(2)
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
          v.r = r
          // 越大越淡
          if (v.netChangeRatio > 0 && !v.stockIndexPSF) {
            v.color = themeUtil.tintColor('F56C6C', Number((r / 100).toFixed(2)))
            list.push(v)
          } else {
            v.color = themeUtil.tintColor('67C23A', Number((r / 100).toFixed(2)))
            listGreen.push(v)
          }
        })
        list.sort((a, b) => {
          return a.r - b.r
        })
        listGreen.sort((a, b) => {
          return b.r - a.r
        })
        this.list = list
        this.listGreen = listGreen
        this.tradeDate = data.trade_date
      })
    },
    setSort(list) {
      const newList = []
      indexSort.forEach((key) => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          if (key === item.key) {
            newList.push(item)
            return false
          }
        }
      })
      return newList
    },
    setColor(v) {
      let r = (Math.abs(v.qdiff) * 3) + 10
      if (r > 90) {
        r = 90
      }
      if (r < 10) {
        r = 10
      }
      r = 100 - r
      v.r = r
      // 越大越淡
      if (v.qdiff > 0 && !v.stockIndexPSF) {
        v.color = themeUtil.tintColor('F56C6C', Number((r / 100).toFixed(2)))
        v.fb = 'r'
      } else {
        v.color = themeUtil.tintColor('67C23A', Number((r / 100).toFixed(2)))
        v.fb = 'g'
      }
    },
    mergeFix(fixList, item) {
      item.buyNum = 0
      for (let i = 0; i < fixList.length; i++) {
        const raw = fixList[i]
        if (item.key === raw.key) {
          item.buyNum = raw.buyNum
        }
      }
    },
    queryBandFix() {
      Promise.all([
        this.$http.get('fbsServer/user/getIndexRate'),
        this.$http.get('fbsServer/user/getLastBSSignal')
      ]).then((resList) => {
        const indexRateDada = resList[0].data
        const signalDada = resList[1].data
        this.tradeDate = signalDada.trade_date
        this.position = signalDada.position
        const record = indexRateDada.record || []
        const map = {}
        record.forEach((v) => {
          map[v.code] = v.netChangeRatio
        })
        const list = signalDada.band_record || []
        const fixList = signalDada.fix_record || []
        const newList = []
        list.forEach((v) => {
          if (v.flag !== undefined) {
            v.rate = map[this.codeKeyMap[v.key]]
            this.setColor(v)
            v.name = this.nameKeyMap[v.key]
            this.mergeFix(fixList, v)
            newList.push(v)
          }
        })
        this.list = this.setSort(newList)
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
  #i-r-p {
    padding: 20px 10px 0 10px;
    width: 520px;
  }
  .t-t {
    font-size: 22px;
  }
  .g-q {
    width: 100%;
    text-align: right;
    img {
      width: 330px;
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
</style>
