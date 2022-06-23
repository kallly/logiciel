<template>
  <div class="about">
  <Topbar/>
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Resizer from '../components/Responsive/Resizer.vue'
  import Topbar from '../components/Navigation/Topbar.vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default Vue.extend({
    name: 'about',

    components: {
      Topbar, Resizer
    },
  })
</script>
