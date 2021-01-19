<template>
  <div>
    <div v-loading.fullscreen.lock="loading" element-loading-text="加载中..."/>
  </div>
</template>

<script>

export default {
  name: 'Contract',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.$router.push('/contractManage/collectionManagement/index')
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
