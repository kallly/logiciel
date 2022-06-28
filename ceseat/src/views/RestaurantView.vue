<template>
  <v-app>
    <div class="RestaurantView">
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <v-container>
        Bienvenu chez {{$route.params.id}}
        <ProductListComponent :products="products"></ProductListComponent>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import ProductCardComponent from '../components/Order/ProductCardComponent.vue'
  import ProductListComponent from '../components/Order/ProductListComponent.vue'
  import RestaurantCardComponent from '../components/Navigation/RestaurantCardComponent.vue'
  import RestaurantListComponent from '../components/Navigation/RestaurantListComponent.vue'
  import RestaurantModel from '../models/RestaurantModel'
  import ProductService from '../services/ProductService'
  import ProductModel from '../models/ProductModel'

  const RestaurantV = 
  {
    template: '<div>RestaurantView {{ $route.params.name}}</div>',
  }

  @Component({
  components: { ProductListComponent,TopbarComponent },
})
export default class RestaurantView extends Vue {
  public products: Array<ProductModel> = [];

  private productService!: ProductService;

  // Cycle de vie d'un composant vue
  async created(): Promise<void> {
    this.productService = new ProductService();
    this.products = await this.productService.getAllProducts();
  }
  mounted(): void {
    // TODO
  }

  destroyed(): void {
    // TODO
  }
}
 /* 
  export default Vue.extend({
    public restaurants: Array<RestaurantModel> = [];
    private restaurantService!: RestaurantService;

    name: 'RestaurantView',
    components: {
      TopbarComponent, ResizerComponent, ProductCardComponent
    },
  })
  */
</script>
