<template>
  <advertisement-detail :is-edit="true"/>
</template>

<script>
import AdvertisementDetail from './components/AdvertisementDetail'

export default {
  name: 'EditAdvertisement',
  components: { AdvertisementDetail }
}
</script>

