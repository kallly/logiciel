<template>
  <hello-world />
  <Resizer />
  <Topbar />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Resizer from '../components/Responsive/Resizer.vue'
  import Topbar from '../components/Responsive/Topbar.vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      HelloWorld, Topbar, Resizer
    },
  })
</script>
