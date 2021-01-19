<template>
  <el-dialog  :close-on-click-modal="false" :visible.sync="dialogVisible" :destroy-on-close="true" title="存为模板" width="500px">
    <el-form :model="form" size="small" auto-complete="off" label-position="right" label-width="100px">
      <el-form-item label="模板名称" prop="encode">
        <el-input v-model="form.encode"/>
      </el-form-item>
      <el-form-item label="备注" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="凭证类型" prop="mark">
        <el-select v-model="form.type" class="theme-select">
          <el-option v-for="(item, index) in certTypeList" :key="index" :label="item.label" :value="item.value"/>
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
// 表单模型
function createForm(tar) {
  let raw = {
    encode: '',
    name: '',
    type: 1
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'DifferenceTermDialog',
  data() {
    return {
      dialogVisible: false,
      form: createForm()
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
    open() {
      this.form = createForm()
      this.dialogVisible = true
    },
    okHandler() {
      this.$emit('ok')
      this.dialogVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
