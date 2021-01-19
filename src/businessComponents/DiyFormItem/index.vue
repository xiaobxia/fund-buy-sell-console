<template>
  <div :class="{requiredFI: info.isRequired === 1}">
    <el-form-item v-if="info.fieldType === 1" :label="info.fieldName" :prop="info.fieldName">
      <el-input :disabled="disabled" v-model="form[info.fieldName]" :maxlength="50" :placeholder="info.promptText" style="width: 100%"/>
    </el-form-item>
    <el-form-item v-else-if="info.fieldType === 2" :label="info.fieldName" :prop="info.fieldName">
      <el-input
        v-model="form[info.fieldName]"
        :maxlength="16"
        :disabled="disabled"
        :placeholder="info.promptText"
        style="width: 100%"
        @change="numberChange"
      />
    </el-form-item>
    <el-form-item v-else-if="info.fieldType === 3" :label="info.fieldName" :prop="info.fieldName">
      <el-select
        v-model="form[info.fieldName]"
        :disabled="disabled"
        :multiple="info.selectType === 2"
        :collapse-tags="info.selectType === 2"
        :placeholder="info.promptText"
        style="width: 100%"
      >
        <el-option
          v-for="(item, index) in info.valueList"
          :key="index"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-else-if="info.fieldType === 4" :label="info.fieldName" :prop="info.fieldName">
      <el-date-picker
        v-if="info.timeRequired === 1"
        v-model="form[info.fieldName]"
        :disabled="disabled"
        :placeholder="info.promptText"
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
        style="width: 100%"/>
      <el-date-picker
        v-else
        v-model="form[info.fieldName]"
        :disabled="disabled"
        :placeholder="info.promptText"
        type="date"
        format="yyyy-MM-dd"
        style="width: 100%"/>
    </el-form-item>
    <el-form-item v-else-if="info.fieldType === 5" :label="info.fieldName" :prop="info.fieldName">
      <el-date-picker
        v-if="info.timeRequired === 1"
        v-model="form[info.fieldName]"
        :disabled="disabled"
        :placeholder="info.promptText"
        type="datetimerange"
        format="yyyy-MM-dd HH:mm:ss"
        style="width: 100%"/>
      <el-date-picker
        v-else
        v-model="form[info.fieldName]"
        :disabled="disabled"
        :placeholder="info.promptText"
        type="daterange"
        format="yyyy-MM-dd"
        style="width: 100%"/>
    </el-form-item>
    <el-form-item v-else-if="info.fieldType === 6" :label="info.fieldName" :prop="info.fieldName">
      <el-button :disabled="disabled" style="width: 100%" @click="openUploadFileDialog">选择附件</el-button>
      <!--多次渲染问题不大，一般一个表单也就一个附件选择-->
      <upload-file-dialog ref="uploadFileDialog"/>
    </el-form-item>
  </div>
</template>

<script>
import { createContractExtField } from '@/common/create'
import UploadFileDialog from '@/businessComponents/UploadFileDialog'
function formatNum(str, len) {
  let newStr = ''
  let count = 0
  let startCode = ''
  len = len || 2
  let zero = ''
  for (let i = 0; i < len; i++) {
    zero += '0'
  }
  str = '' + str
  if (str.charAt(0) === '-') {
    str = str.slice(1)
    startCode = '-'
  }
  // 当数字是整数
  if (str.indexOf('.') === -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr
      }
      count++
    }
    str = newStr + `.${zero}`
    // 自动补小数点后两位
    return startCode + str
  } else {
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr // 逐个字符相接起来
      }
      count++
    }
    str = newStr + (str + zero).substr((str + zero).indexOf('.'), len + 1)
    return startCode + str
  }
}
export default {
  name: 'DiyFormItem',
  components: {
    UploadFileDialog
  },
  props: {
    // edit-编辑模式，view-阅读模式
    type: {
      type: String,
      default: 'edit'
    },
    info: {
      type: Object,
      default: () => {
        return createContractExtField()
      }
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  created() {
  },
  methods: {
    numberChange(value) {
      value = parseFloat(value || 0) || 0
      const info = this.info
      // 最大最小控制
      if (info.minValue || info.minValue === 0) {
        if (value < info.minValue) {
          this.form[info.fieldName] = info.minValue
        }
      }
      if (info.maxValue || info.maxValue === 0) {
        if (value > info.maxValue) {
          this.form[info.fieldName] = info.maxValue
        }
      }
      if (info.decimalPlaces) {
        if (this.form[info.fieldName]) {
          this.form[info.fieldName] = formatNum(this.form[info.fieldName], info.decimalPlaces)
        } else {
          this.form[info.fieldName] = ''
        }
      } else {
        this.form[info.fieldName] = Math.ceil(this.form[info.fieldName]) || ''
      }
    },
    openUploadFileDialog() {
      this.$refs.uploadFileDialog.open()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
