<template>
<div class="Home">
  <TopbarComponent/>
  <HelloWorld/>
</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      HelloWorld, TopbarComponent, ResizerComponent
    },
  })
</script>
