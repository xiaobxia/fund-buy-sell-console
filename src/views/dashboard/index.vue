<template>
  <div class="dashboard-container app-container">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>历史统计</span>
          </div>
          <div class="item-wrap">
            <div class="item">历史注册用户：<span class="number">{{ statistics.history_register_user }}</span></div>
            <div class="item">已试用用户：<span class="number">{{ statistics.has_test_user }}</span></div>
            <div class="item">套餐内用户：<span class="number">{{ statistics.can_use_user }}</span></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日统计</span>
          </div>
          <div class="item-wrap">
            <div class="item">今日注册用户：<span class="number">{{ statistics.today_register_user }}</span></div>
            <div class="item">今日请求用户：<span class="number">{{ statistics.today_query_user }}</span></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="chart-wrap">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-date-picker
            v-model="dayRange"
            :picker-options="pickerOptions"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-col>
        <el-col :span="6">
          <el-button
            class="filter-item"
            icon="el-icon-search"
            type="primary"
            @click="handleSearch">查询
          </el-button>
        </el-col>
      </el-row>
      <div class="chart">
        <div v-echarts="lineChartOptions" class="chart"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Dashboard',
  components: { },
  data() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 8)
    return {
      dayRange: [start, end],
      chartData: [],
      statistics: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 8)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 91)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    lineChartOptions() {
      const xData = []
      const yData = []
      const yData2 = []
      this.chartData.map((item) => {
        xData.push(item.date)
        yData.push((item.detail && item.detail.today_register_user) || 0)
        yData2.push((item.detail && item.detail.today_query_user) || 0)
      })
      return {
        color: [
          '#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'
        ],
        title: {
          text: '每日注册使用'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['注册', '使用']
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData,
          axisLine: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          },
          axisTick: {
            lineStyle: {
              color: '#888',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '注册',
            type: 'line',
            stack: '总量',
            data: yData
          },
          {
            name: '使用',
            type: 'line',
            stack: '总量',
            data: yData2
          }
        ]
      }
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.$http.get('admin/getUserStatistics').then(response => {
        this.statistics = response.data
      })

      this.$http.get('admin/getUserDay', {
        startTime: moment(this.dayRange[0]).format('YYYY-MM-DD'),
        endTime: moment(this.dayRange[1]).format('YYYY-MM-DD')
      }).then(response => {
        this.chartData = response.data
      })
    },
    handleSearch() {
      this.$http.get('admin/getUserDay', {
        startTime: moment(this.dayRange[0]).format('YYYY-MM-DD'),
        endTime: moment(this.dayRange[1]).format('YYYY-MM-DD')
      }).then(response => {
        this.chartData = response.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .item-wrap {
    .item {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .number {
        float: right;
        color: #409eff;
        font-weight: 600;
      }
    }
  }
  .chart-wrap {
    margin-top: 40px;
    .chart {
      margin-top: 30px;
      width: 100%;
      height: 450px;
    }
  }
</style>
