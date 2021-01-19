<template>
  <div id="voucherNewShowCardList">
    <div v-if="list.length === 0" class="empty-wrap">暂无数据</div>
    <div v-for="(item, index) in list" :key="index" class="sub-table clearfix">
      <div class="a">
        <div class="text">
          <el-checkbox v-model="item.checked" class="check" @change="selectionChange"/>
          <span style="margin-left: 10px">{{ index+1 }}</span>
        </div>
      </div>
      <div class="card-content" @click="toggleModal(item, index)">
        <div v-if="item.cert[0].verifyStatus === '2'" class="verify-tag">
          <h4>已审核</h4>
          <p>{{ $formatToDay(item.cert[0].verifyDate) }}</p>
        </div>
        <div class="b">
          <div class="table-title has-sub">
            <div class="sub">
              <span style="margin-right: 40px">凭证日期:{{ $formatToDay(item.cert[0].certDate) }}</span>
              <span>凭证字号:{{ _formatCertType(item.cert[0].certType) }}-{{ item.cert[0].certNo }}</span>
            </div>
          </div>
          <div class="table-wrap">
            <el-table
              :border="true"
              :data="item.cert[0].certDtlVOList"
              :header-cell-style="{textAlign: 'center'}"
              :span-method="objectSpanMethod"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                align="center"
                label="摘要">
                <template slot-scope="scope">
                  <span>{{ scope.row.digest }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="科目">
                <template slot-scope="scope">
                  <span>{{ scope.row.subName ? `${scope.row.subCode} - ${scope.row.subName }`:'' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                label="借方">
                <template slot-scope="scope">
                  <span v-if="scope.$index === item.cert[0].certDtlVOList.length-1">{{ _formatStandardCurrencyEmpty(scope.row.debit) }}</span>
                  <span v-else>{{ _formatStandardCurrencyEmpty(scope.row.debit) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                label="贷方">
                <template slot-scope="scope">
                  <span v-if="scope.$index === item.cert[0].certDtlVOList.length-1">{{ _formatStandardCurrencyEmpty(scope.row.lender) }}</span>
                  <span v-else>{{ _formatStandardCurrencyEmpty(scope.row.lender) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="b">
          <div class="table-title has-sub">
            <div class="sub">
              <span style="margin-right: 40px">凭证日期:{{ $formatToDay(item.cert[1].certDate) }}</span>
              <span>凭证字号:{{ _formatCertType(item.cert[1].certType) }}-{{ item.cert[1].certNo }}</span>
            </div>
          </div>
          <div class="table-wrap">
            <el-table
              :border="true"
              :data="item.cert[1].certDtlVOList"
              :header-cell-style="{textAlign: 'center'}"
              :span-method="objectSpanMethod"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                align="center"
                label="摘要">
                <template slot-scope="scope">
                  <span>{{ scope.row.digest }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="科目">
                <template slot-scope="scope">
                  <span>{{ scope.row.subName ? `${scope.row.subCode} - ${scope.row.subName }`:'' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                label="借方">
                <template slot-scope="scope">
                  <span v-if="scope.$index === item.cert[1].certDtlVOList.length-1">{{ _formatStandardCurrencyEmpty(scope.row.debit) }}</span>
                  <span v-else>{{ _formatStandardCurrencyEmpty(scope.row.debit) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                label="贷方">
                <template slot-scope="scope">
                  <span v-if="scope.$index === item.cert[1].certDtlVOList.length-1">{{ _formatStandardCurrencyEmpty(scope.row.lender) }}</span>
                  <span v-else>{{ _formatStandardCurrencyEmpty(scope.row.lender) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div v-if="showModalAll && item.showModal" class="modal" @click="toggleModal(item,index)">
        <div class="btn-list">
          <el-button class="btn" icon="el-icon-document" circle @click="toView(item.cert)"/>
          <el-button v-if="$hasPermission('凭证管理--删除') && item.cert[0].verifyStatus !== '2'" class="btn" icon="el-icon-delete" circle @click="toDelete(item.cert)"/>
          <el-button v-if="item.cert[0].verifyStatus !== '2'" class="btn" icon="el-icon-edit-outline" circle @click="toEdit(item.cert)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixins from '@/mixins/common'
export default {
  name: 'VoucherNewShowCard',
  mixins: [commonMixins],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    showModalAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checked: false,
      selection: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'certTypeList'
    ])
  },
  created() {
  },
  methods: {
    toggleModal(item, index) {
      item.showModal = !item.showModal
      this.list.forEach((item, subIndex) => {
        if (index !== subIndex) {
          item.showModal = false
        }
      })
    },
    selectionChange() {
      const raw = []
      this.list.forEach((item) => {
        if (item.checked === true) {
          raw.push(item)
        }
      })
      this.selection = raw
      this.$emit('checkChange', {
        allCheck: this.selection.length === this.list.length,
        isIndeterminate: this.selection.length > 0 && this.selection.length < this.list.length
      })
    },
    allCheck(check) {
      this.list.forEach((item) => {
        item.checked = check || false
      })
      this.selection = this.list
    },
    getSelection() {
      return this.selection
    },
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
    toEdit(item) {
      const ids = []
      item.forEach((subItem) => {
        ids.push(subItem.phid)
      })
      this.$router.push({
        path: `/voucherManagement/voucherAdd?type=edit&phids=${ids.join('-')}`
      })
    },
    toView(item) {
      const ids = []
      item.forEach((subItem) => {
        ids.push(subItem.phid)
      })
      this.$router.push({
        path: `/voucherManagement/voucherView?phids=${ids.join('-')}`
      })
    },
    toDelete(item) {
      this.$confirm('一旦删除，将不可恢复，是否确定删除此凭证?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false
      }).then(() => {
        this.$http.post(`account/cert/deleteCertMuch/${this.$commonQueryParam.bookId}`, {
          finBudgIds: [item[0].finBudgId, item[1].finBudgId],
          bookId: this.$commonQueryParam.bookId
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('ok')
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sub-table {
    position: relative;
    margin-bottom: 10px;
    background-color: #fff;
    &:last-child {
      margin-bottom: 0;
    }
    .a {
      .text {
        position: absolute;
        height: 16px;
        margin: auto;
        left: 10px;
        top: 0;
        bottom: 0;
        line-height: 16px;
      }
    }
    .modal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background-color: rgba(0,0,0,0.3);
    }
  }
  .btn-list {
    text-align: center;
    height: 60px;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
    .btn {
      width: 60px;
      height: 60px;
      border-radius: 60px;
      font-size: 24px;
    }
    .btn + .el-button {
      margin-left: 60px;
    }
  }
  .bottom-info {
    background-color: #fff;
    padding: 12px;
    border: 1px solid #BBBBBB;
    border-top: 0;
    line-height: 23px;
    font-size: 14px;
    color: rgb(96, 98, 102);
    span {
      margin-right: 150px;
    }
  }
  .sub-table {
    border: 1px solid #BBBBBB;
    overflow: hidden;
  }
  .a {
    float: left;
    width: 4%;
  }
  .b {
    float: left;
    width: 50%;
  }
  .card-content {
    padding-left: 4%;
  }
  .empty-wrap {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    color: #909399;
  }
</style>

