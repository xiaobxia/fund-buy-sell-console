<template>
  <div>
    <div v-loading.fullscreen.lock="loading" element-loading-text="加载中..."/>
  </div>
</template>

<script>

export default {
  name: 'AssetsManage',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.$router.push('/assetsManage/assetsCard/index')
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
