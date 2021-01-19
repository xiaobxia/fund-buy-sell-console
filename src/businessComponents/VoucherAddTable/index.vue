<template>
  <div>
    <div class="table-wrap">
      <el-table
        ref="table"
        :border="true"
        :data="dtlList"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{textAlign: 'center'}"
        :span-method="objectSpanMethod"
        :highlight-current-row="true"
        :class="[cardInput?'cardInput':'','visible-table', 'voucher-edit-table']"
        tooltip-effect="dark"
        style="width: 100%"
        @current-change="currentChange">
        <el-table-column
          :resizable="false"
          label="摘要">
          <template slot-scope="scope">
            <span v-if="scope.$index === dtlList.length-1">{{ scope.row.digest }}</span>
            <div v-else class="cell-input-wrap with-click" style="text-align: left" @dblclick="openDigestSelect(scope.row)">
              <el-autocomplete
                :maxlength="255"
                v-model="scope.row.digest"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                style="width: 100%"
                class="input-h"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="科目">
          <template slot-scope="scope">
            <span v-if="scope.$index === dtlList.length-1">{{ scope.row.subId }}</span>
            <div v-else class="cell-input-wrap with-click" style="text-align: left" @dblclick="openSubjectSelectDialog(scope.row)">
              <el-select
                v-loading="loading"
                v-model="scope.row.subId"
                :remote-method="remoteMethod"
                :trigger-on-focus="false"
                :clearable="true"
                :popper-append-to-body="false"
                class="input-h"
                style="height: 100%"
                filterable
                remote
                placeholder=""
                @focus="otherFocus"
                @blur="subjectBlur"
                @change="(value)=>{subjectChange(value, scope.row)}">
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.phid"
                    :label="`${item.encode} - ${item.name}`"
                    :value="item.phid"
                  />
                </el-option-group>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showNumCol"
          :resizable="false"
          width="170"
          label="数量">
          <template slot-scope="scope">
            <div v-if="ifShowNumRow(scope.row)" class="no-p-cell">
              <div>
                <span>数量:</span>
                <span v-if="ifShowAssistTable(scope.row)" style="width: 100px;" class="text-b mini">{{ _formatNumberEmpty(scope.row.num) }}</span>
                <div v-else style="width: 100px;" class="input-b-wrap">
                  <span class="text-n number-text">{{ _formatNumberEmpty(scope.row.num) }}</span>
                  <el-input v-model="scope.row.num" class="input-b" style="width: 100px;" size="mini" @change="()=>{numChange(scope.row. scope.$index)}"/>
                </div>
              </div>
              <div>
                <span>单价:</span>
                <span v-if="ifShowAssistTable(scope.row)" :class="$numberClass(scope.row.price)" style="width: 100px;" class="text-b mini">{{ localFormatUnitPriceBottomShow(scope.row.price) }}</span>
                <div v-else style="width: 100px;" class="input-b-wrap">
                  <span :class="$numberClass(scope.row.price)" class="text-n number-text">{{ _formatUnitPriceAbs(scope.row.price) }}</span>
                  <el-input v-model="scope.row.price" class="input-b number-input" size="mini" @change="()=>{priceChange(scope.row. scope.$index)}"/>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="bookInfo.isForeignCurrency === '1' && showForeignCurrencyCol"
          :resizable="false"
          width="200"
          label="币别">
          <template slot-scope="scope">
            <div v-if="ifShowForeignCurrencyRow(scope.row)" class="no-p-cell">
              <div>
                <el-select :disabled="ifShowAssistTable(scope.row)" v-model="scope.row.foreignKey" placeholder="" style="width: 80px" size="mini" class="theme-select no-p normal-disabled" @change="()=>{foreignKeyChange(scope.row, scope.$index)}">
                  <el-option v-for="(item, index) in currencyList" v-if="_ifSubjectForeign(item, scope.row)" :key="index" :label="item.value" :value="item.value"/>
                </el-select>
                <span>:</span>
                <span v-if="ifShowAssistTable(scope.row)" style="width: 70px;" class="text-b mini">{{ scope.row.foreignRate ? _formatForeignCurrencyEmpty(scope.row.foreignRate) : '--' }}</span>
                <span v-else style="width: 70px;" class="text-b mini">{{ _formatForeignCurrencyEmpty(scope.row.foreignRate) }}</span>
              </div>
              <div>
                <span>原币:</span>
                <span v-if="ifShowAssistTable(scope.row)" :class="$numberClass(scope.row.foreignMoney)" style="width: 126px;" class="text-b mini">{{ localFormatForeignCurrencyBottomShow(scope.row.foreignMoney) }}</span>
                <template v-else>
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
                </template>
              </div>
            </div>
          </template>
        </el-table-column>
        <template v-if="cardInput">
          <el-table-column :resizable="false">
            <div slot="header" class="n-header">
              <number-grid-header :title="'借方'"/>
            </div>
            <template slot-scope="scope">
              <div v-if="scope.row && scope.row.last" class="right-cell cell-input-wrap">
                <number-grid :count="''+scope.row.debit"/>
              </div>
              <template v-else>
                <div v-if="ifShowAssistTable(scope.row)" :class="['cell-input-wrap', scope.row.debitActive ? 'c-active' : '']" @click="activeChange(scope.row, 'debitActive', 'debit')">
                  <number-grid :count="''+scope.row.debit"/>
                </div>
                <div v-else class="cell-input-wrap">
                  <number-grid :count="''+scope.row.debit"/>
                  <el-input
                    v-model="scope.row.debit"
                    :class="$numberClass(scope.row.debit)"
                    class="input-h number-input f-h"
                    size="small"
                    @change="()=>{debitLenderChange('debit', scope.row, scope.$index)}"
                  />
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column :resizable="false">
            <div slot="header" class="n-header">
              <number-grid-header :title="'贷方'"/>
            </div>
            <template slot-scope="scope">
              <div v-if="scope.row && scope.row.last" class="right-cell cell-input-wrap">
                <number-grid :count="''+scope.row.lender"/>
              </div>
              <template v-else>
                <div v-if="ifShowAssistTable(scope.row)" :class="['cell-input-wrap', scope.row.lenderActive ? 'c-active' : '']" @click="activeChange(scope.row, 'lenderActive', 'lender')">
                  <number-grid :count="''+scope.row.lender"/>
                </div>
                <div v-else class="cell-input-wrap">
                  <number-grid :count="''+scope.row.lender"/>
                  <el-input
                    v-if="!ifShowAssistTable(scope.row)"
                    v-model="scope.row.lender"
                    :class="$numberClass(scope.row.lender)"
                    class="input-h number-input f-h"
                    size="small"
                    @change="()=>{debitLenderChange('lender', scope.row, scope.$index)}"
                  />
                </div>
              </template>
              <div class="right-btn-wrap">
                <el-button tabindex="-1" type="success" icon="el-icon-plus" circle size="mini" @click="addRow(scope.$index)"/>
                <el-button :disabled="dtlList.length === 3 && scope.$index < 2" tabindex="-1" type="danger" icon="el-icon-close" circle size="mini" @click="deleteRow(scope.$index)"/>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :resizable="false"
            label="借方">
            <template slot-scope="scope">
              <div v-if="scope.row && scope.row.last" class="right-cell">
                <span :class="$numberClass(scope.row.debit)">{{ _formatStandardCurrencyAbs(scope.row.debit) }}</span>
              </div>
              <template v-else>
                <div v-if="ifShowAssistTable(scope.row)" :class="['cell-input-wrap', scope.row.debitActive ? 'c-active' : '']" @click="activeChange(scope.row, 'debitActive', 'debit')">
                  <span :class="$numberClass(scope.row.debit)" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.debit) }}</span>
                </div>
                <div v-else class="cell-input-wrap">
                  <span :class="$numberClass(scope.row.debit)" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.debit) }}</span>
                  <el-input
                    v-model="scope.row.debit"
                    :class="$numberClass(scope.row.debit)"
                    class="input-h number-input f-h"
                    size="small"
                    @change="()=>{debitLenderChange('debit', scope.row, scope.$index)}"
                  />
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="贷方">
            <template slot-scope="scope">
              <div v-if="scope.row && scope.row.last" class="right-cell">
                <span :class="$numberClass(scope.row.lender)">{{ _formatStandardCurrencyAbs(scope.row.lender) }}</span>
              </div>
              <template v-else>
                <div v-if="ifShowAssistTable(scope.row)" :class="['cell-input-wrap', scope.row.lenderActive ? 'c-active' : '']" @click="activeChange(scope.row, 'lenderActive', 'lender')">
                  <span :class="$numberClass(scope.row.lender)" class="text-n number-text">{{ _formatStandardCurrencyAbs(scope.row.lender) }}</span>
                </div>
                <div v-else class="cell-input-wrap">
                  <span
                    :class="$numberClass(scope.row.lender)"
                    class="text-n number-text"
                  >
                    {{ _formatStandardCurrencyAbs(scope.row.lender) }}
                  </span>
                  <el-input
                    v-if="!ifShowAssistTable(scope.row)"
                    v-model="scope.row.lender"
                    :class="$numberClass(scope.row.lender)"
                    class="input-h number-input f-h"
                    size="small"
                    @change="()=>{debitLenderChange('lender', scope.row, scope.$index)}"
                  />
                </div>
              </template>
              <div class="right-btn-wrap">
                <el-button tabindex="-1" type="success" icon="el-icon-plus" circle size="mini" @click="addRow(scope.$index)"/>
                <el-button :disabled="dtlList.length === 3 && scope.$index < 2" tabindex="-1" type="danger" icon="el-icon-close" circle size="mini" @click="deleteRow(scope.$index)"/>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <assist-add-table v-if="ifShowAssistTable(editRow)" :local-model="model" :local-row="editRow" @moneyChange="formatDetailList"/>
      <div v-if="ifBusinessDate" class="bottom-info">
        <template v-if="ifBottomDetail">
          <span class="item">财务主管: {{ certTemp.cfoName }}</span>
          <span class="item">审核: {{ certTemp.verifyName }}</span>
          <span class="item">制单: {{ certTemp.creatName }}</span>
          <span class="item">出纳: {{ certTemp.cashName }}</span>
        </template>
        <span>业务日期:</span>
        <el-date-picker
          :disabled="editRow.blank"
          :picker-options="pickerOptions"
          v-model="editRow.businessDate"
          :editable="false"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
        />
      </div>
    </div>
    <subject-select-dialog ref="subjectSelectDialog" @ok="subjectSelectDialogOk"/>
    <digest-select ref="digestSelect" @ok="digestSelectOk"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHsCertDtlPara, createHsCertDtlAst } from '@/common/create'
import SubjectSelectDialog from '@/businessComponents/SubjectSelectDialog'
import DigestSelect from '@/businessComponents/DigestSelect'
import AssistAddTable from '@/businessComponents/AssistAddTable'
import NumberGrid from '@/businessComponents/NumberGrid'
import NumberGridHeader from '@/businessComponents/NumberGridHeader'
import business from '@/common/business'
import commonMixins from '@/mixins/common'
export default {
  name: 'VoucherAddTable',
  components: {
    SubjectSelectDialog,
    DigestSelect,
    AssistAddTable,
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
    model: {
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
      type: 'add',
      editRow: {
        blank: true,
        ...createHsCertDtlPara()
      },
      pickerOptions: {
      },
      loading: false,
      showNumCol: false,
      showForeignCurrencyCol: false,
      options: []
    }
  },
  computed: {
    ...mapGetters([
      'bookInfo',
      'subjectTree',
      // 只能选择末级科目
      'subjectListLast',
      'currencyList',
      'sysParam'
    ])
  },
  watch: {
    dtlList() {
      this.ifShowNumCol()
      this.ifShowForeignCurrencyCol()
      this.formatDetailList()
    },
    subjectListLast() {
      this.options = this.$groupSubjectList(this.subjectListLast, this.model)
    }
  },
  created() {
    this.ifShowNumCol()
    this.ifShowForeignCurrencyCol()
    this.formatDetailList()
    // 设置时间选择器
    this.pickerOptions = business.getDisabledDateFn(this.$commonQueryParam)
    this.options = this.$groupSubjectList(this.subjectListLast, this.model)
  },
  methods: {
    // 是否显示全量精度
    ifShowForeignPop(value) {
      value = '' + value
      const dig = value.split('.')[1]
      const num = parseFloat(this.sysParam.foreignCurrencyDig || 0)
      return dig && dig.length > num
    },
    localFormatForeignCurrencyBottomShow(value) {
      return this._formatForeignCurrencyAbs(value) || '--'
    },
    localFormatUnitPriceBottomShow(value) {
      return this._formatUnitPriceAbs(value) || '--'
    },
    // 表格合并规则
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let col = 2
      if (this.showNumCol) {
        col++
      }
      if (this.bookInfo.isForeignCurrency === '1' && this.showForeignCurrencyCol) {
        col++
      }
      const colList = []
      for (let i = 1; i < col; i++) {
        colList.push(i)
      }
      if (row && row.last) {
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: col
          }
        }
        if (colList.indexOf(columnIndex) !== -1) {
          return {
            rowspan: 1,
            colspan: 0
          }
        }
      }
    },
    // 选择摘要
    digestSelectOk(value) {
      this.editRow.digest = value
    },
    // 借贷联动
    debitLenderChange(key, row, index) {
      row[key] = this.$clearNoNum(row[key])
      const valueRaw = parseFloat(row[key] || 0)
      if (valueRaw > 999999999.99) {
        row[key] = ''
      }
      // 不正确的输入直接返回
      // if (!row[key]) {
      //   return
      // }
      if (key === 'debit') {
        row.lender = ''
      } else {
        row.debit = ''
      }
      this.formatDetailList()
      this.debitLenderAutoPriceForeignMoney(key, row)
    },
    // 数量变了
    numChange(row, index) {
      let key = 'debit'
      const debit = parseFloat(row.debit || 0)
      const lender = parseFloat(row.lender || 0)
      if (debit) {
        key = 'debit'
      }
      if (lender) {
        key = 'lender'
      }
      const num = parseFloat(row.num || 0)
      const price = parseFloat(row.price || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      if (price) {
        // 有外币
        if (this.ifShowForeignCurrencyRow(row)) {
          if (foreignKey) {
            row[key] = (price * num * foreignRate).toFixed(2)
          }
          row.foreignMoney = (price * num)
        } else {
          row[key] = (price * num).toFixed(2)
        }
      }
    },
    // 单价修改
    priceChange(row, index) {
      let key = debit
      const debit = parseFloat(row.debit || 0)
      const lender = parseFloat(row.lender || 0)
      if (debit) {
        key = 'debit'
      }
      if (lender) {
        key = 'lender'
      }
      const num = parseFloat(row.num || 0)
      const price = parseFloat(row.price || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      // 有数量，肯定有数量核算
      if (num) {
        // 有外币
        if (this.ifShowForeignCurrencyRow(row)) {
          if (foreignKey) {
            row[key] = (price * num * foreignRate).toFixed(2)
          }
          row.foreignMoney = (price * num)
        } else {
          row[key] = (price * num).toFixed(2)
        }
      }
      // 没数量就不用看
    },
    // 币别切换
    foreignKeyChange(row, index) {
      this.currencyList.forEach((currency) => {
        if (currency.value === row.foreignKey) {
          row.foreignRate = currency.attrValue
        }
      })
      let key = 'debit'
      const debit = parseFloat(row.debit || 0)
      const lender = parseFloat(row.lender || 0)
      if (debit) {
        key = 'debit'
      }
      if (lender) {
        key = 'lender'
      }
      const foreignRate = parseFloat(row.foreignRate || 0)
      const foreignMoney = parseFloat(row.foreignMoney || 0)
      if (foreignMoney) {
        // 有外币
        row[key] = (foreignMoney * foreignRate).toFixed(2)
      } else {
        const value = parseFloat(row[key] || 0)
        if (value) {
          row.foreignMoney = value / foreignRate
        }
      }
    },
    // 原币修改
    foreignMoneyChange(row, index) {
      let key = 'debit'
      const debit = parseFloat(row.debit || 0)
      const lender = parseFloat(row.lender || 0)
      if (debit) {
        key = 'debit'
      }
      if (lender) {
        key = 'lender'
      }
      const num = parseFloat(row.num || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      const foreignMoney = parseFloat(row.foreignMoney || 0)
      // 有数量
      if (this.ifShowNumRow(row) && num) {
        row.price = (foreignMoney / num).toFixed(2)
      }
      // 有外币,肯定有外币核算
      if (foreignKey) {
        // 有外币
        row[key] = (foreignMoney * foreignRate).toFixed(2)
      }
    },
    // 输入借贷，联动核算
    debitLenderAutoPriceForeignMoney(key, row) {
      const debitLender = row[key]
      const num = parseFloat(row.num || 0)
      const foreignKey = row.foreignKey
      const foreignRate = parseFloat(row.foreignRate || 0)
      // 有数量
      if (this.ifShowNumRow(row) && num) {
        // 有外币
        if (foreignKey) {
          row.price = (debitLender / (foreignRate * num)).toFixed(2)
        } else {
          // 汇率默认为1
          row.price = (debitLender / (num)).toFixed(2)
        }
      }
      // 有外币
      if (this.ifShowForeignCurrencyRow(row) && foreignKey) {
        // 有外币
        row.foreignMoney = (debitLender / (foreignRate))
      }
    },
    // 表格格式化
    formatDetailList() {
      let debit = 0
      let lender = 0
      const lastIndex = this.dtlList.length - 1
      for (let i = 0; i < lastIndex; i++) {
        const item = this.dtlList[i]
        const debitTemp = parseFloat(item.debit || 0)
        const lenderTemp = parseFloat(item.lender || 0)
        const numTemp = parseFloat(item.num || 0)
        const priceTemp = parseFloat(item.price || 0)
        debit += debitTemp
        lender += lenderTemp
        item.debit = debitTemp || ''
        item.lender = lenderTemp || ''
        item.num = numTemp || ''
        item.price = priceTemp || ''
      }
      // 录凭证不用计算
      // this.dtlList[lastIndex].digest = `合计:${this.$digitUppercase(debit)}`
      this.dtlList[lastIndex].debit = debit
      this.dtlList[lastIndex].lender = lender
    },
    subjectChangeAuto(row) {
      if (!row.subId) {
        // 清空的话就算了
        return false
      }
      const rowDebit = parseFloat(row.debit || 0)
      const rowLender = parseFloat(row.lender || 0)
      if (rowDebit || rowLender) {
        // 有数据
        return false
      }
      let debit = 0
      let lender = 0
      const lastIndex = this.dtlList.length - 1
      let lastKey = ''
      for (let i = 0; i < lastIndex; i++) {
        const item = this.dtlList[i]
        const debitTemp = parseFloat(item.debit || 0)
        const lenderTemp = parseFloat(item.lender || 0)
        if (debitTemp) {
          lastKey = 'debit'
        } else if (lenderTemp) {
          lastKey = 'lender'
        }
        debit += debitTemp
        lender += lenderTemp
        item.debit = debitTemp || ''
        item.lender = lenderTemp || ''
      }
      // 平的那就算了
      if (debit === lender) {
        return false
      }
      if (lastKey) {
        if (lastKey === 'debit') {
          row.lender = debit - lender
        } else {
          row.debit = lender - debit
        }
      } else {
        const diff = debit - lender
        if (diff > 0) {
          row.lender = diff
        } else {
          row.debit = Math.abs(diff)
        }
      }
      this.formatDetailList()
    },
    // 增加行
    addRow(index, data) {
      this.dtlList.splice(index + 1, 0, data || {
        ...createHsCertDtlPara(),
        hsCertDtlAstList: [createHsCertDtlAst()]
      })
    },
    // 删除行
    deleteRow(index) {
      this.dtlList.splice(index, 1)
    },
    openSubjectSelectDialog(row) {
      this.editRow = row
      this.$refs.subjectSelectDialog.open(this.model)
    },
    subjectBlur() {
      this.options = this.$groupSubjectList(this.subjectListLast, this.model)
    },
    // 科目弹窗选择回调
    subjectSelectDialogOk(data) {
      this.editRow.subId = data.phid
      this.editRow.subCode = data.encode
      this.editRow.subName = data.name
      this.editRow.subDetail = data
      this.options = this.$groupSubjectList(this.subjectListLast, this.model)
      this.subjectChangeAuto(this.editRow)
      this.ifShowAssistTable(this.editRow)
      this.prepareAssist(this.editRow)
      this.ifShowNumCol()
      this.ifShowForeignCurrencyCol()
    },
    // 科目下拉回调
    subjectChange(value, row) {
      if (!value) {
        row.subId = ''
        row.subCode = ''
        row.subName = ''
        row.subDetail = {}
      } else {
        for (let i = 0; i < this.subjectListLast.length; i++) {
          const item = this.subjectListLast[i]
          if (value === item.phid) {
            row.subId = item.phid
            row.subCode = item.encode
            row.subName = item.name
            row.subDetail = item
            // 科目选择了那就等同于选择了当前行
            this.$refs.table.setCurrentRow(row)
            break
          }
        }
      }
      this.subjectChangeAuto(row)
      this.ifShowAssistTable(row)
      this.prepareAssist(row)
      this.ifShowNumCol()
      this.ifShowForeignCurrencyCol()
    },
    openDigestSelect(row) {
      this.editRow = row
      this.$refs.digestSelect.open()
    },
    // 点击行
    currentChange(currentRow) {
      if (currentRow) {
        this.$emit('currentChange', currentRow)
        // 如果点击的是合计那就清空
        if (currentRow.last) {
          this.$refs.table.setCurrentRow()
        } else {
          this.editRow = currentRow
          this.otherFocus()
        }
      } else {
        this.editRow = {
          blank: true,
          ...createHsCertDtlPara(),
          hsCertDtlAstList: []
        }
      }
    },
    // 是否有辅助项
    ifHasAssist(item) {
      return item.subDetail && item.subDetail.subAstTypeVOList && item.subDetail.subAstTypeVOList.length > 0
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
        if (item.subDetail && item.subDetail.amountCheck === '1') {
          flag = true
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
      if (item.subDetail && item.subDetail.amountCheck === '1') {
        flag = true
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
        const item = rec
        // 排除有辅助项的
        if (this.ifHasAssist(item)) {
          return false
        }
        if (item.subDetail && item.subDetail.foreignCheck === '1') {
          flag = true
        }
        if (parseFloat(item.foreignMoney || 0)) {
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
      if (item.subDetail && item.subDetail.foreignCheck === '1') {
        flag = true
      }
      if (parseFloat(item.foreignMoney || 0)) {
        flag = true
      }
      return flag
    },
    // 摘要匹配
    querySearch(queryString, cb) {
      this.$http.post('account/cert/getDigest', {
        condition: queryString,
        currPage: 1,
        pageSize: 10,
        bookId: this.$commonQueryParam.bookId,
        orgId: this.$commonQueryParam.orgId,
        year: this.$commonQueryParam.year
      }).then((res) => {
        cb(res.data.list || [])
      })
    },
    // 科目匹配
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        let list = this.subjectListLast.filter(item => {
          return item.encode.indexOf(query) > -1 || item.name.indexOf(query) > -1
        })
        if (list.length === 0) {
          list = this.subjectListLast
        }
        this.options = this.$groupSubjectList(list, this.model)
        this.loading = false
      } else {
        this.options = this.$groupSubjectList(this.subjectListLast, this.model)
      }
    },
    // 是否辅助项模式
    ifShowAssistTable(listItem) {
      let flag = false
      if (listItem.subDetail && listItem.subDetail.subAstTypeVOList && listItem.subDetail.subAstTypeVOList.length > 0) {
        flag = true
        // 开启了辅助项，辅助项明细如果没数据就初始化一个
        if (!(listItem.hsCertDtlAstList && listItem.hsCertDtlAstList.length > 0)) {
          listItem.hsCertDtlAstList = [createHsCertDtlAst()]
        }
      }
      return flag
    },
    // 辅助项准备，只在切换科目的时候会调用
    prepareAssist(row) {
      // 开启辅助项的话，明细里面的数据就清空
      row.num = ''
      row.price = ''
      row.foreignRate = ''
      row.foreignMoney = ''
      row.foreignKey = ''
      if (this.ifShowAssistTable(row)) {
        row.hsCertDtlAstList = [createHsCertDtlAst()]
      } else {
        row.hsCertDtlAstList = []
      }
    },
    // 借贷高亮部分
    activeChange(listItem, key, key2) {
      setTimeout(() => {
        this.dtlList.forEach((localItem) => {
          localItem['debitActive'] = false
          localItem['lenderActive'] = false
        })
        listItem[key] = true
        if (listItem.tempMoney) {
          listItem.debit = ''
          listItem.lender = ''
          listItem[key2] = listItem.tempMoney
        }
        console.log(listItem)
        this.formatDetailList()
      }, 100)
    },
    // 换行以后移除所有高亮
    otherFocus() {
      this.dtlList.forEach((localItem) => {
        localItem['debitActive'] = false
        localItem['lenderActive'] = false
      })
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
  }
  .a-2 {
    padding-right: 30px;
  }
</style>
