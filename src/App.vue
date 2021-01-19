<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import storageUtil from '@/utils/storageUtil'
export default{
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    const orgInfo = storageUtil.getData('orgInfo') || storageUtil.getData('userInfo').orgInfo || {}
    // const year = storageUtil.getData('appConfig', 'year')
    Vue.prototype.$commonQueryParam = {
      year: new Date().getFullYear(),
      permKey: '',
      orYear: ''
    }
    this.$store.dispatch('setOrgInfo', { ...orgInfo, source: 'layout' })
  },
  methods: {
  }
}
</script>
