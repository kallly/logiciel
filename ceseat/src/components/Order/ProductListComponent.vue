<template>
  
  <div>
    <v-container class="grey lighten-5">
    <div class="panier">
      <v-icon>mdi-cart-arrow-down</v-icon>
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

@Component({ components: { ProductCardComponent } })
export default class ProductListComponent extends Vue {
  @Prop() products!: Array<ProductModel>;
  public count = 0;
  public whichproduct: Array<string> =[];
  public cartlist: string = ""
  get panierTextFormated(): string {
    return `${this.count}`;
  }
  
  public addProducts(productName: ProductModel): void {
    this.whichproduct.push(productName.name); //ajout de notre produit (nom/id)
    console.log("productName", productName.name, " was hadded to cart");
  }
  public onProductAdded(param: boolean): void {
    var toPrint = "";
    for (var i=0; i<this.whichproduct.length; i++){
        toPrint = toPrint + " " + this.whichproduct[i];
        this.cartlist = toPrint
      }
    console.log("Mon param", param);
    this.count++;
  }
}
</script>