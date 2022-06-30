<template>
  <div class="HomeView">
  <v-app>
  <v-container>
    <TopbarComponent></TopbarComponent>
  </v-container>
  <v-container>
        <RestaurantListComponent :restaurants="restaurants"></RestaurantListComponent>
        </v-fade-transition>
      </v-hover>
    </v-container>
  </v-app>
  </div>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  //import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'

  import RestaurantModel from "../models/RestaurantModel";
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue";
  import RestaurantService from "../services/RestaurantService";

@Component({
  components: { RestaurantListComponent, TopbarComponent},
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