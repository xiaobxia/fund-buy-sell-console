<template>
  <div>
    <div class="filter-container">
      <div class="right-block">
        <el-button :loading="saveLoading" type="primary" size="small" @click="okHandler">保存</el-button>
      </div>
    </div>
    <top-form
      :hs-cert-tmp-data-entity-temp="hsCertTmpDataEntity"
      :cert-tmp-para-v-o-temp="certTmpParaVO"
      :sub-map="subMap"
    />
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="a-2">
          <div class="table-title has-sub">
            <span>财务会计</span>
          </div>
          <div class="table-wrap">
            <voucher-add-table :model="'cai'" :dtl-list="certDtlVOCaiList" :if-business-date="false"/>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="a-2">
          <div class="table-title has-sub">
            <span>预算会计</span>
          </div>
          <div class="table-wrap">
            <voucher-add-table :model="'yu'" :dtl-list="certDtlVOYuList" :if-business-date="false"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createCertTmpParaVO, createHsCertTmpDtlVO, createHsCertTmpDataEntity, createCertAstVO } from '@/common/create'
import VoucherAddTable from '@/businessComponents/VoucherAddTable'
import commonMixins from '@/mixins/common'
import TopForm from './topForm'
import { copyObjectData } from '@/utils'
export default {
  name: 'New',
  components: {
    VoucherAddTable,
    TopForm
  },
  mixins: [commonMixins],
  props: {
    mode: {
      type: String,
      default: ''
    },
    editType: {
      type: String,
      default: ''
    },
    phid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hsCertTmpDataEntity: createHsCertTmpDataEntity(),
      certTmpParaVO: createCertTmpParaVO(),
      certDtlVOCaiList: [
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO({
            digest: '合计',
            last: true
          }),
          hsCertDtlAstList: []
        }
      ],
      certDtlVOYuList: [
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO(),
          hsCertDtlAstList: [createCertAstVO()]
        },
        {
          ...createHsCertTmpDtlVO({
            digest: '合计',
            last: true
          }),
          hsCertDtlAstList: []
        }
      ],
      subMap: {
        subIds: []
      },
      type: 'add',
      editRow: {},
      form: {},
      localPhid: '',
      saveLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'financeConfig',
      'subjectListLast'
    ])
  },
  watch: {
  },
  created() {
    if (this.mode === 'dialog') {
      this.type = this.editType
      this.localPhid = this.phid
    } else {
      const query = this.$route.query
      if (query.type === 'edit') {
        this.type = 'edit'
        this.localPhid = query.phid
      } else {
        this.type = 'add'
      }
    }
    this.initPage()
  },
  methods: {
    initPage() {
      if (this.type === 'edit') {
        // 编辑
        this.$http.post(`account/certTmp/findCertTmpById/${this.localPhid.split('-')}`).then((res) => {
          const data = res.data
          this.hsCertTmpDataEntity = copyObjectData(createHsCertTmpDataEntity(), data)
          if (data.hsCertTmpSubEntityList && data.hsCertTmpSubEntityList.length > 0) {
            const subIds = []
            data.hsCertTmpSubEntityList.forEach((idItem) => {
              subIds.push(idItem.subId)
            })
            this.subMap.subIds = subIds
          }
          this.certTmpParaVO = copyObjectData(createCertTmpParaVO(), data.certTmpVOList[0])
          this.certDtlVOCaiList = this._initCertTmpDtlVOList(data.certTmpVOList[0].certTmpDtlVOList)
          // 预算
          this.certDtlVOYuList = this._initCertTmpDtlVOList(data.certTmpVOList[1].certTmpDtlVOList)
        })
      } else {
        // 新增
        this.certTmpParaVO = createCertTmpParaVO({
          ...this.$commonQueryParam,
          ...this.financeConfig,
          certYear: this.$commonQueryParam.year
        })
        this.hsCertTmpDataEntity = createHsCertTmpDataEntity({
          ...this.$commonQueryParam
        })
        this.subMap.subIds = []
      }
    },
    // 保存数据格式化
    formatSaveData() {
      return this._formatCertTmpAddBody({
        hsCertTmpDataEntity: this.hsCertTmpDataEntity,
        certType: this.certTmpParaVO.certType,
        subIds: this.subMap.subIds,
        certFormCai: this.certTmpParaVO,
        certDtlVOListCai: this.certDtlVOCaiList,
        // 预算会计也用财政的信息
        certFormYu: this.certTmpParaVO,
        certDtlVOListYu: this.certDtlVOYuList
      })
    },
    okHandler() {
      this.saveLoading = true
      const body = this.formatSaveData()
      let url = `account/certTmp/addCertTmp`
      if (this.type === 'edit') {
        url = `account/certTmp/updateCertTmp`
      }
      this.$http.post(url, body).then(() => {
        this.saveLoading = false
        this.$message({
          type: 'success',
          message: `${this.type === 'edit' ? '修改' : '新增'}成功!`
        })
        if (this.mode === 'dialog') {
          this.$emit('ok')
        } else {
          this.$router.replace({
            path: `/basicSetup/voucherTemplate`
          })
        }
      }).catch(() => {
        this.saveLoading = false
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
    padding: 12px;
    line-height: 23px;
    font-size: 14px;
    color: rgb(96, 98, 102);
    text-align: center;
    span {
      margin-right: 150px;
    }
  }
  .a-2 {
    padding-right: 30px;
  }
  .sub {
    span {
      margin-right: 30px;
    }
  }
</style>
