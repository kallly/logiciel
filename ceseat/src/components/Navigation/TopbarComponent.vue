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
        <v-btn icon outlined @click="active = !active">
        </v-btn>
        <v-spacer></v-spacer>
          <router-link to="/about" tag="button">About</router-link>
          <router-link to="/login" tag="button">logIn</router-link>
        </v-spacer>
    </v-app-bar>
</div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default Vue.extend({
  name: 'TopbarComponent'
});
</script>