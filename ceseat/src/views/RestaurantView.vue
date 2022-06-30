<template>
  <v-app>
    <div class="RestaurantView">
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <br>
      <v-container>
        Bienvenu chez {{ restaurant_name }}
        <ProductListComponent :products="products" :restaurant="restaurant"></ProductListComponent>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
import ProductListComponent from '../components/Order/ProductListComponent.vue'
import ProductService from '../services/ProductService'
import RestaurantService from "../services/RestaurantService";
import Restaurant from "../models/Restaurant";
import Product from "../models/Product";

@Component({
  components: { ProductListComponent, TopbarComponent },
})
export default class RestaurantView extends Vue {
  public products: Array<Product> = [];
  public restaurant!: Restaurant;
  public restaurant_name: string = '';

  // Cycle de vie d'un composant vue
  async created(): Promise<void> {
    this.restaurant_name = this.$route.params.id;
    if(typeof(this.$route.query.id) == 'string'){
      let restaurantService = new RestaurantService();
      this.restaurant = await restaurantService.getRestaurantById(this.$route.query.id);
      let productService = new ProductService();
      this.products = await productService.getAllProducts(this.$route.query.id);
      console.log(this.products);
    } 
  }
}
</script>
