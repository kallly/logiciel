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

<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>



<style>
    body {
        background-image: url(../src/assets/Images/image_fond.jpg);
        background-size: 100%;
        background-repeat: repeat;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 100%;
        height : 100%;
        padding:10px;
        background-color: transparent;
    }
</style>