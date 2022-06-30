<template>
  <v-app>
    <div>
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <v-container style="display:flex; flex-direction: row; flex-wrap:wrap;">
        <v-col v-for="commande in commandes" :key="commande._id" cols="12" sm="4">
          <v-card class="mt-4">
           <OrderMinCardComponent :order="commande"></OrderMinCardComponent>
          </v-card>
        </v-col>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
import { Component, Vue } from "vue-property-decorator";
import CommandService from "../services/CommandService";
import RestaurantService from "../services/RestaurantService";
import CommandModel from '../models/CommandModel'
import OrderMinCardComponent from '../components/FollowingOrder/OrderMinCardComponent.vue'
@Component({
  components: { TopbarComponent, OrderMinCardComponent },
})
export default class DeliveryRestaurationView extends Vue {
  public commandes: Array<CommandModel> = [];
  private commandeService!: CommandService;

  async beforeCreate(): Promise<void> {
    let restaurantService = new RestaurantService()
    let restaurant = await restaurantService.getRestaurant()
    this.commandeService = new CommandService();
    if (restaurant._id !== undefined) {
      this.commandes = await this.commandeService.getRestaurantOrder(restaurant._id);
      console.log(this.commandes)
    }
  }

}
</script>