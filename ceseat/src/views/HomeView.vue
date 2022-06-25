<template>
  <div class="HomeView">
  <v-container>
    <RestaurantListComponent :restaurants="restaurants"></RestaurantListComponent>
    </v-container>
  </div>
  
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  //import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  
  import RestaurantModel from "@/models/RestaurantModel";
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue";
  import RestaurantService from "../services/RestaurantService";

@Component({
  components: { RestaurantListComponent },
})
export default class HomeView extends Vue {
  public restaurants: Array<RestaurantModel> = [];

  private restaurantService!: RestaurantService;

  // Cycle de vie d'un composant vue
  async created(): Promise<void> {
    this.restaurantService = new RestaurantService();
    this.restaurants = await this.restaurantService.getAllRestaurants();
  }
  mounted(): void {
    // TODO
  }

  destroyed(): void {
    // TODO
  }
}
</script>