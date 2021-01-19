<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="800px"
    append-to-body
    title="附件"
    class="n-b-t-p"
  >
    <div class="upload-wrap clearfix">
      <div v-if="type === 'add'" class="left">
        <el-upload
          ref="upload"
          :multiple="false"
          :limit="1"
          :show-file-list="true"
          :on-exceed="onExceed"
          :data="{type: 1}"
          :on-success="onSuccess"
          :on-error="onError"
          :before-upload="beforeUpload"
          :headers="{token: token, currentOrgId: $commonQueryParam.phCurorgid}"
          :action="$http.makeUrl('ucenterGh/file/upload')"
          class="upload-demo-file"
          drag
        >
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div :class="{right: type === 'add'}">
        <div class="filter-container clearfix">
          <div class="right-block">
            <el-button v-if="type === 'add'" type="primary" size="small" @click="deleteHandler">删除</el-button>
            <el-button type="primary" size="small" @click="downLoad">下载</el-button>
          </div>
        </div>
        <div class="list-wrap">
          <el-table
            ref="multipleTable"
            :data="fileList"
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{textAlign: 'center'}"
            style="width: 100%"
            height="258px"
            class="no-b-table"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              prop="name"
              label="附件名"/>
              <!--<el-table-column-->
              <!--prop="fileDwg"-->
              <!--label="文件格式"/>-->
              <!--<el-table-column-->
              <!--prop="fileSize"-->
              <!--label="文件大小">-->
              <!--<template slot-scope="scope">-->
              <!--<span>{{ (parseFloat(scope.row.fileSize || 0) /1024).toFixed(2) }}k</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
          </el-table>
        </div>
      </div>
    </div>
    <div v-if="type === 'add'" slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
      <el-button size="small" type="primary" @click="okHandler">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'UploadFileDialogNormal',
  props: {
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
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
      this.dialogVisible = true
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
