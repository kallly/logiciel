<template>
  <div>
    <div class="panier">
      <v-icon>mdi-cart-arrow-down</v-icon>
      <span class="mr-2">{{ panierTextFormated }}</span>
    </div>

    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="4">
          <ProductCard
            :product="product"
            @productAdded="onProductAdded($event)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Product from "../../models/Product";
import ProductCard from "./ProductCard.vue";

@Component({ components: { ProductCard } })
export default class ProductList extends Vue {
  @Prop() products!: Array<Product>;

  public count = 0;

  // Computed
  get panierTextFormated(): string {
    return this.count > 1
      ? `Votre panier contient ${this.count} articles`
      : `Votre panier contient ${this.count} article`;
  }

  public onProductAdded(param: boolean): void {
    console.log("Mon param", param);
    this.count++;
  }
}
</script>

<style scoped>
.panier {
  border: 1px solid #d1d1d1;
  padding: 14px;
  display: flex;
  width: 50%;
  margin: 15px auto;
  justify-content: center;
  position: shrink;
}
</style>