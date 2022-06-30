<template>
  <v-app >
    <div>
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <v-container  style="display:flex; flex-direction: row; flex-wrap:wrap;"> 
        <v-col v-for="commande in commandes" :key="commande.date" cols="12" sm="4">

    <v-card class="mt-4">
     <v-card-title> {{ commande.restaurant }} </v-card-title>
     <v-card-text>
       {{commande.price}} €
       <br><br>
       {{commande.status}}
     </v-card-text>
   </v-card>
        </v-col>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import ProductListComponent from '../components/Order/ProductListComponent.vue'
  import { Component, Vue } from "vue-property-decorator";
  import CommandService from "../services/CommandService";
  import RestaurantService from "../services/RestaurantService";
  import CommandModel from '../models/CommandModel'
  @Component({
  components: { TopbarComponent },
})
export default class DeliveryRestaurationView extends Vue {
     public commandes: Array<CommandModel> = [];
     private commandeService!: CommandService;

    async created(): Promise<void>{
      //decoded = JSON.parse(atob(localStorage.jwt.split('.')[1]));
      let restaurantService = new RestaurantService()
      let restaurant = await restaurantService.getRestaurant()
      this.commandeService = new CommandService();
      if (restaurant._id !== undefined){
        this.commandes = await this.commandeService.getRestaurantOrder(restaurant._id);
      }
      
      //console.log(this.commandes);
    }
  
}
</script>