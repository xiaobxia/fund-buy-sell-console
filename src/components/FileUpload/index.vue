<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="800px"
    title="附件编辑"
    class="n-b-t-p"
  >
    <div class="upload-wrap clearfix">
      <div class="search-bar">
        <div class="filter-container">
          <div class="right-block">
            <span
              class="label-text"
              style="line-height: 32px"
            >附件名</span>
            <el-input
              v-model="searchValue"
              style="width: 162px;"
              size="small"
              clearable
            />
          </div>
        </div>
      </div>
      <div class="upload-tool">
        <el-upload
          ref="upload"
          :multiple="false"
          :limit="limit"
          :headers="{token: token, currentOrgId: currentOrgId}"
          :show-file-list="fileListShowFlag"
          :auto-upload="true"
          :on-exceed="onExceed"
          :on-success="onSuccess"
          :on-error="onError"
          :before-upload="beforeUpload"
          :action="$http.makeUrl(url)"
          class="upload-file-with-download"
          drag
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <ul class="file-list">
          <li
            v-for="(item, index) in showFileList"
            :key="index"
            :title="item.name"
            class="fileItem"
          >
            <span class="file-name">{{ item.name }}</span>
            <span
              class="file-download color-blue"
              @click="downLoadFile(item, index)"
            >下载</span>
            <span
              class="file-del color-red"
              @click="delFile(item, index)"
            >删除</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'FileUpload',
  props: {
    url: { // 上传地址
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    fileListShowFlag: { // 是否显示自带的文件列表
      type: Boolean,
      default: false
    },
    fileList: { // 已上传的文件
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      searchValue: '',
      selection: [],
      files: []
    }
  },
  computed: {
    token() {
      return this.$getToken() || ''
    },
    currentOrgId() {
      return this.$commonQueryParam.phCurorgid
    },
    showFileList() {
      return this.files.filter(item => item.name.indexOf(this.searchValue) >= 0)
    }
  },
  mounted() {
    this.dialogVisible = true
    this.files = this.fileList.reduce((arr, item, index) => {
      item.key = index
      arr.push(item)
      return arr
    }, [])
  },
  created() {
  },
  methods: {
    // 确定
    handleSubmit() {
      this.$emit('sure', this.files)
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: `超出个数限制!`
      })
    },
    beforeUpload(file) {
    },
    // 上传成功
    onSuccess(response, file, fileList) {
      if (response.status) {
        this.files.push(response.data)
        this.resetFiles()
      }
    },
    onError() {
      this.$message({
        type: 'error',
        message: `上传失败!`
      })
    },
    // 构造附件列表状态
    resetFiles() {
      this.files = this.files.reduce((arr, item, index) => {
        item.checkStatus = false
        item.key = index
        arr.push(item)
        return arr
      }, [])
      console.log(this.files)
    },
    // 下载
    downLoadFile(data, index) {
      this.$confirm('此操作将下载该附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          filePath: data.url
        }
        const title = data.name
        this.$http.get('account/file/download', params, { responseType: 'arraybuffer' }).then(res => {
          this.$downloadExcel(res, title, data.fileDwg)
        }).catch(err => {
          console.log(err, 'err')
        })
      })
    },
    // 删除
    delFile(data, index) {
      this.$confirm('此操作将删除该附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.files.splice(index, 1)
        this.resetFiles()
      })
    },
    // 搜索
    searchFile() {
      this.showFileList = this.files.filter(item => item.name.indexOf(this.searchValue) >= 0)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-wrap {
  padding: 10px 0;
  .filter-container {
    padding: 0;
    border-bottom: 1px solid #BBBBBB;
  }
}
.left-block {
  line-height: 32px;
}
.upload-tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .upload-file-with-download {
    width: 212px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .file-list {
    padding: 15px 0 15px 15px;
    width: calc(100% - 212px);
    height: 250px;
    border-left: 1px solid #BBBBBB;
    margin: 0;
    list-style: none;
    font-size: 14px;
    .fileItem {
      display: inline-block;
      width: 50%;
      padding-left: 10px;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 3px;
      transition: all 0.3s ease;
      &:hover {
        background: #efefef;
        transition: all 0.3s ease;
        .file-del {
          display: inline-block;
          transition: all 0.3s ease;
        }
        .file-download {
          display: inline-block;
          transition: all 0.3s ease;
        }
      }
      .file-name {
        width: 170px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: middle;
      }
      .file-del {
        transition: all 0.3s ease;
        display: none;
        float: right;
        margin-right: 10px;
      }
      .file-download {
        transition: all 0.3s ease;
        display: none;
        float: right;
      }
    }
  }
}

.color-blue {
  color: #1a84e8;
}

.color-red {
  color: #f56c6c;
}

.upload-wrap {
  height: 310px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
