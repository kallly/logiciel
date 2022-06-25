<template>
  <v-card class="mt-4" max-width="344">
    <v-card-title> {{ restaurantModel.name }} </v-card-title>
        <v-card-text>
          {{ restaurantModel.description }}
        </v-card-text>
        <router-link :to="`/restaurant/${restaurantModel.name}`" tag="button" >Go</router-link>
  </v-card>
</template>

<script lang="ts">
import useRoute from "vue-router"
import { Component, Prop, Vue } from "vue-property-decorator"
import RestaurantModel from "../../models/RestaurantModel.vue"
@Component
export default class RestaurantCardComponent extends Vue {
    @Prop() restaurantModel!: RestaurantModel;
}
</script>