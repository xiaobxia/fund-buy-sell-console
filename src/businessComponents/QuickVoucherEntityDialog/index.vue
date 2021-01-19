<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :destroy-on-close="true" title="存为模板" width="500px">
    <el-form :model="hsCertTmpDataEntity" size="small" auto-complete="off" label-position="right" label-width="100px">
      <el-form-item label="模板名称" prop="encode">
        <el-input v-model="hsCertTmpDataEntity.name"/>
      </el-form-item>
      <el-form-item label="备注" prop="name">
        <el-input v-model="hsCertTmpDataEntity.remark"/>
      </el-form-item>
      <el-form-item label="凭证类型" prop="mark">
        <el-select v-model="certType" class="theme-select">
          <el-option v-for="(item, index) in certTypeList" :key="index" :label="item.certValue" :value="item.phid"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHsCertTmpDataEntity } from '@/common/create'
export default {
  name: 'QuickVoucherEntityDialog',
  data() {
    return {
      dialogVisible: false,
      hsCertTmpDataEntity: createHsCertTmpDataEntity(),
      certType: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'certTypeList'
    ])
  },
  watch: {
  },
  created() {
  },
  methods: {
    open(certType) {
      this.loading = false
      this.hsCertTmpDataEntity = createHsCertTmpDataEntity({
        ...this.$commonQueryParam,
        tmpYear: this.$commonQueryParam.year
      })
      this.certType = certType
      this.dialogVisible = true
    },
    close() {
      this.loading = false
      this.dialogVisible = false
    },
    okHandler() {
      this.$emit('ok', {
        hsCertTmpDataEntity: this.hsCertTmpDataEntity,
        certType: this.certType
      })
      this.loading = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
