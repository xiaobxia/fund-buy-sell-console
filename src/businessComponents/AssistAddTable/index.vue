<template>
  <div class="ass-wrap">
    <div class="table-title">{{ localModel === 'yu'?'财政辅助核算':'常用辅助核算' }}</div>
    <el-table
      v-if="ok"
      ref="table"
      :border="true"
      :data="localRow.hsCertDtlAstList"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{textAlign: 'center'}"
      class="visible-table voucher-edit-table no-b-table"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        v-for="(item) in localRow.subDetail.subAstTypeVOList"
        :key="item.astTypeId"
        :resizable="false"
        :label="item.astName">
        <template slot-scope="scope">
          <div class="cell-input-wrap with-click" >
            <el-select v-model="scope.row.astMap[item.extCode]" placeholder="" style="height: 100%" class="input-h">
              <el-option v-for="(subItem) in astValueMap[item.extCode]" :key="subItem.phid" :label="subItem.name" :value="subItem.phid"/>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="ifShowNumRow(localRow)"
        :resizable="false"
        width="170"
        label="数量">
        <template slot-scope="scope">
          <div class="no-p-cell">
            <div>
              <span>数量:</span>
              <div style="width: 100px;" class="input-b-wrap">
                <span class="text-n number-text">{{ _formatNumberEmpty(scope.row.num) }}</span>
                <el-input v-model="scope.row.num" class="input-b" style="width: 100px;" size="mini" @change="()=>{numChange(scope.row, scope.$index)}"/>
              </div>
            </div>
            <div>
              <span>单价:</span>
              <div style="width: 100px;" class="input-b-wrap">
                <span :class="$numberClass(scope.row.price)" class="text-n number-text">{{ _formatUnitPriceAbs(scope.row.price) }}</span>
                <el-input v-model="scope.row.price" class="input-b number-input" size="mini" @change="()=>{priceChange(scope.row, scope.$index)}"/>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="bookInfo.isForeignCurrency === '1' && ifShowForeignCurrencyRow(localRow)"
        :resizable="false"
        width="200"
        label="币别">
        <template slot-scope="scope">
          <div class="no-p-cell">
            <div>
              <el-select v-model="scope.row.foreignKey" placeholder="" style="width: 80px" size="mini" class="theme-select no-p" @change="()=>{foreignKeyChange(scope.row, scope.$index)}">
                <el-option v-for="(item, index) in currencyList" v-if="_ifSubjectForeign(item, localRow)" :key="index" :label="item.value" :value="item.value"/>
              </el-select>
              <span>:</span>
              <span style="width: 70px;" class="text-b mini">{{ _formatForeignCurrencyEmpty(scope.row.foreignRate) }}</span>
            </div>
            <div>
              <span>原币:</span>
              <el-tooltip v-if="ifShowForeignPop(scope.row.foreignMoney)" :content="''+scope.row.foreignMoney" placement="top" effect="light">
                <div style="width: 126px;" class="input-b-wrap">
                  <span :class="$numberClass(scope.row.foreignMoney)" class="text-n number-text">{{ _formatForeignCurrencyAbs(scope.row.foreignMoney) }}</span>
                  <el-input v-model="scope.row.foreignMoney" class="input-b number-input" size="mini" @change="()=>{foreignMoneyChange(scope.row, scope.$index)}"/>
                </div>
              </el-tooltip>
              <div v-else style="width: 126px;" class="input-b-wrap">
                <span :class="$numberClass(scope.row.foreignMoney)" class="text-n number-text">{{ _formatForeignCurrencyAbs(scope.row.foreignMoney) }}</span>
                <el-input v-model="scope.row.foreignMoney" class="input-b number-input" size="mini" @change="()=>{foreignMoneyChange(scope.row, scope.$index)}"/>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        label="本位币金额">
        <template slot-scope="scope">
          <div class="cell-input-wrap">
            <span :class="$numberClass(scope.row.money)" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.money) }}</span>
            <el-input v-model="scope.row.money" :class="$numberClass(scope.row.money)" class="input-h number-input f-h" size="small" @change="()=>{moneyChange(scope.row, scope.$index)}"/>
          </div>
          <div class="right-btn-wrap">
            <el-button tabindex="-1" type="success" icon="el-icon-plus" circle size="mini" @click="addRow(scope.$index)"/>
            <el-button :disabled="localRow.hsCertDtlAstList.length === 1 && scope.$index < 1" tabindex="-1" type="danger" icon="el-icon-close" circle size="mini" @click="deleteRow(scope.$index)"/>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHsCertDtlAst } from '@/common/create'
import commonMixins from '@/mixins/common'
export default {
  name: 'AssistAddTable',
  mixins: [commonMixins],
  props: {
    localRow: {
      type: Object,
      default: function() {
        return {
        }
      }
    },
    localModel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      astValueMap: {},
      ok: false
    }
  },
  computed: {
    ...mapGetters([
      'bookInfo',
      'currencyList',
      'sysParam'
    ])
  },
  watch: {
    localRow() {
      this.initRow()
    }
  },
  created() {
    this.initRow()
  },
  methods: {
    // 原币是否显示全量精度
    ifShowForeignPop(value) {
      value = '' + value
      const dig = value.split('.')[1]
      const num = parseFloat(this.sysParam.foreignCurrencyDig || 0)
      return dig && dig.length > num
    },
    // 数量变了
    initRow() {
      this.ok = false
      if (this.localRow && this.localRow.hsCertDtlAstList && this.localRow.hsCertDtlAstList.length > 0) {
        const subAstTypeVOList = this.localRow.subDetail.subAstTypeVOList || []
        const astValueMap = {}
        const opList = []
        // 拿到辅助项值的缓存
        this.astValueMap = this.localRow.astValueMap || {}
        subAstTypeVOList.forEach((item) => {
          // 声明结构
          astValueMap[item.extCode] = (this.astValueMap && this.astValueMap[item.extCode]) || []
          // 查辅助项的值
          opList.push(this.queryAssistTypeValue(item))
        })
        // 辅助项的值的列表请求完成
        Promise.all(opList).then(() => {
          // 保存
          this.localRow.astValueMap = this.astValueMap
          this.localRow.hsCertDtlAstList.forEach((row) => {
            // 格式化数据
            const num = parseFloat(row.num || 0)
            const price = parseFloat(row.price || 0)
            const foreignRate = parseFloat(row.foreignRate || 0)
            const foreignMoney = parseFloat(row.foreignMoney || 0)
            const money = parseFloat(row.money || 0)
            const forMoney = (price * num) || foreignMoney
            if (money) {
              row.money = money
            } else {
              const countMoney = forMoney * (foreignRate || 1)
              if (countMoney) {
                row.money = countMoney.toFixed(2)
              } else {
                row.money = ''
              }
            }
            row.subCode = this.localRow.subCode
            // 辅助项map
            const astMap = {}
            const astNameMap = {}
            const astValueMap = {}
            subAstTypeVOList.forEach((item) => {
              astMap[item.extCode] = row.astMap[item.extCode] || ''
              astNameMap[item.astName] = item.extCode
              // 声明结构
              astValueMap[item.extCode] = (this.astValueMap && this.astValueMap[item.extCode]) || []
            })
            row.astMap = astMap
            row.astNameMap = astNameMap
            row.astValueMap = astValueMap
          })
          this.ok = true
        }).catch(() => {
          this.ok = true
        })
      } else {
        this.ok = true
      }
      this.toCertForm()
    },
    queryAssistTypeValue(assItem) {
      // 如果已经请求过值的列表那就不请求了
      if (this.astValueMap[assItem.extCode] && this.astValueMap[assItem.extCode].length > 0) {
        return this.astValueMap[assItem.extCode]
      }
      // 请求值的列表
      return this.$http.post('account/diy/astType/dtl/listNoPage', {
        'astTypeId': assItem.astTypeId,
        'current': 1,
        'search': '',
        'size': 100,
        'year': this.$commonQueryParam.year
      }).then((res) => {
        this.astValueMap[assItem.extCode] = res.data || []
      })
    },
    // 增加行
    addRow(index, data) {
      this.localRow.hsCertDtlAstList.splice(index + 1, 0, data || {
        ...createHsCertDtlAst(),
        subCode: this.localRow.subCode
      })
    },
    // 删除行
    deleteRow(index) {
      this.localRow.hsCertDtlAstList.splice(index, 1)
    },
    // 检查每一项是否需要显示数量
    ifShowNumRow(item) {
      let flag = false
      if (item.subDetail && item.subDetail.amountCheck === '1') {
        flag = true
      }
      if (parseFloat(item.num || 0) || parseFloat(item.price || 0)) {
        flag = true
      }
      return flag
    },
    // 检查每一项是否需要显示外币
    ifShowForeignCurrencyRow(item) {
      let flag = false
      if (item.subDetail && item.subDetail.foreignCheck === '1') {
        flag = true
      }
      if (parseFloat(item.foreignMoney || 0) || parseFloat(item.foreignRate || 0)) {
        flag = true
      }
      return flag
    },
    // 本位币联动
    moneyChange(row) {
      const money = parseFloat(row.money || 0)
      const num = parseFloat(row.num || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      // 有数量
      if (this.ifShowNumRow(this.localRow) && num) {
        // 有外币
        if (foreignKey) {
          row.price = (money / (foreignRate * num)).toFixed(2)
        } else {
          // 汇率默认为1
          row.price = (money / (num)).toFixed(2)
        }
      }
      // 有外币
      if (this.ifShowForeignCurrencyRow(this.localRow) && foreignKey) {
        // 有外币
        row.foreignMoney = (money / (foreignRate))
      }
      this.toCertForm()
    },
    // 币别切换
    foreignKeyChange(row, index) {
      this.currencyList.forEach((currency) => {
        if (currency.value === row.foreignKey) {
          row.foreignRate = currency.attrValue
        }
      })
      const foreignRate = parseFloat(row.foreignRate || 0)
      const foreignMoney = parseFloat(row.foreignMoney || 0)
      if (foreignMoney) {
        // 有外币
        row.money = (foreignMoney * foreignRate).toFixed(2)
      } else {
        const value = parseFloat(row.money || 0)
        if (value) {
          row.foreignMoney = value / foreignRate
        }
      }
      this.toCertForm()
    },
    // 原币修改
    foreignMoneyChange(row, index) {
      const num = parseFloat(row.num || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      const foreignMoney = parseFloat(row.foreignMoney || 0)
      // 有数量
      if (this.ifShowNumRow(this.localRow) && num) {
        row.price = (foreignMoney / num).toFixed(2)
      }
      // 有外币,肯定有外币核算
      if (foreignKey) {
        // 有外币
        row.money = (foreignMoney * foreignRate).toFixed(2)
      }
      this.toCertForm()
    },
    // 单价修改
    priceChange(row, index) {
      const num = parseFloat(row.num || 0)
      const price = parseFloat(row.price || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      // 有数量，肯定有数量核算
      if (num) {
        // 有外币
        if (this.ifShowForeignCurrencyRow(this.localRow)) {
          if (foreignKey) {
            row.money = (price * num * foreignRate).toFixed(2)
          }
          row.foreignMoney = (price * num)
        } else {
          row.money = (price * num).toFixed(2)
        }
      }
      this.toCertForm()
      // 没数量就不用看
    },
    // 数量变了
    numChange(row, index) {
      const num = parseFloat(row.num || 0)
      const price = parseFloat(row.price || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      if (price) {
        // 有外币
        if (this.ifShowForeignCurrencyRow(this.localRow)) {
          if (foreignKey) {
            row.money = (price * num * foreignRate).toFixed(2)
          }
          row.foreignMoney = (price * num)
        } else {
          row.money = (price * num).toFixed(2)
        }
      }
      this.toCertForm()
    },
    // 表格格式化
    formatDetailList() {
      if (this.localRow && this.localRow.hsCertDtlAstList && this.localRow.hsCertDtlAstList.length > 0) {
        this.localRow.hsCertDtlAstList.forEach((row) => {
          const numTemp = parseFloat(row.num || 0)
          const priceTemp = parseFloat(row.price || 0)
          const money = parseFloat(row.money || 0)
          row.money = money || ''
          row.num = numTemp || ''
          row.price = priceTemp || ''
        })
      }
    },
    // 转到明细
    toCertForm() {
      this.formatDetailList()
      const certForm = this.localRow
      const debit = parseFloat(certForm.debit || 0)
      const lender = parseFloat(certForm.lender || 0)
      let moneyTotal = 0
      let ifSamePrice = true
      let lastPrice = ''
      let fanPrice = 0
      let numTotal = 0
      let ifSameFor = true
      let forKey = ''
      let forRate = ''
      let forMoneyTotal = 0
      const hsCertDtlAstList = this.localRow.hsCertDtlAstList || []
      hsCertDtlAstList.forEach((row) => {
        const money = parseFloat(row.money || 0)
        const num = parseFloat(row.num || 0)
        const price = parseFloat(row.price || 0)
        // 单价一样那就整合
        if (price) {
          if (lastPrice !== '' && lastPrice !== price) {
            ifSamePrice = false
          }
          fanPrice = price
          lastPrice = price
        }
        moneyTotal += money
        numTotal += num
        // 如果是用一种外币那就要整合到明细
        if (row.foreignKey) {
          if (forKey !== '' && forKey !== row.foreignKey) {
            ifSameFor = false
          }
          forKey = row.foreignKey
          forRate = parseFloat(row.foreignRate || 0)
          forMoneyTotal += parseFloat(row.foreignMoney || 0)
        }
      })
      if (certForm.debitActive) {
        certForm.debit = moneyTotal
        this.$emit('moneyChange')
      } else if (certForm.lenderActive) {
        certForm.lender = moneyTotal
        this.$emit('moneyChange')
      } else if (debit) {
        certForm.debit = moneyTotal
        this.$emit('moneyChange')
      } else if (lender) {
        certForm.lender = moneyTotal
        this.$emit('moneyChange')
      }
      // 金额和数量相加
      certForm.tempMoney = moneyTotal
      certForm.num = numTotal
      if (ifSameFor) {
        certForm.foreignKey = forKey
        certForm.foreignRate = forRate
        certForm.foreignMoney = forMoneyTotal
      } else {
        certForm.foreignKey = ''
        certForm.foreignRate = ''
        certForm.foreignMoney = ''
      }
      // 单价整合
      if (ifSamePrice) {
        certForm.price = fanPrice
      } else {
        certForm.price = ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ass-wrap {
  }
  .table-title {
    text-align: left;
    border: none;
  }
</style>
