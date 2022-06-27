<template>
  <v-app>
  <v-container>
    <TopbarComponent/>
  </v-container>
  <v-container>
    <v-main>
      <router-view/>
    </v-main>
  </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopbarComponent from './components/Navigation/TopbarComponent.vue'

@Component({ components: { TopbarComponent } })
export default class App extends Vue {}
/*

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});*/
</script>
