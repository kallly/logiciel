<template>
  <v-app>
    <div>
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <v-container style="display:flex; flex-direction: row; flex-wrap:wrap;">
        <v-col v-for="order in orders" :key="order._id" cols="12" sm="4">
          <v-card class="mt-4">
            <OrderMinCardComponent :order="order"></OrderMinCardComponent>
            <v-card-text>
              {{ order.address }}
            </v-card-text>
            <v-card-button>&nbsp;&nbsp;&nbsp;&nbsp;

              <v-chip color="purple" outlined>
                <button type="button" v-on:click="recup(order._id)">En cours de livraison</button>
              </v-chip>&nbsp;&nbsp;&nbsp;&nbsp;

              <v-chip color="purple" outlined>
                <button type="button" v-on:click="arrive(order._id)">Arrivé</button>
              </v-chip>&nbsp;&nbsp;&nbsp;&nbsp;

              <v-chip color="purple" outlined>
                <button type="button" v-on:click="livre(order._id)">Livré</button>
              </v-chip>
              <br><br>
            </v-card-button>

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
import Order from '../models/Order';
import OrderMinCardComponent from '../components/FollowingOrder/OrderMinCardComponent.vue'
@Component({
  components: { TopbarComponent,OrderMinCardComponent },
})
export default class LivreurView extends Vue {
  public orders: Array<Order> = [];
  private commandeService!: CommandService;

  async created(): Promise<void> {
    this.commandeService = new CommandService();
    this.orders = await this.commandeService.getAllOrder();
    console.log(this.orders);
  }
  async recup(id: string) {
    console.log(id)
    this.commandeService = new CommandService();
    await this.commandeService.update({ _id: id, status: "récupéré" });
    this.commandeService = new CommandService();
    this.orders = await this.commandeService.getAllOrder();
    console.log(this.orders);
  }
  async arrive(id: string) {
    console.log(id)
    this.commandeService = new CommandService();
    await this.commandeService.update({ _id: id, status: "arrivé" });
    this.commandeService = new CommandService();
    this.orders = await this.commandeService.getAllOrder();
    console.log(this.orders);
  }
  async livre(id: string) {
    console.log(id)
    this.commandeService = new CommandService();
    await this.commandeService.update({ _id: id, status: "livré" });
    this.commandeService = new CommandService();
    this.orders = await this.commandeService.getAllOrder();
    console.log(this.orders);
  }
}
</script>