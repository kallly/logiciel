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

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    email: "nraboy",
                    password: "password"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
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
        width: 90%;
        margin: 10px;
        padding:10px;
    }
</style>