<template>
  <div class="LogIn">
  <Topbar/>
    <h1>This is a logIn page</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Resizer from '../components/Responsive/Resizer.vue'
  import Topbar from '../components/Navigation/Topbar.vue'

  export default Vue.extend({
    name: 'LogIn',

    components: {
      Topbar, Resizer
    },
  })
</script>