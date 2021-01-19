<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :fullscreen="true"
    append-to-body
    width="800px"
    title="录入"
  >
    <div>
      <tinymce v-if="dialogVisible" :height="300" v-model="content[key]"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="okHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ContentDialog',
  components: {
    Tinymce
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      content: {},
      key: ''
    }
  },
  computed: {},
  created() {
  },
  methods: {
    open(data, key) {
      this.content = data
      this.key = key
      console.log(data)
      console.log(key)
      console.log(data[key])
      this.loading = false
      this.dialogVisible = true
    },
    okHandler() {
      this.loading = true
      this.dialogVisible = false
      // this.$emit('ok', this.content)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
