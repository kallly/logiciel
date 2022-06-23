<template>
  <v-container>
    <div class = "navbar">
      <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7" elevation="4">
        <v-toolbar-title><router-link to="/" tag="button">CESEAT</router-link></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
         single-line
        >
        </v-text-field>
        <v-btn icon outlined @click="active = !active">
          <font-awesome-icon icon="fa-solid fa-angle-down" />
          <font-awesome-icon icon="fa-solid fa-angle-up" hide/>

        </v-btn>
        <v-spacer></v-spacer>
       <v-app-bar-nav>
       <v-btn icon>
          <router-link to="/about" tag="button">About</router-link>
        </v-btn>
        <v-btn icon>
          <router-link to="/login" tag="button">logIn</router-link>
        </v-btn>
      </v-app-bar-nav>
    </v-app-bar>
</div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'navbar'
});
</script>