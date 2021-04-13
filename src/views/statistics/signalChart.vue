<template>
  <el-card class="box-card-body">
    <div class="filter-container">
      <el-radio-group v-model="indexName" size="small" @change="queryList">
        <el-radio-button v-for="(item) in indexList" :key="item.code" :label="item.name"/>
      </el-radio-group>
    </div>
    <div>
      <el-date-picker
        v-model="startDate"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="queryList"/>
      <el-button style="margin-left: 10px" type="primary" size="small" @click="printHandler">生成图片</el-button>
    </div>
    <div class="p-e">
      <div v-if="imgUrl">
        <img :src="imgUrl" alt="" class="c-i">
      </div>
      <div id="s-s-c">
        <div id="BandChart-wrap" class="chart-wrap">
          <div :id="id" :style="{height:'380px',width: '800px'}"/>
        </div>
        <div class="r-t">
          <span class="sq-tag" style="background-color: rgba(245,108,108, 0.4)"/>
          <span class="r-tt">安全区</span>
          <span class="sq-tag" style="background-color: rgba(103,194,58, 0.4)"/>
          <span class="r-tt">风险区</span>
          <span class="c-tag" style="background-color: red"/>
          <span class="r-tt">加仓</span>
          <span class="c-tag" style="background-color: green"/>
          <span class="r-tt">减仓</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import indexList from '@/common/indexList'
import echarts from 'echarts'
import moment from 'moment'

const nameMap = {}
const nameKeyMap = {}
const codeKeyMap = {}
const indexInfoMap = {}
indexList.forEach((v) => {
  codeKeyMap[v.key] = v.code
  nameMap[v.code] = v.realName || v.name
  nameKeyMap[v.key] = v.realName || v.name
  indexInfoMap[v.name] = v
})

export default {
  name: 'SignalChart',
  components: {
  },
  data() {
    return {
      list: [],
      imgUrl: '',
      tradeDate: '',
      indexList,
      nameMap,
      codeKeyMap,
      nameKeyMap,
      indexInfoMap,
      bandList: [],
      position: 0,
      radio: 1,
      startDate: '2021-03-25',
      indexName: indexList[0].name,
      id: 'BandChart',
      klineList: [],
      signalMap: {},
      chart: null
    }
  },
  computed: {
  },
  created() {
    this.queryList()
  },
  methods: {
    formatDate(value) {
      return moment(value).format('YYYY/M/D')
    },
    printHandler() {
      this.$createImageUrl('s-s-c').then((url) => {
        this.imgUrl = url
      })
    },
    queryRate() {
      return Promise.all([
        this.$http.get('fbsServer/bsSignal/getSignalsByStart', {
          start: this.startDate
        }).then((res) => {
          const signalList = res.data || []
          const signalMap = {}
          signalList.forEach((v) => {
            const bandMap = {}
            v.band_record.forEach((b) => {
              bandMap[b.key] = b
            })
            const fixMap = {}
            v.fix_record.forEach((f) => {
              fixMap[f.key] = f
            })
            signalMap[v.trade_date] = {
              ...v,
              bandMap,
              fixMap
            }
          })
          this.signalMap = signalMap
        }),
        this.$http.getFs('stock/getStockPriceDayKlineByStart', {
          code: this.indexInfoMap[this.indexName].code,
          start: this.startDate
        }).then((res) => {
          const klineList = res.data || []
          const base = klineList[0].preClose
          klineList.forEach((v) => {
            v.closeRate = this.$countDifferenceRate(v.close, base)
          })
          this.klineList = klineList
        })
      ]).then(() => {
        this.initChart()
      })
    },
    queryList() {
      if (this.startDate && this.indexName) {
        this.queryRate()
      }
    },
    initChart() {
      const indexInfo = this.indexInfoMap[this.indexName]
      this.chart = echarts.init(document.getElementById(this.id))
      const recentNetValue = this.klineList
      const xData = ['']
      const yData = [0]
      const points = []
      // 面积
      const pieces = []
      let areaFlag = 'red'
      let areaIndex = 0
      // 最近的在前面
      recentNetValue.forEach((item, index) => {
        const x = moment(item['trade_date']).format('M/D')
        const y = item['closeRate']
        xData.push(x)
        yData.push(y)
        const signalAll = this.signalMap[moment(item['trade_date']).format('YYYY-MM-DD')]
        if (signalAll && signalAll.bandMap && signalAll.bandMap[indexInfo.key]) {
          const sign = signalAll.bandMap[indexInfo.key]
          if (sign.flag) {
            if (sign.flag.indexOf('加') !== -1) {
              points.push(this.createPoint(x, y, 'red', sign.flag))
            } else if (sign.flag.indexOf('减') !== -1) {
              points.push(this.createPoint(x, y, 'green', sign.flag))
            }
          }
          const redColor = 'rgba(245,108,108, 0.4)'
          const greenColor = 'rgba(103,194,58, 0.4)'
          // 最后一个
          if (areaIndex !== index && index === recentNetValue.length - 1) {
            pieces.push({
              gt: areaIndex,
              lte: index + 1,
              color: areaFlag === 'red' ? redColor : greenColor
            })
            return
          }
          if (!sign.stockIndexPSF && sign.qdiff > 0) {
            // red
            if (areaFlag !== 'red') {
              areaFlag = 'red'
              pieces.push({
                gt: areaIndex,
                lte: index,
                color: greenColor
              })
              areaIndex = index
            }
          } else {
            // green
            if (areaFlag !== 'green') {
              areaFlag = 'green'
              pieces.push({
                gt: areaIndex,
                lte: index,
                color: redColor
              })
              areaIndex = index
            }
          }
        }
      })
      console.log(pieces)
      this.chart.setOption({
        title: {
          text: `信号-${indexInfo.realName || indexInfo.name}`,
          left: 'center',
          textStyle: {
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '500'
          }
        },
        grid: {
          left: '4%',
          right: '3%',
          bottom: '8%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: xData,
          boundaryGap: false
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: pieces
        },
        yAxis: [
          {
            type: 'value',
            name: '涨跌幅',
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: 'K线',
            data: yData,
            type: 'line',
            lineStyle: {
              color: '#1890ff'
            },
            smooth: false,
            symbol: 'none',
            areaStyle: {},
            markPoint: {
              data: points,
              symbol: 'circle',
              symbolSize: 8
            }
          }
        ]
      })
    },
    createPoint(date, value, color, flag) {
      return {
        coord: [date, value],
        itemStyle: {
          normal: {
            color: color
          }
        },
        label: {
          show: false,
          fontSize: 12,
          color: color,
          position: 'top'
        }
      }
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
    width: 820px;
  }
  #s-s-c {
    padding: 30px 10px 0 10px;
    width: 820px;
    position: relative;
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
  .r-t {
    position: absolute;
    top: 10px;
    right: 10px;
    line-height: 16px;
    .r-tt {

    }
    .sq-tag {
      display: inline-block;
      width: 20px;
      height: 16px;
      border-radius: 4px;
      vertical-align: top;
    }
    .c-tag {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 16px;
      vertical-align: top;
    }
  }

</style>
