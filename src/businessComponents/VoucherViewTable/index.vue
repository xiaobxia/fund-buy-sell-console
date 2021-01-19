<template>
  <div>
    <el-table
      ref="table"
      :border="true"
      :data="dtlList"
      :header-cell-style="{textAlign: 'center'}"
      :span-method="objectSpanMethod"
      :highlight-current-row="true"
      :class="[cardInput?'cardInput':'','visible-table', 'voucher-edit-table']"
      tooltip-effect="dark"
      style="width: 100%"
      @current-change="currentChange">
      <el-table-column
        align="center"
        label="摘要">
        <template slot-scope="scope">
          <span v-if="scope.$index === dtlList.length-1">{{ scope.row.digest }}</span>
          <span v-else>{{ scope.row.digest }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="科目">
        <template slot-scope="scope">
          <span v-if="scope.$index === dtlList.length-1">{{ scope.row.subId }}</span>
          <span v-else>{{ scope.row.subId ? `${scope.row.subCode} - ${scope.row.subName}` : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showNumCol"
        width="170"
        label="数量">
        <template slot-scope="scope">
          <div v-if="ifShowNumRow(scope.row)" class="no-p-cell">
            <div>
              <span>数量:</span>
              <span v-if="ifBottomShow" style="width: 100px;" class="text-b mini">--</span>
              <span v-else style="width: 100px;" class="text-b mini">{{ _formatUnitPriceEmpty(scope.row.num) }}</span>
            </div>
            <div>
              <span>单价:</span>
              <span v-if="ifBottomShow" style="width: 100px;" class="text-b mini">--</span>
              <span v-else :class="[$numberClass(scope.row.price)]" style="width: 100px;" class="text-b mini">{{ _formatUnitPriceAbs(scope.row.price) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="bookInfo.isForeignCurrency === '1' && showForeignCurrencyCol"
        width="200"
        label="币别">
        <template slot-scope="scope">
          <div v-if="ifShowForeignCurrencyRow(scope.row)" class="no-p-cell">
            <div>
              <span>{{ scope.row.foreignKey }}</span>
              <span>:</span>
              <span v-if="ifBottomShow" style="width: 100px;" class="text-b mini">--</span>
              <span v-else style="width: 100px;" class="text-b mini">{{ _formatForeignCurrencyEmpty(scope.row.foreignRate) }}</span>
            </div>
            <div>
              <span>原币:</span>
              <span v-if="ifBottomShow" style="width: 100px;" class="text-b mini">--</span>
              <span v-else :class="[$numberClass(scope.row.foreignMoney)]" style="width: 100px;" class="text-b mini">{{ _formatForeignCurrencyAbs(scope.row.foreignMoney) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <template v-if="cardInput">
        <el-table-column>
          <div slot="header" class="n-header">
            <number-grid-header :title="'借方'"/>
          </div>
          <template slot-scope="scope">
            <div v-if="scope.row && scope.row.last" class="right-cell cell-input-wrap">
              <number-grid :count="''+scope.row.debit"/>
            </div>
            <template v-else>
              <div class="cell-input-wrap">
                <number-grid :count="''+scope.row.debit"/>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column>
          <div slot="header" class="n-header">
            <number-grid-header :title="'贷方'"/>
          </div>
          <template slot-scope="scope">
            <div v-if="scope.row && scope.row.last" class="right-cell cell-input-wrap">
              <number-grid :count="''+scope.row.lender"/>
            </div>
            <template v-else>
              <div class="cell-input-wrap">
                <number-grid :count="''+scope.row.lender"/>
              </div>
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column
          align="right"
          label="借方">
          <template slot-scope="scope">
            <span v-if="scope.$index === dtlList.length-1" :class="[$numberClass(scope.row.debitTem)]" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.debit) }}</span>
            <span v-else :class="[$numberClass(scope.row.debit)]" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.debit) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="贷方">
          <template slot-scope="scope">
            <span v-if="scope.$index === dtlList.length-1" :class="[$numberClass(scope.row.lenderTemp)]" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.lender) }}</span>
            <span v-else :class="[$numberClass(scope.row.lender)]" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.lender) }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <assist-view-table v-if="ifShowAssistTable(editRow)" :local-model="thisModel" :local-row="editRow"/>
    <div v-if="ifBusinessDate" :class="{small: small}" class="bottom-info">
      <template v-if="ifBottomDetail">
        <span class="item">财务主管: {{ certTemp.cfoName }}</span>
        <span class="item">审核: {{ certTemp.verifyName }}</span>
        <span class="item">制单: {{ certTemp.creatName }}</span>
        <span class="item">出纳: {{ certTemp.cashName }}</span>
      </template>
      <span>业务日期:</span>
      <el-date-picker
        :readonly="true"
        v-model="editRow.businessDate"
        :editable="false"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHsCertDtlPara } from '@/common/create'
import AssistViewTable from '@/businessComponents/AssistViewTable'
import NumberGrid from '@/businessComponents/NumberGrid'
import NumberGridHeader from '@/businessComponents/NumberGridHeader'
import commonMixins from '@/mixins/common'
export default {
  name: 'VoucherViewTable',
  components: {
    AssistViewTable,
    NumberGrid,
    NumberGridHeader
  },
  mixins: [commonMixins],
  props: {
    dtlList: {
      type: Array,
      default: function() {
        return []
      }
    },
    certTemp: {
      type: Object,
      default: function() {
        return {
          cfoName: '',
          verifyName: '',
          creatName: '',
          cashName: ''
        }
      }
    },
    ifBusinessDate: {
      type: Boolean,
      default: true
    },
    ifBottomDetail: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    thisModel: {
      type: String,
      default: ''
    },
    cardInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showForeignCurrencyCol: false,
      showNumCol: false,
      ifBottomShow: false,
      editRow: {
        blank: true,
        ...createHsCertDtlPara()
      }
    }
  },
  computed: {
    ...mapGetters([
      'bookInfo'
    ])
  },
  watch: {
    dtlList() {
      this.ifShowNumCol()
      this.ifShowForeignCurrencyCol()
      this.formatDetailList()
    }
  },
  created() {
  },
  methods: {
    // 表格合并规则
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.last) {
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 2
          }
        }
        if (columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 0
          }
        }
      }
    },
    // 格式化明细数据
    formatDetailList() {
      const debitLenderSum = this._getDebitLenderSum(this.dtlList.slice(0, -1))
      const debit = debitLenderSum.debit
      const lender = debitLenderSum.lender
      this.dtlList[this.dtlList.length - 1] = createHsCertDtlPara({
        digest: `合计:${this.$digitUppercase(debit)}`,
        debit: debit,
        lender: lender,
        debitTemp: debit,
        lenderTemp: lender,
        last: true
      })
    },
    ifHasAssist(item) {
      return item.hsCertDtlAstList && item.hsCertDtlAstList.length > 0
    },
    // 检查所有列,决定是否显示数量栏
    ifShowNumCol() {
      let flag = false
      this.dtlList.forEach((rec) => {
        const item = rec
        // 排除有辅助项的
        if (this.ifHasAssist(item)) {
          return false
        }
        if (parseFloat(item.num || 0) || parseFloat(item.price || 0)) {
          flag = true
        }
      })
      this.showNumCol = flag
    },
    // 检查每一项是否需要显示数量
    ifShowNumRow(item) {
      let flag = false
      // 排除有辅助项的
      if (this.ifHasAssist(item)) {
        return false
      }
      if (parseFloat(item.num || 0) || parseFloat(item.price || 0)) {
        flag = true
      }
      return flag
    },
    // 检查所有列,决定是否显示外币栏
    ifShowForeignCurrencyCol() {
      let flag = false
      this.dtlList.forEach((rec) => {
        // 排除有辅助项的
        if (this.ifHasAssist(rec)) {
          return false
        }
        if (parseFloat(rec.foreignMoney || 0)) {
          flag = true
        }
      })
      this.showForeignCurrencyCol = flag
    },
    // 检查每一项是否需要显示外币
    ifShowForeignCurrencyRow(item) {
      let flag = false
      // 排除有辅助项的
      if (this.ifHasAssist(item)) {
        return false
      }
      if (parseFloat(item.foreignMoney || 0)) {
        flag = true
      }
      return flag
    },
    // 是否显示辅助表格
    ifShowAssistTable(row) {
      let flag = false
      if (row.hsCertDtlAstList && row.hsCertDtlAstList.length > 0) {
        flag = true
      }
      return flag
    },
    // 点击行
    currentChange(currentRow) {
      if (currentRow) {
        if (currentRow.last) {
          this.$refs.table.setCurrentRow()
        } else {
          this.editRow = currentRow
        }
      } else {
        this.editRow = {
          blank: true,
          ...createHsCertDtlPara(),
          hsCertDtlAstList: []
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .form-content {
    margin-bottom: 18px;
  }
  .input-s {
    width: 80px;
  }
  .bottom-info {
    background-color: #fff;
    padding: 12px;
    line-height: 23px;
    font-size: 14px;
    color: rgb(96, 98, 102);
    text-align: right;
    span {
    }
    .item {
      margin-top: 5px;
      margin-right: 150px;
      float: left;
    }
    &.small {
      .item{
        margin-right: 50px;
      }
    }
  }
  .a-2 {
    padding-right: 30px;
  }
  .text-n {
    margin-right: 16px;
  }
</style>
