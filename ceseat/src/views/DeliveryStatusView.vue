<template>
  <v-app>
    <div class="DeliveryStatusView">
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <br>
      <v-container>
        Votre commande est la commande numéro {{command.id}}
        <!--ici visualisation de l'avencée-->
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue';
  import CommandModel from '../models/CommandModel';

  import ProductService from '../services/ProductService'
  import ProductModel from '../models/ProductModel'

  const DeliveryStatusV = 
  {
    template: '<div>RestaurantView {{ $route.params.id}}</div>',
  }

  @Component({
  components: { TopbarComponent },
})
export default class RestaurantView extends Vue {
  command : CommandModel;
  public get getValueOfCommand(){
    return 0;
  }
}

</script>
