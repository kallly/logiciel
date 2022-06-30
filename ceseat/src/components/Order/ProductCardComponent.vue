<template>
<v-hover>
  <template v-slot:default="{ hover }">
    <v-card class="mt-4" width="300">
    <v-img :src="product.img" height="200px"></v-img>
     <v-card-title> {{ product.name }} </v-card-title>
     <v-card-text>
       {{product.price}} €
     </v-card-text>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            {{ product.text }}
          </v-card-text>
       </div>
     </v-expand-transition>
      <v-fade-transition>
       <v-overlay v-if="hover" absolute color="grey" @click="addProduct(); addproduct()">
         <v-btn >Add to cart</v-btn>

         <v-btn icon @click="show = !show">
           <v-icon>
             {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
         </v-btn>
        </v-overlay>
      </v-fade-transition>
   </v-card>
  </template>
</v-hover>
</template>

<script lang="ts">
  import useRoute from "vue-router"
  import { Component, Prop, Vue } from "vue-property-decorator"
  import Product from "../../models/Product"
  @Component
  export default class RestaurantCardComponent extends Vue {
    @Prop() product!: Product;
    show = false;
    newProduct = false;
    public addProduct(): void {
    this.$emit("productAdded", true);
  }
  public addproduct(): void {
    this.$emit("addProducts", this.product);
  }
}
</script>