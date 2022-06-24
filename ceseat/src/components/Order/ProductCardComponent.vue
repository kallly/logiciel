<template>
  <v-container>
    <div class = "RestaurantCardComponent"> 
    <h>this is a RestaurantCardComponent </h>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RestaurantCardComponent'
});
</script>

<template>
  <v-card class="mt-4" max-width="344">
    <v-img :src="product.img" height="200px"></v-img>

    <v-card-title> {{ product.name }} </v-card-title>

    <v-card-subtitle> {{ `${product.amount} €` }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="addProduct()">
        Ajouter
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ product.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Product from "../../models/Product";

@Component
export default class ProductCard extends Vue {
  @Prop() product!: Product;

  show = false;

  public addProduct(): void {
    this.$emit("productAdded", true);
  }
}
</script>