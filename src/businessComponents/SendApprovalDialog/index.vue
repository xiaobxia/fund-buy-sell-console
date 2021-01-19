<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body width="50%" title="送审">
    <div class="s-title" style="margin: 0 0 10px 0">
      <span>送审备注</span>
      <div style="float: right">
        <span class="label-text">附件:</span>
        <span>{{ fileList.length }}</span>
        <span>件</span>
        <i class="el-icon-paperclip" @click="openUploadFileDialog"/>
      </div>
    </div>
    <el-input
      :rows="4"
      v-model="remark"
      :maxlength="100"
      type="textarea"
      placeholder="请输入内容"/>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="s-title">送审流程</div>
        <el-table
          ref="typeTable"
          :highlight-current-row="true"
          :data="processList"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{textAlign: 'center'}"
          border
          class="light-header"
          style="width: 100%"
          @current-change="typeCurrentChange">
          <el-table-column
            prop="processCode"
            label="流程编码"/>
          <el-table-column
            prop="processName"
            label="流程名称"/>
        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="s-title">接收人</div>
        <el-table
          :data="operatorList"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{textAlign: 'center'}"
          border
          class="light-header"
          style="width: 100%">
          <el-table-column
            prop="enCode"
            label="操作员编码"/>
          <el-table-column
            prop="userName"
            label="姓名"/>
        </el-table>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button :disabled="operatorList.length === 0" :loading="loading" type="primary" @click="okHandler">确定</el-button>
    </div>
    <upload-file-dialog ref="uploadFileDialog" @ok="uploadFileDialogOk"/>
  </el-dialog>
</template>

<script>
import UploadFileDialog from '@/businessComponents/UploadFileDialog'
export default {
  name: 'SendApprovalDialog',
  components: {
    UploadFileDialog
  },
  data() {
    return {
      dialogVisible: false,
      remark: '',
      processList: [],
      operatorList: [],
      docType: '',
      typeCurrentRow: null,
      loading: false,
      rowList: [],
      fileList: [],
      expendSsId: ''
    }
  },
  computed: {},
  created() {
  },
  methods: {
    openOld(docType, rowList) {
      this.loading = false
      this.docType = docType
      const businessInfo = []
      this.rowList = rowList
      rowList.forEach((item) => {
        if (this.docType === 2) {
          businessInfo.push({
            'businessId': item.phid,
            'money': item.budgetaMount || 0
          })
        } else {
          businessInfo.push({
            'businessId': item.ssId,
            'money': item.budgetaMount || 0
          })
        }
      })
      this.queryAlternativeModelList({
        'businessInfo': businessInfo,
        docType
      }).then(() => {
        if (this.processList.length > 0) {
          this.$refs.typeTable.setCurrentRow(this.processList[0])
        }
      })
      this.remark = ''
      this.dialogVisible = true
    },
    open(docType, rowList, ssId) {
      this.expendSsId = ssId || ''
      this.loading = false
      this.docType = docType
      const businessInfo = []
      this.rowList = rowList
      this.remark = ''
      rowList.forEach((item) => {
        if (this.docType === 2) {
          businessInfo.push({
            'businessId': item.phid,
            'money': item.budgetaMount || 0
          })
        } else {
          businessInfo.push({
            'businessId': item.ssId,
            'money': item.budgetaMount || 0
          })
        }
      })
      this.queryAlternativeModelList({
        'businessInfo': businessInfo,
        docType
      }).then(() => {
        if (this.processList.length > 0) {
          if (this.processList.length === 1) {
            this.remark = ''
            this.typeCurrentRow = this.processList[0]
            this.okHandler()
          } else {
            this.dialogVisible = true
            this.$nextTick(() => {
              this.$refs.typeTable.setCurrentRow(this.processList[0])
            })
          }
        } else {
          this.dialogVisible = true
        }
      })
    },
    queryAlternativeModelList(query) {
      return this.$http.post('budget/processModel/alternativeModelList', query).then((res) => {
        this.processList = res.data || []
      })
    },
    typeCurrentChange(row) {
      this.typeCurrentRow = row
      return this.reQueryOperator()
    },
    reQueryOperator() {
      return this.$http.get('budget/position/alterNativeJobUserVO', {
        phid: this.typeCurrentRow.phid
      }).then((res) => {
        this.operatorList = res.data
      })
    },
    openUploadFileDialog() {
      this.$refs.uploadFileDialog.open(this.fileList)
    },
    uploadFileDialogOk(list) {
      this.fileList = list
    },
    okHandler() {
      this.loading = true
      let businessIds = []
      if (this.docType === 2) {
        businessIds = this.rowList.map((item) => {
          return item.phid
        })
      } else {
        businessIds = this.rowList.map((item) => {
          return item.ssId
        })
      }
      if (this.expendSsId) {
        if (typeof this.expendSsId === 'string') {
          businessIds = [this.expendSsId]
        } else {
          businessIds = this.expendSsId
        }
      }
      businessIds = Array.from(new Set(businessIds))
      this.$http.post('budget/processInst/submitForApproval', {
        'businessIds': businessIds,
        'docType': this.docType,
        'processId': this.typeCurrentRow.phid,
        'remark': this.remark,
        attachmentEntities: this.fileList
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .s-title {
    margin: 10px 0;
  }
</style>
