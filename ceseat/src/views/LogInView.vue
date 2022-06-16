<template>
  <div class="logIn">
      <img alt="CeseatLogo" src="../assets/logo.png">
      <HelloWorld msg="Ceci est la page de connexion de ceseat"/>
    <h1>Ceci est la page de connexion de ceseat</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
