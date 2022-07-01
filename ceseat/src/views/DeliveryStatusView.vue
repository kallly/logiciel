<template>
  <v-app>
    <div>
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <v-container  style="display:flex; flex-direction: row; flex-wrap:wrap;"> 
        <v-col v-for="(commande,index) in commandes" :key="index" cols="12" sm="4">

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
  import OrderMinCardComponent from '../components/FollowingOrder/OrderMinCardComponent.vue'
  import { Component, Vue } from "vue-property-decorator";
  import CommandService from "../services/CommandService";
import Order from '../models/CommandModel';
  @Component({
  components: { TopbarComponent, OrderMinCardComponent },
})
export default class DeliveryStatusView extends Vue {
     public commandes: Array<Order> = [];
     private commandeService!: CommandService;
     private decoded = JSON.parse(atob(localStorage.jwt.split('.')[1]));

    async created(): Promise<void>{
      this.commandeService = new CommandService();
      this.commandes = await this.commandeService.getClientOrder(this.decoded.id);
      console.log(this.commandes);
    }
  
}
</script>