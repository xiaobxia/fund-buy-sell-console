<template>
  <div>
    <div class="filter-container clearfix">
      <div class="right-block">
        <el-upload
          ref="upload"
          :multiple="false"
          :limit="1"
          :show-file-list="false"
          :on-exceed="onExceed"
          :on-success="onSuccess"
          :on-error="onError"
          :before-upload="beforeUpload"
          :headers="{token: token}"
          :action="$http.makeUrl('ucenterGh/file/upload')"
          style="display: inline-block">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button type="primary" size="small" @click="deleteHandler">删除</el-button>
        <!--<el-button type="primary" size="small" @click="downLoad">下载</el-button>-->
      </div>
    </div>
    <div class="list-wrap">
      <el-table
        ref="multipleTable"
        :data="fileList"
        :border="true"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{textAlign: 'center'}"
        style="width: 100%"
        height="calc(100vh - 230px)"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="attachName"
          label="附件名"/>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UploadFilePage',
  props: {
    files: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      fileList: this.$deepClone(this.files),
      multipleSelection: [],
      uploadBtnLoading: false
    }
  },
  computed: {
    token() {
      return this.$getToken() || ''
    }
  },
  watch: {
    fileList(value) {
      console.log(value)
      this.$emit('update:files', value)
    }
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    okHandler() {
      this.dialogVisible = false
      this.$emit('ok', this.fileList)
    },
    deleteHandler() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: `请选择附件!`
        })
        return false
      }
      this.$confirm('一旦删除，将不可恢复，是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false
      }).then(() => {
        const urlList = []
        this.multipleSelection.forEach((item) => {
          urlList.push(item.url)
        })
        const fileList = []
        this.fileList.forEach((item) => {
          if (urlList.indexOf(item.url) === -1) {
            fileList.push(item)
          }
        })
        this.fileList = fileList
      })
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: `超出个数限制!`
      })
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isLt2M
    },
    onSuccess(res) {
      this.clear()
      if (res.status) {
        res.data.attachName = res.data.name
        this.fileList.push(res.data)
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    },
    onError() {
      this.$message({
        type: 'error',
        message: `上传失败!`
      })
    },
    clear() {
      this.$refs.upload.clearFiles()
      this.file = null
      this.name = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
