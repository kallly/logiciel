<template>

  <v-card class="mt-4" max-width="344">
    <v-img :src="restaurant.img" height="200px"></v-img>

    <v-card-title> {{ restaurant.name }} </v-card-title>
    <v-card-actions>
      <v-chip color="purple" outlined>
        <router-link :to="`/restaurant/${restaurant.name}?id=${restaurant._id}`" tag="button" color="deep-purple lighten-2">
          Passer commande
        </router-link>
      </v-chip>
      <v-btn icon @click="show = !show">
        <v-icon>
          {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ restaurant.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Restaurant from "../../models/Restaurant";
import { Component, Prop, Vue } from "vue-property-decorator"
@Component
export default class RestaurantCardComponent extends Vue {
  @Prop() restaurant!: Restaurant;
  show = false;
}
</script>