<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default Vue.extend({
    name: 'about',

    components: {
      TopbarComponent, ResizerComponent
    },
  })
</script>
