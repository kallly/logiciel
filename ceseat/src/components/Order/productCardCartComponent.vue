<template>
  
  <div>
    <v-container class="grey lighten-5">
    <div class="panier"> 
      <router-link :to="`/Order`" tag="button" color="deep-purple lighten-2"> 
           <v-icon  @click="ProductTranspher();">mdi-cart-arrow-down</v-icon>
      </router-link>
      <span class="mr-2">{{ panierTextFormated }}</span> 
      <span class="mr-2">{{ cartlist }}</span>
    </div>
      <v-row no-gutters>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="4">
          <ProductCardComponent
            :productModel="product"
            @productAdded="onProductAdded($event)"
            @addProducts="addProducts($event)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCardComponent from '../Order/ProductCardComponent.vue'
import ProductModel from '../../models/ProductModel'
import CommandModel from "../../models/CommandModel"

@Component({ components: { ProductCardComponent } })
export default class ProductListComponent extends Vue {
  @Prop() products!: Array<ProductModel>;
  ProductPannier:Array<ProductModel>=[];
  public count = 0;
  public cartlist: string = "";
  NewCommand !: CommandModel;
  
}
</script>