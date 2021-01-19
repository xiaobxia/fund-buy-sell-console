<template>
  <el-upload
    ref="upload"
    :action="$http.makeUrl(UPLOAD_URL)"
    :on-preview="handlePreview"
    :headers="extraHeaders"
    :limit="limit"
    :data="{type: 1}"
    :before-upload="handleBeforeUpload"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-error="handleOnError"
    :on-change="handleChange"
    :file-list="data"
    :class="[listPosition, 'com-upload-file']"
    v-bind="$attrs"
  >
    <slot>
      <el-button v-if="!view" :class="{ error: validateState === 'error' }" type="primary" class="upload-button" size="small">
        {{ text }}<i class="el-icon-upload2 el-icon--right" />
      </el-button>
    </slot>
    <slot slot="file" slot-scope="{ file }" name="file">
      <div class="file-item">
        <i
          :class="['iconfont', 'icon-type', getIcon(file.name).icon]"
          :style="{ color: getIcon(file.name).color }"/>
        <div :title="file.name" class="file-name" @click="handleClickItem(file)">
          {{ file.name }}
          <el-progress
            v-if="file.status === 'uploading'"
            :type="'line'"
            :stroke-width="2"
            :percentage="parsePercentage(file.percentage)"
            text-inside
            class="progress"
          />
        </div>
        <i v-if="!isLook" class="file-clear el-icon-error" @click="handleRemove(file)" />
      </div>
    </slot>
    <!-- <slot slot="tip" name="tip" /> -->
  </el-upload>
</template>

<script>
import Emitter from '@/mixins/emitter'
import MIME from './mime'

export default {
  mixins: [Emitter],
  model: {
    prop: 'fileList',
    event: 'change'
  },
  props: {
    fileList: {
      type: null,
      required: true,
      default: () => []
    },
    text: {
      type: String,
      default: '上传'
    },
    listPosition: {
      type: String,
      default: 'right',
      validator: (v) => ['right', 'bottom'].includes(v)
    },
    headers: {
      type: Object,
      default: () => {}
    },
    limit: {
      type: Number,
      default: 10
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    // 文件大小
    size: {
      type: Number,
      default: 40
    },
    beforeUpload: {
      type: Function,
      default: () => {}
    },
    isLook: { // 是否是查看操作
      type: Boolean,
      default: true
    },
    // 是否浏览
    view: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      MIME,
      data: [],
      extraHeaders: {
        ...this.headers,
        token: this.$getToken() || '',
        currentOrgId: this.$commonQueryParam.orgId
      },
      UPLOAD_URL: 'ucenterGh/file/upload'
    }
  },
  inject: {
    elFormItem: {
      default: ''
    }
  },
  computed: {
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    }
  },
  watch: {
    fileList: {
      handler(val) {
        this.data = (Array.isArray(val) ? val : []).map(item => {
          item.uid = item.uid || (Math.random() + '')
          item.status = item.status || 'success'
          // 后端接口不一致导致的
          item.name = item.name || item.attachName || item.fileName
          return item
        })
      },
      immediate: true
    }
  },
  methods: {
    handleBeforeUpload(file) {
      const isLimitSize = file.size / 1024 / 1024 < this.size
      if (!isLimitSize) {
        this.$message.error(`文件大小不能超过${this.size}MB!`)
      }
      return isLimitSize && this.beforeUpload(file)
    },
    handleRemove(file) {
      if (file.status === 'uploading') {
        this.$refs.upload.abort(file)
      }
      const newFileList = this.fileList.filter(v => v.uid !== file.uid)
      this.$emit('change', newFileList)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', newFileList)
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    parseFileName(name) {
      const nameArr = name.split('.')
      const ext = nameArr.pop()
      return {
        name: nameArr.join(),
        ext: ext.toLocaleLowerCase()
      }
    },
    parsePercentage(val) {
      return parseInt(val, 10)
    },
    handleClickItem(file) {
      let url = file.url
      if (!url.startsWith('/file/')) {
        url = url.substring(url.indexOf('/file/'))
      }
      this.$http.get('ucenterGh/file/download', { filePath: file.url }, { responseType: 'arraybuffer' }).then(data => {
        this.$downloadFile(data, file.name)
      }).catch(err => {
        console.log('err', err)
      })
    },
    handleSuccess({ status, message, data }, file, fileList) {
      if (status) {
        // 此处还需要好好测试一下
        fileList.forEach(file => {
          file.url = file.response ? file.response.data.url : file.url
          if (file.response && file.response.data) {
            file.fileDwg = file.response.data.fileDwg
            file.fileSize = file.response.data.fileSize
          }
          file.response = null
          file.raw = null
          file.attachName = file.name
        })
        this.$emit('change', fileList)
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', fileList)
        }
        this.$message.success(message)
      } else {
        this.$message.error(message)
      }
    },
    handleOnError(res) {
      console.log('res', res)
      this.$message.error(res.message)
    },
    handleChange(file, fileList) {
      // 此函数禁止调用
      // this.$emit('change', file, fileList)
      // if (this.validateEvent) {
      //   this.dispatch('ElFormItem', 'el.form.change', fileList)
      // }
    },
    getIcon(fileName) {
      const { ext } = this.parseFileName(fileName)
      return MIME[ext] || MIME['file']
    }
  }
}
</script>

<style lang="scss" >
.com-upload-file {
  .el-upload-list__item {
    cursor: pointer;
    background-color: rgba(26,132,232, .07);
  }
  &.bottom {
    .file-item {
      display: flex;
      align-items: center;
    }
    .progress {
      padding-right: 50px;
      top: 16px;
    }
    .file-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  }
  &.right {
    display: flex;
    .el-upload-list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 2px;
    }
    .el-upload-list__item {
      width: 110px;
      margin-top: 0;
      margin-bottom: 5px;
      padding-right: 5px;
      margin-left: 10px;
      cursor: pointer;
      &:first-child {
        margin-top: 0;
      }
      .file-item {
        display: flex;
        align-items: center;
      }
      .file-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .progress {
        width: 70px;
        top: 16px;
      }
    }
  }
  .file-clear {
    color: #FF4D4F;
    position: absolute;
    top: 0;
    right: 0;
  }
  .icon-type {
    padding: 0 5px;
  }
  .upload-button {
    & > span {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &.error {
      border-color: #f56c6c;
    }
  }
}
</style>
