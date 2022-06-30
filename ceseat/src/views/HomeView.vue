<template>
  <div class="HomeView">
  <v-app>
  <v-container>
    <TopbarComponent></TopbarComponent>
  </v-container>
  <v-container>
        <RestaurantListComponent :restaurants="restaurants"></RestaurantListComponent>
    </v-container>
  </v-app>
  </div>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue";
  import RestaurantService from "../services/RestaurantService";
import Restaurant from "../models/Restaurant";

@Component({
  components: { RestaurantListComponent, TopbarComponent},
})
export default class HomeView extends Vue {
  public restaurants: Array<Restaurant> = [];

  // Cycle de vie d'un composant vue
  async created(): Promise<void> {
    let restaurantService = new RestaurantService();
    this.restaurants = await restaurantService.getRestaurants();
  }
}
</script>