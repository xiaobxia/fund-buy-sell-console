<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-back" @click="handleBack">返回</el-button>
      <el-button style="float: right" class="filter-item" icon="el-icon-check" type="primary" @click="handleSave">保存</el-button>
    </div>
    <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-position="right" label-width="100px">
      <el-alert
        :closable="false"
        style="margin-bottom: 20px"
        title="设置"
        type="info"/>
      <el-row :gutter="12">
        <el-form-item prop="img_url" label="图">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="qiniuData"
            :action="upload_qiniu_url"
            class="avatar-uploader">
            <img v-if="img_url" :src="img_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item prop="type" label="类型：">
            <el-select v-model="dialogForm.type" :style="{width: '100%'}" class="filter-item">
              <el-option label="全部" value=""/>
              <el-option value="食品" label="食品"/>
              <el-option value="茶具" label="茶具"/>
              <el-option value="男士用品" label="男士用品"/>
              <el-option value="女士用品" label="女士用品"/>
              <el-option value="宿舍用品" label="宿舍用品"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="status" label="状态：">
            <el-select v-model="dialogForm.status" :style="{width: '100%'}" class="filter-item">
              <el-option label="全部" value=""/>
              <el-option :value="1" label="上架"/>
              <el-option :value="2" label="下架"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="sortIndex" label="排序：">
            <el-input v-model="dialogForm.sortIndex"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  name: 'ProductDetail',
  data() {
    return {
      rawDetail: {},
      dialogForm: {
        type: ''
      },
      dialogFormRules: {
      },
      img_url: '',
      qiniuData: {
        key: '',
        token: ''
      },
      // 七牛云上传储存区域的上传域名
      upload_qiniu_url: 'http://upload.qiniup.com',
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: 'http://fbsimgcdn.xiaobxia.com/'
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    getQiniuToken() {
      this.$http.get('qiniu/getUploadToken').then((res) => {
        console.log(res.data.token)
        this.qiniuData.token = res.data.token
      })
    },
    initPage() {
      this.getQiniuToken()
    },
    handleBack() {
      this.$router.history.go(-1)
    },
    handleSave() {
      this.dialogForm.img_url = this.img_url
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.$http.post(
            'advertisement/addAdvertisement',
            this.dialogForm
          ).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.initPage()
          }).catch(() => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.img_url = this.upload_qiniu_addr + res.key
    },
    beforeAvatarUpload(file) {
      this.qiniuData.key = uuidv1() + file.name
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('只能是图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

