<template>
  <el-card class="box-card-body">
    <div class="filter-container">
      <el-radio-group v-model="radio">
        <el-radio :label="1">公众号</el-radio>
        <el-radio :label="2">微博</el-radio>
        <el-radio :label="3">微博评论风格</el-radio>
        <el-radio :label="4">水印风格</el-radio>
      </el-radio-group>
      <el-button style="margin-left: 10px" type="primary" size="small" @click="printHandler">生成图片</el-button>
    </div>
    <div class="p-e">
      <div v-if="imgUrl">
        <img :src="imgUrl" alt="" class="c-i">
      </div>
      <div id="i-r-p" style="position: relative;">
        <div
          style="text-align: left;margin-bottom: 10px;font-size: 22px"
        >
          <span>日期({{ tradeDate }})</span>
          <span style="float: right">市场评分：{{ position }}</span>
        </div>
        <table class="print-table" style="width: 100%;" border="1" cellspacing="0">
          <thead style="text-align: center">
            <tr>
              <td colspan="1" rowspan="1" style="text-align: center"><div>指数名称</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>涨跌幅</div></td>
              <td colspan="1" rowspan="1" style="text-align: center"><div>风险分析</div></td>
              <!--<td colspan="1" rowspan="1" style="text-align: center"><div>定投信号</div></td>-->
              <!--<td colspan="1" rowspan="1" style="text-align: center"><div>波段信号</div></td>-->
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
              <!--<td colspan="1" rowspan="1">-->
              <!--<div v-if="item.buyNum" class="cell red-bg" style="color: #fff">定投{{ item.buyNum }}份</div>-->
              <!--</td>-->
              <!--<td colspan="1" rowspan="1">-->
              <!--<div-->
              <!--:class="{'red-bg': item.flag === '加仓', 'green-bg': item.flag === '减仓'}"-->
              <!--class="cell"-->
              <!--style="color: #fff"-->
              <!--&gt;{{ item.flag }}</div>-->
              <!--</td>-->
            </tr>
          </tbody>
        </table>
        <!--引流推广的图里面最好不要出现公众号的字样，用微信的图标然后一个放大镜，大家就知道是微信里面搜索了-->
        <!--公众号-->
        <div v-if="radio === 1" class="g-q">
          <div class="w-t">
            <div class="disclaimer">
              <p style="margin-top: 10px">{{ text1 }}</p>
              <p>{{ text2 }}</p>
            </div>
          </div>
          <img src="../../assets/gzhQrb.png" alt="">
        </div>
        <!--微博-->
        <div v-if="radio === 2" class="g-q">
          <div class="w-t wbs">
            <div class="disclaimer">
              <p style="margin-top: 10px">{{ text1 }}</p>
              <p>{{ text2 }}</p>
            </div>
          </div>
          <img class="wbsi" src="../../assets/gzhQrb.png" alt="">
          <div class="wx-m"/>
        </div>
        <!--微博评论风格-->
        <div v-if="radio === 3" class="g-q">
          <div class="m-t">更多指数分析，请看评论区 ↓ </div>
          <div class="w-p-t">
            <div class="disclaimer">
              <p style="margin-top: 10px">{{ text1 }}</p>
              <p>{{ text2 }}</p>
            </div>
          </div>
        </div>
        <!--水印版本-->
        <div v-if="radio === 4">
          <div id="ww-w" style="position: absolute;width: 100%;height: 100%;left: 0;top: 0;overflow: hidden"/>
          <div class="g-q">
            <div class="w-p-t">
              <div class="disclaimer">
                <p style="margin-top: 10px">{{ text1 }}</p>
                <p>{{ text2 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import themeUtil from '@/utils/themeUtil.js'
import indexList from '@/common/indexList'
import watermark from '@/utils/watermark.js'

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
      listRaw: [],
      listGreen: [],
      imgUrl: '',
      tradeDate: '',
      nameMap,
      codeKeyMap,
      nameKeyMap,
      bandList: [],
      position: 0,
      radio: 1,
      text1: '【养基定投波段】提供的任何信息或意见仅供参考，并不构成任何人的投资建议。投资者不得直接据此作出买入或卖出判断，否则自行承担投资风险。',
      text2: '温馨提示:基金有风险，投资需谨慎。'
    }
  },
  computed: {
  },
  watch: {
    radio(val) {
      if (val === 4) {
        this.$nextTick(() => {
          const element = document.getElementById('ww-w')
          watermark(element, {
            text1: 'vx：养基定投波段',
            text2: '',
            fontSize: 20, // 字体
            width: 200, // 宽度
            height: 40 // 长度
          })
        })
      }
    }
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
    sortV() {
      const newList = []
      this.listRaw.forEach((item) => {
        let qdiffG = item.qdiff
        if (item.stockIndexPSF) {
          qdiffG = -Math.abs(qdiffG)
        }
        newList.push({
          ...item,
          qdiffG: qdiffG
        })
      })
      newList.sort((a, b) => {
        return b.qdiffG - a.qdiffG
      })
      return newList
    },
    sortIndex() {
      // this.list = this.setSort(this.listRaw)
      this.list = this.sortV(this.listRaw)
      // this.list = this.listRaw
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
        this.listRaw = newList
        this.sortIndex()
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
  .wx-m {
    position: absolute;
    background-color: #fff;
    width: 40px;
    right: 63px;
    bottom: 37px;
    z-index: 999;
    height: 30px;
  }
</style>
