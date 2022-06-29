<template>
  <v-container>
    <div class = "TopbarComponent">
      <v-app-bar absolute color="white" elevate-on-scroll elevation="4">
        <v-toolbar-title><router-link to="/" tag="button">CESEAT</router-link></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
         single-line
        >
        </v-text-field>
        <v-btn icon @click="show = !show" >
            <v-icon>
              {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
       <v-app-bar-nav>
       <v-btn icon>
          <router-link to="/edit" tag="button">Modifier mon compte</router-link>
        </v-btn>
        <v-btn icon>
          <router-link to="/login" v-on:click.native="logout()" tag="button">Déconnexion</router-link>
        </v-btn>
      </v-app-bar-nav>
    </v-app-bar>
</div>
  </v-container>
  
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductListComponent from "../Order/ProductListComponent.vue"

export default {
  name: 'TopbarComponent',
  data: () => ({
      show: false,
    }),
    methods: {
            logout() {
                this.authenticated = false;
                this.localStorage.jwt = "{[]}";
            }
        }
};
</script>
<script>
    export default {
        name: '',
        
    }
</script>