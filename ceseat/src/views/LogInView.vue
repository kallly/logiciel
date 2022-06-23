<template>
  <div class="LogIn">
  <TopbarComponent/>
  <LogInComponent/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import LogInComponent from '../components/Formulaire/LogInComponent.vue'

  export default Vue.extend({
    name: 'LogIn',

    components: {
      TopbarComponent, ResizerComponent
    },
  })
</script>