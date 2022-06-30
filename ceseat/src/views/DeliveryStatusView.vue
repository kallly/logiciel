<template>
  <v-app>
    <div class="DeliveryStatusView">
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <br>
      <v-container>
      <OrderListComponent :orders="orders"></OrderListComponent>
        <!--ici visualisation de l'avencée-->
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue';
  import CommandModel from '../models/CommandModel';

  import OrderService from "../services/OrderService";


  import ProductService from '../services/ProductService'
  import ProductModel from '../models/ProductModel'

  const DeliveryStatusV = 
  {
    template: '<div>RestaurantView {{ $route.params.id}}</div>',
  }

  @Component({
  components: { TopbarComponent },
})
export default class DeliveryStatusView extends Vue {
  public orders !: CommandModel;
  private orderService!: OrderService;

  /*async created(): Promise<void> {
    //this.orderService = new OrderService();
    //this.orders = await this.orderService.getAllRestaurants();
  }*/
  public get getValueOfCommand(){
    return 0;
  }
}

</script>
