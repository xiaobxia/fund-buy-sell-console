<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    width="1000px"
    title="支付单查看">
    <div>
      <div class="filter-container">
        <div class="left-block">
          <span>支付单号：{{ form.payNo }}</span>
        </div>
        <div class="right-block">
          <el-button :loading="loading" type="primary" size="small" @click="okHandler">保存</el-button>
          <el-button :loading="loading" type="primary" size="small" @click="okApHandler">保存并送审</el-button>
          <el-button type="primary" size="small">打印</el-button>
        </div>
      </div>
      <el-card class="box-card-body" style="height: 130px">
        <div class="dialogtitle">
          <span class="iconspan2">付款方</span>
        </div>
        <el-row class="d-l">
          <span>付款单位：{{ orgName }}</span>
        </el-row>
        <el-row class="d-l">
          <el-col :span="16">
            <span>付款账户：</span>
            <span v-if="type === 'view'">{{ form.payAccountName }}</span>
            <el-select
              v-else
              v-model="form.payAccountName"
              size="small"
              style="width: 300px"
              placeholder="请选择"
              @change="payAccountChange">
              <el-option
                v-for="item in orgBankList"
                :key="item.bankNumber"
                :label="item.accountName"
                :value="item.accountName"
              />
            </el-select>
          </el-col>
          <el-col :span="8" style="text-align: right">
            <span>支付方式：</span>
            <span v-if="type === 'view'">{{ $formatPayWay(form.payMethed) }}</span>
            <el-select
              v-else
              v-model="form.payMethed"
              size="small"
              style="width: 200px"
              placeholder="请选择">
              <el-option
                v-for="item in $PAY_WAY"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card-body" style="height: 360px;margin: 20px 0">
        <div class="dialogtitle">
          <span class="iconspan2">收款方</span>
        </div>
        <el-row v-if="type !== 'view'" class="d-l">
          <span>批量设置转账方式：</span>
          <el-select
            v-model="payType"
            size="small"
            style="width: 200px"
            placeholder="请选择"
            @change="payTypeChange">
            <el-option
              v-for="item in $TRANS_WAY"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
        <el-table
          :data="form.payMentDtlVOList"
          :height="type==='view'? '290px':'240px'"
          :header-cell-style="{textAlign: 'center'}"
          border
          size="small"
          style="width: 100%;margin-top: 15px">
          <el-table-column
            type="index"
            label="序号"
            width="55"/>
          <el-table-column
            min-width="150"
            label="收款单位/部门">
            <template slot-scope="scope">
              <span>{{ scope.row.unitName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="明细项目名称">
            <template slot-scope="scope">
              <span>{{ scope.row.detailItemName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            min-width="150"
            label="申报金额（元）">
            <template slot-scope="scope">
              <span>{{ $formatMoney(scope.row.receiveMoney) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveRemark }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="230"
            label="预算科目">
            <template slot-scope="scope">
              <span v-if="type === 'view'">{{ formatSubName(scope.row.payBudgetAccount) }}</span>
              <el-select
                v-else
                v-model="scope.row.payBudgetAccount"
                size="small"
                filterable
                no-data-text="无预算科目数据"
                style="width: 200px"
                placeholder="请选择">
                <el-option
                  v-for="item in budgetSub"
                  :key="item.phid"
                  :label="item.name"
                  :value="item.phid"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="转账方式">
            <template slot-scope="scope">
              <span>{{ $formatTransWay(scope.row.payType) }}</span>
              <!--<el-select-->
              <!--v-else-->
              <!--v-model="scope.row.payType"-->
              <!--size="small"-->
              <!--style="width: 200px"-->
              <!--placeholder="请选择"-->
              <!--@change="payTypeChange">-->
              <!--<el-option-->
              <!--v-for="item in $TRANS_WAY"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value"-->
              <!--/>-->
              <!--</el-select>-->
            </template>
          </el-table-column>
          <el-table-column
            min-width="230"
            label="收款方账户名称">
            <template slot-scope="scope">
              <span v-if="type === 'view'">{{ scope.row.receiveAccountName }}</span>
              <el-select
                v-else
                v-model="scope.row.receiveAccountName"
                size="small"
                style="width: 200px"
                placeholder="请选择"
                @change="()=>{receiveAccountNameChange(scope.row)}">
                <el-option
                  v-for="item in subBankList"
                  :key="item.accountNumber"
                  :label="item.accountName"
                  :value="item.accountName"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="收款账户">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveAccount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="开户行">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveBankName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="银行账户">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveBankNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="支付状态">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            label="支付异常原因">
            <template slot-scope="scope">
              <span>{{ scope.row.errorMsg }}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="200"
            label="重新支付后关联支付单编号">
            <template slot-scope="scope">
              <span>-</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="sub-d">
        <span>
          <span class="s-t">
            <i class="icon-newgrand icon-newgrand-pc-spl"/>
            <span class="v-t">{{ $formatSPStatus(form.approveStatus) }}</span>
          </span>
          <span class="s-t">
            <i class="icon-newgrand icon-newgrand-pc-q"/>
            <span>{{ $formatBondPayStatusExpend(form.payStatus) }}</span>
          </span>
        </span>
        <span style="float: right">点击查看关联申请单信息（<span class="red-text v-t" @click="openDocDialog">申请单编号：{{ form.declarationNo }}</span>）</span>
      </div>
    </div>
    <doc-dialog ref="docDialog"/>
  </el-dialog>
</template>

<script>
import DocDialog from './docDialog'
import { mapGetters } from 'vuex'
function createForm(tar) {
  let raw = {
    actuallyPayable: '',
    amountPayable: '',
    approveStatus: '',
    declarationDt: '',
    declarationName: '',
    declarationNo: '',
    documentId: '',
    documentType: '',
    documentTypeName: '',
    payMentDtlVOList: [],
    payNo: '',
    payStatus: '',
    payTime: '',
    phid: '',
    payMethed: 1,
    payAccount: '',
    payAccountName: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'PayView',
  components: {
    DocDialog
  },
  data() {
    return {
      dialogVisible: false,
      form: createForm(),
      detailList: [],
      rules: {
        encode: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 50, message: '长度50个字符以内', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 500, message: '长度500个字符以内', trigger: 'blur' }
        ]
      },
      orgName: this.$commonQueryParam.orgName,
      payType: '',
      loading: false,
      type: 'edit',
      subBankList: []
    }
  },
  computed: {
    ...mapGetters([
      'orgBankList',
      'defaultOrgBank',
      'budgetSub'
    ])
  },
  created() {
  },
  methods: {
    formatSubName(phid) {
      for (let i = 0; i < this.budgetSub.length; i++) {
        const item = this.budgetSub[i]
        if (item.phid === phid) {
          return item.name
        }
      }
      return ''
    },
    querySubBankList() {
      return this.$http.get('pcenterGh/bankInformation/findByOrgIdAndStatus', {
        orgId: this.$commonQueryParam.orgId
      }).then((res) => {
        this.subBankList = res.data || []
      })
    },
    getSubBank(accountName) {
      for (let i = 0; i < this.subBankList.length; i++) {
        const item = this.subBankList[i]
        if (item.accountName === accountName) {
          return item
        }
      }
      return ''
    },
    getOrgBank(accountName) {
      for (let i = 0; i < this.orgBankList.length; i++) {
        const item = this.orgBankList[i]
        if (item.accountName === accountName) {
          return item
        }
      }
      return ''
    },
    payAccountChange() {
      const subBank = this.getOrgBank(this.form.payAccountName)
      this.form.payAccount = subBank.accountNumber
    },
    receiveAccountNameChange(row) {
      const subBank = this.getSubBank(row.receiveAccountName)
      row.receiveAccount = subBank.accountNumber
      row.receiveBankName = subBank.bankName
      row.receiveBankNumber = subBank.bankNumber
    },
    open(data, config) {
      config = config || {}
      this.type = config.type || 'edit'
      this.payType = ''
      this.form = data
      this.subBankList = []
      this.querySubBankList()
      this.dialogVisible = true
    },
    payTypeChange() {
      this.form.payMentDtlVOList.forEach((v) => {
        v.payType = this.payType
      })
    },
    okHandler() {
      this.loading = true
      this.$http.post('pcenterGh/payment/edit', {
        ...this.form,
        payMentDtls: this.form.payMentDtlVOList
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    okApHandler() {
      this.loading = true
      this.$http.post('pcenterGh/payment/edit', {
        ...this.form,
        payMentDtls: this.form.payMentDtlVOList
      }).then(() => {
        return this.$http.post('pcenterGh/payment/batchSubmit', {
          ids: [this.form.phid]
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    openDocDialog() {
      this.$http.get('pcenterGh/payment/findDocumentInfo', {
        phId: this.form.documentId,
        type: this.form.documentType
      }).then((res) => {
        this.$refs.docDialog.open(res.data || {})
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dialogtitle {
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 20px;
    &:before {
      content: '';
      width: 6px;
      height:20px ;
      display: inline-block;
      border-radius: 3px;
      background-color: #1a84e8;
      margin-right: 5px;
      vertical-align: top;
    }
  }
  .d-l {
    line-height: 32px;
  }
  .v-t {
    cursor: pointer;
    text-decoration: underline;
  }
  .icon-newgrand {
    vertical-align: top;
    position: relative;
    top: -2px;
    margin-right: 4px;
  }
  .s-t {
    margin-right: 20px;
  }
</style>
