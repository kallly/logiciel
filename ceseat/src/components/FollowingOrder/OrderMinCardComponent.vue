<template>
  <v-container>
    <v-card-title> {{ restaurant_name }} </v-card-title>
    <v-card-text>
      {{ order.price }} €
      <br><br>
      {{ order.status }}
    </v-card-text>

  </v-container>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import Order from '../../models/Order'
import Restaurant from "../../models/Restaurant";
import RestaurantService from "../../services/RestaurantService";

@Component
export default class RestaurantCardComponent extends Vue {
  @Prop() order!: Order;
  public restaurant!: Restaurant;
  public restaurant_name: string = '';

  async created(){
    let restaurantService = new RestaurantService()
    this.restaurant = await restaurantService.getRestaurantById(this.order.restaurant);
    this.restaurant_name = this.restaurant.name;
  }
}
</script>