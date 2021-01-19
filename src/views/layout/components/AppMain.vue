<template>
  <section>
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import TagsView from './TagsView/index'
export default {
  name: 'AppMain',
  components: {
    TagsView
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
</style>

