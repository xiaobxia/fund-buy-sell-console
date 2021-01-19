<template>
  <div v-if="ok" class="ass-wrap">
    <div class="table-title">{{ localModel === 'yu'?'财政辅助核算':'常用辅助核算' }}</div>
    <el-table
      ref="multipleTable"
      :border="true"
      :data="localRow.hsCertDtlAstList"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{textAlign: 'center'}"
      class="visible-table voucher-edit-table"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        v-for="item in names"
        :key="item.code"
        :label="item.name"
      >
        <template slot-scope="scope">
          <span>{{ astValueMap[scope.row.astMap[item.code]] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="ifShowNumRow(localRow)"
        width="170"
        label="数量">
        <template slot-scope="scope">
          <div class="no-p-cell">
            <div>
              <span>数量:</span>
              <span style="width: 100px;" class="text-b mini">{{ _formatUnitPriceEmpty(scope.row.num) }}</span>
            </div>
            <div>
              <span>单价:</span>
              <span :class="$numberClass(scope.row.price)" style="width: 100px;" class="text-b mini">{{ _formatUnitPriceAbs(scope.row.price) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="bookInfo.isForeignCurrency === '1' && ifShowForeignCurrencyRow(localRow)"
        width="200"
        label="币别">
        <template slot-scope="scope">
          <div class="no-p-cell">
            <div>
              <span>{{ scope.row.foreignKey }}</span>
              <span>:</span>
              <span style="width: 100px;" class="text-b mini">{{ _formatForeignCurrencyEmpty(scope.row.foreignRate) }}</span>
            </div>
            <div>
              <span>原币:</span>
              <span :class="$numberClass(scope.row.foreignMoney)" style="width: 100px;" class="text-b mini">{{ _formatForeignCurrencyAbs(scope.row.foreignMoney) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="本位币金额">
        <template slot-scope="scope">
          <div class="cell-input-wrap">
            <span :class="$numberClass(scope.row.money)" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.money) }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixins from '@/mixins/common'
export default {
  name: 'AssistViewTable',
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
      names: [],
      ok: false,
      astValueMap: {}
    }
  },
  computed: {
    ...mapGetters([
      'bookInfo',
      'currencyList'
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
    initRow() {
      const names = []
      if (this.localRow.hsCertDtlAstList && this.localRow.hsCertDtlAstList[0]) {
        // 库存数据
        this.astValueMap = this.localRow.astValueMap || {}
        for (const key in this.localRow.hsCertDtlAstList[0].astNameMap) {
          names.push({
            name: key,
            code: this.localRow.hsCertDtlAstList[0].astNameMap[key]
          })
        }
        this.names = names
        this.ok = false
        const ids = []
        // 遍历辅助项
        this.localRow.hsCertDtlAstList.forEach((item) => {
          for (const key in item.astNameMap) {
            // 没有对应值的就查询
            if (!(this.astValueMap[item.astMap[item.astNameMap[key]]])) {
              ids.push(item.astMap[item.astNameMap[key]])
            }
          }
        })
        if (ids.length > 0) {
          // 有需要查询的
          this.queryAssistTypeValue(ids).then(() => {
            this.localRow.astValueMap = this.astValueMap
            this.ok = true
          }).catch(() => {
            this.ok = true
          })
        } else {
          this.ok = true
        }
      }
    },
    queryAssistTypeValue(ids) {
      return this.$http.post(`account/diy/astType/dtl/listByIds`, ids).then((res) => {
        const data = res.data || []
        data.forEach((item) => {
          this.astValueMap[item.phid] = item.name
        })
      })
    },
    // 检查每一项是否需要显示数量
    ifShowNumRow(item) {
      let flag = false
      if (parseFloat(item.num || 0) || parseFloat(item.price || 0)) {
        flag = true
      }
      return flag
    },
    // 检查每一项是否需要显示外币
    ifShowForeignCurrencyRow(item) {
      let flag = false
      if (parseFloat(item.foreignMoney || 0) || parseFloat(item.foreignRate || 0)) {
        flag = true
      }
      return flag
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
