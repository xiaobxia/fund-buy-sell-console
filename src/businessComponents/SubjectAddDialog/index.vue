<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="dialogTitle">
    <el-form ref="form" :model="addForm" :rules="addRules" label-width="90px" size="small">
      <el-form-item label="科目编码" prop="encode">
        <el-input v-if="dialogType === 'addChild'" v-model="addForm.encode" class="diy-prepend">
          <template slot="prepend"><span class="prepend">{{ parentCode }}</span></template>
        </el-input>
        <el-input v-else :disabled="ifEdit && ifAdopted" v-model="addForm.encode"/>
      </el-form-item>
      <el-form-item label="科目名称" prop="name">
        <el-input v-model="addForm.name"/>
      </el-form-item>
      <el-form-item label="上级科目">
        <el-input v-model="parentName" :disabled="true"/>
      </el-form-item>
      <el-form-item label="科目类别" prop="subType">
        <el-select :disabled="(ifEdit && ifAdopted) || dialogType === 'addChild'" v-model="addForm.subType" class="theme-select">
          <el-option v-for="(item, index) in subjectCategoryList" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="余额方向" prop="balanceType">
        <el-radio v-for="(item,index) in $BALANCE_TYPE_LIST" :disabled="(ifEdit && ifAdopted) || dialogType === 'addChild'" :key="index" v-model="addForm.balanceType" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row>
          <el-col :span="4">
            <el-checkbox :disabled="(ifEdit && ifAdopted)" v-model="addForm.assistCheck" true-label="1" false-label="0">辅助核算</el-checkbox>
          </el-col>
          <el-col :span="20">
            <el-form-item label="辅助项目" prop="type">
              <el-select v-model="assId" :disabled="addForm.assistCheck === '0' || (ifEdit && ifAdopted)" class="theme-select" multiple placeholder="">
                <el-option v-for="(item, index) in assistList" :key="index" :label="item.name" :value="item.phid"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row>
          <el-col :span="4">
            <el-checkbox :disabled="(ifEdit && ifAdopted)" v-model="addForm.amountCheck" true-label="1" false-label="0">数量核算</el-checkbox>
          </el-col>
          <el-col :span="20">
            <el-form-item label="计量单位" prop="unit">
              <el-input :disabled="addForm.amountCheck === '0' || (ifEdit && ifAdopted)" v-model="addForm.unit" :maxlength="10"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row>
          <el-col :span="4">
            <el-checkbox :disabled="bookInfo.isForeignCurrency === '0' || (ifEdit && ifAdopted)" v-model="addForm.foreignCheck" true-label="1" false-label="0">外币核算</el-checkbox>
          </el-col>
          <el-col :span="20">
            <el-form-item label="辅助币别" prop="type">
              <el-select :disabled="bookInfo.isForeignCurrency === '0' || addForm.foreignCheck === '0' || (ifEdit && ifAdopted)" v-model="forId" class="theme-select" multiple placeholder="">
                <el-option v-for="item in currencyList" :key="item.value" :label="item.value" :value="item.phid"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="科目特征" prop="feature">
        <el-select :disabled="(ifEdit && ifAdopted) || dialogType === 'addChild'" v-model="addForm.feature" class="theme-select">
          <el-option v-for="(item, index) in $SUBJECT_FEATURE_LIST" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="受控系统" prop="controSystem">
        <el-select :disabled="(ifEdit && ifAdopted)" :clearable="true" v-model="addForm.controSystem" class="theme-select">
          <el-option label="无" value="0"/>
          <el-option v-for="(item, index) in $CONTROL_SYSTEM_LIST" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { createSubjectForm } from '@/common/create'

export default {
  name: 'SubjectAddDialog',
  data() {
    return {
      dialogVisible: false,
      addForm: createSubjectForm(),
      assId: [],
      forId: [],
      dialogTitle: '',
      dialogType: 'add',
      parentName: '无上级科目',
      parentCode: '',
      ifAdopted: false,
      editRowData: {},
      subjectCategoryList: [],
      addRules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 20, message: '长度20个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'bookInfo',
      'currencyList',
      'assistList'
    ]),
    ifEdit() {
      return this.dialogType === 'edit' || this.dialogType === 'addChild'
    }
  },
  created() {
    this.subjectCategoryList = this.bookInfo.isNewAccounts === '1' ? this.$SUBJECT_CATEGORY_NEW_LIST : this.$SUBJECT_CATEGORY_OLD_LIST
  },
  methods: {
    // 格式化提交阐述
    formatSubjectFormValue() {
      const hsSubEntity = {
        ...this.$commonQueryParam,
        ...this.addForm,
        subYear: this.$commonQueryParam.year
      }
      if (this.dialogType === 'addChild') {
        hsSubEntity.encode = this.parentCode + this.addForm.encode
      }
      delete hsSubEntity.year
      delete hsSubEntity.parentName
      delete hsSubEntity.parentEncode
      return {
        assId: this.assId,
        forId: this.forId,
        hsSubEntity: hsSubEntity,
        isPublic: 2
      }
    },
    // 动态生成验证规则
    createAddRules(row) {
      const subLength = this.bookInfo.subLength || ''
      const list = subLength.split('-')
      let level = 1
      let len = '4'
      if (!row) {
        len = list[level - 1]
      } else {
        level = parseInt(row.subLevels || 1)
        len = list[level - 1]
      }
      // 编辑的话就是相加
      if (this.dialogType === 'edit') {
        let subLen = 0
        for (let i = 0; i < level; i++) {
          subLen += parseInt(list[i] || 0)
        }
        len = subLen
      }
      const validate = (rule, value, callback) => {
        const reg = new RegExp(`^\\d{${len}}$`)
        if (!reg.test(value)) {
          callback(new Error(`${len}位数字`))
        } else {
          callback()
        }
      }
      this.addRules = {
        ...this.addRules,
        encode: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ]
      }
    },
    open(data, row) {
      this.dialogTitle = data.dialogTitle || ''
      this.dialogType = data.dialogType || ''
      this.parentName = data.parentName || ''
      this.parentCode = data.parentCode || ''
      this.ifAdopted = data.ifAdopted || false
      let assId = []
      let forId = []
      if (row) {
        assId = row.assId
        forId = row.forId
        this.editRowData = row
        if (this.dialogType === 'addChild') {
          row.encode = ''
        }
      }
      this.assId = assId
      this.forId = forId
      this.addForm = createSubjectForm(row)
      this.createAddRules(row)
      this.dialogVisible = true
    },
    // 弹出框确认
    okHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 子级也用add
          let url = 'account/subject/add'
          if (this.dialogType === 'edit') {
            url = 'account/subject/update'
          }
          if (this.dialogType === 'edit' && this.editRowData.name === this.addForm.name) {
            // 编辑并且没改名字不用看重名
            this.submitSubjectForm(url)
          } else {
            // 检查重名
            this.$http.post('account/subject/findDupName', {
              bookId: this.$commonQueryParam.bookId,
              name: this.addForm.name,
              orgId: this.$commonQueryParam.phCurorgid,
              isOnlyPublic: 0,
              year: this.$commonQueryParam.year,
              schemeId: this.bookInfo.schemeId || ''
            }).then((findDupNameRes) => {
              if (findDupNameRes.data) {
                // 重名了
                this.$confirm('已存在相同名称的科目，请确认是否保存?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  showClose: false
                }).then(() => {
                  this.submitSubjectForm(url)
                }).catch(() => {
                })
              } else {
                this.submitSubjectForm(url)
              }
            })
          }
        }
      })
    },
    // 提交科目表单
    submitSubjectForm(url) {
      this.$http.post(url, this.formatSubjectFormValue()).then((res) => {
        this.$message({
          type: 'success',
          message: '操作成功！'
        })
        this.dialogVisible = false
        this.$emit('ok')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.diy-prepend .prepend {
  display: inline-block;
  min-width: 30px;
}
</style>
