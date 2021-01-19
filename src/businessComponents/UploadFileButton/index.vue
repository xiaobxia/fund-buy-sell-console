<template>
  <el-upload
    :multiple="false"
    :limit="1"
    :show-file-list="true"
    :on-exceed="onExceed"
    :on-success="onSuccess"
    :on-error="onError"
    :before-upload="beforeUpload"
    :headers="{token: token}"
    :action="$http.makeUrl('ucenterGh/file/upload')"
    :file-list="fileList">
    <el-button type="primary" size="small"><span class="el-icon-upload" style="color: #fff;margin-right: 10px"/>选择文件</el-button>
  </el-upload>
</template>

<script>

export default {
  name: 'UploadFileButton',
  props: {
  },
  data() {
    return {
      fileList: [],
      fileShowList: [],
      multipleSelection: [],
      uploadBtnLoading: false
    }
  },
  computed: {
    token() {
      return this.$getToken() || ''
    }
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    open(list) {
      this.fileList = list
    },
    okHandler() {
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
    downLoad() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: `请选择附件!`
        })
        return false
      }
      this.multipleSelection.forEach((item) => {
        this.downLoadFile(item)
      })
    },
    downLoadFile(item) {
      this.$http.get('ucenterGh/file/download', {
        filePath: item.url.substring(item.url.indexOf('/file'))
      }, { responseType: 'arraybuffer' }).then((res) => {
        this.$downloadFile(res, item.name)
      })
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: `超出个数限制!`
      })
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 <= 5
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 5MB!')
      }
      return isLt2M
    },
    onSuccess(res) {
      this.clear()
      if (res.status) {
        this.fileList.push(res.data)
        // this.$message({
        //   type: 'success',
        //   message: `上传成功!`
        // })
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
      this.typeName = ''
      this.name = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filter-container {
    padding: 10px 0;
  }
  .left-block {
    line-height: 32px;
  }
  .left {
    width: 33%;
    border-right: 1px solid  #E6E6E6;
  }
  .right {
    width: 67%;
    border-bottom: 1px solid  #E6E6E6;
    overflow: hidden;
  }
  .left, .right {
    float: left;
    height: 310px;
  }
  .list-wrap {
  }
  .upload-wrap {
    height: 310px;
    border-bottom: 1px solid  #E6E6E6;
  }
</style>
