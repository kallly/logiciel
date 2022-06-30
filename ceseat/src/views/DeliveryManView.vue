<!--edit command-->
<template>
  <div class="DeliveryManView">
  <label> commandes en cours : </label>
  </div>
  
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue";
import Restaurant from "../models/Restaurant";
  import RestaurantService from "../services/RestaurantService";

@Component({
  components: { RestaurantListComponent },
})
export default class HomeView extends Vue {
  public restaurants: Array<Restaurant> = [];

  private restaurantService!: RestaurantService;

  // Cycle de vie d'un composant vue
  async created(): Promise<void> {
    this.restaurantService = new RestaurantService();
    this.restaurants = await this.restaurantService.getAllRestaurants();
  }
}
</script>