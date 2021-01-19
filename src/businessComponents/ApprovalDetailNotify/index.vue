<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="true"
    :modal="true"
    append-to-body
    width="50%"
    class="notify-dialog"
    title="审批流查看"
  >
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(item,index) in activities"
          :key="index"
          :timestamp="item.taskName"
          :type="getStatusType(item.verifyStatus)"
          placement="top"
        >
          <el-card>
            <h4>{{ index > 0 ? '审批人':'发起人' }}：{{ item.userName }}</h4>
            <p>{{ item.startTime }}</p>
            <p>意见：{{ item.remark }}</p>
            <div v-if="item.files && item.files.length > 0">
              <span>附件：</span>
              <span class="el-icon-paperclip" @click="openUploadFileDialog(item)"/>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button size="small" @click="dialogVisible = false">取消</el-button>-->
    <!--<el-button size="small" type="primary" @click="okHandler">确定</el-button>-->
    <!--</div>-->
    <upload-file-dialog ref="uploadFileDialog" type="view"/>
  </el-dialog>
</template>

<script>
import UploadFileDialog from '@/businessComponents/UploadFileDialog/normal'
export default {
  name: 'ApprovalDetailDialog',
  components: {
    UploadFileDialog
  },
  data() {
    return {
      dialogVisible: false,
      activities: []
    }
  },
  computed: {},
  created() {
  },
  methods: {
    getStatusType(status) {
      if (status === 3) {
        return 'success'
      }
      return ''
    },
    open(id) {
      this.getApprovalProgressInfo(id)
      this.dialogVisible = true
    },
    getApprovalProgressInfo(id) {
      this.$http.get('approval/task/task/history', {
        businessId: id
      }).then((res) => {
        this.activities = res.data || []
      })
    },
    okHandler() {
      this.dialogVisible = false
      this.$emit('ok')
    },
    openUploadFileDialog(item) {
      this.$refs.uploadFileDialog.open(item.files)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
